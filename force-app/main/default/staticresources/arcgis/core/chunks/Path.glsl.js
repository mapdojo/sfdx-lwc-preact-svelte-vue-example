/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ForwardLinearDepth as e,addNearFar as i}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as o}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as a}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{Transform as r}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{PathVertexPosition as l}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/PathVertexPosition.glsl.js";import{OutputDepth as s}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl.js";import{OutputHighlight as n}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{EvaluateAmbientOcclusion as d}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl.js";import{EvaluateSceneLighting as t,addAmbientBoostFactor as c,addLightingGlobalFactor as g}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl.js";import{addMainLightIntensity as m}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl.js";import{multipassTerrainTest as p}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{Normals as v}from"../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl.js";import{NormalUtils as h}from"../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl.js";import{ReadShadowMapDraw as u}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl.js";import{ColorConversion as w}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{addProjViewLocalOrigin as b,addViewNormal as f,addCameraPosition as y}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float3PassUniform as j}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{FloatPassUniform as L}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as P}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as S}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{TransparencyPassType as C}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";function F(F){const _=new S,{vertex:M,fragment:O}=_;switch(b(M,F),_.varyings.add("vpos","vec3"),_.include(l,F),F.output!==o.Color&&F.output!==o.Alpha||(_.include(r,F),_.include(u,F),_.include(e,F),_.varyings.add("vnormal","vec3"),_.varyings.add("vcolor","vec4"),F.hasMultipassTerrain&&_.varyings.add("depth","float"),M.code.add(P`
      void main() {
        vpos = calculateVPos();
        vnormal = normalize(localNormal());

        ${F.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
        gl_Position = transformPosition(proj, view, vpos);

        ${F.output===o.Color?"forwardLinearDepth();":""}

        vcolor = getColor();
      }
    `)),_.include(p,F),F.output){case o.Alpha:_.include(a,F),O.uniforms.add(new L("opacity",(e=>e.opacity))),O.code.add(P`
      void main() {
        discardBySlice(vpos);
        ${F.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        float combinedOpacity = vcolor.a * opacity;
        gl_FragColor = vec4(combinedOpacity);
      }
    `);break;case o.Color:_.include(a,F),_.include(t,F),_.include(d,F),_.include(u,F),_.include(v,F),y(O,F),c(O),g(O),O.uniforms.add([M.uniforms.get("localOrigin"),new j("ambient",(e=>e.ambient)),new j("diffuse",(e=>e.diffuse)),new j("specular",(e=>e.specular)),new L("opacity",(e=>e.opacity))]),O.include(w),m(O),O.code.add(P`
        void main() {
          discardBySlice(vpos);
          ${F.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

          shadingParams.viewDirection = normalize(vpos - cameraPosition);
          shadingParams.normalView = vnormal;
          vec3 normal = shadingNormal(shadingParams);
          float ssao = evaluateAmbientOcclusionInverse();

          float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
          vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
          ${F.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":F.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
          vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
          float combinedOpacity = vcolor.a * opacity;
          albedo += 0.25 * specular; // don't completely ignore specular for now

          vec3 shadedColor = evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);
          gl_FragColor = vec4(shadedColor, combinedOpacity);
          gl_FragColor = highlightSlice(gl_FragColor, vpos);
          ${F.transparencyPassType===C.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
        }
      `);break;case o.Depth:case o.Shadow:case o.ShadowHighlight:case o.ShadowExcludeHighlight:_.include(r,F),i(_),_.varyings.add("depth","float"),M.code.add(P`void main() {
vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
}`),_.include(a,F),_.include(s,F),O.code.add(P`void main() {
discardBySlice(vpos);
outputDepth(depth);
}`);break;case o.Normal:_.include(r,F),_.include(h,F),f(M),_.varyings.add("vnormal","vec3"),M.code.add(P`void main(void) {
vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
}`),_.include(a,F),O.code.add(P`void main() {
discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
gl_FragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
}`);break;case o.Highlight:_.include(r,F),_.include(h,F),_.varyings.add("vnormal","vec3"),M.code.add(P`void main(void) {
vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);
}`),_.include(a,F),_.include(n,F),O.code.add(P`void main() {
discardBySlice(vpos);
outputHighlight();
}`)}return _}const _=Object.freeze(Object.defineProperty({__proto__:null,build:F},Symbol.toStringTag,{value:"Module"}));export{_ as P,F as b};