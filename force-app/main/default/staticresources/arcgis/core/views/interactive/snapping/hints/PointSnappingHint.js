/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{k as t}from"../../../../chunks/vec3.js";import{SnappingHint as s}from"./SnappingHint.js";class n extends s{constructor(t,s,n){super(s,n),this.point=t}equals(s){return s instanceof n&&t(this.point,s.point)}}export{n as PointSnappingHint};