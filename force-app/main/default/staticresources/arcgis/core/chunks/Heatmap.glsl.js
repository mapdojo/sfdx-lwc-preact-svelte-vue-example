/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ScreenSpacePass as e}from"../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl.js";import{DiscardOrAdjustAlphaBlend as r}from"../views/3d/webgl-engine/core/shaderLibrary/util/DiscardOrAdjustAlphaBlend.glsl.js";import{FloatPassUniform as s}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as i}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as o}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as n}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";function t(t){const a=new o;a.include(e),a.include(r);const{usesHalfFloat:d}=t;return a.fragment.uniforms.add([new n("densityMap",(e=>e.densityMap)),new n("tex",(e=>e.colorRamp)),new s("densityNormalizer",(e=>1/(e.maxDensity-e.minDensity))),new s("minDensity",(e=>e.minDensity))]),a.fragment.uniforms.add(new s("densityMultiplier",(e=>3/(e.searchRadius*e.searchRadius*Math.PI)))),d&&a.constants.add("compressionFactor","float",4),a.fragment.code.add(i`
    void main() {
      float density = texture2D(densityMap, uv).r * densityMultiplier${d?i` * compressionFactor`:""};
      float densityRatio = (density - minDensity) * densityNormalizer;

      vec4 color = texture2D(tex, vec2(clamp(densityRatio, 0.0, 1.0), 0.5));

      discardOrAdjustAlpha(color);
      gl_FragColor = color;
    }
  `),a}const a=Object.freeze(Object.defineProperty({__proto__:null,build:t},Symbol.toStringTag,{value:"Module"}));export{a as H,t as b};