/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clone as t}from"../../../core/lang.js";import{create as s}from"../../../geometry/support/aaBoundingRect.js";import{getBoundsXY as i}from"../../../geometry/support/boundsUtils.js";import{isExtent as r,isPolygon as n,isPolyline as o,isMultipoint as e,isPoint as a}from"../../../geometry/support/jsonUtils.js";class c{static local(){return null===c.instance&&(c.instance=new c),c.instance}execute(t,s,i,r,n){return new l(t,s,i)}}c.instance=null;class l{constructor(t,s,i){this._inputGeometries=t,this._xFactor=void 0!==s.xScaleFactor?s.xScaleFactor:1.15,this._yFactor=void 0!==s.yScaleFactor?s.yScaleFactor:1.15}next(){let c=this._inputGeometries.next();for(;c;){if(1===this._xFactor&&1===this._yFactor)return c;const l=s();i(l,c);const u=(l[2]+l[0])/2,m=(l[3]+l[1])/2;if(r(c)){const t={rings:[[[c.xmin,c.ymin],[c.xmin,c.ymax],[c.xmax,c.ymax],[c.xmax,c.ymin],[c.xmin,c.ymin]]]};return this._scaleMultipath(t.rings,u,m),t}if(n(c)){const s=t(c);return this._scaleMultipath(s.rings,u,m),s}if(o(c)){const s=t(c);return this._scaleMultipath(s.paths,u,m),s}if(e(c)){const s=t(c);return this._scalePath(s.points,u,m),s}if(a(c))return c;c=this._inputGeometries.next()}return null}_scaleMultipath(t,s,i){if(t)for(const r of t)this._scalePath(r,s,i)}_scalePath(t,s,i){if(t)for(const r of t){const t=(r[0]-s)*this._xFactor,n=(r[1]-i)*this._yFactor;r[0]=s+t,r[1]=i+n}}}export{c as EffectScale};