/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const t=Math.PI/180;function n(n){return n*t}function o(t,o){const a=n(o.rotation),r=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a)),[u,c]=o.size;return t[0]=Math.round(c*s+u*r),t[1]=Math.round(c*r+u*s),t}function a(t,n,o,a){const[r,s]=n,[u,c]=a,h=.5*o;return t[0]=r-h*u,t[1]=s-h*c,t[2]=r+h*u,t[3]=s+h*c,t}export{a as getBBox,o as getOuterSize};