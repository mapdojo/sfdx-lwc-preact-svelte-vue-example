/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../core/has.js";import e from"../../../../core/LRUCache.js";import{getOrCreateMapValue as t}from"../../../../core/MapUtils.js";import{isSome as s,isNone as n}from"../../../../core/maybe.js";import{throwIfAborted as o}from"../../../../core/promiseUtils.js";import{getMetersPerVerticalUnitForSR as i}from"../../../../core/unitUtils.js";import{getMetersPerUnit as a}from"../../../../symbols/support/unitConversionUtils.js";function r(e=!1,t){if(e){const{elevationInfo:e,alignPointsInFeatures:s,spatialReference:n}=t;return new l(e,s,n)}return new c}class c{async alignCandidates(e,t){return e}notifyElevationSourceChange(){}}const h=1024;class l{constructor(t,s,n){this._elevationInfo=t,this._alignPointsInFeatures=s,this.spatialReference=n,this._alignmentsCache=new e(h),this._cacheVersion=0,this._metersPerVerticalUnit=i(n)}async alignCandidates(e,t){const n=this._elevationInfo;return s(n)&&"absolute-height"===n.mode&&!n.featureExpressionInfo?(this._alignAbsoluteElevationCandidates(e,n),e):this._alignComputedElevationCandidates(e,t)}notifyElevationSourceChange(){this._alignmentsCache.clear(),this._cacheVersion++}_alignAbsoluteElevationCandidates(e,t){const{offset:s,unit:o}=t;if(n(s))return;const i=s*(a(o??"meters")/this._metersPerVerticalUnit);for(const n of e)switch(n.type){case"edge":n.start.z+=i,n.end.z+=i;continue;case"vertex":n.target.z+=i;continue}}async _alignComputedElevationCandidates(e,s){const n=new Map;for(const o of e)t(n,o.objectId,p).push(o);const[i,a,r]=this._prepareQuery(n),c=await this._alignPointsInFeatures(i,s);o(s);if(r!==this._cacheVersion)return this._alignComputedElevationCandidates(e,s);this._applyCacheAndResponse(i,c,a);const{drapedObjectIds:h,failedObjectIds:l}=c,d=[];for(const t of e){const{objectId:e}=t;h.has(e)&&"edge"===t.type&&(t.draped=!0),l.has(e)||d.push(t)}return d}_prepareQuery(e){const t=[],s=[];for(const[n,o]of e){const e=[];for(const t of o)this._addToQueriesOrCachedResult(n,t.target,e,s),"edge"===t.type&&(this._addToQueriesOrCachedResult(n,t.start,e,s),this._addToQueriesOrCachedResult(n,t.end,e,s));0!==e.length&&t.push({objectId:n,points:e})}return[t,s,this._cacheVersion]}_addToQueriesOrCachedResult(e,t,n,o){const i=u(e,t),a=this._alignmentsCache.get(i);s(a)?o.push(new d(t,a)):n.push(t)}_applyCacheAndResponse(e,{elevations:t,drapedObjectIds:s,failedObjectIds:n},o){for(const r of o)r.apply();let i=0;const a=this._alignmentsCache;for(const{objectId:r,points:c}of e){if(n.has(r)){i+=c.length;continue}const e=!s.has(r);for(const s of c){const n=u(r,s),o=t[i++];s.z=o,e&&a.put(n,o,1)}}}}class d{constructor(e,t){this.point=e,this.z=t}apply(){this.point.z=this.z}}function u(e,{x:t,y:s,z:n}){return`${e}-${t}-${s}-${n??0}}`}function p(){return[]}export{r as getSnappingCandidateElevationAligner};