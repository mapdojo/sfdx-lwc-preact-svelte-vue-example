/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ParsingErrorMessages as r,ParsingError as t}from"./types.js";function o(t,o){const e=r[t];return o?e.replace(/\${(.*?)}/g,((r,t)=>o[t]?.toString()??"")):e}class e{constructor(r=!1){this.tolerant=r,this.errors=[]}recordError(r){this.errors.push(r)}tolerate(r){if(!this.tolerant)throw r;this.recordError(r)}throwError(r){throw r.description=r.description??o(r.code,r.data),new t(r)}tolerateError(r){r.description=r.description??o(r.code,r.data);const e=new t(r);if(!this.tolerant)throw e;this.recordError(e)}}export{e as ErrorHandler,o as formatErrorDescription};