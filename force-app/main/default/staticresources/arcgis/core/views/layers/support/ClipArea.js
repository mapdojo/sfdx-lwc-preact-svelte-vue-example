/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import{JSONSupport as s}from"../../../core/JSONSupport.js";import{property as o}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as e}from"../../../core/accessorSupport/decorators/subclass.js";let t=class extends s{get version(){return this.commitVersionProperties(),(this._get("version")||0)+1}};r([o({readOnly:!0})],t.prototype,"version",null),t=r([e("esri.views.layers.support.ClipArea")],t);const p=t;export{p as default};