/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clone as t}from"../../core/lang.js";import{TileClipper as o,GeometryType as e}from"../../geometry/support/TileClipper.js";const n=512;let r;class s{constructor(t){this._geometry=t}next(){const t=this._geometry;return this._geometry=null,t}}function i(o){return t(o)}function l(t,s){let i,l;r||(r=new o(0,0,0,1)),r.reset(e.Polygon),r.setPixelMargin(s+1),r.setExtent(n);for(const o of t.rings)if(o&&!(o.length<3)){i=o[0][0],l=-o[0][1],r.moveTo(i,l);for(let t=1;t<o.length;t++)i=o[t][0],l=-o[t][1],r.lineTo(i,l);r.close()}const c=r.result(!1);if(c){const t=[];for(const o of c){const e=[];t.push(e);for(const t of o)e.push([t.x,-t.y])}return{rings:t}}return{rings:[]}}function c(t,s){let i,l;r||(r=new o(0,0,0,1)),r.reset(e.LineString),r.setPixelMargin(s+1),r.setExtent(n);for(const o of t.paths)if(o&&!(o.length<2)){i=o[0][0],l=-o[0][1],r.moveTo(i,l);for(let t=1;t<o.length;t++)i=o[t][0],l=-o[t][1],r.lineTo(i,l)}const c=r.result(!1);if(c){const t=[];for(const o of c){const e=[];t.push(e);for(const t of o)e.push([t.x,-t.y])}return{paths:t}}return{paths:[]}}export{s as SimpleGeometryCursor,l as clipPolygonToTileExtent,c as clipPolylineToTileExtent,i as clone};