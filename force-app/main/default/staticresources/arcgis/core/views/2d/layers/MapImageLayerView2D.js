/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import e from"../../../core/Logger.js";import{isAbortError as i}from"../../../core/promiseUtils.js";import{watch as r}from"../../../core/reactiveUtils.js";import{property as s}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as a}from"../../../core/accessorSupport/decorators/subclass.js";import{GraphicsCollection as h}from"../../../support/GraphicsCollection.js";import{BitmapContainer as o}from"../engine/BitmapContainer.js";import{LayerView2DMixin as p}from"./LayerView2D.js";import g from"./graphics/GraphicsView2D.js";import n from"./graphics/HighlightGraphicContainer.js";import l from"./support/ExportStrategy.js";import m from"../../layers/LayerView.js";import c from"../../layers/MapImageLayerView.js";import d from"../../layers/RefreshableLayerView.js";import{MapServiceLayerViewHelper as u}from"../../layers/support/MapServiceLayerViewHelper.js";import{createQueryGeometry as y}from"../../support/drapedUtils.js";let f=class extends(c(d(p(m)))){constructor(){super(...arguments),this._highlightGraphics=new h,this._updateHash=""}fetchPopupFeatures(t,e){return this._popupHighlightHelper.fetchPopupFeatures(t,e)}update(t){const r=`${this.exportImageVersion}/${t.state.id}/${t.pixelRatio}/${t.stationary}`;this._updateHash!==r&&(this._updateHash=r,this.strategy.update(t).catch((t=>{i(t)||e.getLogger(this.declaredClass).error(t)})),t.stationary&&this._popupHighlightHelper.updateHighlightedFeatures(t.state.resolution)),this._highlightView.processUpdate(t)}attach(){const{imageMaxWidth:t,imageMaxHeight:e,version:i}=this.layer,s=i>=10.3,a=i>=10;this._bitmapContainer=new o,this.container.addChild(this._bitmapContainer),this._highlightView=new g({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new n(this.view.featuresTilingScheme),defaultPointSymbolEnabled:!1}),this.container.addChild(this._highlightView.container),this._popupHighlightHelper=new u({createFetchPopupFeaturesQueryGeometry:(t,e)=>y(t,e,this.view),highlightGraphics:this._highlightGraphics,highlightGraphicUpdated:(t,e)=>{this._highlightView.graphicUpdateHandler({graphic:t,property:e})},layerView:this,updatingHandles:this.updatingHandles}),this.strategy=new l({container:this._bitmapContainer,fetchSource:this.fetchImageBitmap.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxWidth:t,imageMaxHeight:e,imageRotationSupported:s,imageNormalizationSupported:a,hidpi:!0}),this.addAttachHandles(r((()=>this.exportImageVersion),(()=>this.requestUpdate()))),this.requestUpdate()}detach(){this.strategy.destroy(),this.container.removeAllChildren(),this._bitmapContainer.removeAllChildren(),this._highlightView.destroy(),this._popupHighlightHelper.destroy()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}async doRefresh(){this._updateHash="",this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(t,e,i,r){return this.layer.fetchImage(t,e,i,{timeExtent:this.timeExtent,floors:this.floors,...r})}fetchImageBitmap(t,e,i,r){return this.layer.fetchImageBitmap(t,e,i,{timeExtent:this.timeExtent,floors:this.floors,...r})}highlight(t){return this._popupHighlightHelper.highlight(t)}};t([s()],f.prototype,"strategy",void 0),t([s()],f.prototype,"updating",void 0),f=t([a("esri.views.2d.layers.MapImageLayerView2D")],f);const w=f;export{w as default};