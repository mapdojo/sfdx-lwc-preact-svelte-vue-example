/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../../../core/maybe.js";import{watch as t,syncAndInitial as n}from"../../../core/reactiveUtils.js";import{d as o}from"../../../chunks/vec3.js";import{makeDehydratedPoint as r}from"../../../layers/graphics/dehydratedFeatures.js";import{ViewEventPriorities as i}from"../../input/InputManager.js";import{SNAPPING_KEYS as s}from"../keybindings.js";import{anyMapPointToSnappingPoint as a}from"./SnappingPoint.js";function p(e,t){const n=e.length===t.length&&e[0]===t[0]&&e[1]===t[1];switch(e.length){case 2:return n;case 3:return n&&e[2]===t[2];case 4:return n&&e[2]===t[2]&&e[3]===t[3]}return!1}function c(e,t){const n=e.x-t.x,o=e.y-t.y;return n*n+o*o}function g(e,t){return Math.sqrt(c(e,t))}function d(e,t){t.sort(((t,n)=>o(t.targetPoint,e)-o(n.targetPoint,e)))}var u;function l({point:t,distance:n,types:o,coordinateHelper:{spatialReference:i}},s,a){return{point:r(t[0],t[1],t[2],i.toJSON()),mode:s,distance:n,types:o,query:e(a)?a.toJSON():{where:"1=1"}}}function E(e,t,n){return{left:a(e.leftVertex.pos,t,n),right:a(e.rightVertex.pos,t,n)}}function f(e){return e.createQuery()}function m(o,r=(()=>{})){const a=t((()=>({view:o.view,snappingOptions:o.snappingOptions})),(({view:t,snappingOptions:n})=>{const a="snapping-toggle",p=i.TOOL;if(o.removeHandles(a),t&&e(n)){const e=[t.on("key-down",(e=>{e.key!==s.toggle||e.repeat||(n.enabledToggled=!0,r())}),p),t.on("key-up",(e=>{e.key===s.toggle&&(n.enabledToggled=!1,r())}),p),t.on("pointer-move",(e=>{const t=e.native.ctrlKey;n.enabledToggled!==t&&(n.enabledToggled=t,r())}),p)];o.addHandles(e,a)}}),n);o.addHandles(a)}!function(e){e[e.TARGET=0]="TARGET",e[e.REFERENCE=1]="REFERENCE",e[e.REFERENCE_EXTENSION=2]="REFERENCE_EXTENSION"}(u||(u={}));export{u as LineSegmentHintType,E as editEdgeToSnappingEdge,f as makeFilter,l as makeSnappingQuery,p as objectEqual,g as screenDistance,m as setupSnappingToggleHandles,d as sortCandidatesInPlace,c as squaredScreenDistance};