/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../core/Error.js";import{JSONMap as i}from"../../core/jsonMap.js";import s from"../../core/Logger.js";import{toPt as r}from"../../core/screenUtils.js";import{property as a}from"../../core/accessorSupport/decorators/property.js";import{cast as n}from"../../core/accessorSupport/decorators/cast.js";import{reader as o}from"../../core/accessorSupport/decorators/reader.js";import{subclass as l}from"../../core/accessorSupport/decorators/subclass.js";import{writer as p}from"../../core/accessorSupport/decorators/writer.js";import u from"./VisualVariable.js";import m from"./support/SizeStop.js";import h from"./support/SizeVariableLegendOptions.js";import{isSizeVariable as d,getInputValueType as c,getTransformationType as y,TransformationType as x}from"./support/sizeVariableUtils.js";import{viewScaleRE as S}from"./support/visualVariableUtils.js";var z;const v=new i({width:"width",depth:"depth",height:"height",widthAndDepth:"width-and-depth",all:"all"}),g=new i({unknown:"unknown",inch:"inches",foot:"feet",yard:"yards",mile:"miles","nautical-mile":"nautical-miles",millimeter:"millimeters",centimeter:"centimeters",decimeter:"decimeters",meter:"meters",kilometer:"kilometers","decimal-degree":"decimal-degrees"});function w(e){if(null!=e)return"string"==typeof e||"number"==typeof e?r(e):"size"===e.type?d(e)?e:(delete(e={...e}).type,new V(e)):void 0}function f(e,t,i){if("object"!=typeof e)return e;const s=new V;return s.read(e,i),s}let V=z=class extends u{constructor(e){super(e),this.axis=null,this.legendOptions=null,this.normalizationField=null,this.scaleBy=null,this.target=null,this.type="size",this.useSymbolValue=null,this.valueExpression=null,this.valueRepresentation=null,this.valueUnit=null}get cache(){return{ipData:this._interpolateData(),hasExpression:!!this.valueExpression,compiledFunc:null,isScaleDriven:null!=this.valueExpression&&S.test(this.valueExpression)}}set expression(e){s.getLogger(this.declaredClass).warn("'expression' is deprecated since version 4.2. Use 'valueExpression' instead. The only supported expression is 'view.scale'."),"view.scale"===e?(this.valueExpression="$view.scale",this._set("expression",e)):this._set("expression",null)}set index(e){d(this.maxSize)&&(this.maxSize.index=`visualVariables[${e}].maxSize`),d(this.minSize)&&(this.minSize.index=`visualVariables[${e}].minSize`),this._set("index",e)}get inputValueType(){return c(this)}set maxDataValue(e){e&&this.stops&&(s.getLogger(this.declaredClass).warn("cannot set maxDataValue when stops is not null."),e=null),this._set("maxDataValue",e)}set maxSize(e){e&&this.stops&&(s.getLogger(this.declaredClass).warn("cannot set maxSize when stops is not null."),e=null),this._set("maxSize",e)}castMaxSize(e){return w(e)}readMaxSize(e,t,i){return f(e,t,i)}set minDataValue(e){e&&this.stops&&(s.getLogger(this.declaredClass).warn("cannot set minDataValue when stops is not null."),e=null),this._set("minDataValue",e)}set minSize(e){e&&this.stops&&(s.getLogger(this.declaredClass).warn("cannot set minSize when stops is not null."),e=null),this._set("minSize",e)}castMinSize(e){return w(e)}readMinSize(e,t,i){return f(e,t,i)}get arcadeRequired(){return!!this.valueExpression||(null!=this.minSize&&"object"==typeof this.minSize&&this.minSize.arcadeRequired||null!=this.maxSize&&"object"==typeof this.maxSize&&this.maxSize.arcadeRequired)}set stops(e){null==this.minDataValue&&null==this.maxDataValue&&null==this.minSize&&null==this.maxSize?e&&Array.isArray(e)&&(e=e.filter((e=>!!e))).sort(((e,t)=>e.value-t.value)):e&&(s.getLogger(this.declaredClass).warn("cannot set stops when one of minDataValue, maxDataValue, minSize or maxSize is not null."),e=null),this._set("stops",e)}get transformationType(){return y(this,this.inputValueType)}readValueExpression(e,t){return e||t.expression&&"$view.scale"}writeValueExpressionWebScene(e,i,s,r){if("$view.scale"===e){if(r&&r.messages){const e=this.index,i="string"==typeof e?e:`visualVariables[${e}]`;r.messages.push(new t("property:unsupported",this.type+"VisualVariable.valueExpression = '$view.scale' is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:i+".valueExpression",context:r}))}}else i[s]=e}readValueUnit(e){return e?g.read(e):null}clone(){return new z({axis:this.axis,field:this.field,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,maxDataValue:this.maxDataValue,maxSize:d(this.maxSize)?this.maxSize.clone():this.maxSize,minDataValue:this.minDataValue,minSize:d(this.minSize)?this.minSize.clone():this.minSize,normalizationField:this.normalizationField,stops:this.stops&&this.stops.map((e=>e.clone())),target:this.target,useSymbolValue:this.useSymbolValue,valueRepresentation:this.valueRepresentation,valueUnit:this.valueUnit,legendOptions:this.legendOptions&&this.legendOptions.clone()})}flipSizes(){if(this.transformationType===x.ClampedLinear){const{minSize:e,maxSize:t}=this;return this.minSize=t,this.maxSize=e,this}if(this.transformationType===x.Stops){const e=this.stops;if(!e)return this;const t=e.map((e=>e.size)).reverse(),i=e.length;for(let s=0;s<i;s++)e[s].size=t[s];return this}return this}getAttributeHash(){return`${super.getAttributeHash()}-${this.target}-${this.normalizationField}`}_interpolateData(){return this.stops&&this.stops.map((e=>e.value||0))}};e([a({readOnly:!0})],V.prototype,"cache",null),e([a({type:v.apiValues,json:{type:v.jsonValues,origins:{"web-map":{read:!1}},read:v.read,write:v.write}})],V.prototype,"axis",void 0),e([a({type:String,value:null,json:{read:!1}})],V.prototype,"expression",null),e([a()],V.prototype,"index",null),e([a({type:String,readOnly:!0})],V.prototype,"inputValueType",null),e([a({type:h,json:{write:!0}})],V.prototype,"legendOptions",void 0),e([a({type:Number,value:null,json:{write:!0}})],V.prototype,"maxDataValue",null),e([a({type:Number,value:null,json:{write:!0}})],V.prototype,"maxSize",null),e([n("maxSize")],V.prototype,"castMaxSize",null),e([o("maxSize")],V.prototype,"readMaxSize",null),e([a({type:Number,value:null,json:{write:!0}})],V.prototype,"minDataValue",null),e([a({type:Number,value:null,json:{write:!0}})],V.prototype,"minSize",null),e([n("minSize")],V.prototype,"castMinSize",null),e([o("minSize")],V.prototype,"readMinSize",null),e([a({type:String,json:{write:!0}})],V.prototype,"normalizationField",void 0),e([a({readOnly:!0})],V.prototype,"arcadeRequired",null),e([a({type:String})],V.prototype,"scaleBy",void 0),e([a({type:[m],value:null,json:{write:!0}})],V.prototype,"stops",null),e([a({type:["outline"],json:{write:!0}})],V.prototype,"target",void 0),e([a({type:String,readOnly:!0})],V.prototype,"transformationType",null),e([a({type:["size"],json:{type:["sizeInfo"]}})],V.prototype,"type",void 0),e([a({type:Boolean,json:{write:!0,origins:{"web-map":{read:!1}}}})],V.prototype,"useSymbolValue",void 0),e([a({type:String,json:{write:!0}})],V.prototype,"valueExpression",void 0),e([o("valueExpression",["valueExpression","expression"])],V.prototype,"readValueExpression",null),e([p("web-scene","valueExpression")],V.prototype,"writeValueExpressionWebScene",null),e([a({type:["radius","diameter","area","width","distance"],json:{write:!0}})],V.prototype,"valueRepresentation",void 0),e([a({type:g.apiValues,json:{write:g.write,origins:{"web-map":{read:!1},"web-scene":{write:!0},"portal-item":{write:!0}}}})],V.prototype,"valueUnit",void 0),e([o("valueUnit")],V.prototype,"readValueUnit",null),V=z=e([l("esri.renderers.visualVariables.SizeVariable")],V);const b=V;export{b as default};