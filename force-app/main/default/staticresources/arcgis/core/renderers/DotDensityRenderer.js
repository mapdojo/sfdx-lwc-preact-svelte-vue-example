/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../chunks/tslib.es6.js";import e from"../Color.js";import{clone as o}from"../core/lang.js";import{property as r}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import{enumeration as i}from"../core/accessorSupport/decorators/enumeration.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import{collectArcadeFieldNames as n}from"../layers/support/fieldUtils.js";import l from"./Renderer.js";import{VisualVariablesMixin as p}from"./mixins/VisualVariablesMixin.js";import a from"./support/AttributeColorInfo.js";import u from"./support/DotDensityLegendOptions.js";import d from"../symbols/SimpleFillSymbol.js";import c from"../symbols/SimpleLineSymbol.js";var h;let m=h=class extends(p(l)){constructor(t){super(t),this.attributes=null,this.backgroundColor=new e([0,0,0,0]),this.dotBlendingEnabled=!0,this.dotShape="square",this.dotSize=1,this.legendOptions=null,this.outline=new c,this.dotValue=null,this.referenceScale=null,this.seed=1,this.type="dot-density"}calculateDotValue(t){if(null==this.referenceScale)return this.dotValue;const e=t/this.referenceScale*this.dotValue;return e<1?1:e}getSymbol(){return new d({outline:this.outline})}async getSymbolAsync(){return this.getSymbol()}getSymbols(){return[this.getSymbol()]}getAttributeHash(){return this.attributes?.reduce(((t,e)=>t+e.getAttributeHash()),"")??""}getMeshHash(){return JSON.stringify(this.outline)}clone(){return new h({attributes:o(this.attributes),backgroundColor:o(this.backgroundColor),dotBlendingEnabled:o(this.dotBlendingEnabled),dotShape:o(this.dotShape),dotSize:o(this.dotSize),dotValue:o(this.dotValue),legendOptions:o(this.legendOptions),outline:o(this.outline),referenceScale:o(this.referenceScale),visualVariables:o(this.visualVariables),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})}getControllerHash(){const t=this.attributes?.map((t=>t.field||t.valueExpression||""));return`${t}-${this.outline&&JSON.stringify(this.outline.toJSON())||""}`}async collectRequiredFields(t,e){await this.collectVVRequiredFields(t,e);for(const o of this.attributes??[])o.valueExpression&&await n(t,e,o.valueExpression),o.field&&t.add(o.field)}};t([r({type:[a],json:{write:!0}})],m.prototype,"attributes",void 0),t([r({type:e,json:{write:!0}})],m.prototype,"backgroundColor",void 0),t([r({type:Boolean,json:{write:!0}})],m.prototype,"dotBlendingEnabled",void 0),t([r({type:String,json:{write:!1}})],m.prototype,"dotShape",void 0),t([r({type:Number,json:{write:!0}})],m.prototype,"dotSize",void 0),t([r({type:u,json:{write:!0}})],m.prototype,"legendOptions",void 0),t([r({type:c,json:{default:null,write:!0}})],m.prototype,"outline",void 0),t([r({type:Number,json:{write:!0}})],m.prototype,"dotValue",void 0),t([r({type:Number,json:{write:!0}})],m.prototype,"referenceScale",void 0),t([r({type:Number,json:{write:!0}})],m.prototype,"seed",void 0),t([i({dotDensity:"dot-density"})],m.prototype,"type",void 0),m=h=t([s("esri.renderers.DotDensityRenderer")],m);const y=m;export{y as default};