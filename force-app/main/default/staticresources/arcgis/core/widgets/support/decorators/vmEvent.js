/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function e(e){return a=>{a.hasOwnProperty("_delegatedEventNames")||(a._delegatedEventNames=a._delegatedEventNames?a._delegatedEventNames.slice():[]);const n=a._delegatedEventNames,r=Array.isArray(e)?e:t(e);n.push(...r)}}function t(e){return e.split(",").map((e=>e.trim()))}export{e as vmEvent};