/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import{property as e}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as r}from"../../../core/accessorSupport/decorators/subclass.js";import s from"./TextInput.js";var o;let p=o=class extends s{constructor(t){super(t),this.type="text-area"}clone(){return new o({maxLength:this.maxLength,minLength:this.minLength})}};t([e({type:["text-area"],json:{read:!1,write:!0}})],p.prototype,"type",void 0),p=o=t([r("esri.form.elements.inputs.TextAreaInput")],p);const a=p;export{a as default};