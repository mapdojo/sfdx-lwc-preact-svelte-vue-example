/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import has from"../../../../core/has.js";import{isSome as t,unwrapOrThrow as e,isNone as s}from"../../../../core/maybe.js";import{FreeList as r}from"./cpuMapped/FreeList.js";const a=has("esri-2d-log-allocations");class i{constructor(t,e){this._array=t,this._pool=e}get array(){return this._array}get length(){return this._array.length}static create(t,e){const s=e.acquire(t);return new i(s,e)}expand(t){const e=this._pool.acquire(t);e.set(this._array),this._pool.release(this._array),this._array=e}destroy(){this._pool.release(this._array)}set(t,e){this._array.set(t._array,e)}slice(){const t=this._pool.acquire(this._array.byteLength);return t.set(this._array),new i(t,this._pool)}}class o{constructor(){this._data=new ArrayBuffer(o.BYTE_LENGTH),this._freeList=new r({start:0,end:this._data.byteLength})}static get BYTE_LENGTH(){return 64e6}get buffer(){return this._data}allocate(t){const e=this._freeList.firstFit(t);return s(e)?null:new Uint32Array(this._data,e,t/Uint32Array.BYTES_PER_ELEMENT)}free(t){this._freeList.free(t.byteOffset,t.byteLength)}}class n{constructor(){this._bytesAllocated=0,this._pages=[],this._pagesByBuffer=new Map,this._addPage()}destroy(){this._pages=[],this._pagesByBuffer=null}get _bytesTotal(){return this._pages.length*o.BYTE_LENGTH}acquire(s){if(this._bytesAllocated+=s,a&&console.log(`Allocating ${s}, (${this._bytesAllocated} / ${this._bytesTotal})`),s>o.BYTE_LENGTH)return new Uint32Array(s/Uint32Array.BYTES_PER_ELEMENT);for(const e of this._pages){const r=e.allocate(s);if(t(r))return r}return e(this._addPage().allocate(s),"Expected to allocate page")}release(t){this._bytesAllocated-=t.byteLength,a&&console.log(`Freeing ${t.byteLength}, (${this._bytesAllocated} / ${this._bytesTotal})`);const e=this._pagesByBuffer.get(t.buffer);e&&e.free(t)}_addPage(){const t=new o;return this._pages.push(t),this._pagesByBuffer.set(t.buffer,t),t}}export{n as BufferPool,i as TypedBuffer};