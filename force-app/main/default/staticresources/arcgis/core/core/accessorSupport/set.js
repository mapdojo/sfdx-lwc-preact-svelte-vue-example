/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import o from"../Error.js";import has from"../has.js";import"../Logger.js";import{get as r}from"./get.js";function t(o,e,s){if(o&&e)if("object"==typeof e)for(const r of Object.getOwnPropertyNames(e))t(o,r,e[r]);else{if(e.includes(".")){const n=e.split("."),i=n.splice(n.length-1,1)[0];return void t(r(o,n),i,s)}const i=o.__accessor__;null!=i&&n(e,i),o[e]=s}}function n(r,t){if(has("esri-unknown-property-errors")&&!e(r,t))throw new o("set:unknown-property",s(r,t))}function e(o,r){return null!=r.metadatas[o]}function s(o,r){return"setting unknown property '"+o+"' on instance of "+r.host.declaredClass}export{t as set};