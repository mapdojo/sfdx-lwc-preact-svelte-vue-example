/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import"../../core/Logger.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import"../../core/Error.js";import"../../core/has.js";import{enumeration as o}from"../../core/accessorSupport/decorators/enumeration.js";import{subclass as e}from"../../core/accessorSupport/decorators/subclass.js";import s from"./Domain.js";var t;let i=t=class extends s{constructor(r){super(r),this.type="inherited"}clone(){return new t}};r([o({inherited:"inherited"})],i.prototype,"type",void 0),i=t=r([e("esri.layers.support.InheritedDomain")],i);const p=i;export{p as default};