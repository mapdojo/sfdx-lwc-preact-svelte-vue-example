/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{JSONMap as e}from"../../jsonMap.js";import{property as n}from"./property.js";function o(o,r={}){const a=o instanceof e?o:new e(o,r),l={type:r?.ignoreUnknown??1?a.apiValues:String,json:{type:a.jsonValues,read:!r?.readOnly&&{reader:a.read},write:{writer:a.write}}};return void 0!==r?.readOnly&&(l.readOnly=!!r.readOnly),void 0!==r?.default&&(l.json.default=r.default),void 0!==r?.name&&(l.json.name=r.name),void 0!==r?.nonNullable&&(l.nonNullable=r.nonNullable),n(l)}export{o as enumeration};