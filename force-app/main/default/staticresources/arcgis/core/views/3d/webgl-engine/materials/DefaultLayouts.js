/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{newLayout as O}from"../../support/buffer/InterleavedLayout.js";import{VertexAttribute as e}from"../lib/VertexAttribute.js";const I=O().vec3f(e.POSITION),c=O().vec3f(e.POSITION).vec2f(e.UV0),v=O().vec3f(e.POSITION).vec4u8(e.COLOR),f=O().vec3f(e.POSITION).vec4u8(e.OBJECTANDLAYERIDCOLOR),t=O().vec3f(e.POSITION).vec2f(e.UV0).vec4u8(e.OBJECTANDLAYERIDCOLOR),r=O().vec3f(e.POSITION).vec4u8(e.COLOR).vec4u8(e.OBJECTANDLAYERIDCOLOR);export{v as PositionColorLayout,r as PositionColorLayoutObjectAndLayerId,I as PositionLayout,f as PositionLayoutObjectAndLayerId,c as PositionUVLayout,t as PositionUVLayoutObjectAndLayerId};