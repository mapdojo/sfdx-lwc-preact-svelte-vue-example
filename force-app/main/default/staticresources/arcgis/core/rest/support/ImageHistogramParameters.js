/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{geometryTypes as r}from"../../geometry.js";import t from"../../TimeExtent.js";import{JSONSupport as o}from"../../core/JSONSupport.js";import{clone as s}from"../../core/lang.js";import{property as i}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import{subclass as p}from"../../core/accessorSupport/decorators/subclass.js";import{writer as m}from"../../core/accessorSupport/decorators/writer.js";import{getJsonType as n,fromJSON as l}from"../../geometry/support/jsonUtils.js";import u from"../../layers/support/MosaicRule.js";import a from"../../layers/support/RasterFunction.js";import c from"../../geometry/Point.js";var y;let j=y=class extends o{constructor(){super(...arguments),this.geometry=null,this.mosaicRule=null,this.renderingRule=null,this.pixelSize=null,this.raster=void 0,this.timeExtent=null}writeGeometry(e,r,t){null!=e&&(r.geometryType=n(e),r[t]=e.toJSON())}clone(){return new y(s({geometry:this.geometry,mosaicRule:this.mosaicRule,renderingRule:this.renderingRule,pixelSize:this.pixelSize,raster:this.raster,timeExtent:this.timeExtent}))}};e([i({types:r,json:{read:l}})],j.prototype,"geometry",void 0),e([m("geometry")],j.prototype,"writeGeometry",null),e([i({type:u,json:{write:!0}})],j.prototype,"mosaicRule",void 0),e([i({type:a,json:{write:!0}})],j.prototype,"renderingRule",void 0),e([i({type:c,json:{write:!0}})],j.prototype,"pixelSize",void 0),e([i({json:{write:!0}})],j.prototype,"raster",void 0),e([i({type:t,json:{read:{source:"time"},write:{target:"time"}}})],j.prototype,"timeExtent",void 0),j=y=e([p("esri.rest.support.ImageHistogramParameters")],j);const d=j;export{d as default};