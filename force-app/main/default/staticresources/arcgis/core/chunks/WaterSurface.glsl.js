/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ForwardLinearDepth as e}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as r}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as i}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{Transform as o}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{OutputHighlight as a}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{EvaluateAmbientLighting as s}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientLighting.glsl.js";import{MainLighting as n,addMainLightDirection as t,addMainLightIntensity as l}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl.js";import{multipassTerrainTest as d}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{NormalUtils as g}from"../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl.js";import{PBRMode as v}from"../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl.js";import{ReadShadowMapDraw as m}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl.js";import{Water as c}from"../views/3d/webgl-engine/core/shaderLibrary/shading/Water.glsl.js";import{WaterDistortion as p}from"../views/3d/webgl-engine/core/shaderLibrary/shading/WaterDistortion.glsl.js";import{symbolAlphaCutoff as u}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{ColorConversion as w}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{addProjViewLocalOrigin as h,addCameraPosition as f}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float4PassUniform as b}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as y}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as j}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as C}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{TransparencyPassType as F}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as L}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function P(P){const _=new C,{vertex:M,fragment:S}=_;h(M,P),_.include(o,P),_.attributes.add(L.POSITION,"vec3"),_.attributes.add(L.UV0,"vec2");const x=new b("waterColor",(e=>e.color));if(P.output===r.Color&&P.isDraped)return _.varyings.add("vpos","vec3"),M.uniforms.add(x),M.code.add(j`
        void main(void) {
          if (waterColor.a < ${j.float(u)}) {
            // Discard this vertex
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
            return;
          }

          vpos = position;
          gl_Position = transformPosition(proj, view, vpos);
        }
    `),S.uniforms.add(x),S.code.add(j`void main() {
gl_FragColor = waterColor;
}`),_;switch(P.output!==r.Color&&P.output!==r.Alpha||(_.include(g,P),_.include(e,P),_.varyings.add("vuv","vec2"),_.varyings.add("vpos","vec3"),_.varyings.add("vnormal","vec3"),_.varyings.add("vtbnMatrix","mat3"),P.hasMultipassTerrain&&_.varyings.add("depth","float"),M.uniforms.add(x),M.code.add(j`
      void main(void) {
        if (waterColor.a < ${j.float(u)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        vnormal = getLocalUp(vpos, localOrigin);
        vtbnMatrix = getTBNMatrix(vnormal);

        ${P.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}

        gl_Position = transformPosition(proj, view, vpos);
        ${P.output===r.Color?"forwardLinearDepth();":""}
      }
    `)),_.include(d,P),P.output){case r.Alpha:_.include(i,P),S.uniforms.add(x),S.code.add(j`
        void main() {
          discardBySlice(vpos);
          ${P.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

          gl_FragColor = vec4(waterColor.a);
        }
      `);break;case r.Color:_.include(n,P),_.include(s,{pbrMode:v.Disabled,lightingSphericalHarmonicsOrder:2}),_.include(p),_.include(i,P),_.include(m,P),_.include(c,P),S.uniforms.add([x,new y("timeElapsed",(e=>e.timeElapsed)),M.uniforms.get("view"),M.uniforms.get("localOrigin")]),f(S,P),S.include(w),t(S),l(S),S.code.add(j`
      void main() {
        discardBySlice(vpos);
        ${P.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - cameraPosition);
        float shadow = ${P.receiveShadows?j`1.0 - readShadowMap(vpos, linearDepth)`:"1.0"};
        vec4 vPosView = view * vec4(vpos, 1.0);
        vec4 final = vec4(getSeaColor(n, v, mainLightDirection, waterColor.rgb, mainLightIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz, vpos + localOrigin), waterColor.w);

        // gamma correction
        gl_FragColor = delinearizeGamma(final);
        gl_FragColor = highlightSlice(gl_FragColor, vpos);
        ${P.transparencyPassType===F.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `);break;case r.Normal:_.include(g,P),_.include(p,P),_.include(i,P),_.varyings.add("vpos","vec3"),_.varyings.add("vuv","vec2"),M.uniforms.add(x),M.code.add(j`
        void main(void) {
          if (waterColor.a < ${j.float(u)}) {
            // Discard this vertex
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
            return;
          }

          vuv = uv0;
          vpos = position;

          gl_Position = transformPosition(proj, view, vpos);
        }
    `),S.uniforms.add(new y("timeElapsed",(e=>e.timeElapsed))),S.code.add(j`void main() {
discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
gl_FragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);
}`);break;case r.Highlight:_.include(a,P),_.varyings.add("vpos","vec3"),M.uniforms.add(x),M.code.add(j`
      void main(void) {
        if (waterColor.a < ${j.float(u)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
      }
    `),_.include(i,P),S.code.add(j`void main() {
discardBySlice(vpos);
outputHighlight();
}`)}return _}const _=Object.freeze(Object.defineProperty({__proto__:null,build:P},Symbol.toStringTag,{value:"Module"}));export{_ as W,P as b};