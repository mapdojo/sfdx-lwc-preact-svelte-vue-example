/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as o,removeMaybe as t}from"../../../../core/maybe.js";import{throwIfAborted as e,onAbort as r}from"../../../../core/promiseUtils.js";import{DefaultLoadingContext as s}from"../../glTF/DefaultLoadingContext.js";import{loadGLTF as a}from"../../glTF/loader.js";import{load as i}from"./wosrLoader.js";class l{constructor(o){this._gltfLoading=new Map,this._wosrLoading=new Map,this._gltfMemCache=o("gltf-resources",(()=>{})),this._wosrMemCache=o("wosr-resources",(()=>{}))}destroy(){this._gltfLoading.forEach((o=>o.abortController.abort())),this._wosrLoading.forEach((o=>o.abortController.abort())),this._gltfMemCache.destroy(),this._wosrMemCache.destroy()}loadGLTF(t,e,r){const i=r?`gltfPBR:${t}`:`gltf:${t}`,l=this._gltfMemCache.get(i);return o(l)?Promise.resolve(l):this._loadOnce(this._gltfLoading,this._gltfMemCache,i,(o=>a(new s(o.streamDataRequester),t,o,r)),e)}loadWOSR(t,e){const r=`wosr:${t}:${e.disableTextures}`,s=this._wosrMemCache.get(r);return o(s)?Promise.resolve(s):this._loadOnce(this._wosrLoading,this._wosrMemCache,r,(o=>i(t,o)),e)}async _loadOnce(o,s,a,i,l){e(l);const n=r(l,(()=>this._abortLoad(o,a)));let c=o.get(a);if(c)c.refCount++;else{const t=new AbortController;c={refCount:1,abortController:t,promise:i({...l,signal:t.signal})},o.set(a,c)}try{const r=await c.promise;return s.put(a,r,r.size),o.delete(a),e(l),r}finally{t(n)}}_abortLoad(t,e){const r=t.get(e);if(o(r)){if(--r.refCount>0)return}t.delete(e),o(r)&&r.abortController.abort()}}export{l as ObjectResourceCache};