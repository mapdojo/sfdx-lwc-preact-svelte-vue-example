/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import o from"../../core/Accessor.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as e}from"../../core/accessorSupport/decorators/subclass.js";var t;let p=t=class extends o{constructor(){super(...arguments),this.url=""}clone(){return new t({url:this.url})}};r([s({type:String})],p.prototype,"url",void 0),p=t=r([e("esri.symbols.support.Thumbnail")],p);export{p as Thumbnail};