/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{fetchArcGISServiceJSON as e}from"../../support/requestPresets.js";async function r(r,s){const a=await e(r,s);a.layers=a.layers.filter(t);const n={serviceJSON:a};if((a.currentVersion??0)<10.5)return n;const i=await e(r+"/layers",s);return n.layersJSON={layers:i.layers.filter(t),tables:i.tables},n}function t(e){return!e.type||"Feature Layer"===e.type}export{r as fetchFeatureService};