/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import r from"../../Color.js";import{JSONSupport as o}from"../../core/JSONSupport.js";import{isSome as e}from"../../core/maybe.js";import{px2pt as s}from"../../core/screenUtils.js";import{property as p}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as i}from"../../core/accessorSupport/decorators/subclass.js";import{symbol3dLinePatternProperty as a}from"../patterns/utils.js";import{colorAndTransparencyProperty as l,screenSizeProperty as c}from"./materialUtils.js";import{lineCaps as n}from"./symbolLayerUtils3D.js";var m;let u=m=class extends o{constructor(t){super(t),this.color=new r([0,0,0,1]),this.size=s(1),this.pattern=null,this.patternCap="butt"}clone(){const t={color:e(this.color)?this.color.clone():null,size:this.size,pattern:e(this.pattern)?this.pattern.clone():null,patternCap:this.patternCap};return new m(t)}};t([p(l)],u.prototype,"color",void 0),t([p(c)],u.prototype,"size",void 0),t([p(a)],u.prototype,"pattern",void 0),t([p({type:n,json:{default:"butt",write:{overridePolicy(){return{enabled:e(this.pattern)}}}}})],u.prototype,"patternCap",void 0),u=m=t([i("esri.symbols.support.Symbol3DOutline")],u);export{u as Symbol3DOutline};