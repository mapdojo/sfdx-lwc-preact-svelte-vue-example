/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ScreenSpacePass as e}from"../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl.js";import{FloatPassUniform as r}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{NoParameters as o,glsl as s}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as t}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as a}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";class i extends o{constructor(){super(...arguments),this.opacity=1}}function n(o){const i=new t;return i.include(e),i.fragment.uniforms.add(new a("tex",(e=>e.texture))),o.hasOpacityFactor&&i.fragment.uniforms.add(new r("opacity",(e=>e.opacity))),i.fragment.code.add(s`
    void main() {
      gl_FragColor = texture2D(tex, uv) ${o.hasOpacityFactor?"* opacity":""};
    }`),i}const d=Object.freeze(Object.defineProperty({__proto__:null,CompositingPassParameters:i,build:n},Symbol.toStringTag,{value:"Module"}));export{i as C,d as a,n as b};