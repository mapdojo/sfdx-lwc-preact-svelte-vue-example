/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"./DirtyMap.js";import e from"./DisplayRecordStore.js";import s from"./WGLBuffers.js";import{WGLTile as i}from"./WGLTile.js";class a extends i{constructor(){super(...arguments),this._data=null,this._displayList=null,this._lastCommitTime=0,this._hasData=!1,this._invalidated=!1,this._wglBuffers=null,this._dirtyMap=new t}destroy(){super.destroy(),this.clear()}get hasData(){return!!this._hasData}get displayObjects(){return this._displayObjects??[]}getGeometry(t){return this._wglBuffers&&this._wglBuffers.has(t)?this._wglBuffers.get(t):null}getDisplayList(){return this._displayList}patch(s){if(!0===s.clear)return this.clear(),void(this._hasData=!1);const i=s.addOrUpdate,a=s.remove;!this._data&&i&&i.tileDisplayData?.displayObjects.length?(i.tileDisplayData.computeDisplayList(),this._dirtyMap=new t,this._dispRecStore=e.fromTileData(i,this._dirtyMap),this._data=i,this._dirtyMap.markAllDirty(),this._hasData=!0,s.end&&this.ready()):this._data&&(i&&i.tileDisplayData?.displayObjects.length||a.length)?this._doPatchData(s):s.end&&this.ready(),s.end&&!this._data&&this.clear(),this.requestRender(),this.emit("change")}commit(t){t.time&&t.time===this._lastCommitTime||(this._lastCommitTime=t.time,this.visible&&this._data&&(this._wglBuffers||(this._wglBuffers=new s(t.context)),(this._dirtyMap.hasDirty()||this._invalidated)&&(this._invalidated=!1,this._wglBuffers.upload(this._data.tileBufferData,this._dirtyMap),this._displayList=this._data.tileDisplayData.displayList.clone(),this._displayObjects=this._data.tileDisplayData.displayObjects.slice(),this._dirtyMap.markAllClean())))}clear(){this._data=null,this._displayList=null,this._dispRecStore=null,this._wglBuffers&&(this._wglBuffers.dispose(),this._wglBuffers=null)}_doPatchData(t){this._invalidated=!0,this._patchData(t)||(this._dirtyMap.markAllDirty(),this._data.reshuffle(),this._dispRecStore=e.fromTileData(this._data,this._dirtyMap)),this.requestRender()}_patchData(t){let e=!0;const s=t.addOrUpdate&&t.addOrUpdate.tileDisplayData&&t.addOrUpdate.tileDisplayData.displayObjects||[],i=(t.remove||[]).slice();for(const r of s)null!=r.insertAfter&&i.push(r.id);let a;i.length>0&&(a=new Set(i));const l=this._data.tileDisplayData;for(const r of i){const t=l.displayObjectRegistry.get(r);if(t){l.displayList.removeFromList(t.displayRecords);for(const e of t.displayRecords)this._dispRecStore.delete(e);l.displayObjectRegistry.delete(r)}}a?.size&&(l.displayObjects=l.displayObjects.filter((t=>!a.has(t.id))));for(const r of s){let s,i=l.displayObjectRegistry.get(r.id);if(i){const t=i.displayRecords;i.set(r),i.displayRecords=t;const e=i.displayRecords.length;for(let s=0;s<e;++s){const t=i.displayRecords[s],e=r.displayRecords[s];(s>=r.displayRecords.length||t.geometryType!==e.geometryType||t.symbolLevel!==e.symbolLevel||t.zOrder!==e.zOrder||t.materialKey!==e.materialKey)&&(this._dispRecStore.delete(i.displayRecords[s]),s<r.displayRecords.length&&(i.displayRecords[s]=void 0))}i.displayRecords.length=r.displayRecords.length}else{let t;i=r.copy(),i.displayRecords=[],l.displayObjectRegistry.set(r.id,i);const e=l.displayObjects;if(null!=i.insertAfter)if(s={},i.insertAfter>=0){const s=l.displayObjectRegistry.get(i.insertAfter);s?(t=e.indexOf(s)+1,t<e.length?e.splice(t,0,i):(e.push(i),t=e.length)):(e.push(i),t=e.length)}else e.unshift(i),t=0;else e.push(i),t=e.length;if(s){const i=r.displayRecords.length>0?1:0;let a=0;for(let r=t-1;r>=0&&a<i;--r)for(let t=e[r].displayRecords.length-1;t>=0&&a<i;--t){const i=e[r].displayRecords[t],d=l.displayList.getDPInfoType();s[d]||(s[d]=i,++a)}}}const a=r.displayRecords.length;for(let d=0;d<a;++d){const a=r.displayRecords[d];let o=i.displayRecords[d];o?(o.meshData=a.meshData,o.materialKey=a.materialKey):(o=a.copy(),o.vertexFrom=void 0,o.indexFrom=void 0,i.displayRecords[d]=o);const h=a.geometryType,p=l.displayList.getDPInfoType(),y=t.addOrUpdate.tileBufferData.geometries[h],c=y.vertexBuffer,n=y.indexBuffer;let f;s&&(f=s[p]?l.displayList.splitAfter(s[p]):-1),e=this._dispRecStore.setMeshData(o,a,c,n,f)&&e,s&&null!=o.indexFrom&&null!=o.indexFrom&&(s[p]=o)}}return e}}export{a as GraphicTile};