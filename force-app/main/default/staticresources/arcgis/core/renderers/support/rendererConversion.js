/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../core/has.js";import r from"../../core/Error.js";import{isNone as e,isSome as n}from"../../core/maybe.js";import{to3D as o,defaultTo3DOptions as t}from"../../symbols/support/symbolConversion.js";function s(r){return e(r)||"simple"===r.type||"unique-value"===r.type||"class-breaks"===r.type||"dictionary"===r.type||"heatmap"===r.type}function u(n,o){if(e(n))return null;if(!s(n))return new r("renderer-conversion-3d:unsupported-renderer",`Unsupported renderer of type '${n.type||n.declaredClass}'`,{renderer:n});switch(n.type){case"simple":return i(n);case"unique-value":return a(n,o);case"class-breaks":return p(n);case"dictionary":case"heatmap":return null}return null}function l(e,n){if(!n)return null;let o;if(o=Array.isArray(n)?n:[n],o.length>0){const n=o.map((r=>r.details.symbol.type||r.details.symbol.declaredClass)).filter((r=>!!r));n.sort();const t=[];return n.forEach(((r,e)=>{0!==e&&r===n[e-1]||t.push(r)})),new r("renderer-conversion-3d:unsupported-symbols",`Renderer contains symbols (${t.join(", ")}) which are not supported in 3D`,{renderer:e,symbolErrors:o})}return null}function i(r){return l(r,o(r.symbol).error)}function a(r,e){const s={...t,...e},u=r.uniqueValueInfos?.map((r=>o(r.symbol,s).error)).filter(n),i=o(r.defaultSymbol,s);return i.error&&u?.unshift(i.error),l(r,u)}function p(r){const e=r.classBreakInfos.map((r=>o(r.symbol).error)).filter(n),t=o(r.defaultSymbol);return t.error&&e.unshift(t.error),l(r,e)}export{s as isSupportedRenderer3D,u as validateTo3D};