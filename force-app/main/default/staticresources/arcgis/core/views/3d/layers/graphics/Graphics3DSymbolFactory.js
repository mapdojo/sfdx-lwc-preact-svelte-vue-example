/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import o from"./Graphics3DPointSymbol.js";import r from"./Graphics3DSymbol.js";function t(t,i,n){return"point-3d"===t.type?new o(t,i,n):new r(t,i,n)}export{t as make};