/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function n(n){return n instanceof Float32Array&&n.length>=4}function r(n){return Array.isArray(n)&&n.length>=4}function t(t){return n(t)||r(t)}export{t as isVec4,n as isVec4f32,r as isVec4f64};