/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as e,isSome as t}from"../../core/maybe.js";import{hasRunningElapsedTimer as r}from"./capabilities/DisjointTimerQuery.js";function s(t,r){const s=t.capabilities.disjointTimerQuery;return e(s)?null:new i(s,r)}class i{constructor(e,t){this._timer=e,this._queryPool=new Array,this._queryResults=new Map,this._currentQuery=null,t.forEach((e=>{const t=this._timer.createQuery(),r=this._timer.createQuery();this._queryPool.push(t,r),this._queryResults.set(e,null)}))}start(){r||(this._currentQuery=this._queryPool.pop(),e(this._currentQuery)||(this._timer.disjoint(),this._timer.beginTimeElapsed(this._currentQuery)))}stop(t){if(this._timer.disjoint()||e(this._currentQuery)||!this._queryResults.has(t))return this.abort(),null;this._timer.endTimeElapsed();const r=this._queryResults.get(t);if(e(r))return this._queryResults.set(t,this._currentQuery),this._currentQuery=null,null;if(!this._timer.resultAvailable(r))return this._queryPool.unshift(this._currentQuery),this._currentQuery=null,null;const s=this._timer.getResult(r)/1e6;return this._queryPool.unshift(r),this._queryResults.set(t,this._currentQuery),this._currentQuery=null,s}abort(){t(this._currentQuery)&&(this._timer.deleteQuery(this._currentQuery),this._queryPool.unshift(this._timer.createQuery()),this._currentQuery=null)}dispose(){t(this._currentQuery)&&this._timer.deleteQuery(this._currentQuery),this._queryPool.forEach((e=>{this._timer.deleteQuery(e)})),this._queryResults.forEach((t=>{e(t)||this._timer.deleteQuery(t)}))}}export{s as createElapsedTimerPool};