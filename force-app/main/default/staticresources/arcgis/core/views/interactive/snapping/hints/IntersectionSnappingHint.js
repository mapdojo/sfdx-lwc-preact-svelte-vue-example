/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{k as n}from"../../../../chunks/vec3.js";import{SnappingDomain as t}from"../SnappingDomain.js";import{SnappingHint as i}from"./SnappingHint.js";class o extends i{constructor(n,i,o=t.ALL){super(i,o),this.intersectionPoint=n}equals(t){return t instanceof o&&n(this.intersectionPoint,t.intersectionPoint)}}export{o as IntersectionSnappingHint};