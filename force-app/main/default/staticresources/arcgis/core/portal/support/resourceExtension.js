/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{getPathExtension as i}from"../../core/urlUtils.js";function t(i){return o[p(i)]||e}function p(i){return i instanceof Blob?i.type:n(i.url)}function n(t){const p=i(t);return g[p]||a}const o={},a="text/plain",e=o[a],g={png:"image/png",jpeg:"image/jpeg",jpg:"image/jpg",bmp:"image/bmp",gif:"image/gif",json:"application/json",txt:"text/plain",xml:"application/xml",svg:"image/svg+xml",zip:"application/zip",pbf:"application/vnd.mapbox-vector-tile",gz:"application/gzip","bin.gz":"application/octet-stream"};for(const c in g)o[g[c]]=c;export{t as getResourceContentExtension};