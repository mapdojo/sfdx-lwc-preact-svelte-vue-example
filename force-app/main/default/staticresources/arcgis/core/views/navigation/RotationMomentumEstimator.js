/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{MomentumEstimator as t}from"./MomentumEstimator.js";class a extends t{constructor(t=3,a=.01,s=.95,o=12){super(t,a,s,o)}add(t,a){const s=this.value.lastValue;if(null!=s){let a=t-s;for(;a>Math.PI;)a-=2*Math.PI;for(;a<-Math.PI;)a+=2*Math.PI;t=s+a}super.add(t,a)}}export{a as RotationMomentumEstimator};