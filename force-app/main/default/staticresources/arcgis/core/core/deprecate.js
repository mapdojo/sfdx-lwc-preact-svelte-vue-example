/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import has from"./has.js";const n=new Set;function e(e,i,o=!1){o&&n.has(i)||(o&&n.add(i),e.warn(`🛑 DEPRECATED - ${i}`))}function i(n,e,i={}){has("esri-deprecation-warnings")&&r(n,`Module: ${e}`,i)}function o(n,e,i={}){if(has("esri-deprecation-warnings")){const{moduleName:o}=i;r(n,`Function: ${(o?o+"::":"")+e+"()"}`,i)}}function t(n,e,i={}){if(has("esri-deprecation-warnings")){const{moduleName:o}=i;r(n,`Property: ${(o?o+"::":"")+e}`,i)}}function r(n,i,o={}){if(has("esri-deprecation-warnings")){const{replacement:t,version:r,see:s,warnOnce:a}=o;let c=i;t&&(c+=`\n\t🛠️ Replacement: ${t}`),r&&(c+=`\n\t⚙️ Version: ${r}`),s&&(c+=`\n\t🔗 See ${s} for more details.`),e(n,c,a)}}export{r as deprecated,o as deprecatedFunction,i as deprecatedModule,t as deprecatedProperty};