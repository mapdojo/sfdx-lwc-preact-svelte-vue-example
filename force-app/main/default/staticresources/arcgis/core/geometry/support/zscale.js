/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as n}from"../../core/maybe.js";import{getMetersPerVerticalUnitForSR as e}from"../../core/unitUtils.js";import{equals as t}from"./spatialReferenceUtils.js";function o(o,f,u){if(n(f)||n(u)||u.vcsWkid||t(f,u))return null;const a=e(f)/e(u);if(1===a)return null;switch(o){case"point":case"esriGeometryPoint":return n=>r(n,a);case"polyline":case"esriGeometryPolyline":return n=>s(n,a);case"polygon":case"esriGeometryPolygon":return n=>i(n,a);case"multipoint":case"esriGeometryMultipoint":return n=>c(n,a);case"extent":case"esriGeometryExtent":return n=>l(n,a);default:return null}}function r(n,e){n&&null!=n.z&&(n.z*=e)}function i(n,e){if(n)for(const t of n.rings)for(const n of t)n.length>2&&(n[2]*=e)}function s(n,e){if(n)for(const t of n.paths)for(const n of t)n.length>2&&(n[2]*=e)}function c(n,e){if(n)for(const t of n.points)t.length>2&&(t[2]*=e)}function l(n,e){n&&null!=n.zmin&&null!=n.zmax&&(n.zmin*=e,n.zmax*=e)}export{o as getGeometryZScaler};