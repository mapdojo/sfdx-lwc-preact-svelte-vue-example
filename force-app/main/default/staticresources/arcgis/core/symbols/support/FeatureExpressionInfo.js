/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{JSONSupport as e}from"../../core/JSONSupport.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as t}from"../../core/accessorSupport/decorators/subclass.js";import{collectArcadeFieldNames as o}from"../../layers/support/fieldUtils.js";var i;let p=i=class extends e{constructor(r){super(r)}async collectRequiredFields(r,e){return o(r,e,this.expression)}clone(){return new i({expression:this.expression,title:this.title})}equals(r){return this.expression===r.expression&&this.title===r.title}};r([s({type:String,json:{write:!0}})],p.prototype,"expression",void 0),r([s({type:String,json:{write:!0}})],p.prototype,"title",void 0),p=i=r([t("esri.layers.support.FeatureExpressionInfo")],p);const c=p;export{c as default};