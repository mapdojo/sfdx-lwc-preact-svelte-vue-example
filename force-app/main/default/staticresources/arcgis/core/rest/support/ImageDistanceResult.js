/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as r}from"../../core/accessorSupport/decorators/subclass.js";import{BaseImageMeasureResult as s,ImageMeasureResultLengthValue as o,ImageMeasureResultAngleValue as p}from"./BaseImageMeasureResult.js";let a=class extends s{constructor(){super(...arguments),this.distance=null,this.azimuthAngle=null,this.elevationAngle=null}};e([t({type:o,json:{read:!0,write:!0}})],a.prototype,"distance",void 0),e([t({type:p,json:{read:!0,write:!0}})],a.prototype,"azimuthAngle",void 0),e([t({type:p,json:{read:!0,write:!0}})],a.prototype,"elevationAngle",void 0),a=e([r("esri.rest.support.ImageDistanceResult")],a);const i=a;export{i as default};