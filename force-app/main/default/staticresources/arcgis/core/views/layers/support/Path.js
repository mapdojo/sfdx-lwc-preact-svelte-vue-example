/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import{property as s}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as o}from"../../../core/accessorSupport/decorators/subclass.js";import t from"./ClipArea.js";let e=class extends t{constructor(r){super(r),this.type="path",this.path=[]}commitVersionProperties(){this.commitProperty("path")}};r([s({type:[[[Number]]],json:{write:!0}})],e.prototype,"path",void 0),e=r([o("esri.views.layers.support.Path")],e);const p=e;export{p as default};