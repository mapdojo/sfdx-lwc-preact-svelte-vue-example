/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{parseUrl as t}from"../utils.js";import{executeAttachmentQuery as r,processAttachmentQueryResult as e}from"./operations/queryAttachments.js";import o from"../support/AttachmentQuery.js";async function m(m,n,s){const u=t(m);return r(u,o.from(n),{...s}).then((t=>e(u,t)))}export{m as executeAttachmentQuery};