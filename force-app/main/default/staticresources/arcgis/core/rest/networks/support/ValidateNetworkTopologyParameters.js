/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import"../../../geometry.js";import{JSONSupport as o}from"../../../core/JSONSupport.js";import{property as r}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as e}from"../../../core/accessorSupport/decorators/subclass.js";import{validationTypeKebabDict as s}from"../../../networks/support/typeUtils.js";import i from"../../../geometry/Extent.js";let p=class extends o{constructor(t){super(t),this.gdbVersion=null,this.sessionID=null,this.validationType=null,this.validateArea=null,this.validationSet=null}};t([r({type:String,json:{write:!0}})],p.prototype,"gdbVersion",void 0),t([r({type:String,json:{write:!0}})],p.prototype,"sessionID",void 0),t([r({type:s.apiValues,json:{type:s.jsonValues,read:s.read,write:s.write}})],p.prototype,"validationType",void 0),t([r({type:i,json:{write:!0}})],p.prototype,"validateArea",void 0),t([r({type:[Object],json:{write:!0}})],p.prototype,"validationSet",void 0),p=t([e("esri.rest.networks.support.ValidateNetworkTopologyParameters")],p);const a=p;export{a as default};