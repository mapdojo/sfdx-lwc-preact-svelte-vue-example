/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{IdentifiableMixin as r}from"../../core/Identifiable.js";import{MultiOriginJSONSupport as o}from"../../core/MultiOriginJSONSupport.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import{Integer as i}from"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{reader as s}from"../../core/accessorSupport/decorators/reader.js";import{subclass as p}from"../../core/accessorSupport/decorators/subclass.js";import{readOnlyService as a}from"../support/commonProperties.js";let l=class extends(r(o)){constructor(e){super(e),this.title="",this.id=-1,this.modelName=null,this.isEmpty=null,this.visible=!0,this.opacity=1}readTitle(e,r){return"string"==typeof r.alias?r.alias:"string"==typeof r.name?r.name:""}readIdOnlyOnce(e){return-1!==this.id?this.id:"number"==typeof e?e:-1}};e([t({type:String,json:{origins:{"web-scene":{write:!0},"portal-item":{write:!0}}}})],l.prototype,"title",void 0),e([s("service","title",["alias","name"])],l.prototype,"readTitle",null),e([t()],l.prototype,"layer",void 0),e([t({type:i,readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0}}})],l.prototype,"id",void 0),e([s("service","id")],l.prototype,"readIdOnlyOnce",null),e([t(a(String))],l.prototype,"modelName",void 0),e([t(a(Boolean))],l.prototype,"isEmpty",void 0),e([t({type:Boolean,json:{name:"visibility",write:!0}})],l.prototype,"visible",void 0),e([t({type:Number,json:{write:!0}})],l.prototype,"opacity",void 0),l=e([p("esri.layers.buildingSublayers.BuildingSublayer")],l);const n=l;export{n as default};