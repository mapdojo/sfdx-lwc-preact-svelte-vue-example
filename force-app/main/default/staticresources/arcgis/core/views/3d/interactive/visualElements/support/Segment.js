/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{h as t,b as e,n as s,g as r,a as i,c as n}from"../../../../../chunks/vec3.js";import{c as a,a as o}from"../../../../../chunks/vec3f64.js";import{projectVectorToVector as p,canProjectWithoutEngine as c}from"../../../../../geometry/projection.js";import{getSphericalPCPF as h}from"../../../../../geometry/spatialReferenceEllipsoidUtils.js";import{sv3d as d}from"../../../../../geometry/support/vectorStacks.js";import{slerpTangent as l,slerp as _}from"../../../support/mathUtils.js";class f{constructor(t=a(),e=a()){this.startRenderSpace=t,this.endRenderSpace=e,this.type="euclidean"}eval(r,i,n){return t(i,this.startRenderSpace,this.endRenderSpace,r),n&&(e(n,this.endRenderSpace,this.startRenderSpace),s(n,n)),i}createRenderGeometry(t,s){const r=[],i=[],n=(s,n)=>{const a=u;e(a,s,t),r.push([a[0],a[1],a[2]]),i.push([n[0],n[1],n[2]])},a=s.worldUpAtPosition(this.eval(.5,R),d.get());return n(this.startRenderSpace,a),n(this.endRenderSpace,a),{points:r,normals:i}}static fromPositionAndVector(t,e,s=1){return r(R,e,s),i(R,t,R),new f(o(t),o(R))}}class m{_projectIn(t,e){this._project?p(t,this.renderSpatialReference,e,this._pcpf):n(e,t)}constructor(t,e,s){this.startRenderSpace=t,this.endRenderSpace=e,this.renderSpatialReference=s,this.type="geodesic",this._start=a(),this._end=a(),this._pcpf=h(s),this._project=c(s,this._pcpf),this._projectIn(t,this._start),this._projectIn(e,this._end)}eval(r,n,a){if(this._project)if(a){const t=u;l(this._start,this._end,r,n,t),i(S,n,t),p(n,this._pcpf,n,this.renderSpatialReference),p(S,this._pcpf,S,this.renderSpatialReference),e(a,S,n),s(a,a)}else _(this._start,this._end,r,n),p(n,this._pcpf,n,this.renderSpatialReference);else t(n,this._start,this._end,r),a&&(e(a,this._end,this._start),s(a,a));return n}createRenderGeometry(t,s){const r=[],i=[],n=(s,n)=>{const a=S;e(a,s,t),r.push([a[0],a[1],a[2]]),i.push([n[0],n[1],n[2]])},a=128+1&-2;for(let e=0;e<a;++e){const t=e/(a-1),r=R,i=u;this.eval(t,r),s.worldUpAtPosition(r,i),n(r,i)}return{points:r,normals:i}}}const R=a(),u=a(),S=a();export{f as EuclideanSegment,m as GeodesicSegment};