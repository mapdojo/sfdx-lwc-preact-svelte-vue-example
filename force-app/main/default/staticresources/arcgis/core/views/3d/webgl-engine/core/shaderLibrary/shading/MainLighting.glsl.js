/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Float3PassUniform as i}from"../../shaderModules/Float3PassUniform.js";import{FloatPassUniform as n}from"../../shaderModules/FloatPassUniform.js";import{glsl as t}from"../../shaderModules/interfaces.js";function o(n){n.uniforms.add(new i("mainLightDirection",((i,n)=>n.lighting.mainLight.direction)))}function a(n){n.uniforms.add(new i("mainLightIntensity",((i,n)=>n.lighting.mainLight.intensity)))}function e(i,t){t.useLegacyTerrainShading?i.uniforms.add(new n("lightingFixedFactor",((i,n)=>n.lighting.noonFactor*(1-n.lighting.globalFactor)))):i.constants.add("lightingFixedFactor","float",0)}function r(i,n){const r=i.fragment;o(r),a(r),e(r,n),r.code.add(t`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
dotVal = mix(dotVal, 1.0, lightingFixedFactor);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}export{r as MainLighting,o as addMainLightDirection,a as addMainLightIntensity};