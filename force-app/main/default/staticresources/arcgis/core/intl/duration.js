/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{convertTime as o}from"../core/timeUtils.js";import{getLanguage as l,getLocale as r}from"./locale.js";import{Duration as t}from"luxon";function n(l,r="milliseconds",n={}){const i={locale:e(),numberingSystem:"latn"};let s;return s=l?t.fromMillis(o(l,r,"milliseconds"),i).rescale():t.fromObject({seconds:0},i),s.toHuman({listStyle:"narrow",unitDisplay:"long",...n})}function e(){return"bs"===l()?"hr":r()}export{n as formatDuration};