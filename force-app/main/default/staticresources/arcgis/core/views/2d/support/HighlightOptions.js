/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../../chunks/tslib.es6.js";import r from"../../../Color.js";import t from"../../../core/Accessor.js";import{property as s}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as p}from"../../../core/accessorSupport/decorators/subclass.js";let i=class extends t{constructor(){super(...arguments),this.color=new r([0,255,255]),this.haloOpacity=1,this.fillOpacity=.25}equals(o){return this.color.equals(o.color)&&(this.haloColor||this.color).equals(o.haloColor||o.color)&&this.haloOpacity===o.haloOpacity&&this.fillOpacity===o.fillOpacity}};o([s({type:r})],i.prototype,"color",void 0),o([s({type:r})],i.prototype,"haloColor",void 0),o([s()],i.prototype,"haloOpacity",void 0),o([s()],i.prototype,"fillOpacity",void 0),i=o([p("esri.views.2d.support.HighlightOptions")],i);const c=i;export{c as default};