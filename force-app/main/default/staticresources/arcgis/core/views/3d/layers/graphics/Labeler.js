/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../chunks/tslib.es6.js";import t from"../../../../core/Accessor.js";import{forEach as s,result as l}from"../../../../core/asyncUtils.js";import i from"../../../../core/Handles.js";import a from"../../../../core/Logger.js";import{someMap as r}from"../../../../core/MapUtils.js";import{destroyMaybe as o,disposeMaybe as n,isSome as c,isNone as h,abortMaybe as b,unwrap as d}from"../../../../core/maybe.js";import{throwIfAborted as p,isAbortError as u}from"../../../../core/promiseUtils.js";import{watch as g}from"../../../../core/reactiveUtils.js";import{property as y}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as f}from"../../../../core/accessorSupport/decorators/subclass.js";import{hydrateGraphic as m}from"../../../../layers/graphics/hydratedFeatures.js";import{createLabelFunction as _}from"../../../../layers/support/labelFormatUtils.js";import{hasCalloutSupport as C}from"../../../../symbols/callouts/calloutUtils.js";import{CreateLabelParameters as x}from"./CreateLabelParameters.js";import{VisibilityFlag as L,VisibilityGroup as v}from"./enums.js";import{make as T}from"./Graphics3DCalloutSymbolLayerFactory.js";import{LineCalloutSymbolLayerRenderingInfo as w,LineCalloutCreationContext as G}from"./Graphics3DLineCalloutSymbolLayer.js";import{getGraphics3DSymbol as A}from"./graphicSymbolUtils.js";import{get as D}from"./labelPlacement.js";import{horizontalPlacementFromAnchor as I,verticalPlacementFromAnchor as R,textRenderAlignmentFromHorizontalPlacement as S}from"./placementUtils.js";import{MaterialCollection as P}from"../../webgl-engine/lib/MaterialCollection.js";import{TextRenderer as j}from"../../webgl-engine/lib/TextRenderer.js";import{TextRenderParameters as E}from"../../webgl-engine/lib/TextRenderParameters.js";import{TextTextureAtlas as O}from"../../webgl-engine/lib/TextTextureAtlas.js";import{WebGLLayer as M}from"../../webgl-engine/lib/WebGLLayer.js";import{TaskPriority as V,Task as z}from"../../../support/Scheduler.js";class F{constructor(e,t){this.labelingContext=e,this.graphics3DGraphic=t,this.hasGraphics3DResources=!1,this.visible=!1,this.rendered=!1,this.textInitialized=!1,this.textRenderers=new Array,this.textLabelPlacements=new Array}}class U{constructor(e,t,s,l,i){this.labelClass=e,this.graphics3DSymbol=t,this.graphics3DCalloutSymbolLayer=s,this.textRenderParameters=l,this.labelFunction=i,this.calloutSymbolLayerIndex=0}}class k{constructor(e,t,s,l,i,a,r){this.layer=e,this.graphics3DCore=t,this.scaleVisibility=s,this.emptySymbolLabelSupported=l,this.elevationInfoOverride=i,this.disablePlacement=a,this.active=r,this.labelClassAbortController=new AbortController,this.labelClassContexts=new Array,this.graphics=new Map,this.labelsToInitialize=new Map,this.stageLayer=new M({pickable:!0,disableOctree:!0},e.uid)}}let B=class extends t{constructor(e){super(e),this._dirty=!1,this._labels=new Map,this._labelsToAdd=new Map,this._labelsToRemove=new Map,this._labelingContexts=new Array}setup(){this.dispose(),this._handles=new i,this._handles.add([g((()=>this.view.state?.camera),(()=>this.setDirty())),g((()=>this.view.state?.rasterPixelRatio),(()=>this._resetAllLabels())),this.view.resourceController.scheduler.registerTask(V.LABELER,this)]),this._textTextureAtlas=new O({view:this.view}),this._hudMaterialCollection=new P(this.view._stage),this._calloutMaterialCollection=new P(this.view._stage)}dispose(){this._handles=o(this._handles),this._textTextureAtlas=n(this._textTextureAtlas),this._hudMaterialCollection=n(this._hudMaterialCollection),this._calloutMaterialCollection=n(this._calloutMaterialCollection),this._labelingContexts.length=0,this._labels.clear(),this._labelsToAdd.clear(),this._labelsToRemove.clear()}_activateLabelingContext(e){e.graphics.forEach(((t,s)=>{const l=new F(e,t);this._labels.set(s,l),e.labelsToInitialize.set(s,l),t.setVisibilityFlag(L.USER_SETTING,!0,v.LABEL)})),e.active=!0}_deactivateLabelingContext(e){e.graphics.forEach(((e,t)=>{e.setVisibilityFlag(L.USER_SETTING,!1,v.LABEL),this.setLabelGraphicVisibility(e,!1),this._labels.delete(t)})),e.active=!1}_addLabelTextureToAtlas(e){for(const t of e.graphics3DGraphic.labelLayers){if(!t._labelClass)continue;const s=e.textRenderers[t._labelIndex];c(s)&&this._textTextureAtlas.addTextTexture(s,t.stageObject)}e.rendered=!0}_removeLabelTextureFromAtlas(e){for(const t of e.graphics3DGraphic.labelLayers){if(!t._labelClass)continue;const s=e.textRenderers[t._labelIndex];c(s)&&this._textTextureAtlas.removeTextTexture(s,t.stageObject)}e.rendered=!1}get running(){return this.view.ready&&(this._dirty||this.deconflictor.running)}runTask(e){return this._updateLabels(e),!this._dirty&&this.deconflictor.running&&this.deconflictor.runTask(e),z.YIELD}_updateLabels(e){if(this._dirty){this._dirty=!1;for(const t of this._labelingContexts)if(t.active){if(!H(t)){if(W(t)){this._deactivateLabelingContext(t);continue}if(this._createLabelClassContext(t),N(t)){this._dirty=!0;continue}if(!H(t))continue}r(t.labelsToInitialize,((s,l)=>(this._ensureGraphics3DResources(s)&&(this._labels.set(l,s),this.deconflictor.setDirty(),e.madeProgress()),(s.visible&&s.textInitialized||!s.visible&&s.hasGraphics3DResources)&&(t.labelsToInitialize.delete(l),e.madeProgress()),e.done)))&&(this._dirty=!0)}this._labelsToRemove.forEach((e=>this._removeLabelTextureFromAtlas(e))),this._labelsToAdd.forEach((e=>this._addLabelTextureToAtlas(e))),this._labelsToRemove.clear(),this._labelsToAdd.clear(),this._dirty||this.notifyChange("updating")}}async _createLabelClassContextAsync(e){const t=e.labelClassAbortController?.signal;await(e.layer.when?.()),p(t),e.scaleVisibility&&e.scaleVisibility.updateScaleRangeActive();const i=e.graphics3DCore,r=i.layer,o=r.labelingInfo&&r.labelingInfo.filter((e=>!!e.symbol));if(!o||0===o.length)return;let n=!1;await s(o,(async(s,r)=>{const o=s.symbol,c=A(i.getOrCreateGraphics3DSymbol(o));if(h(c))return void a.getLogger(this.declaredClass).error("Failed to create Graphics3DSymbol for label");await c.load(),p(t);let b=null;C(o)&&o.hasVisibleCallout()&&(b=T(o,i.symbolCreationContext),await b.load(),p(t));const d=await l(_(s,e.layer.fieldsIndex,this.view.spatialReference));if(p(t),!0===d.ok){const l=await this._createTextRenderParameters(c.symbol);p(t),e.labelClassContexts[r]=new U(s,c,b,l,d.value)}else a.getLogger(this.declaredClass).error(`Label expression failed to evaluate: ${d.error}`),n=!0})),p(t)}async _createLabelClassContext(e){return h(e.labelClassPromise)&&(e.labelClassPromise=this._createLabelClassContextAsync(e).catch((t=>{if(u(t))throw t;e.labelClassContexts.length=0})).then((()=>{e.labelClassAbortController=null,this.notifyChange("updating")})).catch((()=>{})),this.notifyChange("updating")),e.labelClassPromise}async _createTextRenderParameters(e){const t=e.symbolLayers.getItemAt(0);return t&&"text"===t.type?E.fromSymbol(t,this.view.state.rasterPixelRatio):null}_destroyLabelClassContext(e){for(const s of e.labelClassContexts)--s.graphics3DSymbol.referenced;const t=e.labelClassAbortController;e.labelClassAbortController=new AbortController,b(t),e.labelClassContexts.length=0,e.labelClassPromise=null,this.notifyChange("updating")}_createTextSymbolGraphic(e,t,s,l,i){const a=new x(s.verticalOffset,I(s.anchor),R(s.anchor),e.text,s.translation,s.elevationOffset,s.centerOffset,s.screenOffset,s.centerOffsetUnits,e.displayWidth,e.displayHeight);return Y.graphic=t,Y.renderingInfo=null,Y.layer=l,i.createLabel(Y,a,this._hudMaterialCollection,this._textTextureAtlas)}_createLineCalloutGraphic(e,t,s,l,i){return Y.graphic=e,Y.layer=i,Y.renderingInfo=new w(null,t,l.translation,l.centerOffset,l.screenOffset,l.centerOffsetUnits,l.elevationOffset,this._calloutMaterialCollection),s.createGraphics3DGraphic(Y)}_ensureGraphics3DResources(e){if(e.hasGraphics3DResources)return!1;const t=e.graphics3DGraphic;if(t.destroyed)return!1;this._ensureTextTextureResources(e);const s=e.labelingContext,l=s.labelClassContexts;if(!l||0===l.length||!s.emptySymbolLabelSupported&&0===t.layers.length)return!1;let i=!1;const a=t.graphic,r=s.layer,o=$(s.layer),n=this.view._stage;for(let b=0;b<l.length;b++){const d=e.textRenderers[b],p=e.textLabelPlacements[b];if(h(d)||h(p))continue;const u=l[b],g=u.graphics3DSymbol,y=g.symbol&&"label-3d"===g.symbol.type?g.symbol:null,f=g.symbolLayers[0];if(!f)continue;f.setElevationInfoOverride(s.elevationInfoOverride);const m=this._createTextSymbolGraphic(d,a,p,r,f);if(h(m))return!1;m._labelClass=u.labelClass,m._labelIndex=b,t.addLabelGraphic(m,n,s.stageLayer),t.setVisibilityFlag(L.USER_SETTING,o,v.LABEL),t.clearVisibilityFlag(L.SCALE_RANGE,v.LABEL),t.setVisibilityFlag(L.DECONFLICTION,!1,v.LABEL),i=!0;const _=u.graphics3DCalloutSymbolLayer;if(_&&p.hasLabelVerticalOffset){_.setElevationInfoOverride(s.elevationInfoOverride);const e=this._createLineCalloutGraphic(a,y,_,p,r);c(e)&&(u.calloutSymbolLayerIndex=t.labelLayers.length,t.addLabelGraphic(e,n,s.stageLayer))}break}return s.scaleVisibility&&i&&s.scaleVisibility.updateGraphicLabelScaleVisibility(t),e.hasGraphics3DResources=!0,!0}_destroyGraphics3DResources(e){const t=e.labelingContext.labelClassContexts;for(const s of e.graphics3DGraphic.labelLayers){if(null==s._labelClass)continue;const e=t[s._labelIndex].graphics3DSymbol.symbolLayers[0];null!=e&&e.onRemoveGraphic(s)}e.graphics3DGraphic.clearLabelGraphics(),e.hasGraphics3DResources=!1}_ensureTextTextureResources(e){if(e.textInitialized)return;const t=e.labelingContext,s=t.labelClassContexts;if(!s||0===s.length)return;const l=e.graphics3DGraphic.graphic;for(let a=0;a<s.length;a++){const r=s[a];if(e.textRenderers[a]=null,e.textLabelPlacements[a]=null,!r.textRenderParameters)continue;const o=r.labelFunction;let n;if("arcade"===o.type)try{const e=o.needsHydrationToEvaluate()?m(l,t.layer):l;n=o.evaluate(e)}catch(i){n=null}else n=o.evaluate(l);if(h(n)||""===n||/^\s+$/.test(n))continue;const c=r.graphics3DSymbol,b="label-3d"===c.symbol?.type?c.symbol:null;if(!c.symbolLayers[0])continue;const d=e.graphics3DGraphic,p=r.labelClass,u=t.disablePlacement,g=D({graphics3DGraphic:d,labelSymbol:b,labelClass:p,disablePlacement:u});if(h(g))continue;const y=I(g.anchor),f=S(y);e.textRenderers[a]=new j(n,f,r.textRenderParameters),e.textLabelPlacements[a]=g}e.textInitialized=!0}_destroyTextTextureResources(e){e.textInitialized=!1,e.textRenderers.length=0,e.textLabelPlacements.length=0}_addGraphic(e,t){const s=t.graphic.uid;if(e.graphics.set(s,t),e.active){const l=new F(e,t);this._labels.set(s,l),e.labelsToInitialize.set(s,l)}this.setDirty(),this.deconflictor.setDirty()}_removeGraphic(e,t){const s=t.graphic.uid,l=this._labels.get(s);e.graphics.delete(s),l&&(this._destroyGraphic(l,s),e.labelsToInitialize.delete(s),this.setDirty(),this.deconflictor.setDirty())}_destroyGraphic(e,t){this._labels.has(t)&&(this._labels.delete(t),this._labelsToAdd.delete(t),this._labelsToRemove.delete(t)),e.textInitialized&&(this._removeLabelTextureFromAtlas(e),this._destroyTextTextureResources(e)),e.hasGraphics3DResources&&this._destroyGraphics3DResources(e)}async _labelingInfoChange(e,t){if(!t)return this._visibilityInfoChange(e),this._resetLabels(e),this._createLabelClassContext(e);for(const s of t){const t=e.graphics.get(s);t&&(this._removeGraphic(e,t),this._addGraphic(e,t))}}_globalPropertyChanged(e,t){for(const s of t.labelClassContexts){const l=new Map;t.graphics.forEach((e=>l.set(e.graphic.uid,e)));const i=e=>e.labelLayers[0];if(d(s.graphics3DSymbol.symbolLayers[0]).globalPropertyChanged(e,l,i),s.graphics3DCalloutSymbolLayer){const t=e=>e.labelLayers[s.calloutSymbolLayerIndex];s.graphics3DCalloutSymbolLayer.globalPropertyChanged(e,l,t)}}}_visibilityInfoChange(e){const t=$(e.layer);t&&!e.active&&this._activateLabelingContext(e),!t&&e.active&&this._deactivateLabelingContext(e),this.setDirty()}_resetAllLabels(){for(const e of this._labelingContexts)this._resetLabels(e)}_resetLabels(e){e.graphics.forEach(((t,s)=>{const l=this._labels.get(s);l&&(this._destroyGraphic(l,s),l.visible=!1,l.rendered=!1,e.labelsToInitialize.set(s,l))})),this._destroyLabelClassContext(e),this.setDirty(),this.deconflictor.setDirty()}_findLabelingContext(e){for(const t of this._labelingContexts)if(t.graphics3DCore===e)return t;return null}addGraphicsOwner(e,t,s){const l=s&&s.emptySymbolLabelSupported||!1,i=s&&s.elevationInfoOverride||null,a=s&&s.disablePlacement||null;if(this._findLabelingContext(e))return;const r=e.layer,o=new k(r,e,t,l,i,a,$(r));return this.view._stage.add(o.stageLayer),this._labelingContexts.push(o),this.setDirty(),{addGraphic:e=>this._addGraphic(o,e),removeGraphic:e=>this._removeGraphic(o,e),featureReductionChange:()=>{},layerLabelsEnabled:()=>$(o.layer),labelingInfoChange:e=>this._labelingInfoChange(o,e),elevationInfoChange:()=>this._globalPropertyChanged("elevationInfo",o),slicePlaneEnabledChange:()=>this._globalPropertyChanged("slicePlaneEnabled",o),visibilityInfoChange:()=>this._visibilityInfoChange(o),reset:()=>this._resetLabels(o),clear:()=>{}}}removeGraphicsOwner(e){const t=this._findLabelingContext(e);if(!t)return;const s=this._labelingContexts.indexOf(t);this._labelingContexts.splice(s,1),t.graphics.forEach((e=>this._removeGraphic(t,e))),this.view._stage.remove(t.stageLayer),this.setDirty()}setLabelGraphicVisibility(e,t){const s=e.graphic.uid,l=this._labels.get(s);l&&l.visible!==t&&(t&&!l.rendered?(this._labelsToAdd.set(s,l),this._labelsToRemove.delete(s),l.textInitialized||l.labelingContext.labelsToInitialize.set(s,l)):!t&&l.rendered&&(this._labelsToRemove.set(s,l),this._labelsToAdd.delete(s)),l.visible=t,this.setDirty())}setDirty(){!this._dirty&&this._labelingContexts.length>0&&(this._dirty=!0,this.notifyChange("updating"))}get updating(){return this._dirty||this._textTextureAtlas?.updating||this.deconflictor.updating||this._labelingContexts.some((e=>N(e)))}get updatingProgress(){if(!this.updating||!this._textTextureAtlas)return 1;const e=this._labelingContexts.length>0?this._labelingContexts.reduce(((e,t)=>e+(N(t)?0:1)),0)/this._labelingContexts.length:1;return(this._dirty?0:.3)+(this._textTextureAtlas.updating?0:.1)+.1*e+.5*this.deconflictor.updatingProgress}get test(){return{textTextureAtlas:this._textTextureAtlas,resetAllLabels:()=>this._resetAllLabels()}}};function N(e){return!!e.labelClassPromise&&!!e.labelClassAbortController}function H(e){return e.labelClassContexts&&e.labelClassContexts.length}function W(e){return null===e.labelClassContexts}function $(e){return!0===e.labelsVisible&&!!e.labelingInfo?.some((e=>!!e.symbol))}e([y({constructOnly:!0})],B.prototype,"view",void 0),e([y({constructOnly:!0})],B.prototype,"deconflictor",void 0),e([y()],B.prototype,"_textTextureAtlas",void 0),e([y({type:Boolean,readOnly:!0})],B.prototype,"updating",null),B=e([f("esri.views.3d.layers.graphics.Labeler")],B);const Y=new G(null,null,null);export{B as Labeler,$ as areLabelsVisible};