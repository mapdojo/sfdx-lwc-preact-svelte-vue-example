/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../core/has.js";import"../../../../core/Logger.js";import{k as e}from"../../../../chunks/vec3.js";import{SnappingDomain as t}from"../SnappingDomain.js";import{SnappingHint as r}from"./SnappingHint.js";class s extends r{constructor(e,r,s,i,o=t.ALL){super(i,o),this.previousVertex=e,this.centerVertex=r,this.nextVertex=s}equals(t){return t instanceof s&&(e(this.previousVertex,t.previousVertex)&&e(this.centerVertex,t.centerVertex)&&e(this.nextVertex,t.nextVertex))}}export{s as RightAngleSnappingHint};