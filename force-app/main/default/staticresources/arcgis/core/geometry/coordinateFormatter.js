/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import n from"../core/Error.js";import{i as e,a as o,l as r,P as t,b as i,c as a,d as s,e as c,f as l}from"../chunks/pe.js";import u from"./Point.js";import d from"./SpatialReference.js";function _(){return e()}function f(){return o()}function S(){return r()}function E(n,e){const o=[];n=(n=(n=n.replace(/[\u00B0\u00BA]/g,"^")).replace(/\u2032/g,"'")).replace(/\u2033/g,'"');const r=p(e);return t.dmsToGeog(r,1,[n],o)?new u(o[0][0],o[0][1],e||d.WGS84):null}function w(n,e,o){const r=[],t=M(o);if(-1===t)return console.warn(`invalid conversionMode: ${o}`),null;const a=p(e);return i.mgrsToGeogExtended(a,1,[n],t,r)?new u(r[0][0],r[0][1],e||d.WGS84):null}function g(n,e){const o=[];!e&&/\(.+27/.test(n)&&(e=d.GCS_NAD_1927);const r=p(e);return a.usngToGeog(r,1,[n],o)?new u(o[0][0],o[0][1],e||d.WGS84):null}function m(n,e,o){const r=[],t=v(o);if(-1===t)return console.warn(`invalid conversionMode: ${o}`),null;const i=p(e);return s.utmToGeog(i,1,[n],t,r)?new u(r[0][0],r[0][1],e||d.WGS84):null}function T(n,e,o=0){const r=[[n.x,n.y]],i=[],a=p(n.spatialReference);let s=0;switch(e){case"dd":s=t.geogToDd(a,1,r,o,i);break;case"ddm":s=t.geogToDdm(a,1,r,o,i);break;case"dms":s=t.geogToDms(a,1,r,o,i);break;default:return console.warn(`invalid format: ${e}`),null}return s?i[0]:null}function P(n,e,o=0,r=!1){const t=[[n.x,n.y]],a=[],s=p(n.spatialReference);let c=M(e);if(-1===c)return console.warn(`invalid conversionMode: ${e}`),null;r&&(c|=i.PE_MGRS_ADD_SPACES);return i.geogToMgrsExtended(s,1,t,o,!1,c,a)?a[0]:null}function G(n,e=0,o=!1){const r=[[n.x,n.y]],t=[],i=p(n.spatialReference);return a.geogToUsng(i,1,r,e,!1,o,t)?t[0]:null}function k(n,e,o=!1){const r=[[n.x,n.y]],t=[],i=p(n.spatialReference);let a=v(e);if(-1===a)return console.warn(`invalid conversionMode: ${e}`),null;o&&(a|=s.PE_UTM_OPTS_ADD_SPACES);return s.geogToUtm(i,1,r,a,t)?t[0]:null}function p(e){let o=null;if(e||(e=d.WGS84),e.wkid){if(o=c.geogcs(e.wkid),!o)throw new n("coordinate-formatter:invalid-spatial-reference","wkid is not valid")}else{if(!e.wkt)throw new n("coordinate-formatter:invalid-spatial-reference","wkid and wkt are missing");if(o=c.fromString(l.PE_TYPE_GEOGCS,e.wkt),!o)throw new n("coordinate-formatter:invalid-spatial-reference","wkt is not valid")}return o}function M(n){let e=-1;switch(n){case"automatic":e=i.PE_MGRS_STYLE_AUTO;break;case"new-180-in-zone-01":e=i.PE_MGRS_STYLE_NEW|i.PE_MGRS_180_ZONE_1_PLUS;break;case"new-180-in-zone-60":e=i.PE_MGRS_STYLE_NEW;break;case"old-180-in-zone-01":e=i.PE_MGRS_STYLE_OLD|i.PE_MGRS_180_ZONE_1_PLUS;break;case"old-180-in-zone-60":e=i.PE_MGRS_STYLE_OLD}return e}function v(n){let e=-1;switch(n){case"latitude-band-indicators":e=s.PE_UTM_OPTS_NONE;break;case"north-south-indicators":e=s.PE_UTM_OPTS_NS}return e}export{E as fromLatitudeLongitude,w as fromMgrs,g as fromUsng,m as fromUtm,_ as isLoaded,f as isSupported,S as load,T as toLatitudeLongitude,P as toMgrs,G as toUsng,k as toUtm};