/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import{JSONSupport as t}from"../../../core/JSONSupport.js";import{property as o}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as r}from"../../../core/accessorSupport/decorators/subclass.js";let s=class extends t{constructor(e){super(e),this.moment=null,this.fullUpdate=!1,this.validateErrorsCreated=!1,this.dirtyAreaCount=null,this.exceededTransferLimit=null,this.serviceEdits=null}};e([o({type:Date,json:{type:Number,write:{writer:(e,t)=>{t.moment=e?e.getTime():null}}}})],s.prototype,"moment",void 0),e([o({type:Boolean,json:{write:!0}})],s.prototype,"fullUpdate",void 0),e([o({type:Boolean,json:{write:!0}})],s.prototype,"validateErrorsCreated",void 0),e([o({type:Number,json:{write:!0}})],s.prototype,"dirtyAreaCount",void 0),e([o({type:Boolean,json:{write:!0}})],s.prototype,"exceededTransferLimit",void 0),e([o({type:[Object],json:{write:!0}})],s.prototype,"serviceEdits",void 0),s=e([r("esri.rest.networks.support.ValidateNetworkTopologyResult")],s);const p=s;export{p as default};