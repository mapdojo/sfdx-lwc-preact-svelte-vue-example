/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import"../../geometry.js";import s from"../../Viewpoint.js";import{JSONSupport as i}from"../../core/JSONSupport.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";import{t as r}from"../../chunks/common.js";import{a,r as n,t as p,c as h}from"../../chunks/mat2d.js";import{c}from"../../chunks/mat2df32.js";import{c as m}from"../../chunks/mat2df64.js";import{s as l,g as f,h as u,r as v,m as w}from"../../chunks/mat3.js";import{c as d}from"../../chunks/mat3f32.js";import{c as j,t as y}from"../../chunks/vec2.js";import{f as R}from"../../chunks/vec2f32.js";import{a as _}from"../../chunks/vec2f64.js";import{isVec2 as x}from"../../core/libs/gl-matrix-2/types/vec2.js";import{copy as z,getMatrix as g,getResolution as S,getExtent as k,getTransform as M,getTransformNoRotation as N,getWorldScreenWidth as T}from"./viewpointUtils.js";import D from"../../geometry/Extent.js";import V from"../../geometry/Point.js";var b;const G=[0,0];let O=b=class extends i{constructor(t){super(t),this._viewpoint2D={center:_(),rotation:0,scale:0,spatialReference:void 0},this.center=[0,0],this.extent=new D,this.id=0,this.inverseTransform=m(),this.resolution=0,this.rotation=0,this.scale=0,this.transform=m(),this.transformNoRotation=m(),this.displayMat3=d(),this.displayViewMat3=d(),this.viewMat3=d(),this.viewMat2d=c(),this.worldScreenWidth=0,this.size=[0,0]}set pixelRatio(t){this._set("pixelRatio",t),this._update()}set size(t){this._set("size",t),this._update()}set viewpoint(t){if(t){const s=this._viewpoint2D,i=t.targetGeometry;s.center[0]=i.x,s.center[1]=i.y,s.rotation=t.rotation,s.scale=t.scale,s.spatialReference=i.spatialReference}this._update()}copy(t){const s=this.size,i=this.viewpoint;return i&&s?(this.viewpoint=z(i,t.viewpoint),this._set("size",j(s,t.size))):(this.viewpoint=t.viewpoint.clone(),this._set("size",[t.size[0],t.size[1]])),this._set("pixelRatio",t.pixelRatio),this}clone(){return new b({size:this.size,viewpoint:this.viewpoint.clone(),pixelRatio:this.pixelRatio})}toMap(t,s,i){return x(s)?y(t,s,this.inverseTransform):(G[0]=s,G[1]=i,y(t,G,this.inverseTransform))}toScreen(t,s,i){return x(s)?y(t,s,this.transform):(G[0]=s,G[1]=i,y(t,G,this.transform))}toScreenNoRotation(t,s,i){return x(s)?y(t,s,this.transformNoRotation):(G[0]=s,G[1]=i,y(t,G,this.transformNoRotation))}getScreenTransform(t,s){const{center:i}=this._viewpoint2D,e=this._get("pixelRatio")||1,o=this._get("size");return g(t,i,o,s,0,e),t}_update(){const{center:t,spatialReference:i,scale:e,rotation:o}=this._viewpoint2D,c=this._get("pixelRatio")||1,m=this._get("size"),d=new s({targetGeometry:new V(t[0],t[1],i),scale:e,rotation:o});if(this._set("viewpoint",d),!m||!i||!e)return;this.resolution=S(d),this.rotation=o,this.scale=e,this.spatialReference=i,j(this.center,t);const y=0!==m[0]?2/m[0]:0,_=0!==m[1]?-2/m[1]:0;l(this.displayMat3,y,0,0,0,_,0,-1,1,1);const x=f(this.viewMat3),z=R(m[0]/2,m[1]/2),g=R(-m[0]/2,-m[1]/2),D=r(o);u(x,x,z),v(x,x,D),u(x,x,g),w(this.displayViewMat3,this.displayMat3,x);const b=a(this.viewMat2d,z);return n(b,b,D),p(b,b,g),k(this.extent,d,m),M(this.transform,d,m,c),h(this.inverseTransform,this.transform),N(this.transformNoRotation,d,m,c),this.worldScreenWidth=T(this.spatialReference,this.resolution),this._set("id",this.id+1),this}};t([e({readOnly:!0})],O.prototype,"id",void 0),t([e({value:1,json:{write:!0}})],O.prototype,"pixelRatio",null),t([e({json:{write:!0}})],O.prototype,"size",null),t([e()],O.prototype,"spatialReference",void 0),t([e({type:s,json:{write:!0}})],O.prototype,"viewpoint",null),O=b=t([o("esri.views.2d.ViewState")],O);const U=O;export{U as default};