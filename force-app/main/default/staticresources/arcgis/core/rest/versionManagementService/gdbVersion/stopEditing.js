/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import s from"../../../request.js";import i from"../../../core/Error.js";import{parseUrl as t,asValidOptions as o,encode as r}from"../../utils.js";async function e(e,n,m,u,a){if(!n)throw new i("stop-editing:missing-guid","guid for version is missing");const c=t(e),d=o(c.query,{query:r({sessionId:m,saveEdits:u,f:"json"}),...a,method:"post"});n.startsWith("{")&&(n=n.slice(1,-1));const p=`${c.path}/versions/${n}/stopEditing`,{data:f}=await s(p,d);return!!f&&f.success}export{e as stopEditing};