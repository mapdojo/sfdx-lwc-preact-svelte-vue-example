/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{MARKER_TEXTURE_SIZE as e,MARKER_SYMBOL_SIZE as r,MARKER_TIP_THICKNESS_FACTOR as o}from"../views/3d/support/engineContent/marker.js";import{addLinearDepth as i,addCalculateLinearDepth as a}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as t}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as n}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{RibbonVertexPosition as s}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/RibbonVertexPosition.glsl.js";import{OutputDepth as l}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl.js";import{MarkerSizing as c}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MarkerSizing.glsl.js";import{multipassTerrainTest as d}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{symbolAlphaCutoff as p}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{ColorConversion as v}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{RgbaFloatEncoding as m}from"../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl.js";import{addProjViewLocalOrigin as g,addViewNormal as h}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float2PassUniform as f}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{Float4PassUniform as u}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as w}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as y}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{Matrix4PassUniform as S}from"../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform.js";import{ShaderBuilder as b}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as x}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{TransparencyPassType as P}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as z}from"../views/3d/webgl-engine/lib/VertexAttribute.js";import{LineMarkerSpace as L,LineMarkerAnchor as j}from"../views/3d/webgl-engine/shaders/LineMarkerTechniqueConfiguration.js";function C(C){const M=new b,D=C.hasMultipassTerrain&&(C.output===t.Color||C.output===t.Alpha),k=C.space===L.World;C.hasTip&&k&&M.extensions.add("GL_OES_standard_derivatives"),M.include(s,C),M.include(c,C),C.output===t.Depth&&M.include(l,C);const{vertex:N,fragment:T}=M;return T.include(m),g(N,C),M.attributes.add(z.POSITION,"vec3"),M.attributes.add(z.UV0,"vec2"),M.attributes.add(z.AUXPOS1,"vec3"),M.varyings.add("vColor","vec4"),M.varyings.add("vpos","vec3"),M.varyings.add("vUV","vec2"),M.varyings.add("vSize","float"),i(M),D&&M.varyings.add("depth","float"),C.hasTip&&M.varyings.add("vLineWidth","float"),N.uniforms.add([new f("nearFar",((e,r)=>r.camera.nearFar)),new u("viewport",((e,r)=>r.camera.fullViewport))]),N.code.add(y`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),N.code.add(y`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),k?(M.attributes.add(z.NORMAL,"vec3"),h(N),N.constants.add("tiltThreshold","float",.7),N.code.add(y`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):N.code.add(y`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`),N.code.add(y`
      #define vecN ${k?"vec3":"vec2"}

      vecN normalizedSegment(vecN pos, vecN prev) {
        vecN segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${k?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      vecN displace(vecN pos, vecN prev, float displacementLen) {
        vecN segment = normalizedSegment(pos, prev);

        vecN displacementDirU = perpendicular(segment);
        vecN displacementDirV = segment;

        ${C.anchor===j.Tip?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),C.space===L.Screen&&(N.uniforms.add(new S("inverseProjectionMatrix",((e,r)=>r.camera.inverseProjectionMatrix))),N.code.add(y`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),N.code.add(y`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),N.uniforms.add(new w("perScreenPixelRatio",((e,r)=>r.camera.perScreenPixelRatio))),N.code.add(y`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${C.hasCap?"\n                if(prev.z > posLeft.z) {\n                  vec2 diff = posLeft.xy - posRight.xy;\n                  planeOrigin.xy += perpendicular(diff) / 2.0;\n                }\n              ":""};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),N.uniforms.add(new w("pixelRatio",((e,r)=>r.camera.pixelRatio))),a(M),N.code.add(y`void main(void) {
if (uv0.y == 0.0) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
}
else {
float lineWidth = getLineWidth();
float screenMarkerSize = getScreenMarkerSize();
vec4 pos  = view * vec4(position.xyz, 1.0);
vec4 prev = view * vec4(auxpos1.xyz, 1.0);
clip(pos, prev);`),k?(C.hideOnShortSegments&&N.code.add(y`if (areWorldMarkersHidden(pos, prev)) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
return;
}`),N.code.add(y`pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
vec4 displacedPosScreen = projectAndScale(pos);`)):(N.code.add(y`vec4 posScreen = projectAndScale(pos);
vec4 prevScreen = projectAndScale(prev);
vec4 displacedPosScreen = posScreen;
displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);`),C.space===L.Screen&&N.code.add(y`vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));
vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);
pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
displacedPosScreen = projectAndScale(pos);`)),N.code.add(y`
        ${D?"depth = pos.z;":""}
        linearDepth = calculateLinearDepth(nearFar,pos.z);

        // Convert back into NDC
        displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

        // Convert texture coordinate into [0,1]
        vUV = (uv0 + 1.0) / 2.0;

        ${k?"":"vUV *= displacedPosScreen.w;"}

        ${C.hasTip?"vLineWidth = lineWidth;":""}

        vSize = screenMarkerSize;
        vColor = getColor();

        // Use camera space for slicing
        vpos = pos.xyz;

        gl_Position = displacedPosScreen;
      }
    }
  `),D&&M.include(d,C),M.include(n,C),T.uniforms.add([new u("intrinsicColor",(e=>e.color)),new x("tex",(e=>e.texture))]),T.include(v),M.constants.add("texelSize","float",1/e),T.code.add(y`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgba2float(texture2D(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),C.hasTip&&(M.constants.add("relativeMarkerSize","float",r/e),M.constants.add("relativeTipLineWidth","float",o),T.code.add(y`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${k?"halfTipLineWidth *= fwidth(samplePos.y);":""}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `)),M.constants.add("symbolAlphaCutoff","float",p),T.code.add(y`
  void main() {
    discardBySlice(vpos);
    ${D?"terrainDepthTest(gl_FragCoord, depth);":""}

    vec4 finalColor = intrinsicColor * vColor;

    ${k?"vec2 samplePos = vUV;":"vec2 samplePos = vUV * gl_FragCoord.w;"}

    ${C.hasTip?"finalColor.a *= max(markerAlpha(samplePos), tipAlpha(samplePos));":"finalColor.a *= markerAlpha(samplePos);"}

    ${C.output===t.ObjectAndLayerIdColor?y`finalColor.a = 1.0;`:""}

    if (finalColor.a < symbolAlphaCutoff) {
      discard;
    }

    ${C.output===t.Alpha?y`gl_FragColor = vec4(finalColor.a);`:""}
    ${C.output===t.Color?y`gl_FragColor = highlightSlice(finalColor, vpos);`:""}
    ${C.output===t.Color&&C.transparencyPassType===P.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    ${C.output===t.Highlight?y`gl_FragColor = vec4(1.0);`:""}
    ${C.output===t.Depth?y`outputDepth(linearDepth);`:""}
  }
  `),M}const M=Object.freeze(Object.defineProperty({__proto__:null,build:C},Symbol.toStringTag,{value:"Module"}));export{M as L,C as b};