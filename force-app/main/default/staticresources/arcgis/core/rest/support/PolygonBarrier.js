/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../Graphic.js";import r from"../../PopupTemplate.js";import{symbolTypes as o}from"../../symbols.js";import{ClonableMixin as s}from"../../core/Clonable.js";import{JSONSupport as i}from"../../core/JSONSupport.js";import{isSome as a,unwrap as l}from"../../core/maybe.js";import{property as p}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{reader as n}from"../../core/accessorSupport/decorators/reader.js";import{subclass as m}from"../../core/accessorSupport/decorators/subclass.js";import{writer as c}from"../../core/accessorSupport/decorators/writer.js";import u from"../../geometry/Polygon.js";import{getPrefixedProperties as b,setPrefixedProperties as d,toKebabImpedanceAttributes as y,fromKebabImpedanceAttributes as j}from"../route/utils.js";import{barrierTypeJsonMap as f}from"./networkEnums.js";var T;let h=T=class extends(s(i)){constructor(e){super(e),this.barrierType=null,this.costs=null,this.geometry=null,this.name=null,this.objectId=null,this.popupTemplate=null,this.scaleFactor=null,this.symbol=null,this.type="polygon-barrier"}readCosts(e,t){return b(t.attributes,"Attr_")}writeCosts(e,t){d(e,t,"Attr_")}static fromGraphic(e){return new T({barrierType:a(e.attributes.BarrierType)?f.fromJSON(e.attributes.BarrierType):null,costs:a(e.attributes.Costs)?y(JSON.parse(e.attributes.Costs)):null,geometry:e.geometry,name:e.attributes.Name??null,objectId:e.attributes.ObjectID??e.attributes.__OBJECTID,popupTemplate:e.popupTemplate,scaleFactor:e.attributes.ScaleFactor??null,symbol:e.symbol})}toGraphic(){const e={ObjectID:l(this.objectId),BarrierType:a(this.barrierType)?f.toJSON(this.barrierType):null,Costs:a(this.costs)?JSON.stringify(j(this.costs)):null,Name:this.name??null,ScaleFactor:this.scaleFactor??null};return new t({geometry:this.geometry,attributes:e,symbol:this.symbol,popupTemplate:this.popupTemplate})}};h.fields=[{name:"ObjectID",alias:"ObjectID",type:"esriFieldTypeOID",editable:!1,nullable:!1,domain:null},{name:"BarrierType",alias:"Barrier Type",type:"esriFieldTypeInteger",editable:!0,nullable:!0,visible:!0,domain:{type:"codedValue",name:"esriNABarrierType",codedValues:[{name:"Restriction",code:0},{name:"Scaled Cost",code:1},{name:"Added Cost",code:2}]}},{name:"Costs",alias:"Costs",type:"esriFieldTypeString",length:1048576,editable:!0,nullable:!0,visible:!1,domain:null},{name:"Name",alias:"Name",type:"esriFieldTypeString",length:255,editable:!0,nullable:!0,visible:!0},{name:"ScaleFactor",alias:"Scale Factor",type:"esriFieldTypeDouble",editable:!0,nullable:!0,visible:!0}],h.popupInfo={title:"Polygon Barriers",fieldInfos:[{fieldName:"Name",label:"Name",isEditable:!0,tooltip:"",visible:!0,stringFieldOption:"textbox"},{fieldName:"BarrierType",label:"Barrier Type",isEditable:!0,tooltip:"",visible:!0,stringFieldOption:"textbox"},{fieldName:"ScaleFactor",isEditable:!0,tooltip:"",visible:!0,format:{places:3,digitSeparator:!0},stringFieldOption:"textbox"},{fieldName:"Costs",label:"Costs",isEditable:!0,tooltip:"",visible:!1,stringFieldOption:"textbox"}],description:null,showAttachments:!1,mediaInfos:[]},e([p({type:f.apiValues,json:{name:"attributes.BarrierType",read:{reader:f.read},write:{writer:f.write}}})],h.prototype,"barrierType",void 0),e([p()],h.prototype,"costs",void 0),e([n("costs",["attributes"])],h.prototype,"readCosts",null),e([c("costs")],h.prototype,"writeCosts",null),e([p({type:u,json:{write:!0}})],h.prototype,"geometry",void 0),e([p({json:{name:"attributes.Name"}})],h.prototype,"name",void 0),e([p({json:{name:"attributes.ObjectID"}})],h.prototype,"objectId",void 0),e([p({type:r})],h.prototype,"popupTemplate",void 0),e([p()],h.prototype,"scaleFactor",void 0),e([p({types:o})],h.prototype,"symbol",void 0),e([p({readOnly:!0,json:{read:!1}})],h.prototype,"type",void 0),h=T=e([m("esri.rest.support.PolygonBarrier")],h);const g=h;export{g as default};