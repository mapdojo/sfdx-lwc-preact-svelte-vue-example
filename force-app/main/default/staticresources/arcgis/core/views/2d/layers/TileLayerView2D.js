/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import i from"../../../core/Logger.js";import{isAbortError as t}from"../../../core/promiseUtils.js";import{watch as r}from"../../../core/reactiveUtils.js";import{property as s}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as o}from"../../../core/accessorSupport/decorators/subclass.js";import{equals as l}from"../../../geometry/support/spatialReferenceUtils.js";import{GraphicsCollection as h}from"../../../support/GraphicsCollection.js";import"../../../core/Error.js";import"../../../core/has.js";import"../../../core/scheduling.js";import"../../../request.js";import"../../../chunks/index2.js";import"../../../core/urlUtils.js";import"../../../chunks/index3.js";import"../../../layers/effects/EffectView.js";import"../engine/DisplayObject.js";import"../engine/webgl/effects/highlight/HighlightGradient.js";import"../engine/webgl/BufferPool.js";import"../engine/webgl/enums.js";import"../engine/webgl/brushes/BrushBitmap.js";import"../../../chunks/vec4f32.js";import"../engine/webgl/Utils.js";import"../engine/webgl/shaders/BackgroundPrograms.js";import"../../webgl/enums.js";import"../../webgl/checkWebGLError.js";import"../../webgl/context-util.js";import"../../../chunks/builtins.js";import"../../../core/RandomLCG.js";import"../engine/webgl/materialKey/MaterialKey.js";import"../engine/webgl/techniques/Technique.js";import"../engine/webgl/techniques/dotDensity/TechniqueDotDensity.js";import"../engine/webgl/techniques/heatmap/TechniqueHeatmap.js";import"../engine/webgl/techniques/pieChart/TechniquePieChart.js";import"../../webgl/BufferObject.js";import"../../webgl/FramebufferObject.js";import"../../webgl/Texture.js";import"../../webgl/VertexArrayObject.js";import"../engine/webgl/brushes/WGLBrushHeatmap.js";import"../engine/webgl/DefaultVertexAttributeLayouts.js";import"../engine/webgl/shaders/TileInfoPrograms.js";import"../engine/webgl/brushes/WGLGeometryBrushMarker.js";import"../../../core/mathUtils.js";import"../engine/webgl/number.js";import"../engine/vectorTiles/style/StyleDefinition.js";import"../../../chunks/vec2f32.js";import"../engine/vectorTiles/enums.js";import"../engine/vectorTiles/shaders/sources/resolver.js";import"../engine/webgl/shaders/BitBlitPrograms.js";import"../engine/webgl/shaders/sources/resolver.js";import"../engine/webgl/TextureManager.js";import"../engine/webgl/shaders/StencilPrograms.js";import"../engine/webgl/effects/BlendEffect.js";import"../engine/webgl/shaders/HighlightPrograms.js";import"../engine/webgl/Profiler.js";import"../../webgl/renderState.js";import"../../3d/webgl-engine/core/shaderModules/interfaces.js";import"../../../core/floatRGBA.js";import"../../3d/webgl-engine/lib/OrderIndependentTransparency.js";import"../../../chunks/webgl-debug.js";import"../LabelManager.js";import a from"./graphics/GraphicsView2D.js";import"../engine/webgl/AttributeStoreView.js";import"../../../chunks/earcut.js";import"../../../layers/graphics/featureConversionUtils.js";import"../../../core/unitUtils.js";import"../../../renderers/support/lengthUtils.js";import"../../../chunks/vec3f32.js";import"../../../geometry/support/normalizeUtils.js";import"../navigation/MapViewNavigation.js";import"../../../core/asyncUtils.js";import"../engine/webgl/shaders/MagnifierPrograms.js";import{BitmapTileLayerView2D as n}from"./BitmapTileLayerView2D.js";import{LayerView2DMixin as p}from"./LayerView2D.js";import g from"./graphics/HighlightGraphicContainer.js";import{createBlankImage as c,resampleImage as m}from"./support/imageUtils.js";import u from"../tiling/TileInfoView.js";import f from"../tiling/TileKey.js";import w from"../tiling/TileQueue.js";import d from"../tiling/TileStrategy.js";import j from"../../layers/LayerView.js";import y from"../../layers/RefreshableLayerView.js";import{isMapServiceLayerView as b,MapServiceLayerViewHelper as _}from"../../layers/support/MapServiceLayerViewHelper.js";import{createQueryGeometry as V}from"../../support/drapedUtils.js";const T=[0,0];let v=class extends(y(n(p(j)))){constructor(){super(...arguments),this._fetchQueue=null,this._highlightGraphics=new h,this._highlightView=null,this._popupHighlightHelper=null,this._tileStrategy=null,this.layer=null}get resampling(){return!("resampling"in this.layer)||!1!==this.layer.resampling}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this._highlightView?.processUpdate(e)}attach(){const e="tileServers"in this.layer?this.layer.tileServers:null;if(this._tileInfoView=new u(this.layer.tileInfo,this.layer.fullExtent),this._fetchQueue=new w({tileInfoView:this._tileInfoView,concurrency:e&&10*e.length||10,process:(e,i)=>this.fetchTile(e,i)}),this._tileStrategy=new d({cachePolicy:"keep",resampling:this.resampling,acquireTile:e=>this.acquireTile(e),releaseTile:e=>this.releaseTile(e),tileInfoView:this._tileInfoView}),b(this,this.layer)){const e=this._highlightView=new a({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new g(this.view.featuresTilingScheme),defaultPointSymbolEnabled:!1});this.container.addChild(this._highlightView.container),this._popupHighlightHelper=new _({createFetchPopupFeaturesQueryGeometry:(e,i)=>V(e,i,this.view),highlightGraphics:this._highlightGraphics,highlightGraphicUpdated:(i,t)=>{e.graphicUpdateHandler({graphic:i,property:t})},layerView:this,updatingHandles:this.updatingHandles})}this.requestUpdate(),this.addAttachHandles(r((()=>this.resampling),(()=>{this.doRefresh()}))),super.attach()}detach(){super.detach(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._popupHighlightHelper?.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=this._popupHighlightHelper=null}async fetchPopupFeatures(e,i){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(e,i):[]}highlight(e){return this._popupHighlightHelper?this._popupHighlightHelper.highlight(e):{remove(){}}}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}supportsSpatialReference(e){return l(this.layer.tileInfo?.spatialReference,e)}async doRefresh(){!this.attached||this.updateRequested||this.suspended||(this._fetchQueue.reset(),this._tileStrategy.tiles.forEach((e=>this._enqueueTileFetch(e))))}isUpdating(){return this._fetchQueue?.updating??!1}acquireTile(e){const i=this._bitmapView.createTile(e),t=i.bitmap;return[t.x,t.y]=this._tileInfoView.getTileCoords(T,i.key),t.resolution=this._tileInfoView.getTileResolution(i.key),[t.width,t.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(i),this._bitmapView.addChild(i),this.requestUpdate(),i}releaseTile(e){this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",(()=>e.destroy())),this.requestUpdate()}async fetchTile(e,i={}){const r="tilemapCache"in this.layer?this.layer.tilemapCache:null,{signal:s,resamplingLevel:o=0}=i;if(!r)try{return await this._fetchImage(e,s)}catch(a){if(!t(a)&&!this.resampling)return c(this._tileInfoView.tileInfo.size);if(o<3){const t=this._tileInfoView.getTileParentId(e.id);if(t){const r=new f(t),s=await this.fetchTile(r,{...i,resamplingLevel:o+1});return m(this._tileInfoView,s,r,e)}}throw a}const l=new f(0,0,0,0);let h;try{if(await r.fetchAvailabilityUpsample(e.level,e.row,e.col,l,{signal:s}),l.level!==e.level&&!this.resampling)return c(this._tileInfoView.tileInfo.size);h=await this._fetchImage(l,s)}catch(a){if(t(a))throw a;h=await this._fetchImage(e,s)}return this.resampling?m(this._tileInfoView,h,l,e):h}async _enqueueTileFetch(e){if(!this._fetchQueue.has(e.key.id)){try{const i=await this._fetchQueue.push(e.key);e.bitmap.source=i,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.once("attach",(()=>this.requestUpdate()))}catch(r){t(r)||i.getLogger(this.declaredClass).error(r)}this.requestUpdate()}}async _fetchImage(e,i){return this.layer.fetchImageBitmapTile(e.level,e.row,e.col,{signal:i})}};e([s()],v.prototype,"_fetchQueue",void 0),e([s()],v.prototype,"resampling",null),v=e([o("esri.views.2d.layers.TileLayerView2D")],v);const I=v;export{I as default};