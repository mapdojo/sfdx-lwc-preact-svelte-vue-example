/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{getAssetUrl as t}from"../assets.js";import has from"../core/has.js";const s=128e3;let n=null,e=null;async function i(){return n||(n=o()),n}async function o(){const s=has("esri-csp-restrictions")?await import("../chunks/libtess-asm.js").then((t=>t.l)):await import("../chunks/libtess.js").then((t=>t.l));e=await s.load({locateFile:s=>t(`esri/core/libs/libtess/${s}`)})}function r(t,n){const i=Math.max(t.length,s);return e.triangulate(t,n,i)}export{i as loadLibtess,r as triangulate};