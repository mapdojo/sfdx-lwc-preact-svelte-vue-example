/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{earth as e,mars as o,moon as r}from"../geometry/support/Ellipsoid.js";import{OverlayIndex as a,RenderTargetType as i}from"../views/3d/terrain/interfaces.js";import{IntegratedMeshMode as l}from"../views/3d/webgl-engine/collections/Component/Material/ComponentTechniqueConfiguration.js";import{ComponentData as t,ComponentDataType as d}from"../views/3d/webgl-engine/collections/Component/Material/shader/ComponentData.glsl.js";import{VertexDiscardByOpacity as n}from"../views/3d/webgl-engine/collections/Component/Material/shader/VertexDiscardByOpacity.glsl.js";import{ForwardLinearDepth as s}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as c}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SlicePass as m}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{NormalAttributeType as g}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl.js";import{TextureCoordinateAttribute as v}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl.js";import{VertexColor as u}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl.js";import{VertexNormal as h}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl.js";import{VertexPosition as p}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexPosition.glsl.js";import{OutputDepth as C}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl.js";import{OutputHighlight as w}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{ReadLinearDepth as b}from"../views/3d/webgl-engine/core/shaderLibrary/output/ReadLinearDepth.glsl.js";import{ComputeMaterialColor as y}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeMaterialColor.glsl.js";import{ComputeNormalTexture as x}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl.js";import{ComputeShadingNormal as f}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeShadingNormal.glsl.js";import{EvaluateSceneLighting as L,addLightingGlobalFactor as M}from"../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl.js";import{addMainLightIntensity as j}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl.js";import{multipassTerrainTest as T}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{PBRMode as O,PhysicallyBasedRenderingParameters as S}from"../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl.js";import{ReadBaseColorTexture as N}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ReadBaseColorTexture.glsl.js";import{ReadShadowMapPass as W}from"../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl.js";import{OverlayIM as A,getColorTexture as P}from"../views/3d/webgl-engine/core/shaderLibrary/terrain/Overlay.glsl.js";import{symbolAlphaCutoff as B}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{DiscardOrAdjustAlphaDraw as R}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaDiscard.glsl.js";import{EllipsoidMode as _}from"../views/3d/webgl-engine/core/shaderLibrary/util/EllipsoidMode.js";import{glsl as D}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as $}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as z}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{TransparencyPassType as F}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";function E(a){const i=new $;i.include(p,a),i.include(h,a),i.include(u,a),i.include(v,a),i.include(s,a),i.include(t,a),i.include(R,a),i.include(m,a),i.include(N,a),i.include(n,a);const{vertex:E,fragment:I}=i;a.pbrMode!==O.Normal&&a.pbrMode!==O.Schematic||(i.include(S,a),a.hasNormalTexture&&i.include(x,a));const G=a.output===c.Shadow||a.output===c.ShadowHighlight||a.output===c.ShadowExcludeHighlight;G&&a.componentData===d.Varying?E.code.add(D`#define discardShadows(castShadows) { if(!castShadows) { gl_Position = vec4(1e38, 1e38, 1e38, 1.0); return; } }`):E.code.add(D`#define discardShadows(castShadows) {}`);const H=a.integratedMeshMode===l.ColorOverlay||a.integratedMeshMode===l.ColorOverlayWithWater,k=H&&a.output===c.Color&&a.pbrMode===O.WaterOnIntegratedMesh;return H&&(i.include(L,a),i.include(A,a),a.spherical?E.code.add(D`
      const float invEllipsoidRadius = ${D.float(1/(a.ellipsoidMode===_.Earth?e.radius:a.ellipsoidMode===_.Mars?o.radius:r.radius))};
      vec2 projectOverlay(vec3 pos) {
        return pos.xy / (1.0 + invEllipsoidRadius * pos.z);
      }
      `):E.code.add(D`vec2 projectOverlay(vec3 pos) { return pos.xy; }`)),k&&(i.varyings.add("tbnTangent","vec3"),i.varyings.add("tbnBiTangent","vec3"),i.varyings.add("groundNormal","vec3")),E.code.add(D`
    void main() {
      bool castShadows;
      vec4 externalColor = forwardExternalColor(castShadows);
      discardShadows(castShadows);

      vertexDiscardByOpacity(externalColor.a);

      ${a.output===c.ObjectAndLayerIdColor?D`externalColor.a = 1.0;`:""}

      if (externalColor.a < ${D.float(B)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      forwardPosition(readElevationOffset());
      forwardNormal();
      forwardTextureCoordinates();
      forwardVertexColor();
      forwardLinearDepth();
      ${a.output===c.ObjectAndLayerIdColor?D`forwardObjectAndLayerIdColor();`:""}
      ${k?a.spherical?D`
                groundNormal = normalize(positionWorld());
                tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), groundNormal));
                tbnBiTangent = normalize(cross(groundNormal, tbnTangent));`:D`
                groundNormal = vec3(0.0, 0.0, 1.0);
                tbnTangent = vec3(1.0, 0.0, 0.0);
                tbnBiTangent = vec3(0.0, 1.0, 0.0);`:""}
      ${H?D`setOverlayVTC(projectOverlay(position));`:""}
    }
  `),a.output===c.Alpha&&(I.include(b),i.include(T,a),i.include(y,a),H&&I.uniforms.add(new z("ovColorTex",((e,o)=>P(e,o)))),I.code.add(D`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);
        ${a.hasMultipassTerrain?D`terrainDepthTest(gl_FragCoord, vPosition_view.z);`:""}

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        vec4 externalColor;
        int externalColorMixMode;
        readExternalColor(externalColor, externalColorMixMode);

        vec4 materialColor = computeMaterialColor(
          textureColor,
          externalColor,
          externalColorMixMode
        );
        ${H?D`
                vec4 overlayColor = getOverlayColor(ovColorTex, vtcOverlay);
                materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;`:""}

        gl_FragColor = vec4(materialColor.a);
      }
    `)),a.output===c.Color&&(I.include(b),i.include(T,a),i.include(y,a),i.include(f,a),i.include(L,a),a.receiveShadows?(i.include(W,a),I.code.add(D`float evaluateShadow() {
return readShadowMap(vPositionWorldCameraRelative, linearDepth);
}`)):I.code.add(D`float evaluateShadow() { return 0.0; }`),H&&I.uniforms.add(new z("ovColorTex",((e,o)=>P(e,o)))),I.code.add(D`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);
        ${a.hasMultipassTerrain?D`terrainDepthTest(gl_FragCoord, vPosition_view.z);`:""}

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        vec4 externalColor;
        int externalColorMixMode;
        readExternalColor(externalColor, externalColorMixMode);

        vec4 materialColor = computeMaterialColor(
          textureColor,
          externalColor,
          externalColorMixMode
        );
        ${H?D`vec4 overlayColor = getOverlayColor(ovColorTex, vtcOverlay);`:""}
    `),a.pbrMode===O.Normal||a.pbrMode===O.Schematic?(j(I),I.code.add(D`
        ${a.pbrMode===O.Normal?D`
                applyPBRFactors();
                if (int(externalColorMixMode) == 3) {
                  mrr = vec3(0.0, 0.6, 0.2);
                }`:""}
        vec3 normalVertex = shadingNormalWorld();
        float additionalIrradiance = 0.02 * mainLightIntensity[2];
      `),a.hasNormalTexture?I.code.add(D`mat3 tangentSpace = computeTangentSpace(normalVertex, vPositionWorldCameraRelative, vuv0);
vec3 shadingNormal = computeTextureNormal(tangentSpace, vuv0);`):I.code.add(D`vec3 shadingNormal = normalVertex;`),I.code.add(D`${a.spherical?D`vec3 normalGround = normalize(positionWorld());`:D`vec3 normalGround = vec3(0.0, 0.0, 1.0);`}
      `),I.code.add(D`
        vec3 viewDir = normalize(vPositionWorldCameraRelative);
        float ssao = 1.0 - occlusion * (1.0 - evaluateAmbientOcclusion());

        ${a.snowCover?D`
                vec3 surfaceNormal = normalize(shadingNormalWorld());
                float snow = smoothstep(0.5, 0.55, dot(surfaceNormal, normalize(positionWorld())));
                materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);

                shadingNormal = mix(shadingNormal, surfaceNormal, snow);
                ssao = mix(ssao, 0.0, snow);
                mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                emission = mix(emission, vec3(0.0), snow);`:""}

        ${H?D` materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;`:""}

        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());
        vec4 shadedColor = vec4(evaluateSceneLightingPBR(shadingNormal, materialColor.rgb, evaluateShadow(), ssao, additionalLight, viewDir, normalGround, mrr, emission, additionalIrradiance), materialColor.a);
        `)):(a.receiveShadows?I.code.add(D`float shadow = evaluateShadow();`):a.spherical?(M(I),I.code.add(D`float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());
float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);`)):I.code.add(D`float shadow = 0.0;`),k&&I.uniforms.add(new z("ovNormalTex",((e,o)=>V(o)))),a.snowCover&&(i.extensions.add("GL_OES_standard_derivatives"),I.code.add(D`vec3 surfaceNormal = normalize(cross(dFdx(vPositionWorldCameraRelative), dFdy(vPositionWorldCameraRelative)));
float snow = smoothstep(0.5, 0.55, dot(surfaceNormal, normalize(positionWorld())));
materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);`)),I.code.add(D`
        float ambientOcclusion = evaluateAmbientOcclusion();
        vec3 additionalLight = evaluateAdditionalLighting(ambientOcclusion, positionWorld());

        ${H?D` materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;`:""}

        vec4 shadedColor = vec4(evaluateSceneLighting(shadingNormalWorld(), materialColor.rgb, shadow, ambientOcclusion, additionalLight), materialColor.a);
      ${k?D`
              vec4 overlayWaterMask = getOverlayColor(ovNormalTex, vtcOverlay);
              float waterNormalLength = length(overlayWaterMask);
              if (waterNormalLength > 0.95) {
                mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, groundNormal);
                vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, overlayColor, -normalize(vPositionWorldCameraRelative), shadow, groundNormal, tbnMatrix, vPosition_view, positionWorld());
                vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                // un-gamma the ground color to mix in linear space
                shadedColor = mix(shadedColor, waterColorNonLinear, waterColorLinear.w);
              }`:""}
      `)),I.code.add(D`
        gl_FragColor = highlightSlice(shadedColor, vPositionWorldCameraRelative);
        ${a.transparencyPassType===F.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),(a.output===c.Depth||G)&&(i.include(C,a),I.code.add(D`void main() {
discardBySlice(vPositionWorldCameraRelative);
vec4 textureColor = readBaseColorTexture();
discardOrAdjustAlpha(textureColor);
outputDepth(linearDepth);
}`)),a.output===c.Normal&&(i.include(f,a),I.code.add(D`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        // note: the alpha component needs to be 1.0 in order for this material
        // to influence ambient occlusion, see the ssao fragment shader
        float alpha = ${a.normalType===g.Ground?"0.0":"1.0"};
        gl_FragColor = vec4(vec3(.5) + .5 * shadingNormal_view(), alpha);
      }
    `)),a.output===c.ObjectAndLayerIdColor&&i.fragment.code.add(D`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        ${H?D`gl_FragColor = getOverlayColorTexel(vtcOverlay);`:"outputObjectAndLayerIdColor();"}
      }
    `),a.output===c.Highlight&&(i.include(w,a),I.code.add(D`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        ${H?D`
                vec4 overlayColor = getCombinedOverlayColor();
                if (overlayColor.a == 0.0) {
                  gl_FragColor = vec4(0.0);
                  return;
                }`:""}

        outputHighlight();
      }
    `)),i}function V(e){return 0===e.overlays.length?null:e.overlays[a.INNER].getValidTexture(i.Water)}const I=Object.freeze(Object.defineProperty({__proto__:null,build:E,getOverlayNormalTexture:V},Symbol.toStringTag,{value:"Module"}));export{I as C,E as b,V as g};