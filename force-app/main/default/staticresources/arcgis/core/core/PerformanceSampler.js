/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as s}from"./maybe.js";class e{constructor(s,e=30){this.name=s,this._counter=0,this._samples=new Array(e)}record(e){s(e)&&(this._samples[++this._counter%this._samples.length]=e)}get median(){return this._samples.slice().sort(((s,e)=>s-e))[Math.floor(this._samples.length/2)]}get average(){return this._samples.reduce(((s,e)=>s+e),0)/this._samples.length}get last(){return this._samples[this._counter%this._samples.length]}}export{e as default};