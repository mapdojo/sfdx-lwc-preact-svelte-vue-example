/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../../core/Logger.js";import{isNone as t,isSome as r,disposeMaybe as i}from"../../../../core/maybe.js";import{NestedMap as s}from"../../../../core/NestedMap.js";import{assert as o}from"./Util.js";class a{constructor(e,t,r,i){this._textureRepository=e,this._techniqueRepository=t,this.materialChanged=r,this.requestRender=i,this._id2glMaterialRef=new s}dispose(){this._textureRepository.destroy()}acquire(e,r,i){if(this._ownMaterial(e),!e.requiresSlot(r,i))return null;let s=this._id2glMaterialRef.get(i,e.id);if(t(s)){const t=e.createGLMaterial({material:e,techniqueRep:this._techniqueRepository,textureRep:this._textureRepository,output:i});s=new l(t),this._id2glMaterialRef.set(i,e.id,s)}return s.ref(),s.glMaterial}release(e,t){const s=this._id2glMaterialRef.get(t,e.id);r(s)&&(s.unref(),s.referenced||(i(s.glMaterial),this._id2glMaterialRef.delete(t,e.id)))}_ownMaterial(t){r(t.repository)&&t.repository!==this&&e.getLogger("esri.views.3d.webgl-engine.lib.GLMaterialRepository").error("Material is already owned by a different material repository"),t.repository=this}}class l{constructor(e){this.glMaterial=e,this._refCnt=0}ref(){++this._refCnt}unref(){--this._refCnt,o(this._refCnt>=0)}get referenced(){return this._refCnt>0}}export{a as GLMaterialRepository};