/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isFloat32Array as r,isFloat64Array as t}from"../../../typedArrayUtil.js";function n(t){return r(t)&&t.length>=3}function e(r){return(t(r)||Array.isArray(r))&&r.length>=3}function i(r){return n(r)||e(r)}export{i as isVec3,n as isVec3f32,e as isVec3f64};