/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{JSONSupport as e}from"../../core/JSONSupport.js";import{isSome as o}from"../../core/maybe.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import{ensureType as s}from"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as i}from"../../core/accessorSupport/decorators/subclass.js";import{fromJSON as p}from"../../geometry/support/jsonUtils.js";let a=class extends e{constructor(r){super(r),this.geometries1=null,this.geometries2=null,this.relation=null,this.relationParameter=null}};r([t({json:{read:{reader:r=>r?r.map((r=>p(r))).filter(o):null},write:{writer:(r,e)=>{e.geometries1=r?.map((r=>r.toJSON()))??null}}}})],a.prototype,"geometries1",void 0),r([t({json:{read:{reader:r=>r?r.map((r=>p(r))).filter(o):null},write:{writer:(r,e)=>{e.geometries2=r?.map((r=>r.toJSON()))??null}}}})],a.prototype,"geometries2",void 0),r([t({type:String,json:{write:!0}})],a.prototype,"relation",void 0),r([t({type:String,json:{write:!0}})],a.prototype,"relationParameter",void 0),a=r([i("esri.rest.support.RelationParameters")],a),a.from=s(a);const m=a;export{m as default};