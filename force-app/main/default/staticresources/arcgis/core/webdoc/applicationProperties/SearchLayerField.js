/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{JSONSupport as t}from"../../core/JSONSupport.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{enumeration as o}from"../../core/accessorSupport/decorators/enumeration.js";import{subclass as s}from"../../core/accessorSupport/decorators/subclass.js";import{kebabDict as p}from"../../layers/support/fieldType.js";var c;let a=c=class extends t{constructor(r){super(r),this.exactMatch=!1,this.name=null,this.type=null}clone(){return new c({exactMatch:this.exactMatch,type:this.type,name:this.name})}};r([e({type:Boolean,json:{write:!0}})],a.prototype,"exactMatch",void 0),r([e({type:String,json:{write:!0}})],a.prototype,"name",void 0),r([o(p)],a.prototype,"type",void 0),a=c=r([s("esri.webdoc.applicationProperties.SearchLayerField")],a);const i=a;export{i as default};