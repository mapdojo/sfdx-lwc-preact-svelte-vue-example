/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import{isNone as a}from"../../../core/maybe.js";import{debounce as t}from"../../../core/promiseUtils.js";import{when as i}from"../../../core/reactiveUtils.js";import"../../../core/Logger.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import"../../../core/Error.js";import"../../../core/has.js";import{subclass as r}from"../../../core/accessorSupport/decorators/subclass.js";import s from"./DynamicLayerView3D.js";import o from"../../layers/ImageryLayerView.js";let n=class extends(o(s)){constructor(){super(...arguments),this.type="imagery-3d",this.redrawDebounced=t((async e=>{this.redraw(((e,a)=>this._redrawImage(e,a)),e)}),2e3)}initialize(){this.handles.add([i((()=>this.view.basemapTerrain.ready),(()=>this._initializeMaximumDataResolution()),{once:!0,initial:!0}),this.layer.on("redraw",(()=>this.updatingHandles.addPromise(this.redrawDebounced())))]),this.updatingHandles.add((()=>this.layer?.exportImageServiceParameters?.version),(()=>{this.updatingHandles.addPromise(this.refreshDebounced())})),this.updatingHandles.add((()=>this.layer?.renderer),(()=>{this.updatingHandles.addPromise(this.refreshDebounced())})),this.updatingHandles.add((()=>this.timeExtent),(()=>this.updatingHandles.addPromise(this.refreshDebounced())))}_initializeMaximumDataResolution(){this.maximumDataResolution=this.layer.loaded?this.layer.serviceRasterInfo.pixelSize:null}getFetchOptions(){return{timeExtent:this.timeExtent}}async processResult(e,a,t){a.imageOrCanvasElement?e.image=a.imageOrCanvasElement:(e.image=document.createElement("canvas"),e.pixelData=a.pixelData,await this._redrawImage(e,t))}async _redrawImage(e,t){if(!(e.image instanceof HTMLCanvasElement)||a(e.pixelData))throw new Error;const i=e.image,r=i.getContext("2d"),s=await this.layer.applyRenderer(e.pixelData,{signal:t}),o=this.layer.applyFilter(s).pixelBlock;if(a(o))throw new Error;i.width=o.width,i.height=o.height;const n=r.createImageData(o.width,o.height);n.data.set(o.getAsRGBA()),r.putImageData(n,0,0)}};n=e([r("esri.views.3d.layers.ImageryLayerView3D")],n);const d=n;export{d as default};