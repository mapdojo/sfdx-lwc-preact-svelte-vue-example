/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as e,unwrapOrThrow as t}from"../../core/maybe.js";import{hasRunningElapsedTimer as i}from"./capabilities/DisjointTimerQuery.js";function s(t){const s=t.capabilities.disjointTimerQuery;return e(s)?null:s.timestampBits()>0?new h(s):i?null:new r(s)}class r{constructor(e){this._timer=e,this._timer.disjoint(),this._query=this._timer.createQuery(),this._timer.beginTimeElapsed(this._query)}stop(e,t=50){this._timer.endTimeElapsed(),this._checkQueryResult(e,t)}abort(){this._deleteQuery()}_deleteQuery(){this._query&&(this._timer.deleteQuery(this._query),this._query=null)}_checkQueryResult(e,i){if(this._timer.disjoint())return this._deleteQuery(),void e(null);const s=t(this._query);if(!this._timer.resultAvailable(s))return void setTimeout((()=>this._checkQueryResult(e,i)),i);const r=this._timer.getResult(s);this._deleteQuery(),e(r/1e6)}}class h{constructor(e){this._timer=e,this._timer.disjoint(),this._start=this._timer.createQuery(),this._end=this._timer.createQuery(),this._timer.createTimestamp(this._start)}abort(){this._deleteQueries()}stop(e,i=50){this._timer.createTimestamp(t(this._end)),this._checkQueryResult(e,i)}_deleteQueries(){this._start&&(this._timer.deleteQuery(this._start),this._start=null),this._end&&(this._timer.deleteQuery(this._end),this._end=null)}_checkQueryResult(e,i){if(this._timer.disjoint())return this._deleteQueries(),void e(null);if(!(this._end&&this._timer.resultAvailable(this._end)))return void setTimeout((()=>this._checkQueryResult(e,i)),i);const s=this._timer.getResult(t(this._start)),r=this._timer.getResult(t(this._end));this._deleteQueries(),e((r-s)/1e6)}}export{s as startMeasurement};