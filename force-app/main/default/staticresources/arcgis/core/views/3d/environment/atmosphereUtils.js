/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clamp as t}from"../../../core/mathUtils.js";function e(e){const o=1e5;return t((e-o)/(1e6-o),0,1)}const o=1e4,r=.085,n=1e5;export{n as atmosphereHeight,e as computeInnerAltitudeFade,o as innerAtmosphereDepth,r as rayLeighScaleHeight};