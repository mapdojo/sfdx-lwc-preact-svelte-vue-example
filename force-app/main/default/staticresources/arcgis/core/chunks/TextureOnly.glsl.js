/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{f as e}from"./vec4f64.js";import{ScreenSpacePass as r}from"../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl.js";import{Float4PassUniform as o}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{NoParameters as s,glsl as t}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as n}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as a}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";class i extends s{constructor(){super(...arguments),this.color=e(1,1,1,1)}}function l(){const e=new n;return e.include(r),e.fragment.uniforms.add([new a("tex",(e=>e.texture)),new o("uColor",(e=>e.color))]),e.fragment.code.add(t`void main() {
vec4 texColor = texture2D(tex, uv);
gl_FragColor = texColor * uColor;
}`),e}const d=Object.freeze(Object.defineProperty({__proto__:null,TextureOnlyPassParameters:i,build:l},Symbol.toStringTag,{value:"Module"}));export{i as T,d as a,l as b};