/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{geometryTypes as r}from"../../geometry.js";import{clone as t}from"../../core/lang.js";import{lengthUnitsJSONMap as o,areaUnitsJSONMap as s}from"../../core/unitUtils.js";import{property as i}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import{subclass as a}from"../../core/accessorSupport/decorators/subclass.js";import{writer as p}from"../../core/accessorSupport/decorators/writer.js";import{getJsonType as m}from"../../geometry/support/jsonUtils.js";import{measureOperationJSONMap as n,BaseImageMeasureParameters as l}from"./BaseImageMeasureParameters.js";var u;let c=u=class extends l{constructor(){super(...arguments),this.type="area-perimeter",this.geometry=null,this.is3D=!1,this.linearUnit="meters",this.areaUnit="square-meters"}writeGeometry(e,r,t){null!=e&&(r.geometryType=m(e),r[t]=e.toJSON())}get measureOperation(){return this.is3D?"area-and-perimeter-3D":"area-and-perimeter"}clone(){return new u(t({geometry:this.geometry,is3D:this.is3D,linearUnit:this.linearUnit,areaUnit:this.areaUnit,mosaicRule:this.mosaicRule,renderingRule:this.renderingRule,pixelSize:this.pixelSize,raster:this.raster}))}};e([i({types:r,json:{name:"fromGeometry",read:!0,write:!0}})],c.prototype,"geometry",void 0),e([p("geometry")],c.prototype,"writeGeometry",null),e([i({type:n.apiValues,json:{write:n.write}})],c.prototype,"measureOperation",null),e([i({json:{read:!0}})],c.prototype,"is3D",void 0),e([i({type:String,json:{read:o.read,write:o.write}})],c.prototype,"linearUnit",void 0),e([i({type:String,json:{read:s.read,write:s.write}})],c.prototype,"areaUnit",void 0),c=u=e([a("esri.rest.support.ImageAreaParameters")],c);const y=c;export{y as default};