/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{legacyTimeZoneMap as t}from"./legacyTimeZoneMap.js";import{DateTime as e,FixedOffsetZone as n}from"luxon";function o(e,n="system"){if(!e||!t.has(e.timeZone))return n;const o=t.get(e.timeZone);return s(e.timeZone)||e.respectsDaylightSaving?o:r(o)}function r(t){const o=e.local().setZone(t),r=Math.min(o.set({month:1,day:1}).offset,o.set({month:5}).offset);if(0===r)return"Etc/UTC";return`Etc/GMT${n.instance(-r).formatOffset(0,"narrow")}`}function s(t){return t.startsWith("UTC")}export{o as convertLegacyTimeZone};