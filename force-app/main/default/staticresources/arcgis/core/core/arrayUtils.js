/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as t}from"./maybe.js";import n from"./RandomLCG.js";function e(t){if(!t)return;return t.length>0?t[0]:void 0}function r(t){if(!t)return;const n=t.length;return n>0?t[n-1]:void 0}function o(t){return t}function l(t,n=o){if(!t||0===t.length)return;let e=t[0],r=n(e);for(let o=1;o<t.length;++o){const l=t[o],f=Number(n(l));f>r&&(r=f,e=l)}return e}function f(t,n=o){return l(t,(t=>-n(t)))}function u(t,n){return n?t.filter(((t,e,r)=>r.findIndex(n.bind(null,t))===e)):t.filter(((t,n,e)=>e.indexOf(t)===n))}function i(n,e,r){if(t(n)&&t(e))return!0;if(t(n)||t(e)||n.length!==e.length)return!1;if(r){for(let t=0;t<n.length;t++)if(!r(n[t],e[t]))return!1}else for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function c(t,n){let e=t.length!==n.length;e&&(t.length=n.length);for(let r=0;r<n.length;++r)t[r]!==n[r]&&(t[r]=n[r],e=!0);return e}function s(t,n,e){let r,o;return e?(r=n.filter((n=>!t.some((t=>e(t,n))))),o=t.filter((t=>!n.some((n=>e(n,t)))))):(r=n.filter((n=>!t.includes(n))),o=t.filter((t=>!n.includes(t)))),{added:r,removed:o}}function h(t,n,e){return t&&n?e?t.filter((t=>n.findIndex((n=>e(t,n)))>-1)):t.filter((t=>n.includes(t))):[]}function a(t){return t&&"number"==typeof t.length}function g(t,n){const e=t.length;if(0===e)return[];const r=[];for(let o=0;o<e;o+=n)r.push(t.slice(o,o+n));return r}const d=!!Array.prototype.fill;function m(t,n){if(d)return new Array(t).fill(n);const e=new Array(t);for(let r=0;r<t;r++)e[r]=n;return e}function p(t,n){void 0===n&&(n=t,t=0);const e=new Array(n-t);for(let r=t;r<n;r++)e[r-t]=r;return e}function M(t,n,e){const r=t.length;let o=0,l=r-1;for(;o<l;){const e=o+Math.floor((l-o)/2);n>t[e]?o=e+1:l=e}const f=t[o];return e?n>=t[r-1]?-1:f===n?o:o-1:f===n?o:-1}function w(t,n,e){if(!t||0===t.length)return;const r=t.length-1,o=t[0];if(n<=e(o))return o;const l=t[r];if(n>=e(l))return l;let f=0,u=0,i=r;for(;f<i;){u=f+Math.floor((i-f)/2);const o=t[u],l=e(o);if(l===n)return o;if(n<l){if(u>0){const r=t[u-1],f=e(r);if(n>f)return n-f>=l-n?o:r}i=u}else{if(u<r){const r=t[u+1],f=e(r);if(n<f)return n-l>=f-n?r:o}f=u+1}}return t[u]}class x{constructor(){this.last=0}}const y=new x;function b(t,n,e,r){r=r||y;const o=Math.max(0,r.last-10);for(let f=o;f<e;++f)if(t[f]===n)return r.last=f,f;const l=Math.min(o,e);for(let f=0;f<l;++f)if(t[f]===n)return r.last=f,f;return-1}function v(t,n,e,r){const o=e??t.length,l=b(t,n,o,r);if(-1!==l)return t[l]=t[o-1],null==e&&t.pop(),n}const A=new Set;function j(t,n,e=t.length,r=n.length,o,l){if(0===r||0===e)return e;A.clear();for(let u=0;u<r;++u)A.add(n[u]);o=o||y;const f=Math.max(0,o.last-10);for(let u=f;u<e;++u)if(A.has(t[u])&&(l&&l.push(t[u]),A.delete(t[u]),t[u]=t[e-1],--e,--u,0===A.size||0===e))return A.clear(),e;for(let u=0;u<f;++u)if(A.has(t[u])&&(l&&l.push(t[u]),A.delete(t[u]),t[u]=t[e-1],--e,--u,0===A.size||0===e))return A.clear(),e;return A.clear(),e}function z(t,n){let e=0;for(let r=0;r<t.length;++r){const o=t[r];n(o,r)&&(t[e]=o,e++)}t.length=e}function I(t,n,e){const r=t.length;if(n>=r)return t.slice(0);const o=O(e),l=new Set,f=[];for(;f.length<n;){const n=Math.floor(o()*r);l.has(n)||(l.add(n),f.push(t[n]))}return f}function O(t){return t?(C.seed=t,()=>C.getFloat()):Math.random}function S(t,n){const e=O(n);for(let r=t.length-1;r>0;r--){const n=Math.floor(e()*(r+1)),o=t[r];t[r]=t[n],t[n]=o}return t}const C=new n;function F(t,n){const e=t.indexOf(n);return-1!==e?(t.splice(e,1),n):null}function G(t,n){const e=new Map,r=t.length;for(let o=0;o<r;o++){const r=t[o],l=n(r,o,t),f=e.get(l);f?f.push(r):e.set(l,[r])}return e}export{x as PositionHint,w as binaryFindClosest,M as binaryIndexOf,m as constant,s as difference,i as equals,z as filterInPlace,e as first,G as groupToMap,b as indexOf,h as intersect,a as isArrayLike,r as last,l as max,f as min,I as pickRandom,p as range,F as remove,v as removeUnordered,j as removeUnorderedMany,S as shuffle,g as splitIntoChunks,u as unique,c as update};