/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{textureSize as e}from"../util/WebGL2Utils.js";import{glsl as r}from"../../shaderModules/interfaces.js";import{createTexture2DPassSizeUniforms as s}from"../../shaderModules/Texture2DPassUniform.js";import{TextureSizeUniformType as o}from"../../shaderModules/TextureSizeUniformType.js";import{blurSizePixels as t}from"../../../lib/SSAOHelper.js";function n(n,a){const i=n.fragment;a.receiveAmbientOcclusion?(i.uniforms.add(s("ssaoTex",((e,r)=>r.ssaoHelper.colorTexture),a.hasWebGL2Context?o.None:o.InvSize)),i.constants.add("blurSizePixelsInverse","float",1/t),i.code.add(r`
      float evaluateAmbientOcclusionInverse() {
        vec2 ssaoTextureSizeInverse = ${e(a,"ssaoTex",!0)};
        return texture2D(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).a;
      }

      float evaluateAmbientOcclusion() {
        return 1.0 - evaluateAmbientOcclusionInverse();
      }
    `)):i.code.add(r`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}export{n as EvaluateAmbientOcclusion};