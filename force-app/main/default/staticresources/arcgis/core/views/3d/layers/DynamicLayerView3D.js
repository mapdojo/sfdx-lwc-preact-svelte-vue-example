/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import{forEach as t,result as i}from"../../../core/asyncUtils.js";import{makeHandle as r}from"../../../core/handleUtils.js";import a from"../../../core/Logger.js";import{isNone as s,abortMaybe as n,isSome as o}from"../../../core/maybe.js";import{debounce as l,isAbortError as h,eachAlways as m,onAbort as d,isAborted as c,createAbortError as g,throwIfAborted as u}from"../../../core/promiseUtils.js";import{whenOnce as p}from"../../../core/reactiveUtils.js";import{property as f}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as y}from"../../../core/accessorSupport/decorators/subclass.js";import _ from"../../../geometry/Extent.js";import{equals as w,create as x,width as R,height as v,copy as S,intersection as b}from"../../../geometry/support/aaBoundingRect.js";import{DrapeSourceType as E}from"./interfaces.js";import{LayerView3D as j}from"./LayerView3D.js";import{computeImageExportSize as I,createGeometryForExtent as A,createOuterImageGeometry as C}from"./support/overlayImageUtils.js";import{toViewIfLocal as D}from"./support/projectExtentUtils.js";import L from"../support/debugFlags.js";import{OverlayIndex as M}from"../terrain/interfaces.js";import{DirtyOperation as T}from"../webgl-engine/lib/ModelDirtyTypes.js";import{RenderGeometry as G}from"../webgl-engine/lib/RenderGeometry.js";import{Texture as P}from"../webgl-engine/lib/Texture.js";import{UpdatePolicy as O}from"../webgl-engine/lib/UpdatePolicy.js";import{ImageMaterial as U}from"../webgl-engine/materials/ImageMaterial.js";import H from"../../layers/LayerView.js";import N from"../../layers/RefreshableLayerView.js";import{isScaleRangeActive as V}from"../../support/layerViewUtils.js";import{TextureWrapMode as z}from"../../webgl/enums.js";let F=class extends(N(j(H))){constructor(){super(...arguments),this.drapeSourceType=E.RasterImage,this.updatePolicy=O.SYNC,this.fullExtentInLocalViewSpatialReference=null,this.maximumDataResolution=null,this._images=new Array,this._extents=new Array,this._overlays=new Array,this.updateWhenStationary=!0,this._drapeSourceRenderer=null,this.refreshDebounced=l((async e=>{this.destroyed||await this._doRefresh(e).catch((e=>{h(e)||a.getLogger(this.declaredClass).error(e)}))}),2e3)}initialize(){this._drapeSourceRenderer=this.view.basemapTerrain.overlayManager.registerGeometryDrapeSource(this),this.handles.add(r((()=>this.view.basemapTerrain.overlayManager.unregisterDrapeSource(this)))),this.addResolvingPromise(D(this).then((e=>this._set("fullExtentInLocalViewSpatialReference",e)))),this.updatingHandles.add((()=>this.suspended),(()=>this._suspendedChangeHandler())),this.handles.add(this.view.resourceController.scheduler.registerIdleStateCallbacks((()=>{this._isScaleRangeActive()&&this.notifyChange("suspended")}),(()=>{}))),this._isScaleRangeLayer()&&this.updatingHandles.add((()=>this.layer.effectiveScaleRange),(()=>this.notifyChange("suspended")))}destroy(){this.clear()}setDrapingExtent(e,t){this._spatialReference=t,e.forEach((e=>{this._overlays[e.index]=e,this._updateImageExtent(e)}))}_updateImageExtent(e){const t=this._clippedExtent(e.extent,W);if(s(t))return;const i=I(e.extent,t,e.resolution);let r=e.pixelRatio*this.view.state.pixelRatio;const{layer:n}=this;if("imageMaxWidth"in n&&null!=n.imageMaxWidth||"imageMaxHeight"in n&&null!=n.imageMaxHeight){const e=n.imageMaxWidth,t=n.imageMaxHeight;if(i.width>e){const t=e/i.width;i.height=Math.floor(i.height*t),i.width=e,r*=t}if(i.height>t){const e=t/i.height;i.width=Math.floor(i.width*e),i.height=t,r*=e}}const o=this._extents[e.index];o&&w(o.extent,t)&&this._imageSizeEquals(t,o.imageSize,i)||(this._extents[e.index]={extent:x(t),imageSize:i,pixelRatio:r},this.suspended||this._fetch(e.index).catch((e=>{h(e)||a.getLogger(this.declaredClass).error(e)})))}clear(){for(let e=0;e<this._images.length;e++)this._clearImage(e)}async doRefresh(){return this._doRefresh()}async _doRefresh(e){if(this.suspended)return;const t=[];for(let i=0;i<this._extents.length;i++)this._extents[i]&&t.push(this._fetch(i,e));await m(t)}canResume(){if(!super.canResume())return!1;const e=this.layer;if(this._isScaleRangeActive()){const{minScale:t,maxScale:i}=e.effectiveScaleRange,r=this.view.scale;if(r<i||t>0&&r>t)return!1}return!0}isUpdating(){return this._images.some((e=>!!e.loadingPromise))}async processResult(e,t,i){(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement)&&(e.image=t)}findExtentInfoAt(e){for(const t of this._extents){const i=t.extent;if(new _(i[0],i[1],i[2],i[3],this._spatialReference).contains(e))return t}return null}getFetchOptions(){}async redraw(e,i){await t(this._images,(async(t,r)=>{t&&(await e(t,i),await this._createStageObjects(r,t.image,i))}))}_imageSizeEquals(e,t,i){if(!this.maximumDataResolution)return!1;const r=R(e)/this.maximumDataResolution.x,a=v(e)/this.maximumDataResolution.y,s=r/t.width,n=a/t.height,o=r/i.width,l=a/i.height,h=Math.abs(s-o),m=Math.abs(n-l),d=L.TESTS_DISABLE_OPTIMIZATIONS?0:1.5;return h<=d&&m<=d}async _fetch(e,t){if(this.suspended)return;const i=this._extents[e],r=i.extent;this._images[e]||(this._images[e]={texture:null,material:null,renderGeometry:null,loadingPromise:null,loadingAbortController:null,image:null,pixelData:null,renderExtent:x(r)});const s=this._images[e];s.loadingAbortController=n(s.loadingAbortController);const o=new _(r[0],r[1],r[2],r[3],this._spatialReference);if(0===o.width||0===o.height)return void this._clearImage(e);const l=new AbortController;s.loadingAbortController=l,d(t,(()=>l.abort()));const m=l.signal,u=this._waitFetchReady(m).then((async()=>{const t={requestAsImageElement:!0,pixelRatio:this._overlays[e].pixelRatio,...this.getFetchOptions(),signal:m},{height:r,width:a}=i.imageSize;return this.layer.fetchImage(o,a,r,t)})).then((e=>{if(c(m))throw a.getLogger(this.declaredClass).warnOnce("A call to fetchImage resolved even though the request was aborted. fetchImage should not resolve if options.signal.aborted is true."),g();return this.processResult(s,e)})).then((()=>{S(s.renderExtent,r)})).finally((()=>{u===s.loadingPromise&&(s.loadingPromise=null,s.loadingAbortController=null)}));s.loadingPromise=u,this.notifyChange("updating"),await u.then((async()=>{if(m.aborted)throw g();await this._createStageObjects(e,s.image,m),this.notifyChange("updating")})).catch((e=>{throw e&&!h(e)&&a.getLogger(this.declaredClass).error(e),this.notifyChange("updating"),e}))}_clearImage(e){const t=this._images[e];if(t){o(t.renderGeometry)&&(this._drapeSourceRenderer.removeGeometries([t.renderGeometry],T.UPDATE),t.renderGeometry=null);const e=this.view._stage;e.remove(t.texture),t.texture=null,e.remove(t.material),t.material=null,t.loadingAbortController=n(t.loadingAbortController),t.loadingPromise=null,t.image=null,t.pixelData=null}}async _createStageObjects(e,t,r){const a=this.view._stage,n=this._images[e],l=()=>{a.remove(n.texture),n.texture=null,o(n.renderGeometry)&&(this._drapeSourceRenderer.removeGeometries([n.renderGeometry],T.UPDATE),n.renderGeometry=null)};if(t){const o=new P(t,{width:t.width,height:t.height,preMultiplyAlpha:!0,wrap:{s:z.CLAMP_TO_EDGE,t:z.CLAMP_TO_EDGE}});let h;if(await i(this._images[e===M.INNER?M.OUTER:M.INNER].loadingPromise),u(r),l(),a.add(o),await a.loadImmediate(o),n.texture=o,s(n.material)?(n.material=new U({transparent:!0,textureId:o.id}),a.add(n.material)):n.material.setParameters({textureId:o.id}),e===M.INNER)h=A(n.material,n.renderExtent);else{const e=this._images[0].renderExtent;if(!e)return void l();h=C(n.material,e,n.renderExtent)}n.renderGeometry=new G(h),n.renderGeometry.localOrigin=this._overlays[e].renderLocalOrigin,this._drapeSourceRenderer.addGeometries([n.renderGeometry],T.UPDATE)}else l(),a.remove(n.material),n.material=null}_isScaleRangeLayer(){return"effectiveScaleRange"in this.layer}_isScaleRangeActive(){const e=this.layer;if(!this._isScaleRangeLayer())return!1;const{minScale:t,maxScale:i}=e.effectiveScaleRange;return V(t,i)}_clippedExtent(e,t){if("local"!==this.view.viewingMode)return S(t,e);const i=this.view.basemapTerrain;return i.ready?b(e,i.extent,t):S(t,e)}_suspendedChangeHandler(){this.suspended?this.clear():this.refreshDebounced()}async _waitFetchReady(e){await p((()=>this.view.stationary),e),u(e)}};e([f()],F.prototype,"layer",void 0),e([f()],F.prototype,"suspended",void 0),e([f({readOnly:!0})],F.prototype,"fullExtentInLocalViewSpatialReference",void 0),e([f()],F.prototype,"updating",void 0),F=e([y("esri.views.3d.layers.DynamicLayerView3D")],F);const q=F,W=x();export{q as default};