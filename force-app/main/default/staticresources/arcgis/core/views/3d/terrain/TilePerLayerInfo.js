/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{disposeMaybe as t,abortMaybe as s,isSome as e,isNone as i}from"../../../core/maybe.js";import a from"../../../core/ObjectPool.js";import n from"../../../core/PooledArray.js";import{releaseTileData as o}from"./terrainUtils.js";import{computeUpsampleInfo as l}from"./tileUtils.js";class p{constructor(){this.waitingAgents=new n,this._upsampleInfo=null,this.loadingAgent=null,this.requestPromise=null,this.requestAbort=null,this.pendingUpdates=0}static acquire(t){const s=r.acquire();return s._init(t),s}release(){this.dispose(),h.delete(this),r.release(this)}dispose(){this.loadingAgent=t(this.loadingAgent),this.abortRequest(),this._unsetUpsampleInfo(),this.pendingUpdates=0,this._data=o(this._data)}static prune(){r.prune(0)}_init(t){this.waitingAgents.clear(),this._data=o(this._data),this.dataMissing=!1,this.dataInvalidated=!1,this._unsetUpsampleInfo(),this.abortRequest(),this.loadingAgent=null,this.pendingUpdates=0,this._pool=t,this.elevationBounds=null}invalidateSourceData(){this.dataInvalidated=!0,this.dataMissing=!1,this._unsetUpsampleInfo()}abortRequest(){this.requestAbort=s(this.requestAbort),this.requestPromise=null}get upsampleInfo(){return this._upsampleInfo}_unsetUpsampleInfo(){e(this._upsampleInfo)&&(this._upsampleInfo.tile.unrefMapData(),this._pool.release(this._upsampleInfo),this._upsampleInfo=null)}setUpsampleInfo(t,s){if(t===s||i(s))this._unsetUpsampleInfo();else{if(i(this._upsampleInfo))this._upsampleInfo=this._pool.acquire();else{if(this._upsampleInfo.tile===s)return;this._upsampleInfo.tile.unrefMapData()}s.refMapData(),l(t,s,this._upsampleInfo)}}get data(){return this._data}set data(t){o(this._data),this._data=t}}const r=new a(p,null,(()=>{})),h=new Map;function u(){h.size>0&&(console.log(`${h.size} live TilePerLayerInfo allocations:`),h.forEach((t=>console.log(t,"\n"))))}export{p as TilePerLayerInfo,u as printAllocations};