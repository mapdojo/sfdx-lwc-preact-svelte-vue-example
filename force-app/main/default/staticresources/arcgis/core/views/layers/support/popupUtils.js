/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as e,isSome as l}from"../../../core/maybe.js";import{getFeatureEditFields as p,fixFields as t}from"../../../layers/support/fieldUtils.js";async function d(l,d=l.popupTemplate){if(e(d))return[];const s=await d.getRequiredFields(l.fieldsIndex),{lastEditInfoEnabled:i}=d,{objectIdField:n,typeIdField:u,globalIdField:a,relationships:o}=l;if(s.includes("*"))return["*"];const r=i?await p(l):[],f=t(l.fieldsIndex,[...s,...r]);return u&&f.push(u),f&&n&&l.fieldsIndex?.has(n)&&!f.includes(n)&&f.push(n),f&&a&&l.fieldsIndex?.has(a)&&!f.includes(a)&&f.push(a),o&&o.forEach((e=>{const{keyField:p}=e;f&&p&&l.fieldsIndex?.has(p)&&!f.includes(p)&&f.push(p)})),f}function s(e,p){return e.popupTemplate?e.popupTemplate:l(p)&&p.defaultPopupTemplateEnabled&&l(e.defaultPopupTemplate)?e.defaultPopupTemplate:null}export{s as getFetchPopupTemplate,d as getRequiredFields};