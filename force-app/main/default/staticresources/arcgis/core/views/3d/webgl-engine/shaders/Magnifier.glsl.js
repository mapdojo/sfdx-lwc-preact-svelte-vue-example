/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{screenPointObjectToArray as e,createScreenPointArray as r,createRenderScreenPointArray as t}from"../../../../core/screenUtils.js";import{s as o}from"../../../../chunks/vec4.js";import{c as a}from"../../../../chunks/vec4f64.js";import{BooleanPassUniform as n}from"../core/shaderModules/BooleanPassUniform.js";import{Float4PassUniform as s}from"../core/shaderModules/Float4PassUniform.js";import{NoParameters as i,glsl as u}from"../core/shaderModules/interfaces.js";import{ShaderBuilder as m}from"../core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as l}from"../core/shaderModules/Texture2DPassUniform.js";import{VertexAttribute as d}from"../lib/VertexAttribute.js";class c{}class f extends i{constructor(){super(...arguments),this.textures=new c}}function v(){const e=new m;return e.attributes.add(d.POSITION,"vec2"),e.vertex.uniforms.add(new s("drawPosition",((e,r)=>x(e,r)))),e.varyings.add("vUV","vec2"),e.vertex.code.add(u`void main(void) {
vUV = position;
gl_Position = vec4(drawPosition.xy + vec2(position - 0.5) * drawPosition.zw, 0.0, 1.0);
}`),e.fragment.uniforms.add(new l("textureInput",(e=>e.textures.input))),e.fragment.uniforms.add(new l("textureMask",(e=>e.textures.mask))),e.fragment.uniforms.add(new l("textureOverlay",(e=>e.textures.overlay))),e.fragment.uniforms.add(new n("maskEnabled",(e=>e.magnifier.maskEnabled))),e.fragment.uniforms.add(new n("overlayEnabled",(e=>e.magnifier.overlayEnabled))),e.fragment.code.add(u`const float barrelFactor = 1.1;
vec2 barrel(vec2 uv) {
vec2 uvn = uv * 2.0 - 1.0;
if (uvn.x == 0.0 && uvn.y == 0.0) {
return vec2(0.5, 0.5);
}
float theta = atan(uvn.y, uvn.x);
float r = pow(length(uvn), barrelFactor);
return r * vec2(cos(theta), sin(theta)) * 0.5 + 0.5;
}
void main() {
float mask = maskEnabled ? texture2D(textureMask, vUV).a : 1.0;
vec4 inputColor = texture2D(textureInput, barrel(vUV)) * mask;
vec4 overlayColor = overlayEnabled ? texture2D(textureOverlay, vUV) : vec4(0);
gl_FragColor = overlayColor + (1.0 - overlayColor.a) * inputColor;
}`),e}function x(r,t){const a=t.camera.pixelRatio,n=r.magnifier.offset.x*a,s=r.magnifier.offset.y*a;e(r.magnifier.position,p);const i=t.camera.screenToRender(p,g),u=Math.ceil(a*r.magnifier.size),m=t.camera.fullWidth,l=t.camera.fullHeight;return o(h,(i[0]+n)/m*2-1,(i[1]-s)/l*2-1,u/m*2,u/l*2)}const p=r(),g=t(),h=a();export{f as MagnifierPassParameters,c as TextureResources,v as build};