/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../chunks/tslib.es6.js";import t from"../../../../core/Accessor.js";import{removeUnordered as o}from"../../../../core/arrayUtils.js";import{createTask as s}from"../../../../core/asyncUtils.js";import{HandleOwnerMixin as r}from"../../../../core/HandleOwner.js";import{isSome as i,unwrap as n,isNone as a}from"../../../../core/maybe.js";import{eachAlwaysValues as p,throwIfAborted as l,whenOrAbort as c}from"../../../../core/promiseUtils.js";import{initial as d,watch as h,on as u}from"../../../../core/reactiveUtils.js";import{property as y}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import{subclass as m}from"../../../../core/accessorSupport/decorators/subclass.js";import g from"../../../../geometry/Polygon.js";import{canProjectWithoutEngine as f,project as _,initializeProjection as v}from"../../../../geometry/projection.js";import{normalizeCentralMeridianForDisplay as S}from"../../../../geometry/support/normalizeUtilsSync.js";import{featureGeometryTypeKebabDictionary as w}from"../../../../geometry/support/typeUtils.js";import{convertFromGeometry as j}from"../../../../layers/graphics/featureConversionUtils.js";import{OptimizedFeature as b}from"../../../../layers/graphics/OptimizedFeature.js";import E from"../../../../layers/graphics/data/FeatureStore.js";import{QueryEngine as k}from"../../../../layers/graphics/data/QueryEngine.js";import{elevationContextAffectsAlignment as C}from"../../../../support/elevationInfoUtils.js";import{symbolHasExtrudeSymbolLayer as F}from"../../../../symbols/support/utils.js";import{sortCandidatesInPlace as A,makeSnappingQuery as P}from"../snappingUtils.js";import{convertSnappingCandidate as R,makeGetGroundElevation as G}from"./queryEngineUtils.js";import{getSnappingCandidateElevationAligner as I}from"./snappingCandidateElevationAlignment.js";import{getSnappingCandidateElevationFilter as O}from"./snappingCandidateElevationFilter.js";import{getSymbologySnappingCandidatesFetcher as U}from"./symbologySnappingCandidates.js";const x="graphics-collections";let z=class extends(r(t)){get updating(){return this.updatingHandles.updating}get _hasZ(){const e=this.view;return i(e)&&"3d"===e.type&&"map-notes"!==this.layerSource.layer.type}get _snappingElevationAligner(){const{view:e}=this,{layer:t}=this.layerSource,o=i(e)&&"3d"===e.type;if(!o||"map-notes"===t.type)return I();const s=async(o,s)=>(await c(e.whenLayerView(t),s)).elevationAlignPointsInFeatures(o,s);return I(o,{elevationInfo:t.elevationInfo,alignPointsInFeatures:s,spatialReference:e.spatialReference})}get _snappingElevationFilter(){const{view:e}=this,t=i(e)&&"3d"===e.type&&"map-notes"!==this.layerSource.layer.type;return O(t)}get _symbologySnappingFetcher(){const{view:e}=this,{layer:t}=this.layerSource,o=i(e)&&"3d"===e.type,s=this._extrudedPolygonSymbolsCount>0;return o&&"map-notes"!==t.type&&s?U(s,(async(o,s)=>{const r=await e.whenLayerView(t);return l(s),r.queryForSymbologySnapping({candidates:o,spatialReference:e.spatialReference},s)})):U()}constructor(e){super(e),this.availability=1,this._sources={multipoint:null,point:null,polygon:null,polyline:null},this._loadedWkids=new Set,this._loadedWkts=new Set,this._pendingAdds=[],this._extrudedPolygonSymbolsCount=0}destroy(){for(const e of this._pendingAdds)e.task.abort();this._pendingAdds.length=0,this._mapSources((e=>this._destroySource(e)))}initialize(){this.updatingHandles.add((()=>this.getGraphicsLayers()),(e=>{this.updatingHandles.removeHandles(x);for(const t of e)this._addMany(t.graphics.toArray()),this.handles.add([t.on("graphic-update",(e=>this._onGraphicUpdate(e))),this.updatingHandles.addOnCollectionChange((()=>t.graphics),(e=>this._onGraphicsChanged(e)))],x)}),d);const{view:e}=this,{layer:t}=this.layerSource;i(e)&&"3d"===e.type&&"map-notes"!==t.type&&this.addHandles([e.elevationProvider.on("elevation-change",(({context:e})=>{C(e,t.elevationInfo)&&this._snappingElevationAligner.notifyElevationSourceChange()})),h((()=>t.elevationInfo),(()=>this._snappingElevationAligner.notifyElevationSourceChange()),d),u((()=>t),["edits","apply-edits","graphic-update"],(()=>this._symbologySnappingFetcher.notifySymbologyChange()))])}async fetchCandidates(e,t){const{point:o}=e,s=await p(this._mapSources((o=>this._fetchCandidatesForSource(o,e,t))));l(t);const r=this._getGroundElevation,i=s.flat().map((e=>R(e,r)));return A(o,i),i}get _getGroundElevation(){return G(this.view)}async _fetchCandidatesForSource(e,t,o){const s=P(t,n(this.view)?.type??"2d"),r=await e.queryEngine.executeQueryForSnapping(s,o);l(o);const i=await this._snappingElevationAligner.alignCandidates(r.candidates,o);l(o);const a=await this._symbologySnappingFetcher.fetch(i,o);l(o);const p=0===a.length?i:[...i,...a];return this._snappingElevationFilter.filter(s,p)}refresh(){}_onGraphicUpdate(e){if(this.getGraphicsLayers().some((t=>t.graphics.includes(e.graphic))))switch(e.property){case"geometry":case"visible":this._remove(e.graphic),this._addMany([e.graphic])}}_onGraphicsChanged(e){for(const t of e.removed)this._remove(t);this._addMany(e.added)}_addMany(e){const t=[],o=new Map;for(const s of e)a(s.geometry)||(this._needsInitializeProjection(s.geometry.spatialReference)?(t.push(s.geometry.spatialReference),o.set(s.uid,s)):this._add(s));this._createPendingAdd(t,o)}_createPendingAdd(e,t){if(!e.length)return;const r=s((async o=>{await v(e.map((e=>({source:e,dest:this.spatialReference}))),{signal:o}),this._markLoadedSpatialReferences(e);for(const[,e]of t)this._add(e)}));this.updatingHandles.addPromise(r.promise);const i={task:r,graphics:t},n=()=>o(this._pendingAdds,i);r.promise.then(n,n),this._pendingAdds.push(i)}_markLoadedSpatialReferences(e){for(const t of e)null!=t.wkid&&this._loadedWkids.add(t.wkid),null!=t.wkt&&this._loadedWkts.add(t.wkt)}_add(e){if(a(e.geometry)||!e.visible)return;let t=e.geometry;if("mesh"===t.type)return;"extent"===t.type&&(t=g.fromExtent(t));const o=this._ensureSource(t.type);if(a(o))return;const s=this._createOptimizedFeature(e.uid,t);a(s)||(o.featureStore.add(s),F(e.symbol)&&this._extrudedPolygonSymbolsCount++)}_needsInitializeProjection(e){return(null==e.wkid||!this._loadedWkids.has(e.wkid))&&((null==e.wkt||!this._loadedWkts.has(e.wkt))&&!f(e,this.spatialReference))}_createOptimizedFeature(e,t){const o=_(S(t),this.spatialReference);if(!o)return null;const s=this._ensureGeometryHasZ(o),r=j(s,this._hasZ,!1);return new b(r,{[H]:e},null,e)}_ensureGeometryHasZ(e){if(!this._hasZ)return e;const t=e=>{for(;e.length<3;)e.push(0)},o=e.clone();switch(o.hasZ=!0,o.type){case"point":o.z=o.z??0;break;case"multipoint":o.points.forEach(t);break;case"polyline":o.paths.forEach((e=>e.forEach(t)));break;case"polygon":o.rings.forEach((e=>e.forEach(t)))}return o}_ensureSource(e){const t=this._sources[e];if(i(t))return t;const o=this._createSource(e);return this._sources[e]=o,o}_createSource(e){const t=w.toJSON(e),o=this._hasZ,s=new E({geometryType:t,hasZ:o,hasM:!1});return{featureStore:s,queryEngine:new k({featureStore:s,fields:[{name:H,type:"esriFieldTypeOID",alias:H}],geometryType:t,hasM:!1,hasZ:o,objectIdField:H,spatialReference:this.spatialReference,scheduler:i(this.view)&&"3d"===this.view.type?this.view.resourceController.scheduler:null}),type:e}}_remove(e){this._mapSources((t=>this._removeFromSource(t,e)));for(const t of this._pendingAdds)t.graphics.delete(e.uid),0===t.graphics.size&&t.task.abort()}_removeFromSource(e,t){const o=t.uid;e.featureStore.has(o)&&(e.featureStore.removeById(t.uid),F(t.symbol)&&this._extrudedPolygonSymbolsCount--)}_destroySource(e){e.queryEngine.destroy(),this._sources[e.type]=null}_mapSources(e){const{point:t,polygon:o,polyline:s,multipoint:r}=this._sources,n=[];return i(t)&&n.push(e(t)),i(o)&&n.push(e(o)),i(s)&&n.push(e(s)),i(r)&&n.push(e(r)),n}};e([y()],z.prototype,"getGraphicsLayers",void 0),e([y({constructOnly:!0})],z.prototype,"layerSource",void 0),e([y({constructOnly:!0})],z.prototype,"spatialReference",void 0),e([y({constructOnly:!0})],z.prototype,"view",void 0),e([y({readOnly:!0})],z.prototype,"updating",null),e([y({readOnly:!0})],z.prototype,"availability",void 0),e([y()],z.prototype,"_hasZ",null),e([y()],z.prototype,"_snappingElevationAligner",null),e([y()],z.prototype,"_snappingElevationFilter",null),e([y()],z.prototype,"_symbologySnappingFetcher",null),e([y()],z.prototype,"_extrudedPolygonSymbolsCount",void 0),e([y()],z.prototype,"_getGroundElevation",null),z=e([m("esri.views.interactive.snapping.featureSources.GraphicsSnappingSource")],z);const H="OBJECTID";export{z as GraphicsSnappingSource};