/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import{property as e}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as r}from"../../../core/accessorSupport/decorators/subclass.js";import o from"./TextInput.js";var s;let p=s=class extends o{constructor(t){super(t),this.type="text-box"}clone(){return new s({maxLength:this.maxLength,minLength:this.minLength})}};t([e({type:["text-box"],json:{read:!1,write:!0}})],p.prototype,"type",void 0),p=s=t([r("esri.form.elements.inputs.TextBoxInput")],p);const c=p;export{c as default};