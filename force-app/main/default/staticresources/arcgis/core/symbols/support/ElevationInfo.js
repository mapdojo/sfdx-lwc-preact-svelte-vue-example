/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{strict as r,JSONMap as o}from"../../core/jsonMap.js";import{JSONSupport as t}from"../../core/JSONSupport.js";import{isSome as s,equalsMaybe as i}from"../../core/maybe.js";import{property as n}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{reader as p}from"../../core/accessorSupport/decorators/reader.js";import{subclass as u}from"../../core/accessorSupport/decorators/subclass.js";import{writer as a}from"../../core/accessorSupport/decorators/writer.js";import f from"./FeatureExpressionInfo.js";import{supportedUnits as l}from"./unitConversionUtils.js";var m;const d=r()({onTheGround:"on-the-ground",relativeToGround:"relative-to-ground",relativeToScene:"relative-to-scene",absoluteHeight:"absolute-height"}),c=new o({foot:"feet",kilometer:"kilometers",meter:"meters",mile:"miles","us-foot":"us-feet",yard:"yards"});let h=m=class extends t{constructor(e){super(e),this.offset=null}readFeatureExpressionInfo(e,r){return null!=e?e:r.featureExpression&&0===r.featureExpression.value?{expression:"0"}:void 0}writeFeatureExpressionInfo(e,r,o,t){r[o]=e.write({},t),"0"===e.expression&&(r.featureExpression={value:0})}get mode(){const{offset:e,featureExpressionInfo:r}=this;return this._isOverridden("mode")?this._get("mode"):s(e)||r?"relative-to-ground":"on-the-ground"}set mode(e){this._override("mode",e)}set unit(e){this._set("unit",e)}write(e,r){return this.offset||this.mode||this.featureExpressionInfo||this.unit?super.write(e,r):null}clone(){return new m({mode:this.mode,offset:this.offset,featureExpressionInfo:this.featureExpressionInfo?this.featureExpressionInfo.clone():void 0,unit:this.unit})}equals(e){return this.mode===e.mode&&this.offset===e.offset&&this.unit===e.unit&&i(this.featureExpressionInfo,e.featureExpressionInfo)}};e([n({type:f,json:{write:!0}})],h.prototype,"featureExpressionInfo",void 0),e([p("featureExpressionInfo",["featureExpressionInfo","featureExpression"])],h.prototype,"readFeatureExpressionInfo",null),e([a("featureExpressionInfo",{featureExpressionInfo:{type:f},"featureExpression.value":{type:[0]}})],h.prototype,"writeFeatureExpressionInfo",null),e([n({type:d.apiValues,nonNullable:!0,json:{type:d.jsonValues,read:d.read,write:{writer:d.write,isRequired:!0}}})],h.prototype,"mode",null),e([n({type:Number,json:{write:!0}})],h.prototype,"offset",void 0),e([n({type:l,json:{type:String,read:c.read,write:c.write}})],h.prototype,"unit",null),h=m=e([u("esri.layers.support.ElevationInfo")],h);const x=h;export{x as default};