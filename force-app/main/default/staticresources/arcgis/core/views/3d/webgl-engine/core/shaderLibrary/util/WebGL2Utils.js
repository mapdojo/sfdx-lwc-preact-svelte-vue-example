/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{glsl as e}from"../../shaderModules/interfaces.js";const t="Size",n="InvSize";function r(r,i,o=!1,u=0){if(r.hasWebGL2Context){const t=e`vec2(textureSize(${i}, ${e.int(u)}))`;return o?"(1.0 / "+t+")":t}return o?i+n:i+t}function i(t,r,i,o=null,u=0){if(t.hasWebGL2Context)return e`texelFetch(${r}, ivec2(${i}), ${e.int(u)})`;let $=e`texture2D(${r}, ${i} * `;return $+=o?e`(${o}))`:e`${r+n})`,$}export{n as TEXTURE_INVERSE_SIZE_UNIFORM_SUFFIX,t as TEXTURE_SIZE_UNIFORM_SUFFIX,i as texelFetch,r as textureSize};