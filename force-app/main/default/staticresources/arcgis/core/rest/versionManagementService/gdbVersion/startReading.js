/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import s from"../../../request.js";import r from"../../../core/Error.js";import{parseUrl as t,asValidOptions as i,encode as o}from"../../utils.js";async function e(e,n,a,m){if(!n)throw new r("start-reading:missing-guid","guid for version is missing");const u=t(e),c=i(u.query,{query:o({sessionId:a,f:"json"}),...m,method:"post"});n.startsWith("{")&&(n=n.slice(1,-1));const d=`${u.path}/versions/${n}/startReading`,{data:f}=await s(d,c);return!!f&&f.success}export{e as startReading};