/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import o from"../../core/Error.js";import s from"../../core/Logger.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as r}from"../../core/accessorSupport/decorators/subclass.js";import i from"./MediaElementBase.js";let n=class extends i{constructor(e){super(e),this.content=null,this.type="video"}load(){const e=this.video;if("string"==typeof e){const o=document.createElement("video");o.src=e,o.crossOrigin="anonymous",o.autoplay=!0,o.muted=!0,o.loop=!0,this.addResolvingPromise(this._loadVideo(o).then((()=>{this._set("content",o)})))}else e instanceof HTMLVideoElement?this.addResolvingPromise(this._loadVideo(e).then((()=>{this._set("content",e)}))):this.addResolvingPromise(Promise.reject(new o("video-element:invalid-video-type","Invalid video type",{video:e})));return Promise.resolve(this)}set video(e){"not-loaded"===this.loadStatus?this._set("video",e):s.getLogger(this.declaredClass).error("#video","video cannot be changed after the element is loaded.")}_loadVideo(e){return new Promise(((o,s)=>{e.oncanplay=()=>{e.oncanplay=null,e.play().then(o,s)},"anonymous"!==e.crossOrigin&&(e.crossOrigin="anonymous",e.src=e.src)}))}};e([t({readOnly:!0})],n.prototype,"content",void 0),e([t()],n.prototype,"video",null),n=e([r("esri.layers.support.VideoElement")],n);const a=n;export{a as default};