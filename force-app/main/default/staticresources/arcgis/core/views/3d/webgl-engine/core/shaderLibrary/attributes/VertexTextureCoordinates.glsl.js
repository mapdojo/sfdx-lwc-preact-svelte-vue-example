/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{neverReached as e}from"../../../../../../core/compilerUtils.js";import{TextureCoordinateAttribute as t,TextureCoordinateAttributeType as r}from"./TextureCoordinateAttribute.glsl.js";import{TextureAtlasLookup as o}from"../util/TextureAtlasLookup.glsl.js";import{glsl as u}from"../../shaderModules/interfaces.js";function a(a,s){switch(a.include(t,s),a.fragment.code.add(u`
  struct TextureLookupParameter {
    vec2 uv;
    ${s.supportsTextureAtlas?"vec2 size;":""}
  } vtc;
  `),s.textureCoordinateType){case r.Default:case r.Compressed:return void a.fragment.code.add(u`vec4 textureLookup(sampler2D texture, TextureLookupParameter params) {
return texture2D(texture, params.uv);
}`);case r.Atlas:return a.include(o),void a.fragment.code.add(u`vec4 textureLookup(sampler2D texture, TextureLookupParameter params) {
return textureAtlasLookup(texture, params.size, params.uv, vuvRegion);
}`);default:e(s.textureCoordinateType);case r.None:case r.COUNT:return}}export{a as VertexTextureCoordinates};