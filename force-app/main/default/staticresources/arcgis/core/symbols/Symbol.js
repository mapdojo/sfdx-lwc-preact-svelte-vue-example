/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../chunks/tslib.es6.js";import o from"../Color.js";import{JSONMap as e}from"../core/jsonMap.js";import{JSONSupport as s}from"../core/JSONSupport.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{reader as l}from"../core/accessorSupport/decorators/reader.js";import{subclass as i}from"../core/accessorSupport/decorators/subclass.js";const p=new e({esriSMS:"simple-marker",esriPMS:"picture-marker",esriSLS:"simple-line",esriSFS:"simple-fill",esriPFS:"picture-fill",esriTS:"text",esriSHD:"shield-label-symbol",PointSymbol3D:"point-3d",LineSymbol3D:"line-3d",PolygonSymbol3D:"polygon-3d",WebStyleSymbol:"web-style",MeshSymbol3D:"mesh-3d",LabelSymbol3D:"label-3d",CIMSymbolReference:"cim"});let c=0,m=class extends s{constructor(r){super(r),this.id="sym"+c++,this.type=null,this.color=new o([0,0,0,1])}readColor(r){return r&&null!=r[0]?[r[0],r[1],r[2],r[3]/255]:r}async collectRequiredFields(r,o){}hash(){return JSON.stringify(this.toJSON())}clone(){}};r([t({type:p.apiValues,readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0,writer:p.write}}})],m.prototype,"type",void 0),r([t({type:o,json:{write:{allowNull:!0}}})],m.prototype,"color",void 0),r([l("color")],m.prototype,"readColor",null),m=r([i("esri.symbols.Symbol")],m);const a=m;export{a as default};