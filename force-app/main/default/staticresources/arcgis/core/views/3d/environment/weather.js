/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"./CloudyWeather.js";import r from"./FoggyWeather.js";import o from"./RainyWeather.js";import t from"./SnowyWeather.js";import y from"./SunnyWeather.js";const n={key:"type",base:y,typeMap:{sunny:y,cloudy:e,rainy:o,snowy:t,foggy:r}},a=Object.keys(n.typeMap);function s(e,r){return!!a.includes(e)||(r.error(`"${e}" is not a valid weather type`),!1)}const p=1e4;export{s as validateWeatherType,p as weatherHeightLimit,n as weatherTypes,a as weatherTypesArray};