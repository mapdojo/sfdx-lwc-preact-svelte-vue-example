/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{compileScript as e,extend as t,enableAsyncSupport as r}from"../arcade/arcadeCompiler.js";import{ArcadeModuleResolver as n}from"../arcade/ArcadeModuleResolver.js";import{executeScript as s,extend as u}from"../arcade/arcadeRuntime.js";import{ArcadeExecutionError as a,ExecutionErrorCodes as o}from"../arcade/executionError.js";import{parseScript as i}from"../arcade/parser.js";import{referencesMember as c,referencesFunction as l,findFieldLiterals as f,findExpectedFieldLiterals as p,findScriptDependencies as d,findModuleImports as m,findFunctionCalls as y}from"../arcade/treeAnalysis.js";import has from"../core/has.js";import{assertIsSome as S}from"../core/maybe.js";const b=["feature","angle","bearing","centroid","envelopeintersects","extent","geometry","isselfintersecting","ringisclockwise"];function g(){return!0}const A=g();let w=!1,h=!1,j=null,x=[];function M(t,r){if(!0===r.useAsync||!0===t.isAsync)return F(t,r);if(has("esri-csp-restrictions")){return function(e){return s(t,e)}}try{return e(t,r)}catch(n){if("esri.arcade.arcadeuncompilableerror"===n.declaredRootClass)return function(e){return s(t,e)};throw n}}function F(t,r){if(null===j)throw new a(null,o.AsyncNotEnabled,null);if(has("esri-csp-restrictions")||!1===A){return function(e){return j.executeScript(t,e)}}try{return e(t,r,!0)}catch(n){if("esri.arcade.arcadeuncompilableerror"===n.declaredRootClass)return function(e){return j.executeScript(t,e)};throw n}}function E(e){u(e),t(e,"sync"),null===j?x.push(e):(t(e,"async"),j.extend(e))}function G(e,t=[]){return i(e,t)}function v(e,t,r=[]){return U(i(e,r),t)}function U(e,t){if(!0===t.useAsync||!0===e.isAsync){if(null===j)throw new a(null,o.AsyncNotEnabled,null);return j.executeScript(e,t)}return s(e,t)}function _(e,t){return c(e,t)}function I(e,t){return l(e,t)}function R(e,t=!1){return void 0===t&&(t=!1),f(e)}function C(e){return p(e)}function D(e,t=[]){return void 0===e.usesGeometry&&d(e,t),!0===e.usesGeometry}let P=null;function k(){return P||(P=z(),P)}async function z(){const[e,t]=await Promise.all([import("../geometry/geometryEngine.js"),import("../arcade/functions/geomsync.js")]);return h=!0,t.setGeometryEngine(e),!0}let L=null;function N(){return null!==L||(L=O()),L}async function O(){await r(),j=await import("../arcade/arcadeAsyncRuntime.js");for(const e of x)j.extend(e),t(e,"async");return x=null,!0}function T(){return w}function q(){return!!j}function B(){return h}let H=null;function J(){return H||(H=K(),H)}async function K(){await N();const[e,r,n,s,u]=await Promise.all([import("../arcade/featureSetUtils.js"),import("../arcade/functions/featuresetbase.js"),import("../arcade/functions/featuresetgeom.js"),import("../arcade/functions/featuresetstats.js"),import("../arcade/functions/featuresetstring.js")]);return te=e,j.extend([r,n,s,u]),t([r,n,s,u],"async"),w=!0,!0}function Q(e,t=[]){return void 0===e.usesFeatureSet&&d(e,t),!0===e.usesFeatureSet}function V(e,t=[]){return void 0===e.isAsync&&d(e,t),!0===e.isAsync}function W(e,t){if(t){for(const r of t)if(_(e,r))return!0;return!1}return!1}async function X(e,t,r=[],n=!1,s=null){return Y(new Set,e,t,r,n,s)}async function Y(e,t,r,n=[],s=!1,u=null){const a="string"==typeof t?G(t):t,o=[];return a&&(!1===B()&&(D(a)||s)&&o.push(k()),!1===q()&&(!0===a.isAsync||r)&&o.push(N()),!1===T()&&(Q(a)||W(a,n))&&o.push(J())),o.length&&await Promise.all(o),await $(e,a,u,r,s),!0}function Z(e,t=[]){return void 0===e.usesModules&&d(e,t),!0===e.usesModules}async function $(e,t,r=null,s=!1,u=!1){const i=m(t);null===r&&i.length>0&&(r=n.getDefault()),t.loadedModules={};for(const n of i){S(r);const i=r.normalizeModuleUri(n.source);if(e.has(i.uri))throw new a(null,o.CircularModules,null);e.add(i.uri);const c=await r.fetchModule(i);await Y(e,c,s,[],u,r),e.delete(i.uri),c.isAsync&&(t.isAsync=!0),c.usesFeatureSet&&(t.usesFeatureSet=!0),c.usesGeometry&&(t.usesGeometry=!0),t.loadedModules[n.libname]={uri:i.uri,script:c}}}function ee(e){if(D(e))return!0;const t=y(e);let r=!1;for(let n=0;n<t.length;n++)if(b.includes(t[n])){r=!0;break}return r}let te=null;function re(){return te}const ne=Object.freeze(Object.defineProperty({__proto__:null,_loadScriptDependenciesImpl:Y,compileScript:M,enableAsyncSupport:N,enableAsyncSupportImpl:O,enableFeatureSetSupport:J,enableFeatureSetSupportImpl:K,enableGeometrySupport:k,enableGeometrySupportImpl:z,executeScript:U,extend:E,extractExpectedFieldLiterals:C,extractFieldLiterals:R,featureSetUtils:re,isAsyncEnabled:q,isFeatureSetSupportEnabled:T,isGeometryEnabled:B,loadDependentModules:$,loadScriptDependencies:X,parseAndExecuteScript:v,parseScript:G,referencesFunction:I,referencesMember:_,scriptIsAsync:V,scriptTouchesGeometry:ee,scriptUsesFeatureSet:Q,scriptUsesGeometryEngine:D,scriptUsesModules:Z},Symbol.toStringTag,{value:"Module"}));export{$ as A,Y as _,C as a,k as b,M as c,J as d,U as e,re as f,D as g,ne as h,E as i,v as j,I as k,X as l,R as m,z as n,N as o,G as p,O as q,_ as r,ee as s,T as t,q as u,B as v,K as w,Q as x,V as y,Z as z};