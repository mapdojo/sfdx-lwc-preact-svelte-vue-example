/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{s as e,l as t,g as i}from"../../chunks/vec3.js";import{c as s}from"../../chunks/vec3f64.js";import{FilteredFiniteDifference as n}from"./FilteredFiniteDifference.js";import{Momentum as r}from"./Momentum.js";class c extends r{constructor(e,t,i,s,n){super(e,t,i),this._sceneVelocity=s,this.direction=n}value(e){return super.valueFromInitialVelocity(this._sceneVelocity,e)}}class l{constructor(e=300,t=12,i=.84){this._minimumInitialVelocity=e,this._stopVelocity=t,this._friction=i,this.enabled=!0,this._time=new n(.6),this._screen=[new n(.4),new n(.4)],this._scene=[new n(.6),new n(.6),new n(.6)],this._tmpDirection=s()}add(e,t,i){if(this.enabled){if(this._time.hasLastValue()){if(this._time.computeDelta(i)<.015)return}this._screen[0].update(e[0]),this._screen[1].update(e[1]),this._scene[0].update(t[0]),this._scene[1].update(t[1]),this._scene[2].update(t[2]),this._time.update(i)}}reset(){this._screen[0].reset(),this._screen[1].reset(),this._scene[0].reset(),this._scene[1].reset(),this._scene[2].reset(),this._time.reset()}evaluateMomentum(){if(!this.enabled||!this._screen[0].hasFilteredDelta()||!this._time.hasFilteredDelta())return null;const e=this._screen[0].filteredDelta,t=this._screen[1].filteredDelta,i=null==e||null==t?0:Math.sqrt(e*e+t*t),s=this._time.filteredDelta,n=null==s||null==i?0:i/s;return Math.abs(n)<this._minimumInitialVelocity?null:this.createMomentum(n,this._stopVelocity,this._friction)}createMomentum(s,n,r){e(this._tmpDirection,this._scene[0].filteredDelta??0,this._scene[1].filteredDelta??0,this._scene[2].filteredDelta??0);const l=t(this._tmpDirection);l>0&&i(this._tmpDirection,this._tmpDirection,1/l);const h=this._time.filteredDelta;return new c(s,n,r,null==h?0:l/h,this._tmpDirection)}}export{c as PanPlanarMomentum,l as PanPlanarMomentumEstimator};