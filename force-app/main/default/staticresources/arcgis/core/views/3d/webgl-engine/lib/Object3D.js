/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as t,isNone as e}from"../../../../core/maybe.js";import{c as i,m as s,y as o}from"../../../../chunks/mat4.js";import{c as r}from"../../../../chunks/mat4f64.js";import{h as a,m as n,i as h,s as m,a as c,k as l,c as b}from"../../../../chunks/vec3.js";import{f as d,c as _}from"../../../../chunks/vec3f64.js";import{c as u,l as f}from"../../../../chunks/sphere.js";import{maxScale as g}from"../../support/mathUtils.js";import{Object3DState as p}from"./basicInterfaces.js";import{ContentObject as v}from"./ContentObject.js";import{ContentObjectType as j}from"./ContentObjectType.js";import{Object3DStateID as y}from"./Object3DStateID.js";import{assert as S}from"./Util.js";import{addObject3DStateID as V,removeObject3DStateID as A}from"../materials/renderers/utils.js";class x extends v{get geometries(){return this._geometries}get transformation(){return this._transformation}set transformation(t){i(this._transformation,t),this._invalidateBoundingVolume(),this._emit("objectTransformation",this)}constructor(e={}){super(),this.type=j.Object,this._geometries=new Array,this._transformation=r(),this._bvObjectSpace=new L,this._bvWorldSpace=new L,this._bvDirty=!0,this._hasVolatileTransformation=!1,this._visible=!0,this.castShadow=null==e.castShadow||e.castShadow,this.metadata=e.metadata,this.metadata&&this.metadata.isElevationSource&&(this.metadata.lastValidElevationBB=new M);const i=e.geometries;t(i)&&(this._geometries=Array.from(i))}dispose(){this._geometries.length=0}get parentLayer(){return this._parentLayer}set parentLayer(t){S(null==this._parentLayer||null==t,"Object3D can only be added to a single Layer"),this._parentLayer=t}addGeometry(t){t.visible=this._visible,this._geometries.push(t),this._hasVolatileTransformation=this._hasVolatileTransformation||t.hasVolatileTransformation,this._emit("objectGeometryAdded",{object:this,geometry:t}),this._invalidateBoundingVolume()}removeGeometry(t){const e=this._geometries.splice(t,1)[0];e&&(this._emit("objectGeometryRemoved",{object:this,geometry:e}),this._invalidateBoundingVolume())}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttrsUpdated(t){this._emit("objectGeometryUpdated",{object:this,geometry:t}),this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(t){if(this._visible!==t){this._visible=t;for(const t of this._geometries)t.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const t=new y(p.MaskOccludee);for(const e of this._geometries)e.occludees=V(e.occludees,t);return this._emit("occlusionChanged",this),t}removeOcclude(t){for(const e of this._geometries)e.occludees=A(e.occludees,t);this._emit("occlusionChanged",this)}highlight(){const t=new y(p.Highlight);for(const e of this._geometries)e.highlights=V(e.highlights,t);return this._emit("highlightChanged",this),t}removeHighlight(t){for(const e of this._geometries)e.highlights=A(e.highlights,t);this._emit("highlightChanged",this)}getCombinedStaticTransformation(t,e){return s(e,this.transformation,t.transformation)}_getCombinedShaderTransformation(t){return s(r(),this.transformation,t.shaderTransformation)}hasVolativeTransformation(){return this._hasVolatileTransformation}get boundingVolumeWorldSpace(){return this._validateBoundingVolume(),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._validateBoundingVolume(),this._bvObjectSpace}_validateBoundingVolume(){if(!this._bvDirty&&!this._hasVolatileTransformation)return;this._bvObjectSpace.init(),this._bvWorldSpace.init();for(const e of this._geometries){const i=e.boundingInfo;t(i)&&(O(i,this._bvObjectSpace,e.shaderTransformation),O(i,this._bvWorldSpace,this._getCombinedShaderTransformation(e)))}a(this._bvObjectSpace.bounds,this._bvObjectSpace.min,this._bvObjectSpace.max,.5),a(this._bvWorldSpace.bounds,this._bvWorldSpace.min,this._bvWorldSpace.max,.5);const i=_(),s=_(),o=g(this.transformation);for(const t of this._geometries){const r=t.boundingInfo;if(e(r))continue;const a=t.shaderTransformation,m=g(a);n(i,r.center,a);const c=h(i,this._bvObjectSpace.bounds),l=r.radius*m;this._bvObjectSpace.bounds[3]=Math.max(this._bvObjectSpace.bounds[3],c+l),n(s,i,this.transformation);const b=h(s,this._bvWorldSpace.bounds),d=l*o;this._bvWorldSpace.bounds[3]=Math.max(this._bvWorldSpace.bounds[3],b+d)}this._bvDirty=!1}_invalidateBoundingVolume(){this._bvDirty=!0,t(this._parentLayer)&&this._parentLayer.notifyObjectBBChanged(this,this._bvWorldSpace.bounds)}_emit(e,i){t(this._parentLayer)&&this._parentLayer.events.emit(e,i)}get test(){const t=this;return{hasGeometry:e=>t._geometries.includes(e),getGeometryIndex:e=>t._geometries.indexOf(e)}}}class M{constructor(){this.min=d(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this.max=d(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE)}isEmpty(){return this.max[0]<this.min[0]&&this.max[1]<this.min[1]&&this.max[2]<this.min[2]}}class L extends M{constructor(){super(...arguments),this.bounds=u()}init(){m(this.min,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),m(this.max,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),f(this.bounds)}}function O(t,e,i){const s=t.bbMin,r=t.bbMax;if(o(i)){const t=m(U,i[12],i[13],i[14]);c(E,s,t),c(T,r,t);for(let i=0;i<3;++i)e.min[i]=Math.min(e.min[i],E[i]),e.max[i]=Math.max(e.max[i],T[i])}else if(n(E,s,i),l(s,r))for(let o=0;o<3;++o)e.min[o]=Math.min(e.min[o],E[o]),e.max[o]=Math.max(e.max[o],E[o]);else{n(T,r,i);for(let t=0;t<3;++t)e.min[t]=Math.min(e.min[t],E[t],T[t]),e.max[t]=Math.max(e.max[t],E[t],T[t]);for(let t=0;t<3;++t){b(E,s),b(T,r),E[t]=r[t],T[t]=s[t],n(E,E,i),n(T,T,i);for(let t=0;t<3;++t)e.min[t]=Math.min(e.min[t],E[t],T[t]),e.max[t]=Math.max(e.max[t],E[t],T[t])}}}const U=_(),E=_(),T=_();export{x as Object3D};