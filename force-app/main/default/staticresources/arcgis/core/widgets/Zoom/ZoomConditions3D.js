/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../chunks/tslib.es6.js";import r from"../../core/Accessor.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as s}from"../../core/accessorSupport/decorators/subclass.js";let t=class extends r{get canZoomIn(){return!!this.view.ready}get canZoomOut(){return!!this.view.ready}};o([e({readOnly:!0})],t.prototype,"canZoomIn",null),o([e({readOnly:!0})],t.prototype,"canZoomOut",null),o([e()],t.prototype,"view",void 0),t=o([s("esri.widgets.Zoom.ZoomConditions3D")],t);const c=t;export{c as default};