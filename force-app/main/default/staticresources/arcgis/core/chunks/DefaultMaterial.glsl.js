/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../core/maybe.js";import{I as r}from"./mat4f64.js";import{ForwardLinearDepth as o}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{Offset as a}from"../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl.js";import{ShaderOutput as i}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as l}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{Transform as s}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{InstancedDoublePrecision as t}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl.js";import{NormalAttribute as n,NormalAttributeType as d}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl.js";import{PositionAttribute as c}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/PositionAttribute.glsl.js";import{SymbolColor as m}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl.js";import{TextureCoordinateAttribute as g}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl.js";import{VertexColor as u}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl.js";import{VertexNormal as p}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl.js";import{VerticalOffset as v}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl.js";import{DefaultMaterialAuxiliaryPasses as h}from"../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl.js";import{ComputeNormalTexture as b}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl.js";import{EvaluateAmbientOcclusion as f}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl.js";import{EvaluateSceneLighting as w,addAmbientBoostFactor as x,addLightingGlobalFactor as y}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl.js";import{addMainLightIntensity as C}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl.js";import{multipassTerrainTest as T}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{Normals as j}from"../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl.js";import{PhysicallyBasedRendering as L}from"../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl.js";import{PhysicallyBasedRenderingParameters as M,PBRMode as O}from"../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl.js";import{ReadShadowMapPass as P,ReadShadowMapDraw as $}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl.js";import{colorTextureUV as A,normalTextureUV as N,emissiveTextureUV as S,occlusionTextureUV as E,metallicRoughnessTextureUV as V}from"../views/3d/webgl-engine/core/shaderLibrary/shading/TextureTransformUV.glsl.js";import{VisualVariables as _}from"../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl.js";import{symbolAlphaCutoff as D}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{DiscardOrAdjustAlphaPass as F}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaDiscard.glsl.js";import{MixExternalColor as U}from"../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl.js";import{addProjViewLocalOrigin as B,addCameraPosition as I}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float3PassUniform as R}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{Float4PassUniform as z}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as W}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as G}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{Matrix4PassUniform as k}from"../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform.js";import{ShaderBuilder as q}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as H}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{TransparencyPassType as J}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as K}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function Q(Q){const X=new q,{vertex:Y,fragment:Z,varyings:ee}=X;return B(Y,Q),X.include(c),ee.add("vpos","vec3"),X.include(_,Q),X.include(t,Q),X.include(v,Q),Q.hasColorTextureTransform&&X.include(A),Q.output!==i.Color&&Q.output!==i.Alpha||(Q.hasNormalTextureTransform&&X.include(N),Q.hasEmissionTextureTransform&&X.include(S),Q.hasOcclusionTextureTransform&&X.include(E),Q.hasMetallicRoughnessTextureTransform&&X.include(V),I(Y,Q),X.include(n,Q),X.include(s,Q),Q.normalType===d.Attribute&&Q.offsetBackfaces&&X.include(a),X.include(b,Q),X.include(p,Q),Q.instancedColor&&X.attributes.add(K.INSTANCECOLOR,"vec4"),ee.add("localvpos","vec3"),X.include(g,Q),X.include(o,Q),X.include(m,Q),X.include(u,Q),Y.uniforms.add(new z("externalColor",(e=>e.externalColor))),ee.add("vcolorExt","vec4"),Q.hasMultipassTerrain&&ee.add("depth","float"),Q.hasModelTransformation&&Y.uniforms.add(new k("model",(o=>e(o.modelTransformation)?o.modelTransformation:r))),Y.code.add(G`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${Q.instancedColor?"vcolorExt *= instanceColor;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${G.float(D)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = calculateVPos();
          localvpos = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${Q.normalType===d.Attribute?G`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${Q.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, ${Q.hasModelTransformation?"model,":""} vpos);
          ${Q.normalType===d.Attribute&&Q.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${Q.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        ${Q.hasColorTextureTransform?G`forwardColorUV();`:""}
        ${Q.hasNormalTextureTransform?G`forwardNormalUV();`:""}
        ${Q.hasEmissionTextureTransform?G`forwardEmissiveUV();`:""}
        ${Q.hasOcclusionTextureTransform?G`forwardOcclusionUV();`:""}
        ${Q.hasMetallicRoughnessTextureTransform?G`forwardMetallicRoughnessUV();`:""}
      }
    `)),Q.output===i.Alpha&&(X.include(l,Q),X.include(F,Q),X.include(T,Q),Z.uniforms.add([new W("opacity",(e=>e.opacity)),new W("layerOpacity",(e=>e.layerOpacity))]),Q.hasColorTexture&&Z.uniforms.add(new H("tex",(e=>e.texture))),Z.include(U),Z.code.add(G`
      void main() {
        discardBySlice(vpos);
        ${Q.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${Q.hasColorTexture?G`
                vec4 texColor = texture2D(tex, ${Q.hasColorTextureTransform?G`colorUV`:G`vuv0`});
                ${Q.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:G`vec4 texColor = vec4(1.0);`}
        ${Q.hasVertexColors?G`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:G`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        gl_FragColor = vec4(opacity_);
      }
    `)),Q.output===i.Color&&(X.include(l,Q),X.include(w,Q),X.include(f,Q),X.include(F,Q),X.include(Q.instancedDoublePrecision?P:$,Q),X.include(T,Q),I(Z,Q),Z.uniforms.add([Y.uniforms.get("localOrigin"),new R("ambient",(e=>e.ambient)),new R("diffuse",(e=>e.diffuse)),new W("opacity",(e=>e.opacity)),new W("layerOpacity",(e=>e.layerOpacity))]),Q.hasColorTexture&&Z.uniforms.add(new H("tex",(e=>e.texture))),X.include(M,Q),X.include(L,Q),Z.include(U),X.include(j,Q),x(Z),y(Z),C(Z),Z.code.add(G`
      void main() {
        discardBySlice(vpos);
        ${Q.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${Q.hasColorTexture?G`
                vec4 texColor = texture2D(tex, ${Q.hasColorTextureTransform?G`colorUV`:G`vuv0`});
                ${Q.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:G`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${Q.normalType===d.ScreenDerivative?G`
                vec3 normal = screenDerivativeNormal(localvpos);`:G`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${Q.pbrMode===O.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${Q.receiveShadows?"readShadowMap(vpos, linearDepth)":Q.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${Q.hasVertexColors?G`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:G`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${Q.hasNormalTexture?G`
                mat3 tangentSpace = ${Q.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, vuv0);`:G`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${Q.spherical?G`normalize(posWorld);`:G`vec3(0.0, 0.0, 1.0);`}

        ${Q.snowCover?G`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${Q.pbrMode===O.Normal||Q.pbrMode===O.Schematic?G`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${Q.snowCover?G`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:G`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${Q.transparencyPassType===J.Color?G`gl_FragColor = premultiplyAlpha(gl_FragColor);`:""}
      }
    `)),X.include(h,Q),X}const X=Object.freeze(Object.defineProperty({__proto__:null,build:Q},Symbol.toStringTag,{value:"Module"}));export{X as D,Q as b};