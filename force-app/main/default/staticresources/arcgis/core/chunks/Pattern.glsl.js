/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{addNearFar as e,addLinearDepth as o}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as t}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as r}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{Transform as a}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{VertexColor as i}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl.js";import{OutputDepth as n}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl.js";import{OutputHighlight as l}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{multipassTerrainTest as c}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{symbolAlphaCutoff as d}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{ColorConversion as s}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{addProjViewLocalOrigin as p,addCameraPosition as g}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float4PassUniform as u}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as v}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as m}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as f}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{TransparencyPassType as h}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as w}from"../views/3d/webgl-engine/lib/VertexAttribute.js";import{Style as b}from"../views/3d/webgl-engine/materials/PatternStyle.js";const y=.70710678118,S=y,j=.08715574274;function x(x){const T=new f,C=x.hasMultipassTerrain&&(x.output===t.Color||x.output===t.Alpha);x.draped||T.extensions.add("GL_OES_standard_derivatives");const{vertex:R,fragment:$}=T;p(R,x),T.include(a,x),T.include(i,x),x.draped?R.uniforms.add(new v("worldToScreenRatio",((e,o)=>1/o.screenToPCSRatio))):T.attributes.add(w.BOUNDINGRECT,"mat3"),T.attributes.add(w.POSITION,"vec3"),T.attributes.add(w.UVMAPSPACE,"vec4"),T.varyings.add("vpos","vec3"),T.varyings.add("vuv","vec2"),C&&T.varyings.add("depth","float");const D=x.style===b.ForwardDiagonal||x.style===b.BackwardDiagonal||x.style===b.DiagonalCross;D&&R.code.add(m`
      const mat2 rotate45 = mat2(${m.float(y)}, ${m.float(-S)},
                                 ${m.float(S)}, ${m.float(y)});
    `),x.draped||(g(R,x),R.uniforms.add(new v("worldToScreenPerDistanceRatio",((e,o)=>1/o.camera.perScreenPixelRatio))),R.code.add(m`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),R.code.add(m`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),R.code.add(m`
      float boundingRectDistanceToCamera() {
        vec3 center = vec3(boundingRect[0][0], boundingRect[0][1], boundingRect[0][2]);
        vec3 halfU = vec3(boundingRect[1][0], boundingRect[1][1], boundingRect[1][2]);
        vec3 halfV = vec3(boundingRect[2][0], boundingRect[2][1], boundingRect[2][2]);
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${m.float(j)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),R.code.add(m`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${D?" * rotate45":""};
      vec2 uvCellOrigin = uvMapSpace.zw ${D?" * rotate45":""};

      ${x.draped?"":m`
            float distanceToCamera = boundingRectDistanceToCamera();
            float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;
          `}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${m.float(x.patternSpacing)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `);const V=x.output===t.Depth;return V&&(T.include(n,x),e(T),o(T)),R.code.add(m`
    void main(void) {
      vuv = scaledUV();
      vpos = position;
      ${C?"depth = (view * vec4(vpos, 1.0)).z;":""}
      forwardNormalizedVertexColor();
      gl_Position = ${V?m`transformPositionWithDepth(proj, view, vpos, nearFar, linearDepth);`:m`transformPosition(proj, view, vpos);`}
    }
  `),T.include(r,x),$.include(s),x.draped&&$.uniforms.add(new v("texelSize",((e,o)=>1/o.camera.pixelRatio))),x.output===t.Highlight&&T.include(l,x),C&&T.include(c,x),x.output!==t.Highlight&&($.code.add(m`
      const float lineWidth = ${m.float(x.lineWidth)};
      const float spacing = ${m.float(x.patternSpacing)};
      const float spacingINV = ${m.float(1/x.patternSpacing)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),x.draped||$.code.add(m`const int maxSamples = 5;
float sample(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),$.uniforms.add(new u("uColor",(e=>e.color))),$.code.add(m`
    void main() {
      discardBySlice(vpos);
      ${C?"terrainDepthTest(gl_FragCoord, depth);":""}
      vec4 color = ${x.hasVertexColors?"vColor * uColor;":"uColor;"}
      color = highlightSlice(color, vpos);

      ${x.output!==t.Highlight?m`color.a *= ${P(x)};`:""}

      ${x.output===t.ObjectAndLayerIdColor?m`color.a = 1.0;`:""}

      if (color.a < ${m.float(d)}) {
        discard;
      }

      ${x.output===t.Alpha?m`gl_FragColor = vec4(color.a);`:""}

      ${x.output===t.Color?m`gl_FragColor = color; ${x.transparencyPassType===h.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}`:""}
      ${x.output===t.Highlight?m`outputHighlight();`:""}
      ${x.output===t.Depth?m`outputDepth(linearDepth);`:""};
    }
  `),T}function P(e){function o(o){return e.draped?m`coverage(vuv.${o}, texelSize)`:m`sample(vuv.${o})`}switch(e.style){case b.ForwardDiagonal:case b.Horizontal:return o("y");case b.BackwardDiagonal:case b.Vertical:return o("x");case b.DiagonalCross:case b.Cross:return m`
        1.0 - (1.0 - ${o("x")}) * (1.0 - ${o("y")})
      `;default:return"0.0"}}const T=Object.freeze(Object.defineProperty({__proto__:null,build:x},Symbol.toStringTag,{value:"Module"}));export{T as P,x as b};