/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const t=.05;function n(n){return Math.max(Math.round(n/t),1)*t}const e=new Set(["StartTimeOffset","Duration","RepeatDelay"]);function a(t,a){return e.has(a)?n(t):t}export{a as quantizeIfNeeded};