/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../../chunks/tslib.es6.js";import r from"../../../core/Accessor.js";import{property as s}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as e}from"../../../core/accessorSupport/decorators/subclass.js";let t=class extends r{constructor(o){super(o),this.mode="absolute-height"}toJSON(){return{mode:this.mode}}};o([s({type:String,nonNullable:!0})],t.prototype,"mode",void 0),t=o([e("esri.widgets.Sketch.SketchTooltipOptions.ElevationOptions")],t);export{t as SketchTooltipElevationOptions};