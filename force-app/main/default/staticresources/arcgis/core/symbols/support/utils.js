/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../Color.js";import{isSymbol3D as t,isSymbol2D as o}from"../../symbols.js";import{forEach as r}from"../../core/asyncUtils.js";import"../../core/has.js";import{isSome as n,isNone as l,unwrapOrThrow as i,unwrap as s,get as c}from"../../core/maybe.js";import{px2pt as u}from"../../core/screenUtils.js";import{O as a}from"../../chunks/vec3f64.js";import{effectFunctionsFromJSON as f}from"../../layers/effects/jsonUtils.js";import{getStroke as y}from"./gfxUtils.js";import{Symbol3DMaterial as m}from"./Symbol3DMaterial.js";const p=new e("white");function h(e){const t=e.symbolLayers&&e.symbolLayers.length;if(!t)return;const o=e.symbolLayers.getItemAt(t-1);return"outline"in o?c(o,"outline","size"):void 0}function b(e){if(!e)return 0;if(t(e)){const t=h(e);return n(t)?t:0}return u(y(e)?.width)}function w(e){if(l(e)||!("symbolLayers"in e)||l(e.symbolLayers))return!1;switch(e.type){case"point-3d":return e.symbolLayers.some((e=>"object"===e.type));case"line-3d":return e.symbolLayers.some((e=>"path"===e.type));case"polygon-3d":return e.symbolLayers.some((e=>"object"===e.type||"extrude"===e.type));default:return!1}}function d(e){return i(e.resource).href}function j(r,n){if(!r)return null;let l=null;return t(r)?l=g(r):o(r)&&(l=r.color?new e(r.color):null),l?k(l,n):null}function g(t){const o=t.symbolLayers;if(!o)return null;let r=null;return o.forEach((e=>{"object"===e.type&&null!=e.resource?.href||(r="water"===e.type?s(e.color):n(e.material)?s(e.material.color):null)})),r?new e(r):null}function k(t,o){if(null==o||null==t)return t;const r=t.toRgba();return r[3]=r[3]*o,new e(r)}function L(e,t,o){const r=e.symbolLayers;if(!r)return;const i=e=>{const r=n(e)?e:null;return k(t=t??r??(null!=o?p:null),o)};r.forEach((e=>{if("object"!==e.type||null==e.resource?.href||t)if("water"===e.type)e.color=i(e.color);else{const t=n(e.material)?e.material.color:null,r=i(t);l(e.material)?e.material=new m({color:r}):e.material.color=r,null!=o&&"outline"in e&&n(e.outline)&&n(e.outline.color)&&(e.outline.color=k(e.outline.color,o))}}))}function z(e,t,o){(t=t??e.color)&&(e.color=k(t,o)),null!=o&&"outline"in e&&e.outline&&e.outline.color&&(e.outline.color=k(e.outline.color,o))}function S(r,n,l){r&&(n||null!=l)&&(n&&(n=new e(n)),t(r)?L(r,n,l):o(r)&&z(r,n,l))}async function x(e,t){const o=e.symbolLayers;o&&await r(o,(async e=>v(e,t)))}async function v(e,t){switch(e.type){case"extrude":O(e,t);break;case"icon":case"line":case"text":U(e,t);break;case"path":I(e,t);break;case"object":await C(e,t)}}function U(e,t){const o=E(t);n(o)&&(e.size=o)}function E(e){for(const t of e)if("number"==typeof t)return t;return null}function O(e,t){e.size="number"==typeof t[2]?t[2]:0}async function C(e,t){const{resourceSize:o,symbolSize:r}=await R(e),n=M(t,o,r);e.width=A(t[0],r[0],o[0],n),e.depth=A(t[1],r[1],o[1],n),e.height=A(t[2],r[2],o[2],n)}function I(e,t){const o=M(t,a,[e.width,void 0,e.height]);e.width=A(t[0],e.width,1,o),e.height=A(t[2],e.height,1,o)}function M(e,t,o){for(let r=0;r<3;r++){const n=e[r];switch(n){case"symbol-value":{const e=o[r];return null!=e?e/t[r]:1}case"proportional":break;default:if(n&&t[r])return n/t[r]}}return 1}async function R(e){const t=await import("./symbolLayerUtils.js"),o=await t.computeObjectLayerResourceSize(e,10),{width:r,height:n,depth:l}=e,i=[r,l,n];let s=1;for(let c=0;c<3;c++){const e=i[c];if(null!=e){s=e/o[c];break}}for(let c=0;c<3;c++)null==i[c]&&(i[c]=o[c]*s);return{resourceSize:o,symbolSize:i}}function A(e,t,o,r){switch(e){case"proportional":return o*r;case"symbol-value":return null!=t?t:o;default:return e}}function D(e,t){const o=E(t);if(!l(o))switch(e.type){case"simple-marker":e.size=o;break;case"picture-marker":{const t=e.width/e.height;t>1?(e.width=o,e.height=o*t):(e.width=o*t,e.height=o);break}case"simple-line":e.width=o;break;case"text":e.font.size=o}}async function J(e,r){if(e&&r)return t(e)?x(e,r):void(o(e)&&D(e,r))}function N(e,r,n){if(e&&null!=r)if(t(e)){const t=e.symbolLayers;t&&t.forEach((e=>{if(e&&"object"===e.type)switch(n){case"tilt":e.tilt=r;break;case"roll":e.roll=r;break;default:e.heading=r}}))}else o(e)&&("simple-marker"!==e.type&&"picture-marker"!==e.type&&"text"!==e.type||(e.angle=r))}function q(e){if(!e)return null;const t=e.effects.filter((e=>"bloom"!==e.type)).map((e=>e.toJSON()));return f(t)}function B(e){return n(e)&&"polygon-3d"===e.type&&e.symbolLayers.some((e=>"extrude"===e.type))}async function F(e,t){const o=await e.fetchSymbol(t);return o||e.fetchCIMSymbol(t)}export{S as applyColorToSymbol,k as applyOpacityToColor,N as applyRotationToSymbol,J as applySizesToSymbol,F as fetchWebStyleSymbol,q as getCSSFilterFromEffectList,j as getColorFromSymbol,d as getIconHref,b as getSymbolOutlineSize,w as isVolumetricSymbol,B as symbolHasExtrudeSymbolLayer};