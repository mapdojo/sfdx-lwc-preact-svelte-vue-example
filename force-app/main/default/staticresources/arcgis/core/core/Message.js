/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{getDeepValue as t}from"./object.js";function e(e,r){return e.replace(/\$\{([^\s\:\}]*)(?:\:([^\s\:\}]+))?\}/g,((e,s)=>{if(""===s)return"$";const n=t(s,r),i=n??"";if(void 0===i)throw new Error(`could not find key "${s}" in template`);return i.toString()}))}class r{constructor(t,s,n){this.name=t,this.details=n,this instanceof r&&(this.message=(s&&e(s,n))??"")}toString(){return"["+this.name+"]: "+this.message}}export{r as default};