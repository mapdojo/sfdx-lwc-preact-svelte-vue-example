/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../../core/maybe.js";import{createScreenPointArray as t}from"../../core/screenUtils.js";import{makeDehydratedPoint as s}from"../../layers/graphics/dehydratedFeatures.js";import{clonePoint as i}from"../../layers/graphics/hydratedFeatures.js";import{getConvertedElevation as r,getZForElevationMode as n}from"../../support/elevationInfoUtils.js";class o{constructor(e,t,s,i=null){this._elevationInfo=e,this.defaultZ=t,this._view=s,this._excludeGraphics=i}screenToMap(s){if(e(this.defaultZ))return this._view.sceneIntersectionHelper.intersectElevationFromScreen(t(s.x,s.y),this._elevationInfo,this.defaultZ,this._excludeGraphics);const i=this._view.sceneIntersectionHelper.intersectElevationFromScreen(t(s.x,s.y),this._elevationInfo,0,this._excludeGraphics);return e(i)&&(i.z=void 0),i}mapToScreen(e){const t=s(e.x,e.y,r(this._view,e,this._elevationInfo),e.spatialReference);return this._view.toScreen(t)}constrainZ(t){const{defaultZ:s}=this;return e(s)&&t.z!==s&&((t=i(t)).z=s),t}}class c{constructor(e,t,s=[]){this.view=e,this.elevationInfo=t,this.exclude=s}screenToMap(t){const s=this.view.toMap(t,{exclude:this.exclude});return e(s)&&(s.z=n(s,this.view,this.elevationInfo)),s}mapToScreen(t){let i=t;return e(this.elevationInfo)&&(i=s(t.x,t.y,r(this.view,t,this.elevationInfo),t.spatialReference)),this.view.toScreen(i)}constrainZ(e){return e}}class a{constructor(e,t=!1,s=0){this.view=e,this.hasZ=t,this.defaultZ=s,this.mapToScreen=t=>e.toScreen(t),this.screenToMap=t?t=>{const i=e.toMap(t);return i.z=s,i}:t=>e.toMap(t)}constrainZ(e){const{defaultZ:t}=this;return this.hasZ&&e.z!==t&&((e=i(e)).z=t),e}}export{o as ElevationDrawSurface,a as MapDrawSurface,c as SceneDrawSurface};