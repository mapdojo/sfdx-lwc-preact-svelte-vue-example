/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../core/has.js";import"../../../../core/Logger.js";import{k as t,i as e}from"../../../../chunks/vec3.js";import{SnappingDomain as i}from"../SnappingDomain.js";import{SnappingHint as s}from"./SnappingHint.js";class n extends s{constructor(t,e,s,n,r=i.ALL,a=!0,h=!0){super(n,r),this.type=t,this.lineStart=e,this.lineEnd=s,this.fadeLeft=a,this.fadeRight=h}equals(e){return e instanceof n&&(this.type===e.type&&t(this.lineStart,e.lineStart)&&t(this.lineEnd,e.lineEnd)&&this.fadeLeft===e.fadeLeft&&this.fadeRight===e.fadeRight)}get length(){return e(this.lineStart,this.lineEnd)}}export{n as LineSnappingHint};