/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../core/has.js";import{CapType as e}from"../../webgl-engine/shaders/RibbonLineTechniqueConfiguration.js";function n(n){switch(n){case"butt":return e.BUTT;case"square":return e.SQUARE;case"round":return e.ROUND;default:return null}}function r(e){return"diamond"===e?"kite":e}export{n as parseCapType,r as parseLineMarkerStyle};