/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ShaderOutput as e}from"../ShaderOutput.js";import{TextureCoordinateAttributeType as r}from"../attributes/TextureCoordinateAttribute.glsl.js";import{VertexTextureCoordinates as t}from"../attributes/VertexTextureCoordinates.glsl.js";import{TextureAtlasLookup as o}from"../util/TextureAtlasLookup.glsl.js";import{textureSize as u}from"../util/WebGL2Utils.js";import{glsl as s}from"../../shaderModules/interfaces.js";import{createTexture2DDrawSizeUniforms as a}from"../../shaderModules/Texture2DDrawUniform.js";import{TextureSizeUniformType as i}from"../../shaderModules/TextureSizeUniformType.js";import{AlphaDiscardMode as l}from"../../../lib/basicInterfaces.js";function d(d,m){const n=d.fragment;if(m.hasBaseColorTexture&&(m.output===e.Color||m.alphaDiscardMode!==l.Opaque)){d.include(t,m);const e=m.textureCoordinateType===r.Atlas;n.uniforms.add(a("baseColorTexture",(e=>e.texture),e?m.hasWebGL2Context?i.None:i.Size:i.None)),e?(d.include(o),n.code.add(s`
        vec4 readBaseColorTexture() {
          vec2 textureSize = ${u(m,"baseColorTexture")};
          return textureAtlasLookup(baseColorTexture, textureSize, vuv0, vuvRegion);
        }
      `)):n.code.add(s`vec4 readBaseColorTexture() {
return texture2D(baseColorTexture, vuv0);
}`)}else n.code.add(s`vec4 readBaseColorTexture() { return vec4(1.0); }`)}export{d as ReadBaseColorTexture};