/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{LABEL as s}from"../css.js";import{classes as t}from"../../support/widgetUtils.js";import{tsx as o}from"../../support/jsxFactory.js";function r(r,e){const{for:a,label:c,tabIndex:l,...i}=r;return o("div",{class:t(s,i?.class),key:a,...i},o("calcite-label",{for:a,scale:"s",tabIndex:l},c),e)}export{r as Label};