/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../core/Error.js";import{isNone as r,isSome as a}from"../../core/maybe.js";import{getFilename as t,urlToObject as s}from"../../core/urlUtils.js";import{parse as l,parseNonStandardSublayerUrl as o}from"./arcgisLayerUrl.js";import{fetchFeatureService as n}from"./fetchService.js";import{sceneServiceLayerTypeToClassName as u}from"./layerUtils.js";import{layerLookupMap as c}from"./lazyLayerLoader.js";import{fetchArcGISServiceJSON as i}from"../../support/requestPresets.js";const y={FeatureLayer:!0,SceneLayer:!0};async function m(e){const r=e.properties?.customParameters,a=await d(e.url,r),t={...e.properties,url:e.url};if(!a.sublayerIds)return null!=a.layerOrTableId&&(t.layerId=a.layerOrTableId,t.sourceJSON=a.sourceJSON),new a.Constructor(t);const s=new(0,(await import("../GroupLayer.js")).default)({title:a.parsedUrl.title});return f(s,a,t),s}function p(e,r){return e?e.find((e=>e.id===r)):null}function f(e,r,t){function s(e,s){const l={...t,layerId:e,sublayerTitleMode:"service-name"};return a(s)&&(l.sourceJSON=s),new r.Constructor(l)}r.sublayerIds.forEach((a=>{const t=s(a,p(r.sublayerInfos,a));e.add(t)})),r.tableIds.forEach((a=>{const t=s(a,p(r.tableInfos,a));e.tables.add(t)}))}async function d(a,t){let s=l(a);if(r(s)&&(s=await I(a,t)),r(s))throw new e("arcgis-layers:url-mismatch","The url '${url}' is not a valid arcgis resource",{url:a});const{serverType:o,sublayer:n}=s;let c;const m={FeatureServer:"FeatureLayer",StreamServer:"StreamLayer",VectorTileServer:"VectorTileLayer"};switch(o){case"MapServer":if(null!=n)c="FeatureLayer";else{c=await v(a,t)?"TileLayer":"MapImageLayer"}break;case"ImageServer":{const e=await i(a,{customParameters:t}),{tileInfo:r,cacheType:s}=e;c=r?"LERC"!==r?.format?.toUpperCase()||s&&"elevation"!==s.toLowerCase()?"ImageryTileLayer":"ElevationLayer":"ImageryLayer";break}case"SceneServer":{const e=await i(s.url.path,{customParameters:t});if(c="SceneLayer",e){const r=e?.layers;if("Voxel"===e?.layerType)c="VoxelLayer";else if(r?.length){const e=r[0]?.layerType;null!=e&&null!=u[e]&&(c=u[e])}}break}default:c=m[o]}const p="FeatureServer"===o,f={parsedUrl:s,Constructor:null,layerOrTableId:p?n:void 0,sublayerIds:null,tableIds:null};if(y[c]&&null==n){const e=await S(a,o,t);p&&(f.sublayerInfos=e.layerInfos,f.tableInfos=e.tableInfos);1!==e.layerIds.length+e.tableIds.length?(f.sublayerIds=e.layerIds,f.tableIds=e.tableIds):p&&(f.layerOrTableId=e.layerIds[0]??e.tableIds[0],f.sourceJSON=e.layerInfos?.[0]??e.tableInfos?.[0])}return f.Constructor=await w(c),f}async function I(e,r){const l=await i(e,{customParameters:r});let n=null,u=null;const c=l.type;if("Feature Layer"===c||"Table"===c?(n="FeatureServer",u=l.id??null):"indexedVector"===c?n="VectorTileServer":l.hasOwnProperty("mapName")?n="MapServer":l.hasOwnProperty("bandCount")&&l.hasOwnProperty("pixelSizeX")?n="ImageServer":l.hasOwnProperty("maxRecordCount")&&l.hasOwnProperty("allowGeometryUpdates")?n="FeatureServer":l.hasOwnProperty("streamUrls")?n="StreamServer":b(l)?(n="SceneServer",u=l.id):l.hasOwnProperty("layers")&&b(l.layers?.[0])&&(n="SceneServer"),!n)return null;const y=null!=u?o(e):null;return{title:a(y)&&l.name||t(e),serverType:n,sublayer:u,url:{path:a(y)?y.serviceUrl:s(e).path}}}function b(e){return null!=e&&e.hasOwnProperty("store")&&e.hasOwnProperty("id")&&"number"==typeof e.id}async function S(e,r,a){let t,s=!1;if("FeatureServer"===r){const r=await n(e,{customParameters:a});s=!!r.layersJSON,t=r.layersJSON||r.serviceJSON}else t=await i(e,{customParameters:a});const l=t?.layers,o=t?.tables;return{layerIds:l?.map((e=>e.id)).reverse()||[],tableIds:o?.map((e=>e.id)).reverse()||[],layerInfos:s?l:[],tableInfos:s?o:[]}}async function w(e){return(0,c[e])()}async function v(e,r){return(await i(e,{customParameters:r})).tileInfo}export{m as fromUrl};