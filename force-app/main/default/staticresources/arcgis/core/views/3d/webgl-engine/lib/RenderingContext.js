/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{RenderingContext as e}from"../../../webgl/RenderingContext.js";class t extends e{constructor(e,t,r){super(e,t),this.newCache=r,this._refCount=1}destroy(){--this._refCount>0||this.dispose()}ref(){++this._refCount}bindTechnique(e,t,r,s){return this.useProgram(e.program),e.bindPipelineState(this,r?.slot,!!s),e.program.bindPass(t,r),e.program}get test(){return this.programCache.test}}export{t as RenderingContext};