/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e,isNone as t,disposeMaybe as r}from"../../../../core/maybe.js";import i from"../../../../core/PerformanceSampler.js";import{Milliseconds as o}from"../../../../core/time.js";import{once as a}from"../../../../core/accessorSupport/utils.js";import{createElapsedTimerPool as s}from"../../../webgl/TimerPool.js";var m;!function(e){e.OVERLAY="overlay",e.PREPARE="prepare",e.SHADOW_MAP="shadow map",e.LINEAR_DEPTH="linear depth",e.ACCUMULATED_SHADOWS="accumulated shadows",e.NORMALS="normals",e.OBJECT_AND_LAYER_ID_COLOR="object/layer id color",e.SSAO="SSAO",e.OPAQUE="opaque",e.OPAQUE_EDGES="opaque edges",e.VOXEL="voxel",e.TRANSPARENT="transparent",e.TRANSPARENT_EDGES="transparent edges",e.HUD_VISIBILITY="HUD visibility",e.TRANSPARENT_TERRAIN="transparent terrain",e.ENVIRONMENT="environment",e.LASER_LINE="laser line",e.OCCLUDED="occluded",e.ANTIALIASING="antialiasing",e.HIGHLIGHTS="highlights",e.HUD="HUD",e.HUD_OCCLUDED="HUD occluded",e.FINISH="finish"}(m||(m={}));const l="Total";class p{constructor(e){this._rctx=e,this._startTimeStampCPU=o(0),this._lastTimeStampCPU=o(0),this._totalCPUTime=new i(l),this._cpuTimeSamplers=new Map(Object.values(m).map((e=>[e,new i(e)]))),this._enableGPUTimer=0,this._totalGPUTime=new i("GPU"),this._gpuTimeSamplers=new Map(Object.values(m).map((e=>[e,new i(e)]))),this._totalTime=o(0),this._totalFrameCount=0}get totalCPUTimeSampler(){return this._totalCPUTime}get cpuTimeSamplers(){return Array.from(this._cpuTimeSamplers.values())}get totalGPUTimeSampler(){return this._totalGPUTime}get gpuTimeSamplers(){return Array.from(this._gpuTimeSamplers.values())}get gpuSamplingEnabled(){return e(this._gpuTimerPool)}get totalTime(){return this._totalTime}get totalFrameCount(){return this._totalFrameCount}get elapsedTime(){return o(performance.now()-this._startTimeStampCPU)}enableGPUPerformanceInfo(){if(t(this._gpuTimerPool)){const e=[...Object.values(m),l];this._gpuTimerPool=s(this._rctx,e)}return t(this._gpuTimerPool)?{hasGPUTimerSupport:!1,remove:()=>{}}:(++this._enableGPUTimer,{hasGPUTimerSupport:!0,remove:a((()=>{--this._enableGPUTimer,0===this._enableGPUTimer&&(this._gpuTimerPool=r(this._gpuTimerPool))}))})}startFrame(){this._startTimeStampCPU=this._lastTimeStampCPU=o(performance.now()),e(this._gpuTimerPool)&&this._gpuTimerPool.start()}advance(t){const r=o(performance.now());if(this._cpuTimeSamplers.get(t).record(r-this._lastTimeStampCPU),this._lastTimeStampCPU=r,e(this._gpuTimerPool)){const e=this._gpuTimerPool.stop(t);this._gpuTimeSamplers.get(t).record(e),this._gpuTimerPool.start()}}finishFrame(){if(e(this._gpuTimerPool)){const e=this._gpuTimerPool.stop(m.FINISH);this._gpuTimeSamplers.get(m.FINISH).record(e)}const t=o(performance.now()-this._startTimeStampCPU);this._totalTime=o(this._totalTime+t),this._totalCPUTime.record(t),e(this._gpuTimerPool)&&this._totalGPUTime.record(this.gpuTimeSamplers.reduce(((e,t)=>e+(t.last||0)),0)),++this._totalFrameCount}}export{m as PerformanceCategory,p as RendererPerformanceInfo};