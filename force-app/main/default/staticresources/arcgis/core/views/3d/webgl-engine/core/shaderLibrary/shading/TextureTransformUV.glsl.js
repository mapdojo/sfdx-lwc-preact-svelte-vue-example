/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as r}from"../../../../../../core/maybe.js";import{c as e}from"../../../../../../chunks/mat3f32.js";import{glsl as o}from"../../shaderModules/interfaces.js";import{Matrix3PassUniform as a}from"../../shaderModules/Matrix3PassUniform.js";function s(s){s.vertex.uniforms.add(new a("colorTextureTransformMatrix",(o=>r(o.colorTextureTransformMatrix)?o.colorTextureTransformMatrix:e()))),s.varyings.add("colorUV","vec2"),s.vertex.code.add(o`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function i(s){s.vertex.uniforms.add(new a("normalTextureTransformMatrix",(o=>r(o.normalTextureTransformMatrix)?o.normalTextureTransformMatrix:e()))),s.varyings.add("normalUV","vec2"),s.vertex.code.add(o`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function t(s){s.vertex.uniforms.add(new a("emissiveTextureTransformMatrix",(o=>r(o.emissiveTextureTransformMatrix)?o.emissiveTextureTransformMatrix:e()))),s.varyings.add("emissiveUV","vec2"),s.vertex.code.add(o`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function n(s){s.vertex.uniforms.add(new a("occlusionTextureTransformMatrix",(o=>r(o.occlusionTextureTransformMatrix)?o.occlusionTextureTransformMatrix:e()))),s.varyings.add("occlusionUV","vec2"),s.vertex.code.add(o`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}function x(s){s.vertex.uniforms.add(new a("metallicRoughnessTextureTransformMatrix",(o=>r(o.metallicRoughnessTextureTransformMatrix)?o.metallicRoughnessTextureTransformMatrix:e()))),s.varyings.add("metallicRoughnessUV","vec2"),s.vertex.code.add(o`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)}export{s as colorTextureUV,t as emissiveTextureUV,x as metallicRoughnessTextureUV,i as normalTextureUV,n as occlusionTextureUV};