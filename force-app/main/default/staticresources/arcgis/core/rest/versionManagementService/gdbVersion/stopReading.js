/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import s from"../../../request.js";import o from"../../../core/Error.js";import{parseUrl as r,asValidOptions as i,encode as t}from"../../utils.js";async function e(e,n,a,m){if(!n)throw new o("stop-reading:missing-guid","guid for version is missing");const u=r(e),c=i(u.query,{query:t({sessionId:a,f:"json"}),...m,method:"post"});n.startsWith("{")&&(n=n.slice(1,-1));const p=`${u.path}/versions/${n}/stopReading`,{data:d}=await s(p,c);return!!d&&d.success}export{e as stopReading};