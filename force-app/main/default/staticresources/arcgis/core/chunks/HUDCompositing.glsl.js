/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ScreenSpacePass as e}from"../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl.js";import{NoParameters as r,glsl as s}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as o}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as n}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";class t extends r{}function a(){const r=new o;return r.include(e),r.fragment.uniforms.add(new n("tex",(e=>e.texture))),r.fragment.code.add(s`void main() {
gl_FragColor = vec4(1.0 - texture2D(tex, uv).a);
}`),r}const i=Object.freeze(Object.defineProperty({__proto__:null,HUDCompositingPassParameters:t,build:a},Symbol.toStringTag,{value:"Module"}));export{t as H,i as a,a as b};