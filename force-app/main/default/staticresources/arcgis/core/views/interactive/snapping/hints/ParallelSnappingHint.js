/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../core/has.js";import"../../../../core/Logger.js";import{k as t}from"../../../../chunks/vec3.js";import{SnappingDomain as n}from"../SnappingDomain.js";import{SnappingHint as i}from"./SnappingHint.js";class r extends i{constructor(t,i,r,s=n.ALL){super(r,s),this.lineStart=t,this.lineEnd=i}equals(n){return n instanceof r&&(t(this.lineStart,n.lineStart)&&t(this.lineEnd,n.lineEnd))}}export{r as ParallelSnappingHint};