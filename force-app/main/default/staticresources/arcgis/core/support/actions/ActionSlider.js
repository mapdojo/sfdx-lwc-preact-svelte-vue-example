/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as s}from"../../chunks/tslib.es6.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as i}from"../../core/accessorSupport/decorators/subclass.js";import e from"./ActionBase.js";var o;let r=o=class extends e{constructor(s){super(s),this.displayValueEnabled=!1,this.max=1,this.min=0,this.step=.1,this.type="slider",this.value=null}clone(){return new o({active:this.active,className:this.className,disabled:this.disabled,id:this.id,indicator:this.indicator,title:this.title,visible:this.visible,displayValueEnabled:this.displayValueEnabled,max:this.max,min:this.min,step:this.step,value:this.value})}};s([t()],r.prototype,"displayValueEnabled",void 0),s([t()],r.prototype,"max",void 0),s([t()],r.prototype,"min",void 0),s([t()],r.prototype,"step",void 0),s([t()],r.prototype,"value",void 0),r=o=s([i("esri.support.Action.ActionSlider")],r);const a=r;export{a as default};