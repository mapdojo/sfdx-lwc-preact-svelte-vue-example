/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ShaderOutput as t}from"../ShaderOutput.js";import{RgbaFloatEncoding as a}from"../util/RgbaFloatEncoding.glsl.js";import{glsl as e}from"../../shaderModules/interfaces.js";function o(o,l){switch(o.fragment.include(a),l.output){case t.Shadow:case t.ShadowHighlight:case t.ShadowExcludeHighlight:o.extensions.add("GL_OES_standard_derivatives"),o.fragment.code.add(e`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
float result = depth + SLOPE_SCALE * m + BIAS;
return clamp(result, .0, .999999);
}
void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_calculateFragDepth(_linearDepth));
}`);break;case t.Depth:o.fragment.code.add(e`void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_linearDepth);
}`)}}export{o as OutputDepth};