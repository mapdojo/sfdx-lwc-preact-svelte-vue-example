/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import o from"../../../request.js";import r from"../../../core/Error.js";import{parseUrl as s,asValidOptions as t,encode as i}from"../../utils.js";import e from"./support/ReconcileResult.js";async function n(n,c,m,u){if(!c)throw new r("reconcile:missing-guid","guid for version is missing");const f=s(n),p=m.toJSON(),a=t(f.query,{query:i({...p,f:"json"}),...u,method:"post"});c.startsWith("{")&&(c=c.slice(1,-1));const l=`${f.path}/versions/${c}/reconcile`,{data:j}=await o(l,a);return e.fromJSON(j)}export{n as reconcile};