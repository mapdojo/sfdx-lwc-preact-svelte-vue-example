/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ArcadeDate as t}from"./ArcadeDate.js";import{ArcadeExecutionError as s,ExecutionErrorCodes as i}from"./executionError.js";import e from"./ImmutableArray.js";import{i as n,a as r,b as o,c as a,t as u,d as l,e as c,f,g as h,h as b,j as y,k as m,l as d,m as g}from"../chunks/languageUtils.js";import w from"../geometry/Geometry.js";function J(t,s,i=!1){if(null==t)return null;if(o(t))return h(t);if(r(t))return b(t);if(a(t))return y(t);if(m(t))return d(t,s);if(g(t)){const e=[];for(const n of t)e.push(J(n,s,i));return e}const e=new T;e.immutable=!1;for(const n of Object.keys(t)){const r=t[n];void 0!==r&&e.setField(n,J(r,s,i))}return e.immutable=i,e}class T{constructor(t){this.declaredClass="esri.arcade.Dictionary",this.attributes=null,this.plain=!1,this.immutable=!0,this.attributes=t instanceof T?t.attributes:t??{}}field(t){const e=t.toLowerCase(),n=this.attributes[t];if(void 0!==n)return n;for(const s in this.attributes)if(s.toLowerCase()===e)return this.attributes[s];throw new s(null,i.FieldNotFound,null,{key:t})}setField(e,r){if(this.immutable)throw new s(null,i.Immutable,null);if(n(r))throw new s(null,i.NoFunctionInDictionary,null);const o=e.toLowerCase();r instanceof Date&&(r=t.dateJSToArcadeDate(r));if(void 0===this.attributes[e]){for(const t in this.attributes)if(t.toLowerCase()===o)return void(this.attributes[t]=r);this.attributes[e]=r}else this.attributes[e]=r}hasField(t){const s=t.toLowerCase();if(void 0!==this.attributes[t])return!0;for(const i in this.attributes)if(i.toLowerCase()===s)return!0;return!1}keys(){let t=[];for(const s in this.attributes)t.push(s);return t=t.sort(),t}castToText(s=!1){let i="";for(const n in this.attributes){""!==i&&(i+=",");const l=this.attributes[n];null==l?i+=JSON.stringify(n)+":null":r(l)||o(l)||a(l)?i+=JSON.stringify(n)+":"+JSON.stringify(l):l instanceof w?i+=JSON.stringify(n)+":"+u(l):l instanceof e||l instanceof Array?i+=JSON.stringify(n)+":"+u(l,null,s):l instanceof t?i+=s?JSON.stringify(n)+":"+JSON.stringify(l.getTime()):JSON.stringify(n)+":"+l.stringify():null!==l&&"object"==typeof l&&void 0!==l.castToText&&(i+=JSON.stringify(n)+":"+l.castToText(s))}return"{"+i+"}"}static convertObjectToArcadeDictionary(t,s,i=!0){const e=new T;e.immutable=!1;for(const n in t){const i=t[n];void 0!==i&&e.setField(n.toString(),J(i,s))}return e.immutable=i,e}static convertJsonToArcade(t,s,i=!1){return J(t,s,i)}castAsJson(t=null){const s={};for(let i in this.attributes){const e=this.attributes[i];void 0!==e&&(t?.keyTranslate&&(i=t.keyTranslate(i)),s[i]=l(e,t))}return s}async castDictionaryValueAsJsonAsync(t,s,i,e=null,n){const r=await c(i,e,n);return t[s]=r,r}async castAsJsonAsync(s=null,i=null){const e={},n=[];for(let r in this.attributes){const o=this.attributes[r];i?.keyTranslate&&(r=i.keyTranslate(r)),void 0!==o&&(f(o)||o instanceof w||o instanceof t?e[r]=l(o,i):n.push(this.castDictionaryValueAsJsonAsync(e,r,o,s,i)))}return n.length>0&&await Promise.all(n),e}}export{T as default};