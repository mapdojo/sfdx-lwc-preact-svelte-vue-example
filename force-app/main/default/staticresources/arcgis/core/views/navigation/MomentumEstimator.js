/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clamp as t}from"../../core/mathUtils.js";import{FilteredFiniteDifference as e}from"./FilteredFiniteDifference.js";import{Momentum as i}from"./Momentum.js";class s{constructor(t=2.5,i=.01,s=.95,l=12){this._minimumInitialVelocity=t,this._stopVelocity=i,this._friction=s,this._maxVelocity=l,this.enabled=!0,this.value=new e(.8),this.time=new e(.3)}add(t,e){if(this.enabled&&null!=e){if(this.time.hasLastValue()){if(this.time.computeDelta(e)<.01)return;if(this.value.hasFilteredDelta()){const e=this.value.computeDelta(t);this.value.filteredDelta*e<0&&this.value.reset()}}this.time.update(e),this.value.update(t)}}reset(){this.value.reset(),this.time.reset()}evaluateMomentum(){if(!this.enabled||!this.value.hasFilteredDelta()||!this.time.hasFilteredDelta())return null;let e=this.value.filteredDelta/this.time.filteredDelta;return e=t(e,-this._maxVelocity,this._maxVelocity),Math.abs(e)<this._minimumInitialVelocity?null:this.createMomentum(e,this._stopVelocity,this._friction)}createMomentum(t,e,s){return new i(t,e,s)}}export{s as MomentumEstimator};