/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import r from"../../config.js";import t from"../../core/Logger.js";async function o(o){const a="portalItem"in o?o:{portalItem:o},e=await import("../../portal/support/portalLayers.js");try{return await e.fromItem(a)}catch(p){const o=a&&a.portalItem,e=o&&o.id||"unset",l=o&&o.portal&&o.portal.url||r.portalUrl;throw t.getLogger("esri.layers.support.fromPortalItem").error("#fromPortalItem()","Failed to create layer from portal item (portal: '"+l+"', id: '"+e+"')",p),p}}export{o as fromPortalItem};