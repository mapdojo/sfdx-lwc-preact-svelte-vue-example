/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../chunks/tslib.es6.js";import{JSONSupport as o}from"../core/JSONSupport.js";import{clone as e}from"../core/lang.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import i from"./widgets/FloorFilter.js";import p from"./widgets/Range.js";import l from"./widgets/TimeSlider.js";var m;let c=m=class extends o{constructor(r){super(r),this.range=null,this.timeSlider=null,this.floorFilter=null}clone(){return new m(e({range:this.range,timeSlider:this.timeSlider,floorFilter:this.floorFilter}))}};r([t({type:p,json:{write:!0}})],c.prototype,"range",void 0),r([t({type:l,json:{write:!0}})],c.prototype,"timeSlider",void 0),r([t({type:i,json:{write:!0}})],c.prototype,"floorFilter",void 0),c=m=r([s("esri.webdoc.Widgets")],c);const n=c;export{n as default};