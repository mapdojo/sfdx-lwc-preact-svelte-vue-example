/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../core/has.js";import e from"./CodedValueDomain.js";import r from"./Domain.js";import o from"./InheritedDomain.js";import t from"./RangeDomain.js";const n={key:"type",base:r,typeMap:{range:t,"coded-value":e,inherited:o}};function i(r){if(!r||!r.type)return null;switch(r.type){case"range":return t.fromJSON(r);case"codedValue":return e.fromJSON(r);case"inherited":return o.fromJSON(r)}return null}export{e as CodedValueDomain,r as DomainBase,o as InheritedDomain,t as RangeDomain,i as fromJSON,n as types};