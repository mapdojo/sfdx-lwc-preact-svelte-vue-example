/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const n=Number.POSITIVE_INFINITY,t=Math.PI,r=2*t,u=128/t,o=256/360,e=t/180,c=1/Math.LN2;function f(n,t){return(n%=t)>=0?n:n+t}function i(n){return f(n*u,256)}function I(n){return f(n*o,256)}function N(n){return Math.log(n)*c}function a(n){return n*n}function h(n,t,r){return n*(1-r)+t*r}function M(n,t,r){return n>=t&&n<=r||n>=r&&n<=t}export{r as C_2PI,o as C_DEG_TO_256,e as C_DEG_TO_RAD,n as C_INFINITY,t as C_PI,u as C_RAD_TO_256,M as between,I as degToByte,h as interpolate,N as log2,f as positiveMod,i as radToByte,a as sqr};