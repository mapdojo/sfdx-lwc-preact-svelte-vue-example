/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{EncodingType as r}from"./enums.js";import{VTLMaterial as e}from"./VTLMaterial.js";import{DataType as c}from"../../../../webgl/enums.js";import{VertexElementDescriptor as o}from"../../../../webgl/VertexElementDescriptor.js";class t extends e{constructor(r){super(r)}geometryInfo(){return t.GEOMETRY_LAYOUT}opacityInfo(){return null}attributes(){return t.ATTRIBUTES}attributesInfo(){return t.ATTRIBUTES_INFO}}t.ATTRIBUTES=["circle-radius","circle-color","circle-opacity","circle-stroke-width","circle-stroke-color","circle-stroke-opacity","circle-blur"],t.GEOMETRY_LAYOUT=[new o("a_pos",2,c.SHORT,0,4)],t.ATTRIBUTES_INFO={"circle-radius":{name:"radius",type:r.R8_UNSIGNED},"circle-color":{name:"color",type:r.R8G8B8A8_COLOR},"circle-opacity":{name:"opacity",type:r.R8_UNSIGNED,precisionFactor:100},"circle-stroke-width":{name:"stroke_width",type:r.R8_UNSIGNED,precisionFactor:4},"circle-stroke-color":{name:"stroke_color",type:r.R8G8B8A8_COLOR},"circle-stroke-opacity":{name:"stroke_opacity",type:r.R8_UNSIGNED,precisionFactor:100},"circle-blur":{name:"blur",type:r.R8_UNSIGNED,precisionFactor:32}};export{t as VTLCircleMaterial};