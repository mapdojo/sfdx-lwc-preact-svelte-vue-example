/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{s}from"../../../../chunks/vec4.js";import{c as o}from"../../../../chunks/vec4f64.js";import{Float4PassUniform as r}from"../core/shaderModules/Float4PassUniform.js";import{NoParameters as e}from"../core/shaderModules/interfaces.js";class t extends e{}class c extends t{}function n(o){o.uniforms.add(new r("resolution",(o=>{const{descriptor:r}=o.colorTexture,e=r.width,t=r.height;return s(i,1/e,1/t,e,t)})))}const i=o();export{t as SMAAPassParameters,c as ValidSMAAPassParameters,n as addResolutionUniform};