/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../../chunks/tslib.es6.js";import e from"../../../../core/Accessor.js";import"../../../../core/has.js";import{debounce as i,throwIfAborted as o,throwIfAbortError as r,eachAlways as s}from"../../../../core/promiseUtils.js";import{property as a}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as n}from"../../../../core/accessorSupport/decorators/subclass.js";import{create as p,toExtent as m}from"../../../../geometry/support/aaBoundingRect.js";import{getInfo as l}from"../../../../geometry/support/spatialReferenceUtils.js";import d from"../../../../layers/support/TileInfo.js";import{getOuterSize as h,getBBox as c}from"../../viewStateUtils.js";import{Bitmap as u}from"../../engine/Bitmap.js";import g from"../../tiling/TileInfoView.js";import f from"../../tiling/TileKey.js";const y=p(),x=[0,0],S=new f(0,0,0,0),_={container:null,fetchSource:null,requestUpdate:null,imageMaxWidth:2048,imageMaxHeight:2048,imageRotationSupported:!1,imageNormalizationSupported:!1,hidpi:!1};let w=class extends e{constructor(t){super(t),this._imagePromise=null,this.bitmaps=[],this.hidpi=_.hidpi,this.imageMaxWidth=_.imageMaxWidth,this.imageMaxHeight=_.imageMaxHeight,this.imageRotationSupported=_.imageRotationSupported,this.imageNormalizationSupported=_.imageNormalizationSupported,this.update=i((async(t,e)=>{if(o(e),!t.stationary||this.destroyed)return;const i=t.state,s=l(i.spatialReference),a=this.hidpi?t.pixelRatio:1,n=this.imageNormalizationSupported&&i.worldScreenWidth&&i.worldScreenWidth<i.size[0],p=this.imageMaxWidth??0,m=this.imageMaxHeight??0;n?(x[0]=i.worldScreenWidth,x[1]=i.size[1]):this.imageRotationSupported?(x[0]=i.size[0],x[1]=i.size[1]):h(x,i);const d=Math.floor(x[0]*a)>p||Math.floor(x[1]*a)>m,c=s&&(i.extent.xmin<s.valid[0]||i.extent.xmax>s.valid[1]),u=!this.imageNormalizationSupported&&c,g=!d&&!u,f=this.imageRotationSupported?i.rotation:0,y=this.container.children.slice();if(g){const t=n?i.paddedViewState.center:i.center;this._imagePromise&&console.error("Image promise was not defined!"),this._imagePromise=this._singleExport(i,x,t,i.resolution,f,a,e)}else{let t=Math.min(p,m);u&&(t=Math.min(i.worldScreenWidth,t)),this._imagePromise=this._tiledExport(i,t,a,e)}try{const t=await this._imagePromise??[];o(e);const i=[];if(this._imagePromise=null,this.destroyed)return;this.bitmaps=t;for(const e of y)t.includes(e)||i.push(e.fadeOut().then((()=>{e.remove(),e.destroy()})));for(const e of t)i.push(e.fadeIn());await Promise.all(i)}catch(S){this._imagePromise=null,r(S)}}),5e3),this.updateExports=i((async t=>{const e=[];for(const i of this.container.children){if(!i.visible||!i.stage)return;e.push(t(i).then((()=>{i.invalidateTexture(),i.requestRender()})))}this._imagePromise=s(e).then((()=>this._imagePromise=null)),await this._imagePromise}))}destroy(){this.bitmaps.forEach((t=>t.destroy())),this.bitmaps=[]}get updating(){return!this.destroyed&&null!==this._imagePromise}async _export(t,e,i,r,s,a){const n=await this.fetchSource(t,Math.floor(e*s),Math.floor(i*s),{rotation:r,pixelRatio:s,signal:a});o(a);const p=new u(null,{immutable:!0,requestRenderOnSourceChangedEnabled:!0});return p.x=t.xmin,p.y=t.ymax,p.resolution=t.width/e,p.rotation=r,p.pixelRatio=s,p.opacity=0,this.container.addChild(p),await p.setSourceAsync(n,a),o(a),p}async _singleExport(t,e,i,o,r,s,a){c(y,i,o,e);const n=m(y,t.spatialReference);return[await this._export(n,e[0],e[1],r,s,a)]}_tiledExport(t,e,i,o){const r=d.create({size:e,spatialReference:t.spatialReference,scales:[t.scale]}),s=new g(r),a=s.getTileCoverage(t);if(!a)return null;const n=[];return a.forEach(((r,a,p,l)=>{S.set(r,a,p,0),s.getTileBounds(y,S);const d=m(y,t.spatialReference);n.push(this._export(d,e,e,0,i,o).then((t=>(0!==l&&(S.set(r,a,p,l),s.getTileBounds(y,S),t.x=y[0],t.y=y[3]),t))))})),Promise.all(n)}};t([a()],w.prototype,"_imagePromise",void 0),t([a()],w.prototype,"bitmaps",void 0),t([a()],w.prototype,"container",void 0),t([a()],w.prototype,"fetchSource",void 0),t([a()],w.prototype,"hidpi",void 0),t([a()],w.prototype,"imageMaxWidth",void 0),t([a()],w.prototype,"imageMaxHeight",void 0),t([a()],w.prototype,"imageRotationSupported",void 0),t([a()],w.prototype,"imageNormalizationSupported",void 0),t([a()],w.prototype,"requestUpdate",void 0),t([a()],w.prototype,"updating",null),w=t([n("esri.views.2d.layers.support.ExportStrategy")],w);const v=w;export{v as default};