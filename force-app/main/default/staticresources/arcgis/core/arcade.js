/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"./Graphic.js";import{ArcadeDate as t}from"./arcade/ArcadeDate.js";import r from"./arcade/ImmutableArray.js";import a from"./core/Error.js";import{clone as n}from"./core/lang.js";import o from"./layers/FeatureLayer.js";import c from"./portal/Portal.js";import s from"./rest/support/FeatureSet.js";import{loadArcade as i}from"./support/arcadeOnDemand.js";let u=null;function p(e,t,a,n={}){const o=t.elementType,c="value",s="array"===o.type?[{name:c,type:o.type,elementType:o.elementType}]:"dictionary"===o.type?[{name:c,type:o.type,properties:o.properties}]:[{name:c,type:o.type}];return new r(e.map((e=>{const t={};return y(t,s,{[c]:e},a,n),t[c]})))}function l(e,t,r={}){const a=e instanceof s?new o({source:e.features,geometryType:e.geometryType,fields:e.fields,spatialReference:e.spatialReference}):e;return t.constructFeatureSet(a,r.spatialReference,null,!0,r.lruCache,r.interceptor)}function f(e,t,r={}){const{spatialReference:a,interceptor:n,lruCache:o}=r;return"string"==typeof e?t.createFeatureSetCollectionFromService(e,a,o,n):t.createFeatureSetCollectionFromMap(e,a,o,n)}function m(e,t,r,a={}){const n={};return y(n,t.properties,e,r,a),new u.Dictionary(n)}function y(e,r,a,n,o={}){const c={};for(const t of Object.keys(a))c[t.toLowerCase()]=a[t];for(const s of r){const r=s.name.toLowerCase();if(o.variablesPreProcessed)e[r]=c[r];else switch(s.type){case"array":{const t=c[r];e[r]=p(t,s,n,o);break}case"feature":{const t=c[r];e[r]=null==t?null:u.Feature.createFromGraphic(t,o?.timeReference);break}case"featureSet":{const t=c[r];e[r]=n?l(t,n,o):null;break}case"featureSetCollection":{const t=c[r];e[r]=n?f(t,n,o):null;break}case"dictionary":{const t=c[r];e[r]=m(t,s,n,o);break}case"date":{const a=c[r];e[r]=a?a instanceof t?a:o?.timeReference?.timeZone?t.dateJSAndZoneToArcadeDate(a,o?.timeReference?.timeZone):t.dateJSToArcadeDate(a):null;break}case"geometry":case"boolean":case"text":case"number":e[r]=c[r]}}}function d(e,t){for(const r of e)t.push(r),"dictionary"===r.type&&d(r.properties,t);return t}function b(e,t,r,a,n){const{spatialReference:o,interceptor:s,lruCache:i,console:u,abortSignal:p,timeReference:l,services:f={portal:c.getDefault()}}=r,m={vars:{},spatialReference:o,interceptor:s,timeReference:l,lrucache:i,useAsync:n,services:f,console:u,abortSignal:p};return t?(y(m.vars,e.variables,t,a,r),m):m}function S(t,r){switch(r.getArcadeType(t)){case"number":case"text":case"boolean":case"point":case"polygon":case"polyline":case"multipoint":case"extent":return t;case"date":return t.toJSDate();case"feature":{const r=(t.type,t),a="geometry"in r?r.geometry():null,n="readAttributes"in r?r.readAttributes():r.attributes;return new e({geometry:a,attributes:n})}case"dictionary":{const e=t,a=e.attributes,n={};for(const t of Object.keys(a))n[t]=S(e.field(t),r);return n}case"array":return("toArray"in t?t.toArray():t).map((e=>S(e,r)))}return t}const v={variables:[{name:"$feature",type:"feature"},{name:"$layer",type:"featureSet"},{name:"$datastore",type:"featureSetCollection"},{name:"$map",type:"featureSetCollection"}]},w={variables:[{name:"$feature",type:"feature"},{name:"$aggregatedFeatures",type:"featureSet"}]},$=new Map([["form-constraint",{variables:[{name:"$feature",type:"feature"}]}],["feature-z",{variables:[{name:"$feature",type:"feature"}]}],["field-calculation",{variables:[{name:"$feature",type:"feature"},{name:"$datastore",type:"featureSetCollection"}]}],["form-calculation",{variables:[{name:"$feature",type:"feature"},{name:"$originalFeature",type:"feature"},{name:"$layer",type:"featureSet"},{name:"$featureSet",type:"featureSet"},{name:"$datastore",type:"featureSetCollection"},{name:"$map",type:"featureSetCollection"},{name:"$editContext",type:"dictionary",properties:[{name:"editType",type:"text"}]}]}],["labeling",{variables:[{name:"$feature",type:"feature"}]}],["popup",v],["popup-element",v],["feature-reduction-popup",w],["feature-reduction-popup-element",w],["visualization",{variables:[{name:"$feature",type:"feature"},{name:"$view",type:"dictionary",properties:[{name:"scale",type:"number"}]}]}]]);function g(e){const t=$.get(e);if(!t){const t=Array.from($.keys()).map((e=>`'${e}'`)).join(", ");throw new a("createArcadeProfile:invalid-profile-name",`Invalid profile name '${e}'. You must specify one of the following values: ${t}`)}return n(t)}async function C(e,t,r={}){u||(u=await i());const{arcade:n,arcadeUtils:o}=u,{loadScriptDependencies:c,referencesMember:s,scriptIsAsync:p}=n,l=d(t.variables,[]),f=l.filter((e=>"featureSet"===e.type||"featureSetCollection"===e.type)).map((e=>e.name.toLowerCase())),m=n.parseScript(e,f);if(!m)throw new a("arcade:invalid-script","Unable to create SyntaxTree");const y=o.extractFieldNames(m),v=n.scriptTouchesGeometry(m),w=l.map((e=>e.name.toLowerCase())).filter((e=>s(m,e))),$=p(m,f);await c(m,$,f);const g={vars:{},spatialReference:null,useAsync:$};for(const a of w)g.vars[a]="any";const{lruCache:C}=r,h=n.compileScript(m,g),A=n.featureSetUtils();return{execute:(e,r={})=>{if($)throw new a("arcade:invalid-execution-mode","Cannot execute the script in synchronous mode");const n=h(b(t,e,{lruCache:C,...r},A,$));return r.rawOutput?n:S(n,o)},executeAsync:async(e,r={})=>{const a=await h(b(t,e,{lruCache:C,...r},A,$));return r.rawOutput?a:S(a,o)},isAsync:$,variablesUsed:w,fieldsUsed:y,geometryUsed:v,syntaxTree:m}}export{C as createArcadeExecutor,g as createArcadeProfile};