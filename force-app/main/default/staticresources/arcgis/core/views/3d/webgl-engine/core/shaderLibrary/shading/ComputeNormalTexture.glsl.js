/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{TextureCoordinateAttributeType as e}from"../attributes/TextureCoordinateAttribute.glsl.js";import{VertexTextureCoordinates as t}from"../attributes/VertexTextureCoordinates.glsl.js";import{NormalsDoubleSidedMode as n}from"./Normals.glsl.js";import{textureSize as r}from"../util/WebGL2Utils.js";import{glsl as a}from"../../shaderModules/interfaces.js";import{createTexture2DDrawSizeUniforms as o}from"../../shaderModules/Texture2DDrawUniform.js";import{createTexture2DPassSizeUniforms as s}from"../../shaderModules/Texture2DPassUniform.js";import{TextureSizeUniformType as d}from"../../shaderModules/TextureSizeUniformType.js";import{BindType as m}from"../../shaderTechnique/BindType.js";import{VertexAttribute as i}from"../../../lib/VertexAttribute.js";function c(c,u){const l=c.fragment;if(u.hasVertexTangents?(c.attributes.add(i.TANGENT,"vec4"),c.varyings.add("vTangent","vec4"),u.doubleSidedMode===n.WindingOrder?l.code.add(a`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):l.code.add(a`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):(c.extensions.add("GL_OES_standard_derivatives"),l.code.add(a`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`)),u.textureCoordinateType!==e.None){c.include(t,u);const e=u.supportsTextureAtlas?u.hasWebGL2Context?d.None:d.Size:d.None;l.uniforms.add(u.pbrTextureBindType===m.Pass?s("normalTexture",(e=>e.textureNormal),e):o("normalTexture",(e=>e.textureNormal),e)),l.code.add(a`
    vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
      vtc.uv = uv;
      ${u.supportsTextureAtlas?a`vtc.size = ${r(u,"normalTexture")};`:""}
      vec3 rawNormal = textureLookup(normalTexture, vtc).rgb * 2.0 - 1.0;
      return tangentSpace * rawNormal;
    }
  `)}}export{c as ComputeNormalTexture};