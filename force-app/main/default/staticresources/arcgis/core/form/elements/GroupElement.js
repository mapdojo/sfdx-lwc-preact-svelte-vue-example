/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{clone as t}from"../../core/lang.js";import{property as r}from"../../core/accessorSupport/decorators/property.js";import{cast as s}from"../../core/accessorSupport/decorators/cast.js";import{reader as o}from"../../core/accessorSupport/decorators/reader.js";import{subclass as i}from"../../core/accessorSupport/decorators/subclass.js";import{writer as p}from"../../core/accessorSupport/decorators/writer.js";import n from"./Element.js";import{ensureType as l,fromJSON as m,toJSON as a,buildTypeMaps as c}from"../support/elements.js";var d;let u=d=class extends n{constructor(e){super(e),this.elements=null,this.initialState="expanded",this.type="group"}castElements(e){return l(e,f,!1)}readElements(e,t){return m(t.formElements,f,!1)}writeElements(e,t){t.formElements=a(e,f,!1)}clone(){return new d({description:this.description,elements:t(this.elements),initialState:this.initialState,label:this.label,visibilityExpression:this.visibilityExpression})}};e([r({json:{write:!0}})],u.prototype,"elements",void 0),e([s("elements")],u.prototype,"castElements",null),e([o("elements",["formElements"])],u.prototype,"readElements",null),e([p("elements")],u.prototype,"writeElements",null),e([r({type:["collapsed","expanded"],json:{write:!0}})],u.prototype,"initialState",void 0),e([r({type:String,json:{read:!1,write:!0}})],u.prototype,"type",void 0),u=d=e([i("esri.form.elements.GroupElement")],u);const f=c(u),y=u;export{y as default};