/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../chunks/tslib.es6.js";import{assertIsSome as r}from"../../core/maybe.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as s}from"../../core/accessorSupport/decorators/subclass.js";const t=t=>{let i=class extends t{constructor(...o){super(...o),this.goToOverride=null,this.view=null}callGoTo(o){const{view:e}=this;return r(e),this.goToOverride?this.goToOverride(e,o):e.goTo(o.target,o.options)}};return o([e()],i.prototype,"goToOverride",void 0),o([e()],i.prototype,"view",void 0),i=o([s("esri.widgets.support.GoTo")],i),i};export{t as GoToMixin};