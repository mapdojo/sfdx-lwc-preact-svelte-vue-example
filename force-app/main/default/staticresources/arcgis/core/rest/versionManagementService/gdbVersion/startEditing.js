/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import s from"../../../request.js";import t from"../../../core/Error.js";import{parseUrl as i,asValidOptions as r,encode as o}from"../../utils.js";async function e(e,n,a,m){if(!n)throw new t("start-editing:missing-guid","guid for version is missing");const u=i(e),c=r(u.query,{query:o({sessionId:a,f:"json"}),...m,method:"post"});n.startsWith("{")&&(n=n.slice(1,-1));const d=`${u.path}/versions/${n}/startEditing`,{data:f}=await s(d,c);return!!f&&f.success}export{e as startEditing};