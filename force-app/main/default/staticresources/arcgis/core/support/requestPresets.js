/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../request.js";async function t(t,o){const{data:r}=await e(t,{responseType:"json",query:{f:"json",...o?.customParameters,token:o?.apiKey}});return r}export{t as fetchArcGISServiceJSON};