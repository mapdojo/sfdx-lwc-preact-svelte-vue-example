/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isUint32Array as e}from"../../../../../core/typedArrayUtil.js";import{WorkerHandle as t}from"../../../../../core/workers/WorkerHandle.js";import{unpackInterleavedBuffer as r}from"../../../support/buffer/workerHelper.js";import{extract as s}from"./edgeProcessing.js";class n extends t{constructor(e){super("EdgeProcessingWorker","extract",{extract:e=>[e.dataBuffer],extractComponentsEdgeLocations:e=>[e.dataBuffer],extractEdgeLocations:e=>[e.dataBuffer]},e)}async process(e,t,r){if(r)return s(e);const n=await this.invoke(new a(e),t);return this._unpackOutput(n)}async extractEdgeLocations(e,t){const s=await this.invokeMethod("extractEdgeLocations",new a(e),t);return r(s)}async extractComponentsEdgeLocations(e,t){const s=await this.invokeMethod("extractComponentsEdgeLocations",new a(e),t);return r(s)}_unpackOutput(e){return{regular:{instancesData:r(e.regular.instancesData),lodInfo:{lengths:new Float32Array(e.regular.lodInfo.lengths)}},silhouette:{instancesData:r(e.silhouette.instancesData),lodInfo:{lengths:new Float32Array(e.silhouette.lodInfo.lengths)}},averageEdgeLength:e.averageEdgeLength}}}class a{constructor(t){this.dataBuffer=t.data.buffer,this.writerSettings=t.writerSettings,this.skipDeduplicate=t.skipDeduplicate,this.indices=Array.isArray(t.indices)?t.indices:t.indices.buffer,this.indicesType=Array.isArray(t.indices)?"Array":e(t.indices)?"Uint32Array":"Uint16Array",this.indicesLength=t.indicesLength}}export{n as EdgeWorkerHandle,a as PackedInput};