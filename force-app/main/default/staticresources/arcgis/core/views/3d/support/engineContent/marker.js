/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{createTexture as r}from"./sdfPrimitives.js";const t=64,o=t/2,i=o/5,m=t/i,e=.25;function f(m,e){return m.fromData(`${e}-marker`,(()=>r(e,t,o,i)))}export{m as MARKER_SIZE_PER_LINE_WIDTH,o as MARKER_SYMBOL_SIZE,t as MARKER_TEXTURE_SIZE,i as MARKER_THICKNESS,e as MARKER_TIP_THICKNESS_FACTOR,f as prepareMarkerResources};