/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as e,isSome as t}from"../../../../../core/maybe.js";import{NestedMap as r}from"../../../../../core/NestedMap.js";import{ShaderTechniqueConfiguration as s}from"./ShaderTechniqueConfiguration.js";class n{constructor(e){this._context=e,this._perConstructorInstances=new r,this._frameCounter=0,this._keepAliveFrameCount=c}get viewingMode(){return this._context.viewingMode}get constructionContext(){return this._context}destroy(){this._perConstructorInstances.forEach((e=>e.forEach((e=>e.technique.destroy())))),this._perConstructorInstances.clear()}acquire(t,r=i){const s=r.key;let n=this._perConstructorInstances.get(t,s);if(e(n)){const e=new t(this._context,r,(()=>this.release(e)));n=new o(e),this._perConstructorInstances.set(t,s,n)}return++n.refCount,n.technique}releaseAndAcquire(e,r,s){if(t(s)){if(r.key===s.key)return s;this.release(s)}return this.acquire(e,r)}release(t){if(e(t)||this._perConstructorInstances.empty)return;const r=this._perConstructorInstances.get(t.constructor,t.key);e(r)||(--r.refCount,0===r.refCount&&(r.refZeroFrame=this._frameCounter))}frameUpdate(){this._frameCounter++,this._keepAliveFrameCount!==c&&this._perConstructorInstances.forEach(((e,t)=>{e.forEach(((e,r)=>{0===e.refCount&&e.refZeroFrame+this._keepAliveFrameCount<this._frameCounter&&(e.technique.destroy(),this._perConstructorInstances.delete(t,r))}))}))}async reloadAll(){const e=new Array;this._perConstructorInstances.forEach(((t,r)=>{const s=async(e,t)=>{const r=t.shader;r&&(await r.reload(),e.forEach((e=>e.technique.reload(this._context))))};e.push(s(t,r))})),await Promise.all(e)}}class o{constructor(e){this.technique=e,this.refCount=0,this.refZeroFrame=0}}const c=-1,i=new s;export{n as ShaderTechniqueRepository};