/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{unwrapOr as e}from"../core/maybe.js";import{addLinearDepth as i,addCalculateLinearDepth as t}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as o}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as r}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{ObjectAndLayerIdColor as n}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl.js";import{RibbonVertexPosition as a}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/RibbonVertexPosition.glsl.js";import{OutputDepth as s}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl.js";import{LineStipple as l,computePixelSize as d}from"../views/3d/webgl-engine/core/shaderLibrary/shading/LineStipple.glsl.js";import{MarkerSizing as p}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MarkerSizing.glsl.js";import{multipassTerrainTest as c}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{PiUtils as g}from"../views/3d/webgl-engine/core/shaderLibrary/shading/PiUtils.glsl.js";import{symbolAlphaCutoff as m}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{ColorConversion as v}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{addProjViewLocalOrigin as f}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float2PassUniform as h}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{Float4PassUniform as u}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as D}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as b}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{Matrix4PassUniform as S}from"../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform.js";import{ShaderBuilder as x}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{TransparencyPassType as L}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as w}from"../views/3d/webgl-engine/lib/VertexAttribute.js";import{LineMarkerSpace as y}from"../views/3d/webgl-engine/shaders/LineMarkerTechniqueConfiguration.js";import{CapType as C}from"../views/3d/webgl-engine/shaders/RibbonLineTechniqueConfiguration.js";const j=1;function R(R){const A=new x,{vertex:P,fragment:F}=A,z=R.hasMultipassTerrain&&(R.output===o.Color||R.output===o.Alpha);A.include(g),A.include(a,R),A.include(l,R);const E=R.applyMarkerOffset&&!R.draped;E&&(P.uniforms.add(new D("markerScale",(e=>e.markerScale))),A.include(p,{space:y.World})),R.output===o.Depth&&A.include(s,R),A.include(n,R),f(P,R),P.uniforms.add([new S("inverseProjectionMatrix",((e,i)=>i.camera.inverseProjectionMatrix)),new h("nearFar",((e,i)=>i.camera.nearFar)),new D("miterLimit",(e=>"miter"!==e.join?0:e.miterLimit)),new u("viewport",((e,i)=>i.camera.fullViewport))]),P.constants.add("LARGE_HALF_FLOAT","float",65500),A.attributes.add(w.POSITION,"vec3"),A.attributes.add(w.SUBDIVISIONFACTOR,"float"),A.attributes.add(w.UV0,"vec2"),A.attributes.add(w.AUXPOS1,"vec3"),A.attributes.add(w.AUXPOS2,"vec3"),A.varyings.add("vColor","vec4"),A.varyings.add("vpos","vec3"),i(A),z&&A.varyings.add("depth","float");const T=R.capType===C.ROUND,W=R.stippleEnabled&&R.stippleScaleWithLineWidth||T;W&&A.varyings.add("vLineWidth","float");const O=R.stippleEnabled&&R.stippleScaleWithLineWidth;O&&A.varyings.add("vLineSizeInv","float");const V=R.innerColorEnabled||T;V&&A.varyings.add("vLineDistance","float");const N=R.stippleEnabled&&T,I=R.falloffEnabled||N;I&&A.varyings.add("vLineDistanceNorm","float"),T&&(A.varyings.add("vSegmentSDF","float"),A.varyings.add("vReverseSegmentSDF","float")),P.code.add(b`#define PERPENDICULAR(v) vec2(v.y, -v.x);
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),P.code.add(b`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),t(A),P.code.add(b`
    void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
      float vnp = nearFar[0] * 0.99;

      if(pos.z > -nearFar[0]) {
        //current pos behind ncp --> we need to clip
        if (!isStartVertex) {
          if(prev.z < -nearFar[0]) {
            //previous in front of ncp
            pos = mix(prev, pos, interp(vnp, prev, pos));
            next = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        } else {
          if(next.z < -nearFar[0]) {
            //next in front of ncp
            pos = mix(pos, next, interp(vnp, pos, next));
            prev = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        }
      } else {
        //current position visible
        if (prev.z > -nearFar[0]) {
          //previous behind ncp
          prev = mix(pos, prev, interp(vnp, pos, prev));
        }
        if (next.z > -nearFar[0]) {
          //next behind ncp
          next = mix(next, pos, interp(vnp, next, pos));
        }
      }

      ${z?"depth = pos.z;":""}
      linearDepth = calculateLinearDepth(nearFar,pos.z);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);
    }
  `),P.uniforms.add(new D("pixelRatio",((e,i)=>i.camera.pixelRatio))),P.code.add(b`
  void main(void) {
    // unpack values from uv0.y
    bool isStartVertex = abs(abs(uv0.y)-3.0) == 1.0;

    float coverage = 1.0;

    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      bool isJoin = abs(uv0.y) < 3.0;

      float lineSize = getSize();
      float lineWidth = lineSize * pixelRatio;

      ${W?b`vLineWidth = lineWidth;`:""}
      ${O?b`vLineSizeInv = 1.0 / lineSize;`:""}

      // convert sub-pixel coverage to alpha
      if (lineWidth < 1.0) {
        coverage = lineWidth;
        lineWidth = 1.0;
      }else{
        // Ribbon lines cannot properly render non-integer sizes. Round width to integer size if
        // larger than one for better quality. Note that we do render < 1 pixels more or less correctly
        // so we only really care to round anything larger than 1.
        lineWidth = floor(lineWidth + 0.5);
      }

      vec4 pos  = view * vec4(position.xyz, 1.0);
      vec4 prev = view * vec4(auxpos1.xyz, 1.0);
      vec4 next = view * vec4(auxpos2.xyz, 1.0);
  `),E&&P.code.add(b`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos, other);
if(!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos) * 0.5;
}`),P.code.add(b`clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`);(R.stippleEnabled||T)&&P.code.add(b`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${T?b`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),P.code.add(b`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * uv0.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),R.roundJoins?P.code.add(b`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = PERPENDICULAR(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = PERPENDICULAR(endDir);

        float factor = ${R.stippleEnabled?b`min(1.0, subdivisionFactor * ${b.float((j+2)/(j+1))})`:b`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(uv0.y) * factor * rotationAngle);
      `):P.code.add(b`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);`);const _=R.capType!==C.BUTT;return P.code.add(b`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);

      ${_?b`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),P.code.add(b`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(uv0.y) * displacementLen + capDisplacementDir * displacementLen;

    ${I||V?b`float lineDistNorm = sign(uv0.y) * pos.w;`:""}

    ${V?b`vLineDistance = lineWidth * lineDistNorm;`:""}
    ${I?b`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),T&&P.code.add(b`vec2 segmentDir = normalize(segment);
vSegmentSDF = (isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir) * pos.w) ;
vReverseSegmentSDF = (isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir) * pos.w);`),R.stippleEnabled&&(R.draped?P.uniforms.add(new D("worldToScreenRatio",((e,i)=>1/i.screenToPCSRatio))):P.code.add(b`vec3 segmentCenter = mix((auxpos2 + position) * 0.5, (position + auxpos1) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),P.code.add(b`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(auxpos2 - position, position - auxpos1, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),R.draped?P.code.add(b`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = uv0.x * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):P.code.add(b`float startPseudoScreen = mix(uv0.x, uv0.x - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),P.uniforms.add(new D("stipplePatternPixelSize",(e=>d(e)))),P.code.add(b`
      float patternLength = ${R.stippleScaleWithLineWidth?"lineSize * ":""} stipplePatternPixelSize;

      // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the fragment shader
      vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of joins)
      if (segmentLengthScreenDouble >= 0.001) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1] at the
        // original vertex positions, and slightly outside of that range at the displaced positions
        vec2 stippleDisplacement = pos.xy - segmentOrigin;
        float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen distance
      vStippleDistanceLimits *= pos.w;
      vStippleDistance *= pos.w;

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e038, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e038);
    `)),P.code.add(b`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a *= coverage;

      ${R.wireframe&&!R.draped?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }
  }
  `),z&&A.include(c,R),A.include(r,R),F.include(v),F.code.add(b`
  void main() {
    discardBySlice(vpos);
    ${z?"terrainDepthTest(gl_FragCoord, depth);":""}
  `),R.wireframe?F.code.add(b`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(T&&F.code.add(b`
      float sdf = min(vSegmentSDF, vReverseSegmentSDF);
      vec2 fragmentPosition = vec2(
        min(sdf, 0.0),
        vLineDistance
      ) * gl_FragCoord.w;

      float fragmentRadius = length(fragmentPosition);
      float fragmentCapSDF = (fragmentRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

      if (capCoverage < ${b.float(m)}) {
        discard;
      }
    `),N?F.code.add(b`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        vLineDistanceNorm * gl_FragCoord.w
      );
      float stippleRadius = length(stipplePosition * vLineWidth);
      float stippleCapSDF = (stippleRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${b.float(m)}, stippleCoverage);
      `):F.code.add(b`float stippleAlpha = getStippleAlpha();`),F.uniforms.add(new u("intrinsicColor",(e=>e.color))),R.output!==o.ObjectAndLayerIdColor&&F.code.add(b`discardByStippleAlpha(stippleAlpha, stippleAlphaColorDiscard);`),F.code.add(b`vec4 color = intrinsicColor * vColor;`),R.innerColorEnabled&&(F.uniforms.add(new u("innerColor",(i=>e(i.innerColor,i.color)))),F.uniforms.add(new D("innerWidth",((e,i)=>e.innerWidth*i.camera.pixelRatio))),F.code.add(b`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),F.code.add(b`vec4 finalColor = blendStipple(color, stippleAlpha);`),R.falloffEnabled&&(F.uniforms.add(new D("falloff",(e=>e.falloff))),F.code.add(b`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`))),F.code.add(b`
    ${R.output===o.ObjectAndLayerIdColor?b`finalColor.a = 1.0;`:""}

    if (finalColor.a < ${b.float(m)}) {
      discard;
    }

    ${R.output===o.Alpha?b`gl_FragColor = vec4(finalColor.a);`:""}
    ${R.output===o.Color?b`gl_FragColor = highlightSlice(finalColor, vpos);`:""}
    ${R.output===o.Color&&R.transparencyPassType===L.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    ${R.output===o.Highlight?b`gl_FragColor = vec4(1.0);`:""}
    ${R.output===o.Depth?b`outputDepth(linearDepth);`:""}
    ${R.output===o.ObjectAndLayerIdColor?b`outputObjectAndLayerIdColor();`:""}
  }
  `),A}const A=Object.freeze(Object.defineProperty({__proto__:null,RIBBONLINE_NUM_ROUND_JOIN_SUBDIVISIONS:j,build:R},Symbol.toStringTag,{value:"Module"}));export{j as R,A as a,R as b};