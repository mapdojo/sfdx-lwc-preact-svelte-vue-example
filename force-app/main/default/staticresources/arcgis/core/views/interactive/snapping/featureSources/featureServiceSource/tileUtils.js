/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{s}from"../../../../../chunks/vec3.js";import{c as n}from"../../../../../chunks/vec4f64.js";import{a as o,g as r,h as t}from"../../../../../chunks/boundedPlane.js";function c(n,o){return r(o.extent,e),t(e,s(a,n.x,n.y,0))}const e=o(),a=n();export{c as distanceToTile};