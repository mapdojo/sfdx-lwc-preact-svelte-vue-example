/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{MAX_INDEX_COUNT as t,ManagedTextureBackedBuffer as e}from"./ManagedTextureBackedBuffer.js";class r{constructor(t,e=1){this._rctx=t,this._fieldCount=e,this._buffers=[]}garbageCollect(){this._buffers=this._buffers.filter((t=>0!==t.activeCount||(t.dispose(),!1)))}destroy(){this._buffers.forEach((t=>t.dispose())),this._buffers=[]}getBuffer(r){for(const t of this._buffers)if(t.availableCount>=r)return t;if(r>t)return null;const s=new e(this._rctx,this._fieldCount);return this._buffers.push(s),s}updateTextures(){for(const t of this._buffers)t.textureBuffer.updateTexture()}}export{r as BufferManager};