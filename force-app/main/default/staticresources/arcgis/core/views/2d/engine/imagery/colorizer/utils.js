/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function i(i){const n=[];return i&&(n.push("applyProjection"),1===i.spacing[0]&&n.push("lookupProjection")),n}function n(i,n,e){const t=!e.capabilities.textureFloat?.textureFloatLinear,u=[];return"cubic"===i?u.push("bicubic"):"bilinear"===i&&(n?(u.push("bilinear"),u.push("nnedge")):t&&u.push("bilinear")),u}export{n as getInterpolationDefines,i as getProjectionDefines};