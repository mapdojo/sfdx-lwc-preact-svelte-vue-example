/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import{property as t}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as o}from"../../../core/accessorSupport/decorators/subclass.js";import e from"./Input.js";let s=class extends e{constructor(r){super(r),this.maxLength=null,this.minLength=0}};r([t({type:Number,json:{write:!0}})],s.prototype,"maxLength",void 0),r([t({type:Number,json:{write:!0}})],s.prototype,"minLength",void 0),s=r([o("esri.form.elements.inputs.TextInput")],s);const p=s;export{p as default};