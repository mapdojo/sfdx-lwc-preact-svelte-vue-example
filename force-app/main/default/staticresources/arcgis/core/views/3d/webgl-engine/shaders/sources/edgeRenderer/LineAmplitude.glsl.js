/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{FloatDrawUniform as e}from"../../../core/shaderModules/FloatDrawUniform.js";import{glsl as t}from"../../../core/shaderModules/interfaces.js";import{EdgeUtilMode as r}from"./EdgeUtil.glsl.js";import{UnpackAttributes as s}from"./UnpackAttributes.glsl.js";function d(d,u){const a=d.vertex;switch(d.include(s,u),u.mode){case r.SOLID:a.code.add(t`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case r.SKETCH:a.uniforms.add(new e("strokesAmplitude",(e=>e.strokesTexture.amplitude))),a.code.add(t`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case r.MIXED:a.uniforms.add(new e("strokesAmplitude",(e=>e.strokesTexture.amplitude))),a.code.add(t`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
else {
return 0.0;
}
}`)}}export{d as LineAmplitude};