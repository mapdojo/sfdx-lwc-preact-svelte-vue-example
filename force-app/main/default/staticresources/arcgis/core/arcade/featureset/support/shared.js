/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ArcadeDate as e}from"../../ArcadeDate.js";import r from"../../../geometry/Extent.js";import t from"../../../layers/support/Field.js";var i,n;function o(e){return t.fromJSON(e.toJSON())}function l(e){return e.toJSON?e.toJSON():e}function s(e){return"string"==typeof e||e instanceof String}function y(e){return"boolean"==typeof e}function u(e){return"number"==typeof e}function p(e){return e instanceof Array}function c(e){return e instanceof Date}function a(r){return r instanceof e}function m(e,r){return e===r||!(!c(e)&&!a(e)||!c(r)&&!a(r))&&e.getTime()===r.getTime()}function f(e){const r={};for(const t in e)r[t]=e[t];return r}function d(e){if(null==e)return null;if("number"==typeof e)return e;switch(e.toLowerCase()){case"meters":case"meter":return 109404;case"miles":case"mile":return 109439;case"kilometers":case"kilometer":case"km":return 109414}return null}function g(e){if(null==e)return null;switch(e.type){case"polygon":case"multipoint":case"polyline":return e.extent;case"point":return new r({xmin:e.x,ymin:e.y,xmax:e.x,ymax:e.y,spatialReference:e.spatialReference});case"extent":return e}return null}function F(e){if(null==e)return null;if("number"==typeof e)return e;if("number"==typeof e)return e;switch(e.toLowerCase()){case"meters":case"meter":return 9001;case"miles":case"mile":return 9093;case"kilometers":case"kilometer":case"km":return 9036}return null}function G(e,r){return e===r||("point"===e&&"esriGeometryPoint"===r||("polyline"===e&&"esriGeometryPolyline"===r||("polygon"===e&&"esriGeometryPolygon"===r||("extent"===e&&"esriGeometryEnvelope"===r||("multipoint"===e&&"esriGeometryMultipoint"===r||("point"===r&&"esriGeometryPoint"===e||("polyline"===r&&"esriGeometryPolyline"===e||("polygon"===r&&"esriGeometryPolygon"===e||("extent"===r&&"esriGeometryEnvelope"===e||"multipoint"===r&&"esriGeometryMultipoint"===e)))))))))}!function(e){e[e.Standardised=0]="Standardised",e[e.StandardisedNoInterval=1]="StandardisedNoInterval",e[e.SqlServer=2]="SqlServer",e[e.Oracle=3]="Oracle",e[e.Postgres=4]="Postgres",e[e.PGDB=5]="PGDB",e[e.FILEGDB=6]="FILEGDB",e[e.NotEvaluated=7]="NotEvaluated"}(i||(i={})),function(e){e[e.InFeatureSet=0]="InFeatureSet",e[e.NotInFeatureSet=1]="NotInFeatureSet",e[e.Unknown=2]="Unknown"}(n||(n={}));const T=1e3;function S(e){return function(r){e.reject(r)}}function v(e,r){return function(){try{e.apply(null,arguments)}catch(t){r.reject(t)}}}const P={point:"point",polygon:"polygon",polyline:"polyline",multipoint:"multipoint",extent:"extent",esriGeometryPoint:"point",esriGeometryPolygon:"polygon",esriGeometryPolyline:"polyline",esriGeometryMultipoint:"multipoint",esriGeometryEnvelope:"extent",envelope:"extent"},I={point:"esriGeometryPoint",polygon:"esriGeometryPolygon",polyline:"esriGeometryPolyline",multipoint:"esriGeometryMultipoint",extent:"esriGeometryEnvelope",esriGeometryPoint:"esriGeometryPoint",esriGeometryPolygon:"esriGeometryPolygon",esriGeometryPolyline:"esriGeometryPolyline",esriGeometryMultipoint:"esriGeometryMultipoint",esriGeometryEnvelope:"esriGeometryEnvelope",envelope:"esriGeometryEnvelope"},b={"small-integer":"esriFieldTypeSmallInteger",integer:"esriFieldTypeInteger",long:"esriFieldTypeLong",single:"esriFieldTypeSingle",double:"esriFieldTypeDouble",string:"esriFieldTypeString",date:"esriFieldTypeDate",oid:"esriFieldTypeOID",geometry:"esriFieldTypeGeometry",blob:"esriFieldTypeBlob",raster:"esriFieldTypeRaster",guid:"esriFieldTypeGUID","global-id":"esriFieldTypeGlobalID",xml:"eesriFieldTypeXML",esriFieldTypeSmallInteger:"esriFieldTypeSmallInteger",esriFieldTypeInteger:"esriFieldTypeInteger",esriFieldTypeLong:"esriFieldTypeLong",esriFieldTypeSingle:"esriFieldTypeSingle",esriFieldTypeDouble:"esriFieldTypeDouble",esriFieldTypeString:"esriFieldTypeString",esriFieldTypeDate:"esriFieldTypeDate",esriFieldTypeOID:"esriFieldTypeOID",esriFieldTypeGeometry:"esriFieldTypeGeometry",esriFieldTypeBlob:"esriFieldTypeBlob",esriFieldTypeRaster:"esriFieldTypeRaster",esriFieldTypeGUID:"esriFieldTypeGUID",esriFieldTypeGlobalID:"esriFieldTypeGlobalID",esriFieldTypeXML:"eesriFieldTypeXML"};function D(e){switch(e){case"point":default:return"esriGeometryPoint";case"polygon":return"esriGeometryPolygon";case"multipoint":return"esriGeometryMultipoint";case"polyline":return"esriGeometryPolyline"}}function x(e){return void 0===e?"":e=(e=(e=e.replace(/\/featureserver\/[0-9]*/i,"/FeatureServer")).replace(/\/mapserver\/[0-9]*/i,"/MapServer")).split("?")[0]}function N(e,r){r||(r={}),"function"==typeof r&&(r={cmp:r});const t="boolean"==typeof r.cycles&&r.cycles,i=r.cmp&&(n=r.cmp,function(e){return function(r,t){const i={key:r,value:e[r]},o={key:t,value:e[t]};return n(i,o)}});var n;const o=[];return function e(r){if(r&&r.toJSON&&"function"==typeof r.toJSON&&(r=r.toJSON()),void 0===r)return;if("number"==typeof r)return isFinite(r)?""+r:"null";if("object"!=typeof r)return JSON.stringify(r);let n,l;if(Array.isArray(r)){for(l="[",n=0;n<r.length;n++)n&&(l+=","),l+=e(r[n])||"null";return l+"]"}if(null===r)return"null";if(o.includes(r)){if(t)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}const s=o.push(r)-1,y=Object.keys(r).sort(i&&i(r));for(l="",n=0;n<y.length;n++){const t=y[n],i=e(r[t]);i&&(l&&(l+=","),l+=JSON.stringify(t)+":"+i)}return o.splice(s,1),"{"+l+"}"}(e)}export{i as FeatureServiceDatabaseType,n as IdState,v as callback,f as cloneAttributes,o as cloneField,F as convertLinearUnitsToCode,d as convertSquareUnitsToCode,T as defaultMaxRecords,m as equalityTest,S as errback,l as esriFieldToJson,x as extractServiceUrl,a as isArcadeDate,p as isArray,y as isBoolean,c as isDate,u as isNumber,s as isString,b as layerFieldEsriConstants,P as layerGeometryEsriConstants,I as layerGeometryEsriRestConstants,G as sameGeomType,g as shapeExtent,N as stableStringify,D as toEsriGeometryType};