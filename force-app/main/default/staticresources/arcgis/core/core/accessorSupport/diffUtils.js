/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../Accessor.js";import t from"../Collection.js";import{isNone as n,isSome as o}from"../maybe.js";import{getProperties as r}from"./utils.js";const f=["esri.Color","esri.portal.Portal","esri.symbols.support.Symbol3DAnchorPosition2D","esri.symbols.support.Symbol3DAnchorPosition3D"];function i(t){return t instanceof e}function c(e){return e instanceof t?Object.keys(e.items):i(e)?r(e).keys():e?Object.keys(e):[]}function l(e,n){return e instanceof t?e.items[n]:e[n]}function u(e,t){return!(!Array.isArray(e)||!Array.isArray(t))&&e.length!==t.length}function s(e){return e?e.declaredClass:null}function p(e,t){const n=e.diff;if(n&&"function"==typeof n)return n(e,t);const r=c(e),a=c(t);if(0===r.length&&0===a.length)return;if(!r.length||!a.length||u(e,t))return{type:"complete",oldValue:e,newValue:t};const y=a.filter((e=>!r.includes(e))),m=r.filter((e=>!a.includes(e))),d=r.filter((n=>a.includes(n)&&l(e,n)!==l(t,n))).concat(y,m).sort(),b=s(e);if(b&&f.includes(b)&&d.length)return{type:"complete",oldValue:e,newValue:t};let h;const g=i(e)&&i(t);for(const f of d){const r=l(e,f),i=l(t,f);let c;if((g||"function"!=typeof r&&"function"!=typeof i)&&(r!==i&&(null!=r||null!=i))){if(n&&n[f]&&"function"==typeof n[f])c=n[f](r,i);else if(r instanceof Date&&i instanceof Date){if(r.getTime()===i.getTime())continue;c={type:"complete",oldValue:r,newValue:i}}else c="object"==typeof r&&"object"==typeof i&&s(r)===s(i)?p(r,i):{type:"complete",oldValue:r,newValue:i};o(c)&&(o(h)?h.diff[f]=c:h={type:"partial",diff:{[f]:c}})}}return h}function a(e,t){if(n(e))return!1;const o=t.split(".");let r=e;for(const n of o){if("complete"===r.type)return!0;if("partial"!==r.type)return!1;{const e=r.diff[n];if(!e)return!1;r=e}}return!0}function y(e,t){for(const n of t)if(a(e,n))return!0;return!1}function m(e,t){if(!("function"==typeof e||"function"==typeof t||n(e)&&n(t)))return n(e)||n(t)||"object"==typeof e&&"object"==typeof t&&s(e)!==s(t)?{type:"complete",oldValue:e,newValue:t}:p(e,t)}function d(e){if(n(e))return!0;switch(e.type){case"complete":return!1;case"collection":{const t=e;for(const e of t.added)if(!d(e))return!1;for(const e of t.removed)if(!d(e))return!1;for(const e of t.changed)if(!d(e))return!1;return!0}case"partial":for(const t in e.diff){if(!d(e.diff[t]))return!1}return!0}}export{m as diff,a as hasDiff,y as hasDiffAny,d as isEmpty};