/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{isSome as r}from"../../core/maybe.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";import{getGeometryZScaler as s}from"../../geometry/support/zscale.js";import c from"./StreamConnection.js";let a=class extends c{constructor(e){super(),this.connectionStatus="connected",this.errorString=null;const{geometryType:r,spatialReference:t,sourceSpatialReference:o}=e;this._featureZScaler=s(r,o,t)}updateCustomParameters(e){}sendMessageToSocket(e){}sendMessageToClient(e){if("type"in e)switch(e.type){case"features":case"featureResult":for(const t of e.features)r(this._featureZScaler)&&this._featureZScaler(t.geometry),this.onFeature(t)}this.onMessage(e)}};e([t()],a.prototype,"connectionStatus",void 0),e([t()],a.prototype,"errorString",void 0),a=e([o("esri.layers.support.ClientSideConnection")],a);export{a as ClientSideConnection};