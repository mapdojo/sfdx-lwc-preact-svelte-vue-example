/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{HELP_MESSAGE as s,TABLE as t,CONTENT as e}from"../css.js";import{classes as l}from"../../../../widgets/support/widgetUtils.js";import{tsx as r}from"../../../../widgets/support/jsxFactory.js";function i({className:i,helpMessage:o},...p){const a=p.filter((s=>!!s));return r("div",{class:l(i,e)},a.length>0?r("div",{class:t},...a):null,o?r("div",{key:"help-message",class:s},o):null)}export{i as TooltipContentWithHelpMessage};