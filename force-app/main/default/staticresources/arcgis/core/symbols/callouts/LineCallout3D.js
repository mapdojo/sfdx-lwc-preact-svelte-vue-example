/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../chunks/tslib.es6.js";import r from"../../Color.js";import{clone as e}from"../../core/lang.js";import{isSome as s}from"../../core/maybe.js";import{px2pt as t}from"../../core/screenUtils.js";import{property as i}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import{enumeration as p}from"../../core/accessorSupport/decorators/enumeration.js";import{subclass as l}from"../../core/accessorSupport/decorators/subclass.js";import c from"./Callout3D.js";import{a}from"../../chunks/LineCallout3DBorder.js";import{colorAndTransparencyProperty as m,screenSizeProperty as n}from"../support/materialUtils.js";var u;let d=u=class extends c{constructor(o){super(o),this.type="line",this.color=new r([0,0,0,1]),this.size=t(1),this.border=null}get visible(){return this.size>0&&s(this.color)&&this.color.a>0}clone(){return new u({color:e(this.color),size:this.size,border:e(this.border)})}};o([p({line:"line"},{readOnly:!0})],d.prototype,"type",void 0),o([i(m)],d.prototype,"color",void 0),o([i(n)],d.prototype,"size",void 0),o([i({type:a,json:{write:!0}})],d.prototype,"border",void 0),o([i({readOnly:!0})],d.prototype,"visible",null),d=u=o([l("esri.symbols.callouts.LineCallout3D")],d);const y=d;export{y as default};