/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const n=128/Math.PI,t=256/360,r=1/Math.LN2;function u(n,t){return(n%=t)>=0?n:n+t}function o(t){return u(t*n,256)}function c(n){return u(n*t,256)}function e(n){return Math.log(n)*r}function f(n,t,r){return n*(1-r)+t*r}function i(n,t,r){return n>=t&&n<=r||n>=r&&n<=t}export{i as between,c as degToByte,f as interpolate,e as log2,u as positiveMod,o as radToByte};