/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../chunks/tslib.es6.js";import o from"../core/Collection.js";import{clone as r}from"../core/lang.js";import{property as e}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import{enumeration as s}from"../core/accessorSupport/decorators/enumeration.js";import{subclass as l}from"../core/accessorSupport/decorators/subclass.js";import i from"./Symbol3D.js";import a from"./TextSymbol3DLayer.js";import{hasVisibleCallout as p,hasVisibleVerticalOffset as c,calloutProperty as m}from"./callouts/calloutUtils.js";import y from"./support/Symbol3DVerticalOffset.js";var n;const u=o.ofType({base:null,key:"type",typeMap:{text:a}});let f=n=class extends i{constructor(t){super(t),this.verticalOffset=null,this.callout=null,this.styleOrigin=null,this.symbolLayers=new u,this.type="label-3d"}supportsCallout(){return!0}hasVisibleCallout(){return p(this)}hasVisibleVerticalOffset(){return c(this)}clone(){return new n({styleOrigin:r(this.styleOrigin),symbolLayers:r(this.symbolLayers),thumbnail:r(this.thumbnail),callout:r(this.callout),verticalOffset:r(this.verticalOffset)})}static fromTextSymbol(t){return new n({symbolLayers:[a.fromTextSymbol(t)]})}};t([e({type:y,json:{write:!0}})],f.prototype,"verticalOffset",void 0),t([e(m)],f.prototype,"callout",void 0),t([e({json:{read:!1,write:!1}})],f.prototype,"styleOrigin",void 0),t([e({type:u})],f.prototype,"symbolLayers",void 0),t([s({LabelSymbol3D:"label-3d"},{readOnly:!0})],f.prototype,"type",void 0),f=n=t([l("esri.symbols.LabelSymbol3D")],f);const b=f;export{b as default};