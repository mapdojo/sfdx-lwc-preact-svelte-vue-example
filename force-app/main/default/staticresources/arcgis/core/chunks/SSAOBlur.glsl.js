/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{i as e}from"./vec3.js";import{ScreenSpacePass as r}from"../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl.js";import{ReadLinearDepth as o}from"../views/3d/webgl-engine/core/shaderLibrary/output/ReadLinearDepth.glsl.js";import{Float2DrawUniform as t}from"../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform.js";import{Float2PassUniform as a}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{FloatPassUniform as n}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as l}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as s}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DDrawUniform as i}from"../views/3d/webgl-engine/core/shaderModules/Texture2DDrawUniform.js";import{Texture2DPassUniform as d}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";const f=4;function c(){const c=new s,u=c.fragment;c.include(r);const m=(f+1)/2,p=1/(2*m*m);return u.include(o),u.uniforms.add([new d("depthMap",(e=>e.depthTexture)),new i("tex",(e=>e.colorTexture)),new t("blurSize",(e=>e.blurSize)),new n("projScale",((r,o)=>{const t=e(o.camera.eye,o.camera.center);return t>5e4?Math.max(0,r.projScale-(t-5e4)):r.projScale})),new a("nearFar",((e,r)=>r.camera.nearFar))]),u.code.add(l`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture2D(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv, nearFar);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${l.float(p)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),u.code.add(l`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv, nearFar);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${l.int(f)}; r <= ${l.int(f)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      gl_FragColor = vec4(b / w_total);
    }
  `),c}const u=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:"Module"}));export{u as S,c as b};