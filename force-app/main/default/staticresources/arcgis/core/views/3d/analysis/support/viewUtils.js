/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{createRenderScreenPointArray3 as e}from"../../../../core/screenUtils.js";import{a as o,f as r}from"../../../../chunks/vec2.js";import{s as n,a as s,g as t}from"../../../../chunks/vec3.js";function c(e,o){if(n(o,0,0,0),e.length>0){for(let r=0;r<e.length;++r)s(o,o,e[r]);t(o,o,1/e.length)}}function f(e,n,s,t){t.projectToRenderScreen(e,a),t.projectToRenderScreen(n,m),o(s,p,i),r(s,s)}const a=e(),i=a,m=e(),p=m;export{c as midpoint,f as screenSpaceTangent};