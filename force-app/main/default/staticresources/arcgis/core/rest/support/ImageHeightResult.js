/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as e}from"../../core/accessorSupport/decorators/subclass.js";import{BaseImageMeasureResult as o,ImageMeasureResultLengthValue as t}from"./BaseImageMeasureResult.js";let p=class extends o{constructor(){super(...arguments),this.height=null}};r([s({type:t,json:{read:!0,write:!0}})],p.prototype,"height",void 0),p=r([e("esri.rest.support.ImageHeightResult")],p);const c=p;export{c as default};