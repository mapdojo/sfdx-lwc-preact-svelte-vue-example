/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class r{constructor(){this.near=Number.MAX_VALUE,this.far=-Number.MAX_VALUE}}function n(r,n){return{near:r,far:n}}function a(r){return r?t(r,1/0,-1/0):n(1/0,-1/0)}function t(r,n,a){return r.near=n,r.far=a,r}function e(r,n,a=r){return null!=n&&(a.near=Math.min(r.near,n.near),a.far=Math.max(r.far,n.far)),a}function u(r,n){return r.near<=n&&n<=r.far}const f={near:0,far:0};export{r as DepthRange,f as ZERO,n as create,a as empty,t as set,e as union,u as within};