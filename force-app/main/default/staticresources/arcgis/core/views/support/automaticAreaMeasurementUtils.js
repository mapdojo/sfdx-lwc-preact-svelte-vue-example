/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../../core/maybe.js";import{euclideanHorizontalPlanarArea as r,euclideanPlanarArea as o,createEuclideanPlanarAreaCache as t}from"./euclideanAreaMeasurementUtils.js";import{geodesicArea as n}from"./geodesicAreaMeasurementUtils.js";function i(i,u,m=t()){if("on-the-ground"===u){const o=n(i);return e(o)?o:r(i,m)}return o(i,m)}function u(e,r=t()){return i(e,"on-the-ground",r)}export{u as autoArea2D,i as autoAreaByElevationMode};