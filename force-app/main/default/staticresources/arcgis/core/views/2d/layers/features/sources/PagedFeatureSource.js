/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../../../core/Error.js";import t from"../../../../../core/Logger.js";import{isSome as r}from"../../../../../core/maybe.js";import{isAbortError as a,throwIfAborted as s,throwIfNotAbortError as i}from"../../../../../core/promiseUtils.js";import{BaseFeatureSource as o}from"./BaseFeatureSource.js";class n extends o{constructor(e){super(e)}async _fetchDataTile(r){const i=6,o=20,n=this._subscriptions.get(r.key.id);let d=!1,c=0,u=0;const p=(e,t)=>{u--,s(n);const a=r.id,i=e.reader,o=e.query;if(!i.exceededTransferLimit){if(d=!0,0!==t&&!i.hasFeatures){const e={id:a,addOrUpdate:i,end:0===u,type:"append"};return n.add({message:e,query:o}),void this._onMessage(e)}const e={id:a,addOrUpdate:i,end:0===u,type:"append"};return n.add({message:e,query:o}),void this._onMessage(e)}const c={id:a,addOrUpdate:i,end:d&&0===u,type:"append"};n.add({message:c,query:o}),this._onMessage(c)};let h=0,m=0;for(;!d&&m++<o;){let o;for(let s=0;s<h+1;s++){const s=c++;u++,o=this._fetchDataTilePage(r,s,n).then((e=>e&&p(e,s))).catch((s=>{d=!0,a(s)||(t.getLogger("esri.views.2d.layers.features.sources.PagedFeatureSource").error(new e("mapview-query-error","Encountered error when fetching tile",{tile:r,error:s})),this._onMessage({id:r.id,addOrUpdate:null,end:d,type:"append"}))}))}await o,s(n),h=Math.min(h+2,i)}}async _fetchDataTilePage(e,t,a){s(a);const o=this._queryInfo,n={start:this.pageSize*t,num:this.pageSize,returnExceededLimitFeatures:!0,quantizationParameters:e.getQuantizationParameters()};r(this.maxRecordCountFactor)&&(n.maxRecordCountFactor=this.maxRecordCountFactor);const d=this.createTileQuery(e,n);try{const r=a.signal,i=await this._queue.push({tile:e,query:d,signal:r,depth:t});return s(a),i?o!==this._queryInfo?this._fetchDataTilePage(e,t,a):{reader:i,query:d}:null}catch(c){return i(c),null}}}export{n as PagedFeatureSource};