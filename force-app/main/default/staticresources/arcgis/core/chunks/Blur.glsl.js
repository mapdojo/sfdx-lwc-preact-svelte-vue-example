/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{glsl as e}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as o}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as t}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{VertexAttribute as s}from"../views/3d/webgl-engine/lib/VertexAttribute.js";import{addResolutionUniform as r}from"../views/3d/webgl-engine/shaders/SMAAPassParameters.js";function a(){const a=new o,{attributes:f,varyings:i,vertex:u,fragment:d}=a;return f.add(s.POSITION,"vec2"),i.add("uv","vec2"),i.add("offsets[2]","vec4"),r(u),u.code.add(e`void main() {
uv = position * 0.5 + vec2(0.5);
gl_Position = vec4(position, 0, 1);
offsets[0] = uv.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 );
offsets[1] = uv.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 );
}`),d.uniforms.add(new t("blendWeightsTexture",(e=>e.blend.colorTexture))),d.uniforms.add(new t("colorTexture",(e=>e.colorTexture))),r(d),d.code.add(e`void main() {
vec4 a;
a.rb = texture2D(blendWeightsTexture, uv).rb;
a.g = texture2D(blendWeightsTexture, offsets[1].zw).g;
a.a = texture2D(blendWeightsTexture, offsets[1].xy).a;
if ( dot(a, vec4(1.0)) < 1e-5 ) {
gl_FragColor = texture2D( colorTexture, uv, 0.0 );
} else {
vec2 offset;
offset.x = a.a > a.b ? a.a : -a.b;
offset.y = a.g > a.r ? -a.g : a.r;
if ( abs( offset.x ) > abs( offset.y )) {
offset.y = 0.0;
} else {
offset.x = 0.0;
}
vec4 C = texture2D( colorTexture, uv, 0.0 );
vec4 Cop = texture2D( colorTexture, uv + sign( offset ) * resolution.xy, 0.0 );
float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );
gl_FragColor = mix(C, Cop, s);
}
}`),a}const f=Object.freeze(Object.defineProperty({__proto__:null,build:a},Symbol.toStringTag,{value:"Module"}));export{f as B,a as b};