/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{property as o}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as e}from"../../core/accessorSupport/decorators/subclass.js";import s from"./BuildingFilterMode.js";var t;let p=t=class extends s{constructor(){super(...arguments),this.type="x-ray"}clone(){return new t}};r([o({type:["x-ray"],readOnly:!0,json:{write:!0}})],p.prototype,"type",void 0),p=t=r([e("esri.layers.support.BuildingFilterModeXRay")],p);const c=p;export{c as default};