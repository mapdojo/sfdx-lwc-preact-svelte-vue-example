/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as r}from"../../../../core/maybe.js";import{ResourceState as t}from"./basicInterfaces.js";class e{constructor(r,t){this._material=r,this._repository=t,this._map=new Map}destroy(){this._map.forEach(((t,e)=>{r(t)&&this._repository.release(this._material,e)}))}load(e,s,i){if(!this._material.requiresSlot(s,i))return null;this._map.has(i)||this._map.set(i,this._repository.acquire(this._material,s,i));const a=this._map.get(i);if(r(a)){if(a.ensureResources(e)===t.LOADED)return a;this._repository.requestRender()}return null}}export{e as GLMaterials};