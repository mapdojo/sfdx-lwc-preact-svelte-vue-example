/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../chunks/tslib.es6.js";import{JSONSupport as o}from"../core/JSONSupport.js";import"../core/Logger.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import"../core/Error.js";import"../core/has.js";import{enumeration as e}from"../core/accessorSupport/decorators/enumeration.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";var t;let p=t=class extends o{constructor(r){super(r),this.type="none"}clone(){return new t({type:this.type})}};r([e({none:"none",stayAbove:"stay-above"})],p.prototype,"type",void 0),p=t=r([s("esri.ground.NavigationConstraint")],p);export{p as NavigationConstraint};