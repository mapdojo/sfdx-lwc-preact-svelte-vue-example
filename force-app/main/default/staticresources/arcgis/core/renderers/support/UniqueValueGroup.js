/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{ClonableMixin as o}from"../../core/Clonable.js";import{JSONSupport as s}from"../../core/JSONSupport.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as t}from"../../core/accessorSupport/decorators/subclass.js";import p from"./UniqueValueClass.js";let c=class extends(o(s)){constructor(r){super(r),this.heading=null,this.classes=null}};r([e({type:String,json:{write:!0}})],c.prototype,"heading",void 0),r([e({type:[p],json:{write:!0}})],c.prototype,"classes",void 0),c=r([t("esri.renderers.support.UniqueValueGroup")],c);const i=c;export{i as default};