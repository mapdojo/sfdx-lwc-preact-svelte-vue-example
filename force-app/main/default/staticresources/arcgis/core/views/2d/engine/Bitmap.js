/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as t,applySome as e}from"../../../core/maybe.js";import{createResolver as s,onAbortOrThrow as i,throwIfNotAbortError as r}from"../../../core/promiseUtils.js";import{g as h,h as o,r as u,k as a,m as n}from"../../../chunks/mat3.js";import{c as d}from"../../../chunks/mat3f32.js";import{f as l}from"../../../chunks/vec2f32.js";import{DisplayObject as c}from"./DisplayObject.js";import _ from"./ImageryBitmapSource.js";import{ContextType as m}from"../../webgl/context-util.js";import{TextureType as p,PixelFormat as g,SizedPixelFormat as x,PixelType as f,TextureWrapMode as b}from"../../webgl/enums.js";import{Texture as w}from"../../webgl/Texture.js";function T(t){return t&&"render"in t}function S(t){const e=document.createElement("canvas");return e.width=t.width,e.height=t.height,t.render(e.getContext("2d")),e}function v(t){return T(t)?t instanceof _?e(t.getRenderedRasterPixels(),(t=>t.renderedRasterPixels)):S(t):t}class R extends c{constructor(t=null,e){super(),this.blendFunction="standard",this._sourceWidth=0,this._sourceHeight=0,this._textureInvalidated=!1,this._texture=null,this.stencilRef=0,this.coordScale=[1,1],this._height=void 0,this.pixelRatio=1,this.resolution=0,this.rotation=0,this._source=null,this._width=void 0,this.x=0,this.y=0,this.immutable=e.immutable??!1,this.requestRenderOnSourceChangedEnabled=e.requestRenderOnSourceChangedEnabled??!0,this.source=t,this.requestRender=this.requestRender.bind(this)}destroy(){this._texture&&(this._texture.dispose(),this._texture=null),t(this._uploadStatus)&&(this._uploadStatus.controller.abort(),this._uploadStatus=null)}get isSourceScaled(){return this.width!==this._sourceWidth||this.height!==this._sourceHeight}get height(){return void 0!==this._height?this._height:this._sourceHeight}set height(t){this._height=t}get source(){return this._source}set source(t){null==t&&null==this._source||(this._source=t,this._source instanceof HTMLImageElement?(this._sourceHeight=this._source.naturalHeight,this._sourceWidth=this._source.naturalWidth):this._source&&(this._sourceHeight=this._source.height,this._sourceWidth=this._source.width),this.invalidateTexture())}get width(){return void 0!==this._width?this._width:this._sourceWidth}set width(t){this._width=t}beforeRender(t){super.beforeRender(t),this.updateTexture(t)}async setSourceAsync(e,r){t(this._uploadStatus)&&this._uploadStatus.controller.abort();const h=new AbortController,o=s();return i(r,(()=>h.abort())),i(h,(t=>o.reject(t))),this._uploadStatus={controller:h,resolver:o},this.source=e,o.promise}invalidateTexture(){this._textureInvalidated||(this._textureInvalidated=!0,this.requestRenderOnSourceChangedEnabled&&this.requestRender())}updateTransitionProperties(t,e){t>=64&&(this.fadeTransitionEnabled=!1,this.inFadeTransition=!1),super.updateTransitionProperties(t,e)}setTransform(t){const e=h(this.transforms.dvs),[s,i]=t.toScreenNoRotation([0,0],[this.x,this.y]),r=this.resolution/this.pixelRatio/t.resolution,d=r*this.width,c=r*this.height,_=Math.PI*this.rotation/180;o(e,e,l(s,i)),o(e,e,l(d/2,c/2)),u(e,e,-_),o(e,e,l(-d/2,-c/2)),a(e,e,l(d,c)),n(this.transforms.dvs,t.displayViewMat3,e)}setSamplingProfile(t){this._texture&&(t.mips&&!this._texture.descriptor.hasMipmap&&this._texture.generateMipmap(),this._texture.setSamplingMode(t.samplingMode))}bind(t,e){this._texture&&t.bindTexture(this._texture,e)}async updateTexture({context:e,painter:s}){if(!this._textureInvalidated)return;if(this._textureInvalidated=!1,this._texture||(this._texture=this._createTexture(e)),!this.source)return void this._texture.setData(null);this._texture.resize(this._sourceWidth,this._sourceHeight);const i=v(this.source);try{if(t(this._uploadStatus)){const{controller:t,resolver:e}=this._uploadStatus,r={signal:t.signal},{width:h,height:o}=this,u=this._texture,a=s.textureUploadManager;await a.enqueueTextureUpdate({data:i,texture:u,width:h,height:o},r),e.resolve(),this._uploadStatus=null}else this._texture.setData(i);this.ready()}catch(h){r(h)}}onDetach(){this.destroy()}_createTransforms(){return{dvs:d()}}_createTexture(t){const e=this.immutable&&t.type===m.WEBGL2;return new w(t,{target:p.TEXTURE_2D,pixelFormat:g.RGBA,internalFormat:e?x.RGBA8:g.RGBA,dataType:f.UNSIGNED_BYTE,wrapMode:b.CLAMP_TO_EDGE,isImmutable:e,width:this._sourceWidth,height:this._sourceHeight})}}export{R as Bitmap,T as isImageSource,S as rasterize};