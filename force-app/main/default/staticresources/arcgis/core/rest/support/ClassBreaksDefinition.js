/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{JSONMap as t}from"../../core/jsonMap.js";import{JSONSupport as i}from"../../core/JSONSupport.js";import{property as r}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{enumeration as s}from"../../core/accessorSupport/decorators/enumeration.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";const a=new t({esriClassifyEqualInterval:"equal-interval",esriClassifyManual:"manual",esriClassifyNaturalBreaks:"natural-breaks",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation",esriClassifyDefinedInterval:"defined-interval"}),n=new t({esriNormalizeByLog:"log",esriNormalizeByPercentOfTotal:"percent-of-total",esriNormalizeByField:"field"});let l=class extends i{constructor(e){super(e),this.type="class-breaks-definition",this.breakCount=null,this.classificationField=null,this.classificationMethod=null,this.normalizationField=null,this.normalizationType=null}set standardDeviationInterval(e){"standard-deviation"===this.classificationMethod&&this._set("standardDeviationInterval",e)}set definedInterval(e){"defined-interval"===this.classificationMethod&&this._set("definedInterval",e)}};e([s({classBreaksDef:"class-breaks-definition"})],l.prototype,"type",void 0),e([r({json:{write:!0}})],l.prototype,"breakCount",void 0),e([r({json:{write:!0}})],l.prototype,"classificationField",void 0),e([r({type:String,json:{read:a.read,write:a.write}})],l.prototype,"classificationMethod",void 0),e([r({json:{write:!0}})],l.prototype,"normalizationField",void 0),e([r({json:{read:n.read,write:n.write}})],l.prototype,"normalizationType",void 0),e([r({value:null,json:{write:!0}})],l.prototype,"standardDeviationInterval",null),e([r({value:null,json:{write:!0}})],l.prototype,"definedInterval",null),l=e([o("esri.rest.support.ClassBreaksDefinition")],l);const d=l;export{d as default};