/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ForwardLinearDepth as e}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{Offset as o}from"../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl.js";import{ShaderOutput as r}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as i}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{Transform as a}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{InstancedDoublePrecision as l}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl.js";import{NormalAttribute as t}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl.js";import{PositionAttribute as s}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/PositionAttribute.glsl.js";import{SymbolColor as n}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl.js";import{TextureCoordinateAttribute as d}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl.js";import{VertexColor as c}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl.js";import{VerticalOffset as g}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl.js";import{DefaultMaterialAuxiliaryPasses as m}from"../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl.js";import{EvaluateAmbientOcclusion as v}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl.js";import{EvaluateSceneLighting as p,addAmbientBoostFactor as u,addLightingGlobalFactor as b}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl.js";import{addMainLightDirection as h,addMainLightIntensity as w}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl.js";import{multipassTerrainTest as f}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{PhysicallyBasedRendering as x}from"../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl.js";import{PhysicallyBasedRenderingParameters as y,PBRMode as C}from"../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl.js";import{ReadShadowMapPass as L,ReadShadowMapDraw as j}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl.js";import{VisualVariables as M}from"../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl.js";import{symbolAlphaCutoff as O}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{DiscardOrAdjustAlphaPass as P}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaDiscard.glsl.js";import{MixExternalColor as A}from"../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl.js";import{addProjViewLocalOrigin as T,addCameraPosition as E}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float3PassUniform as S}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{Float4PassUniform as _}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as F}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as $}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as N}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as D}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{TransparencyPassType as V}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as B}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function I(I){const R=new N,{vertex:z,fragment:k,varyings:G}=R;return T(z,I),R.include(s),G.add("vpos","vec3"),R.include(M,I),R.include(l,I),R.include(g,I),I.output!==r.Color&&I.output!==r.Alpha||(E(R.vertex,I),R.include(t,I),R.include(a,I),I.offsetBackfaces&&R.include(o),I.instancedColor&&R.attributes.add(B.INSTANCECOLOR,"vec4"),G.add("vNormalWorld","vec3"),G.add("localvpos","vec3"),I.hasMultipassTerrain&&G.add("depth","float"),R.include(d,I),R.include(e,I),R.include(n,I),R.include(c,I),z.uniforms.add(new _("externalColor",(e=>e.externalColor))),G.add("vcolorExt","vec4"),z.code.add($`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${I.instancedColor?"vcolorExt *= instanceColor;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${$.float(O)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = calculateVPos();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${I.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${I.hasMultipassTerrain?$`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),I.output===r.Alpha&&(R.include(i,I),R.include(P,I),R.include(f,I),k.uniforms.add([new F("opacity",(e=>e.opacity)),new F("layerOpacity",(e=>e.layerOpacity))]),I.hasColorTexture&&k.uniforms.add(new D("tex",(e=>e.texture))),k.include(A),k.code.add($`
      void main() {
        discardBySlice(vpos);
        ${I.hasMultipassTerrain?$`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${I.hasColorTexture?$`
                vec4 texColor = texture2D(tex, ${I.hasColorTextureTransform?$`colorUV`:$`vuv0`});
                ${I.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:$`vec4 texColor = vec4(1.0);`}
        ${I.hasVertexColors?$`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:$`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}

        gl_FragColor = vec4(opacity_);
      }
    `)),I.output===r.Color&&(R.include(i,I),R.include(p,I),R.include(v,I),R.include(P,I),R.include(I.instancedDoublePrecision?L:j,I),R.include(f,I),E(R.fragment,I),h(k),u(k),b(k),k.uniforms.add([z.uniforms.get("localOrigin"),z.uniforms.get("view"),new S("ambient",(e=>e.ambient)),new S("diffuse",(e=>e.diffuse)),new F("opacity",(e=>e.opacity)),new F("layerOpacity",(e=>e.layerOpacity))]),I.hasColorTexture&&k.uniforms.add(new D("tex",(e=>e.texture))),R.include(y,I),R.include(x,I),k.include(A),R.extensions.add("GL_OES_standard_derivatives"),w(k),k.code.add($`
      void main() {
        discardBySlice(vpos);
        ${I.hasMultipassTerrain?$`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${I.hasColorTexture?$`
                vec4 texColor = texture2D(tex, ${I.hasColorTextureTransform?$`colorUV`:$`vuv0`});
                ${I.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:$`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${I.pbrMode===C.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${I.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":I.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${I.hasVertexColors?$`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:$`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${I.snowCover?$`albedo = mix(albedo, vec3(1), 0.9);`:$``}
        ${$`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${I.pbrMode===C.Normal||I.pbrMode===C.Schematic?I.spherical?$`vec3 normalGround = normalize(vpos + localOrigin);`:$`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:$``}
        ${I.pbrMode===C.Normal||I.pbrMode===C.Schematic?$`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${I.snowCover?$`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:$`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${I.transparencyPassType===V.Color?$`gl_FragColor = premultiplyAlpha(gl_FragColor);`:$``}
      }
    `)),R.include(m,I),R}const R=Object.freeze(Object.defineProperty({__proto__:null,build:I},Symbol.toStringTag,{value:"Module"}));export{R,I as b};