/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../../geometry.js";import e from"../../../../../core/Evented.js";import has from"../../../../../core/has.js";import t from"../../../../../core/Logger.js";import{isNone as s,applySome as r,mapOr as i}from"../../../../../core/maybe.js";import{diff as o,hasDiff as a}from"../../../../../core/accessorSupport/diffUtils.js";import{GeohashTree as h}from"../../../../../geohash/GeohashTree.js";import{setGeohashBuf as n,setGeohashXY as d}from"../../../../../geohash/geohashUtils.js";import{create as l}from"../../../../../geometry/support/aaBoundingBox.js";import{earth as g}from"../../../../../geometry/support/Ellipsoid.js";import{getInfo as p}from"../../../../../geometry/support/spatialReferenceUtils.js";import{getBoundsOptimizedGeometry as c,convertToGeometry as f,convertFromPolygon as u}from"../../../../../layers/graphics/featureConversionUtils.js";import{OptimizedFeature as m}from"../../../../../layers/graphics/OptimizedFeature.js";import _ from"../../../../../layers/graphics/OptimizedGeometry.js";import{checkProjectionSupport as y,project as I}from"../../../../../layers/graphics/data/projectionSupport.js";import{createDisplayId as b}from"../../../engine/webgl/DisplayId.js";import{featureAdapter as j}from"../FeatureStore2D.js";import{Store2D as v}from"../Store2D.js";import{FeatureSetReaderJSON as B}from"./FeatureSetReaderJSON.js";import x from"../../../../../geometry/SpatialReference.js";import S from"../../../../../geometry/Polygon.js";import F from"../../../../../geometry/Extent.js";const G=t.getLogger("esri.view.2d.layers.features.support.BinStore"),R=12,L=64,T=l(),A=5;function D(e){return 57.29577951308232*e}class O extends v{constructor(t,s,r,i){super(t,r),this.type="bin",this.events=new e,this.objectIdField="aggregateId",this.featureAdapter=j,this._geohashLevel=A,this._geohashBuf=[],this._serviceInfo=i,this.geometryInfo=t.geometryInfo,this._spatialReference=s,this._projectionSupportCheck=y(s,x.WGS84),this._bitsets.geohash=r.getBitset(r.createBitset()),this._bitsets.inserted=r.getBitset(r.createBitset())}destroy(){this._tree&&this._tree.destroy()}get featureSpatialReference(){return this._spatialReference}get fields(){return this._fields}async updateSchema(e,t){const r=this._schema;try{await super.updateSchema(e,t),await this._projectionSupportCheck}catch(n){}this._fields=this._schema.params.fields;const i=o(r,t);t&&(!s(i)||e.source||e.storage.filters)?((a(i,"params.fields")||a(i,"params")||!this._tree||e.source)&&(this._tree&&this._tree.destroy(),this._tree=new h(this._statisticFields,this._serviceInfo),this._tree.onRelease=e=>e.displayId&&this._storage.releaseDisplayId(e.displayId),this._geohashLevel=this._schema.params.fixedBinLevel,this._rebuildTree(),has("esri-2d-update-debug")&&G.info("Aggregate mesh needs update due to tree changing")),has("esri-2d-update-debug")&&G.info("Aggregate mesh needs update due to tree changing"),e.targets[t.name]=!0,e.mesh=!1):r&&(e.mesh=!0)}clear(){this._rebuildTree()}sweepFeatures(e,t){this._bitsets.inserted.forEachSet((s=>{if(!e.has(s)){const e=t.lookupByDisplayIdUnsafe(s);this._remove(e)}}))}sweepAggregates(e,t,s){}onTileData(e,t,r,i,o=!0){if(!this._schema||s(t.addOrUpdate))return t;this.events.emit("changed");const a=this._getTransforms(e,this._spatialReference);{const e=t.addOrUpdate.getCursor();for(;e.next();)this._update(e,i)}if(t.status.mesh||!o)return t;const h=new Array;this._getBinsForTile(h,e,a,r),t.addOrUpdate=B.fromOptimizedFeatures(h,{...this._serviceInfo,geometryType:"esriGeometryPolygon"}),t.addOrUpdate.attachStorage(r),t.end=!0,t.isRepush||(t.clear=!0);{const s=t.addOrUpdate.getCursor();for(;s.next();){const t=s.getDisplayId();this._bitsets.computed.unset(t),this.setComputedAttributes(r,s,t,e.scale)}}return t}forEachBin(e){this._tree.forEach(e)}forEach(e){this._tree.forEach((t=>{if(t.depth!==this._geohashLevel)return;const s=this._toFeatureJSON(t),r=B.fromFeatures([s],{objectIdField:this.objectIdField,globalIdField:null,geometryType:this.geometryInfo.geometryType,fields:this.fields}).getCursor();r.next(),e(r)}))}forEachInBounds(e,t){}forEachBounds(e,t){const{hasM:r,hasZ:i}=this.geometryInfo;for(const o of e){const e=c(T,o.readGeometry(),i,r);s(e)||t(e)}}onTileUpdate(e){}getAggregate(e){const t=b(e,!0),s=this._tree.findIf((e=>e.displayId===t));return r(s,(e=>this._toFeatureJSON(e)))}getAggregates(){return this._tree.findAllIf((e=>e.depth===this._geohashLevel)).map(this._toFeatureJSON.bind(this))}getDisplayId(e){const t=this._tree.findIf((t=>t.id===e));return r(t,(e=>e.displayId))}getFeatureDisplayIdsForAggregate(e){const t=this._tree.findIf((t=>t.id===e));return i(t,[],(e=>Array.from(e.displayIds)))}getDisplayIdForReferenceId(e){const t=this._tree.findIf((t=>1===t.displayIds.size&&t.displayIds.has(e)));return r(t,(e=>e.displayId))}_toFeatureJSON(e){const t=this._spatialReference;return{displayId:e.displayId,attributes:e.getAttributes(),geometry:f(e.getGeometry(t),"esriGeometryPolygon",!1,!1),centroid:null}}_rebuildTree(){this._bitsets.computed.clear(),this._bitsets.inserted.clear(),this._tree&&this._tree.clear()}_remove(e){const t=e.getDisplayId(),s=e.getXHydrated(),r=e.getYHydrated(),i=this._geohashBuf[2*t],o=this._geohashBuf[2*t+1];this._bitsets.inserted.has(t)&&(this._bitsets.inserted.unset(t),this._tree.removeCursor(e,s,r,i,o,this._geohashLevel))}_update(e,t){const s=e.getDisplayId(),r=this._bitsets.inserted,i=t.isVisible(s);if(i===r.has(s))return;if(!i)return void this._remove(e);const o=e.getXHydrated(),a=e.getYHydrated();if(!this._setGeohash(s,o,a))return;const h=this._geohashBuf[2*s],n=this._geohashBuf[2*s+1];this._tree.insertCursor(e,s,o,a,h,n,this._geohashLevel),r.set(s)}_setGeohash(e,t,s){if(this._bitsets.geohash.has(e))return!0;const r=this._geohashBuf;if(this._spatialReference.isWebMercator){const i=D(t/g.radius),o=i-360*Math.floor((i+180)/360),a=D(Math.PI/2-2*Math.atan(Math.exp(-s/g.radius)));n(r,e,a,o,R)}else{const i=I({x:t,y:s},this._spatialReference,x.WGS84);if(!i)return!1;n(r,e,i.y,i.x,R)}return this._bitsets.geohash.set(e),!0}_getBinsForTile(e,t,s,r){try{const i=this._getGeohashBounds(t),o=this._tree.getBins(i);for(const t of o){t.displayId||(t.displayId=r.createDisplayId(!0));let i=null;const o=t.getGeometry(this._spatialReference,s.tile);o||(i=t.getGeometryCentroid(this._spatialReference,s.tile));const a=new m(o,t.getAttributes(),i);a.objectId=t.id,a.displayId=t.displayId,e.push(a)}}catch(i){return void G.error("Unable to get bins for tile",t.key.id)}}_getGeohash(e,t,s){const r={geohashX:0,geohashY:0};return d(r,t,e,s),r}_getGeohashBounds(e){const t=this._getGeohashLevel(e.key.level),s=[e.extent.xmin,e.extent.ymin,e.extent.xmax,e.extent.ymax],r=S.fromExtent(F.fromBounds(s,this._spatialReference)),i=I(r,this._spatialReference,x.WGS84,{densificationStep:e.resolution*L}),o=u(new _,i,!1,!1),a=o.coords.filter(((e,t)=>!(t%2))),h=o.coords.filter(((e,t)=>t%2)),n=Math.min(...a),d=Math.min(...h),l=Math.max(...a),g=Math.max(...h),p=this._getGeohash(n,d,t),c=this._getGeohash(l,g,t);return{bounds:s,geohashBounds:{xLL:p.geohashX,yLL:p.geohashY,xTR:c.geohashX,yTR:c.geohashY},level:t}}_getGeohashLevel(e){return this._schema.params.fixedBinLevel}_getTransforms(e,t){const s={originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]},r=p(t);if(!r)return{tile:s,left:null,right:null};const[i,o]=r.valid;return{tile:s,left:{...s,translate:[o,e.bounds[3]]},right:{...s,translate:[i-o+e.bounds[0],e.bounds[3]]}}}}export{O as BinStore};