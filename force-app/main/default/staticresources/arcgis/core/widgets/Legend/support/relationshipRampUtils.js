/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clone as t}from"../../../core/lang.js";import{getStroke as e,getFill as o}from"../../../symbols/support/gfxUtils.js";import{getSymbolLayerFill as r}from"../../../symbols/support/previewSymbol3D.js";const s={HH:315,HL:45,LL:135,LH:225},l={2:[["HL","HH"],["LL","LH"]],3:[["HL","HM","HH"],["ML","MM","MH"],["LL","LM","LH"]],4:[["HL","HM1","HM2","HH"],["M2L","M2M1","M2M2","M2H"],["M1L","M1M1","M1M2","M1H"],["LL","LM1","LM2","LH"]]};function n(t){if(!t)return;const{type:s}=t;if(s.includes("3d"))return r(t.symbolLayers.getItemAt(0));if("simple-line"===s){const o=e(t);return o&&o.color}if("simple-marker"===t.type&&("x"===t.style||"cross"===t.style)){const o=e(t);return o&&o.color}return o(t)}function H(t,e){const o=e.HH.label,r=e.LL.label,s=e.HL.label,l=e.LH.label;switch(t){case"HH":default:return{top:o,bottom:r,left:s,right:l};case"HL":return{top:s,bottom:l,left:r,right:o};case"LL":return{top:r,bottom:o,left:l,right:s};case"LH":return{top:l,bottom:s,left:o,right:r}}}function L(e,o){const r=[],s=e.length**.5,l=t(e),n=(o||"HH").split(""),H=n[0],L="H"===n[1];for(;l.length;){const t=[];for(;t.length<s;)t.push(l.shift());L&&t.reverse(),r.push(t)}return"L"===H&&r.reverse(),r}function i(t){const{focus:e,infos:o,numClasses:r}=t,s=l[r],L={};o.forEach((t=>{L[t.value]={label:t.label,fill:n(t.symbol)}}));const i=[];for(let l=0;l<r;l++){const t=[];for(let e=0;e<r;e++){const o=L[s[l][e]];t.push(o.fill)}i.push(t)}return{type:"relationship-ramp",numClasses:r,focus:e,colors:i,labels:H(e,L),rotation:u(e)}}function u(t){let e=s[t];return t&&null==e&&(e=s.HH),e||0}export{L as getRelationshipRampColors2D,i as getRelationshipRampElement,u as getRotationAngleForFocus};