/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{neverReached as e}from"../../../../../../core/compilerUtils.js";import{glsl as r}from"../../shaderModules/interfaces.js";import{VertexAttribute as t}from"../../../lib/VertexAttribute.js";var d;function o(o,v){switch(v.textureCoordinateType){case d.Default:return o.attributes.add(t.UV0,"vec2"),o.varyings.add("vuv0","vec2"),void o.vertex.code.add(r`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case d.Compressed:return o.attributes.add(t.UV0,"vec2"),o.varyings.add("vuv0","vec2"),void o.vertex.code.add(r`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case d.Atlas:return o.attributes.add(t.UV0,"vec2"),o.varyings.add("vuv0","vec2"),o.attributes.add(t.UVREGION,"vec4"),o.varyings.add("vuvRegion","vec4"),void o.vertex.code.add(r`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:e(v.textureCoordinateType);case d.None:return void o.vertex.code.add(r`void forwardTextureCoordinates() {}`);case d.COUNT:return}}!function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Atlas=2]="Atlas",e[e.Compressed=3]="Compressed",e[e.COUNT=4]="COUNT"}(d||(d={}));export{o as TextureCoordinateAttribute,d as TextureCoordinateAttributeType};