/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clamp as t}from"../../core/mathUtils.js";import{classes as r}from"./widgetUtils.js";import{tsx as e}from"./jsxFactory.js";const i={heading:"esri-widget__heading"};function n({level:t,class:n,...s},a){const c=o(t);return e(`h${c}`,{...s,class:r(i.heading,n),role:"heading","aria-level":String(c)},a)}function o(r){return t(Math.ceil(r),1,6)}function s(t,r=1){return o(t+r)}export{i as CSS,n as Heading,s as incrementHeadingLevel};