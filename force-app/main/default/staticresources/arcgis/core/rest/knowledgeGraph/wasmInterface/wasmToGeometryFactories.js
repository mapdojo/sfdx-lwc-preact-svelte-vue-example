/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import o from"../../../core/Error.js";import t from"../../../geometry/Multipoint.js";import e from"../../../geometry/Point.js";import r from"../../../geometry/Polygon.js";import n from"../../../geometry/Polyline.js";import{WasmGeometryTypeCodes as s}from"./KnowledgeWasmInterface.js";function l(o){const e={},r=c(o,e),n=o.lengths,s=o.coords,l=n[0];e.points=[];let m=0;for(let t=0;t<l;t++){const o=[];for(let t=0;t<r;t++)o[t]=s[m],m++;e.points.push(o)}return new t(e)}function m(o){const t={};let r=2;c(o,t);const n=o.coords;return t.x=n[0],t.y=n[1],o.has_z&&(t.z=n[r],r++),o.has_m&&(t.m=n[r]),new e(t)}function i(o){return new n(a(o))}function f(o){return new r(a(o))}function a(t){const e={},r=c(t,e),n=t.lengths,l=t.coords;let m="";if(t.geometry_type.value===s.ESRI_GEOMETRY_POLYGON)m="rings";else{if(t.geometry_type.value!==s.ESRI_GEOMETRY_POLYLINE)throw new o("KnowledgeGraph:illegal-geometry-type","Illegal Geometry type for multipath conversion");m="paths"}e[m]=[];let i=0;return n.forEach((o=>{const t=[];for(let e=0;e<o;e++){const o=[];for(let t=0;t<r;t++)o[t]=l[i],i++;t.push(o)}e[m].push(t)})),e}function c(o,t){let e=2;return o.has_z?(t.hasZ=o.has_z,e++):t.hasZ=!1,o.has_m?(t.hasM=o.has_m,e++):t.hasM=!1,e}export{l as wasmToMultipointGeometry,m as wasmToPointGeometry,f as wasmToPolygonGeometry,i as wasmToPolylineGeometry};