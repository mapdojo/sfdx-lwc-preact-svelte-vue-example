/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{addProjViewLocalOrigin as e}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float4PassUniform as r}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as d}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as o}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as i}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{VertexAttribute as a}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function t(t){const g=new i;g.extensions.add("GL_OES_standard_derivatives");const{vertex:l,fragment:s,attributes:n,varyings:c}=g;return e(l,t),n.add(a.POSITION,"vec3"),n.add(a.UV0,"vec2"),c.add("vUV","vec2"),l.code.add(o`void main(void) {
vUV = uv0;
gl_Position = proj * view * vec4(position, 1.0);
}`),s.uniforms.add([new r("backgroundColor",(e=>e.backgroundColor)),new r("gridColor",(e=>e.gridColor)),new d("gridWidth",(e=>e.gridWidth))]),s.code.add(o`void main() {
const float LINE_WIDTH = 1.0;
vec2 uvScaled = vUV * gridWidth;
vec2 gridUV = (fract(uvScaled + 0.5) - 0.5) / (LINE_WIDTH * fwidth(uvScaled));
vec2 grid = (1.0 - step(0.5, gridUV)) * step(-0.5, gridUV);
grid.x *= step(0.5, uvScaled.x) * step(uvScaled.x, gridWidth - 0.5);
grid.y *= step(0.5, uvScaled.y) * step(uvScaled.y, gridWidth - 0.5);
float gridFade = max(grid.x, grid.y);
float gridAlpha = gridColor.a * gridFade;
gl_FragColor =
vec4(backgroundColor.rgb * backgroundColor.a, backgroundColor.a) * (1.0 - gridAlpha) +
vec4(gridColor.rgb, 1.0) * gridAlpha;
}`),g}const g=Object.freeze(Object.defineProperty({__proto__:null,build:t},Symbol.toStringTag,{value:"Module"}));export{g as S,t as b};