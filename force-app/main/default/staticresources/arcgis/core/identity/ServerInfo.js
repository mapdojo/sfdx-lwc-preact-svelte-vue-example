/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../chunks/tslib.es6.js";import{JSONSupport as r}from"../core/JSONSupport.js";import{property as e}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as t}from"../core/accessorSupport/decorators/subclass.js";let s=class extends r{constructor(o){super(o),this.adminTokenServiceUrl=null,this.currentVersion=null,this.hasPortal=null,this.hasServer=null,this.owningSystemUrl=null,this.owningTenant=null,this.server=null,this.shortLivedTokenValidity=null,this.tokenServiceUrl=null,this.webTierAuth=null}};o([e({json:{write:!0}})],s.prototype,"adminTokenServiceUrl",void 0),o([e({json:{write:!0}})],s.prototype,"currentVersion",void 0),o([e({json:{write:!0}})],s.prototype,"hasPortal",void 0),o([e({json:{write:!0}})],s.prototype,"hasServer",void 0),o([e({json:{write:!0}})],s.prototype,"owningSystemUrl",void 0),o([e({json:{write:!0}})],s.prototype,"owningTenant",void 0),o([e({json:{write:!0}})],s.prototype,"server",void 0),o([e({json:{write:!0}})],s.prototype,"shortLivedTokenValidity",void 0),o([e({json:{write:!0}})],s.prototype,"tokenServiceUrl",void 0),o([e({json:{write:!0}})],s.prototype,"webTierAuth",void 0),s=o([t("esri.identity.ServerInfo")],s);const i=s;export{i as default};