/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{f as s}from"../../../chunks/vec4f64.js";class t{constructor(){this._scales=s(-1,-1,-1,-1),this._offsets=s(-1,-1,-1,-1)}clear(){this._scales[0]=this._scales[1]=this._scales[2]=this._scales[3]=-1,this._offsets[0]=this._offsets[1]=this._offsets[2]=this._offsets[3]=-1}setScale(s,t,e){this._scales[2*s]=t,this._scales[2*s+1]=e}setOffset(s,t,e){this._offsets[2*s]=t,this._offsets[2*s+1]=e}get scales(){return this._scales}get offsets(){return this._offsets}}export{t as default};