/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../assets.js";import"../has.js";import"../urlUtils.js";let s=null;const a={};function e(s){const e={async:s.async,isDebug:s.isDebug,locale:s.locale,baseUrl:s.baseUrl,has:{...s.has},map:{...s.map},packages:s.packages&&s.packages.concat()||[],paths:{...s.paths}};return s.hasOwnProperty("async")||(e.async=!0),s.hasOwnProperty("isDebug")||(e.isDebug=!1),s.baseUrl||(e.baseUrl=a.baseUrl),e}export{s as DEFAULT_LOADER_URL,e as loaderConfig};