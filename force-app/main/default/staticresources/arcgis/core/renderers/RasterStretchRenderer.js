/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../chunks/tslib.es6.js";import{JSONSupport as e}from"../core/JSONSupport.js";import{clone as r}from"../core/lang.js";import{property as o}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import{enumeration as s}from"../core/accessorSupport/decorators/enumeration.js";import{reader as i}from"../core/accessorSupport/decorators/reader.js";import{subclass as a}from"../core/accessorSupport/decorators/subclass.js";import{writer as p}from"../core/accessorSupport/decorators/writer.js";import{stretchTypeJSONDict as m,stretchTypeFunctionEnum as n}from"./support/stretchRendererUtils.js";import{fromJSON as c,types as u}from"../rest/support/colorRamps.js";var d;let h=d=class extends e{constructor(t){super(t),this.colorRamp=null,this.computeGamma=!1,this.dynamicRangeAdjustment=!1,this.gamma=[],this.maxPercent=null,this.minPercent=null,this.numberOfStandardDeviations=null,this.outputMax=null,this.outputMin=null,this.sigmoidStrengthLevel=null,this.statistics=[],this.histograms=null,this.useGamma=!1,this.stretchType="none",this.type="raster-stretch"}readColorRamp(t){if(t)return c(t)}writeStatistics(t,e,r){t?.length&&(Array.isArray(t[0])||(t=t.map((t=>[t.min,t.max,t.avg,t.stddev]))),e[r]=t)}readStretchType(t,e){let r=e.stretchType;return"number"==typeof r&&(r=n[r]),m.read(r)}clone(){return new d({stretchType:this.stretchType,outputMin:this.outputMin,outputMax:this.outputMax,useGamma:this.useGamma,computeGamma:this.computeGamma,statistics:r(this.statistics),gamma:r(this.gamma),sigmoidStrengthLevel:this.sigmoidStrengthLevel,numberOfStandardDeviations:this.numberOfStandardDeviations,minPercent:this.minPercent,maxPercent:this.maxPercent,colorRamp:r(this.colorRamp),histograms:r(this.histograms),dynamicRangeAdjustment:this.dynamicRangeAdjustment})}};t([o({types:u,json:{write:!0}})],h.prototype,"colorRamp",void 0),t([i("colorRamp")],h.prototype,"readColorRamp",null),t([o({type:Boolean,json:{write:!0}})],h.prototype,"computeGamma",void 0),t([o({type:Boolean,json:{write:{target:"dra"},read:{source:"dra"}}})],h.prototype,"dynamicRangeAdjustment",void 0),t([o({type:[Number],json:{write:!0}})],h.prototype,"gamma",void 0),t([o({type:Number,json:{write:!0}})],h.prototype,"maxPercent",void 0),t([o({type:Number,json:{write:!0}})],h.prototype,"minPercent",void 0),t([o({type:Number,json:{write:!0}})],h.prototype,"numberOfStandardDeviations",void 0),t([o({type:Number,json:{read:{source:"max"},write:{target:"max"}}})],h.prototype,"outputMax",void 0),t([o({type:Number,json:{read:{source:"min"},write:{target:"min"}}})],h.prototype,"outputMin",void 0),t([o({type:Number,json:{write:!0}})],h.prototype,"sigmoidStrengthLevel",void 0),t([o({json:{type:[[Number]],write:!0}})],h.prototype,"statistics",void 0),t([o()],h.prototype,"histograms",void 0),t([p("statistics")],h.prototype,"writeStatistics",null),t([o({type:Boolean,json:{write:!0}})],h.prototype,"useGamma",void 0),t([o({type:m.apiValues,json:{type:m.jsonValues,write:m.write}})],h.prototype,"stretchType",void 0),t([i("stretchType",["stretchType"])],h.prototype,"readStretchType",null),t([s({rasterStretch:"raster-stretch"})],h.prototype,"type",void 0),h=d=t([a("esri.renderers.RasterStretchRenderer")],h);const y=h;export{y as default};