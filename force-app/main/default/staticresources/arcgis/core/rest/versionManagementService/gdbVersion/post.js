/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import s from"../../../request.js";import o from"../../../core/Error.js";import{parseUrl as r,asValidOptions as t,encode as i}from"../../utils.js";import n from"./support/PostResult.js";async function e(e,m,p,f){if(!m)throw new o("post:missing-guid","guid for version is missing");const u=r(e),a=p.toJSON();p.rows&&(a.rows=JSON.stringify(p.rows));const c=t(u.query,{query:i({...a,f:"json"}),...f,method:"post"});m.startsWith("{")&&(m=m.slice(1,-1));const w=`${u.path}/versions/${m}/post`,{data:g}=await s(w,c);return n.fromJSON(g)}export{e as post};