/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Material as r}from"../lib/Material.js";import{intersectTriangleGeometry as t}from"./internal/MaterialUtil.js";class e extends r{intersect(r,e,i,a,l,o){return t(r,i,a,l,void 0,o)}}export{e as TriangleMaterial};