/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
let t=1e-6;function a(){return t}function e(a){t=a}const n=Math.random,o=Math.PI/180,s=180/Math.PI;function r(t){return t*o}function u(t){return t*s}function c(a,e){return Math.abs(a-e)<=t*Math.max(1,Math.abs(a),Math.abs(e))}const i=Object.freeze(Object.defineProperty({__proto__:null,RANDOM:n,equals:c,getEpsilon:a,setEpsilon:e,toDegree:u,toRadian:r},Symbol.toStringTag,{value:"Module"}));export{n as R,u as a,i as c,c as e,a as g,e as s,r as t};