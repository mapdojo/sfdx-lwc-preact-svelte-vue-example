/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import o from"../../core/Accessor.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as t}from"../../core/accessorSupport/decorators/subclass.js";let e=class extends o{constructor(r){super(r),this.hasError=null,this.editResults=[]}};r([s()],e.prototype,"hasError",void 0),r([s()],e.prototype,"error",void 0),r([s()],e.prototype,"editResults",void 0),e=r([t("esri.rest.knowledgeGraph.GraphApplyEdits")],e);const p=e;export{p as default};