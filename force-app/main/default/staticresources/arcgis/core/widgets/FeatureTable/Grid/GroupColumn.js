/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import{property as o}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as s}from"../../../core/accessorSupport/decorators/subclass.js";import t from"./Column.js";let e=class extends t{constructor(r){super(r),this.columns=null,this.sortable=!1}get path(){return this.header}set path(r){this.header=r}};r([o()],e.prototype,"columns",void 0),r([o()],e.prototype,"path",null),r([o({readOnly:!0})],e.prototype,"sortable",void 0),e=r([s("esri.widgets.FeatureTable.Grid.GroupColumn")],e);const p=e;export{p as default};