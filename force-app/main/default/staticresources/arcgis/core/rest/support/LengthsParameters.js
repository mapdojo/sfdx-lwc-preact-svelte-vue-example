/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../chunks/tslib.es6.js";import"../../geometry.js";import{JSONSupport as r}from"../../core/JSONSupport.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import{ensureType as e}from"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as s}from"../../core/accessorSupport/decorators/subclass.js";import{fromJSON as p}from"../../geometry/support/jsonUtils.js";import i from"../../geometry/Polyline.js";let l=class extends r{constructor(o){super(o),this.calculationType=null,this.geodesic=null,this.lengthUnit=null,this.polylines=null}};o([t({type:String,json:{write:!0}})],l.prototype,"calculationType",void 0),o([t({type:Boolean,json:{write:!0}})],l.prototype,"geodesic",void 0),o([t({json:{write:!0}})],l.prototype,"lengthUnit",void 0),o([t({type:[i],json:{read:{reader:o=>o?o.map((o=>p(o))):null},write:{writer:(o,r)=>{r.polylines=o.map((o=>o.toJSON()))}}}})],l.prototype,"polylines",void 0),l=o([s("esri.rest.support.LengthsParameters")],l),l.from=e(l);const n=l;export{n as default};