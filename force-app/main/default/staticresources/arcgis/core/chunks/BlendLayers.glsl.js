/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{BackgroundGrid as e}from"../views/3d/webgl-engine/core/shaderLibrary/terrain/BackgroundGrid.glsl.js";import{BlendLayersOutput as r,TileBackground as o}from"../views/3d/webgl-engine/core/shaderLibrary/terrain/TileBackground.glsl.js";import{TileComposite as n}from"../views/3d/webgl-engine/core/shaderLibrary/terrain/TileComposite.glsl.js";import{Float3PassUniform as i}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{FloatPassUniform as a}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as d}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as s}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as t}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";var l;function g(g){const u=new s;if(u.include(n),g.background===l.Only){const o=g.output===r.ColorComposite;return o?u.fragment.uniforms.add(new i("backgroundColor",(e=>e.backgroundColor))):(u.extensions.add("GL_OES_standard_derivatives"),u.fragment.include(e)),u.fragment.code.add(d`
    void main() {
      gl_FragColor = vec4(${o?d`backgroundColor`:d`gridColor(uv)`}, 1.0);
    }
  `),u}return u.include(o,g),u.fragment.uniforms.add(new t("tex",(e=>e.texture))),u.fragment.uniforms.add(new a("opacity",(e=>e.opacity))),u.fragment.code.add(d`void main() {
vec4 bgColor = getBackground(uv);
gl_FragColor = blendLayers(bgColor, texture2D(tex, uv), opacity);
}`),u}!function(e){e[e.BelowLayer=0]="BelowLayer",e[e.Only=1]="Only",e[e.COUNT=2]="COUNT"}(l||(l={}));const u=Object.freeze(Object.defineProperty({__proto__:null,get BackgroundMode(){return l},build:g},Symbol.toStringTag,{value:"Module"}));export{u as B,l as a,g as b};