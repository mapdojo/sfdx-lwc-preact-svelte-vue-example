/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{JSONSupport as r}from"../../core/JSONSupport.js";import{clone as o}from"../../core/lang.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import{types as i}from"../../core/accessorSupport/ensureType.js";import{subclass as t}from"../../core/accessorSupport/decorators/subclass.js";var a;let n=a=class extends r{constructor(e){super(e),this.variableName=null,this.dimensionName=null,this.values=[],this.isSlice=!1}clone(){return new a({variableName:this.variableName,dimensionName:this.dimensionName,values:o(this.values),isSlice:this.isSlice})}};e([s({type:String,json:{write:!0}})],n.prototype,"variableName",void 0),e([s({type:String,json:{write:!0}})],n.prototype,"dimensionName",void 0),e([s({type:i.array(i.oneOf([i.native(Number),i.array(i.native(Number))])),json:{write:!0}})],n.prototype,"values",void 0),e([s({type:Boolean,json:{write:!0}})],n.prototype,"isSlice",void 0),n=a=e([t("esri.layers.support.DimensionalDefinition")],n);const p=n;export{p as default};