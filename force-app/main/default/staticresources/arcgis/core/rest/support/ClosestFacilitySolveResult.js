/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import{JSONSupport as r}from"../../core/JSONSupport.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";import s from"./DirectionsFeatureSet.js";import i from"./FeatureSet.js";import p from"./NAMessage.js";let n=class extends r{constructor(t){super(t),this.directionLines=null,this.directionPoints=null,this.directions=null,this.facilities=null,this.incidents=null,this.messages=null,this.pointBarriers=null,this.polylineBarriers=null,this.polygonBarriers=null,this.routes=null,this.traversedEdges=null,this.traversedJunctions=null,this.traversedTurns=null}};t([e({type:i})],n.prototype,"directionLines",void 0),t([e({type:i})],n.prototype,"directionPoints",void 0),t([e({type:[s]})],n.prototype,"directions",void 0),t([e({type:i})],n.prototype,"facilities",void 0),t([e({type:i})],n.prototype,"incidents",void 0),t([e({type:[p]})],n.prototype,"messages",void 0),t([e({type:i,json:{read:{source:"barriers"}}})],n.prototype,"pointBarriers",void 0),t([e({type:i})],n.prototype,"polylineBarriers",void 0),t([e({type:i})],n.prototype,"polygonBarriers",void 0),t([e({type:i})],n.prototype,"routes",void 0),t([e({type:i})],n.prototype,"traversedEdges",void 0),t([e({type:i})],n.prototype,"traversedJunctions",void 0),t([e({type:i})],n.prototype,"traversedTurns",void 0),n=t([o("esri.rest.support.ClosestFacilitySolveResult")],n);const l=n;export{l as default};