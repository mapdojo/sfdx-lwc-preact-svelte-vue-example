/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ScreenSpacePass as e}from"../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl.js";import{NoParameters as r,glsl as o}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as a}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as t}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";class s extends r{}function n(){const r=new a;return r.include(e),r.fragment.uniforms.add([new t("colorTexture",(e=>e.colorTexture)),new t("alphaTexture",(e=>e.alphaTexture)),new t("frontFaceTexture",(e=>e.frontFaceTexture))]),r.fragment.code.add(o`void main() {
vec4 srcColor = texture2D(colorTexture, uv);
if(srcColor.a <= 1e-5){
discard;
}
float srcAlpha = texture2D(alphaTexture, uv).r;
vec4 frontFace = texture2D(frontFaceTexture, uv);
gl_FragColor = vec4(mix(srcColor.rgb/srcColor.a, frontFace.rgb, frontFace.a), 1.0 - srcAlpha);
}`),r}const c=Object.freeze(Object.defineProperty({__proto__:null,OITCompositingPassParameters:s,build:n},Symbol.toStringTag,{value:"Module"}));export{s as O,c as a,n as b};