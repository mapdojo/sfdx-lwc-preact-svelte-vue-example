/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../chunks/tslib.es6.js";import"../../geometry.js";import{JSONSupport as r}from"../../core/JSONSupport.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import{ensureType as e}from"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as s}from"../../core/accessorSupport/decorators/subclass.js";import{apiKey as p}from"./commonProperties.js";import i from"../../geometry/Point.js";import c from"../../geometry/SpatialReference.js";let a=class extends r{constructor(o){super(o),this.apiKey=null,this.location=null,this.locationType=null,this.outSpatialReference=null}};o([t(p)],a.prototype,"apiKey",void 0),o([t({type:i,json:{write:{writer:(o,r)=>{const t=o?o.clone().normalize():null,e=void 0!==t;r.location=e?t:null}}}})],a.prototype,"location",void 0),o([t({type:String,json:{write:!0}})],a.prototype,"locationType",void 0),o([t({type:c,json:{read:{source:"outSR"},write:{target:"outSR"}}})],a.prototype,"outSpatialReference",void 0),a=o([s("esri.rest.support.LocationToAddressParameters")],a),a.from=e(a);const n=a;export{n as default};