/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as s,isSome as t}from"../../../../core/maybe.js";import{f as o,c as a}from"../../../../chunks/mat3f32.js";import{Z as r,O as f}from"../../../../chunks/vec2f32.js";import{m as n}from"../../../../chunks/mat3.js";function c(c){if(s(c))return null;const m=t(c.offset)?c.offset:r,e=t(c.rotation)?c.rotation:0,i=t(c.scale)?c.scale:f,h=o(1,0,0,0,1,0,m[0],m[1],1),u=o(Math.cos(e),-Math.sin(e),0,Math.sin(e),Math.cos(e),0,0,0,1),p=o(i[0],0,0,0,i[1],0,0,0,1),j=a();return n(j,u,p),n(j,h,j),j}export{c as getTransformMatrix};