/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{a as e,d as s,c as a}from"../../../../chunks/boundedPlane.js";const t=e();class n{constructor(){this._plane=e()}get isEnabled(){return!s(this.plane,t)}get plane(){return this._plane}set plane(e){a(e||t,this._plane)}}export{n as default};