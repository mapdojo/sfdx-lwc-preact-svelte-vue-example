/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{getMetersPerUnitForSR as t,inchesPerMeter as n}from"../../core/unitUtils.js";const e=96;function i(i,r){const o=r||i.extent,c=i.width,d=t(o&&o.spatialReference);return o&&c?o.width/c*d*n*e:0}function r(i,r){return i/(t(r)*n*e)}function o(t){return t/(n*e)}function c(i,r){return i*(t(r)*n*e)}function d(t,n){const e=t.extent,i=t.width-(t.padding?t.padding.left+t.padding.right:0),o=r(n,e.spatialReference);return e.clone().expand(o*i/e.width)}export{d as getExtentForScale,r as getResolutionForScale,o as getResolutionInMetersForScale,i as getScale,c as getScaleForResolution};