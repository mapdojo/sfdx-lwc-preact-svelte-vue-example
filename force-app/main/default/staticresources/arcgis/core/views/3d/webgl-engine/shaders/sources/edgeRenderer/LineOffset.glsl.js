/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{RgbaFloatEncoding as e}from"../../../core/shaderLibrary/util/RgbaFloatEncoding.glsl.js";import{textureSize as t}from"../../../core/shaderLibrary/util/WebGL2Utils.js";import{FloatDrawUniform as r}from"../../../core/shaderModules/FloatDrawUniform.js";import{NoParameters as s,glsl as a}from"../../../core/shaderModules/interfaces.js";import{createTexture2DDrawSizeUniforms as o,Texture2DDrawUniform as u}from"../../../core/shaderModules/Texture2DDrawUniform.js";import{TextureSizeUniformType as l}from"../../../core/shaderModules/TextureSizeUniformType.js";import{usesSketchLogic as c,EdgeUtilMode as n}from"./EdgeUtil.glsl.js";import{UnpackAttributes as i}from"./UnpackAttributes.glsl.js";class d extends s{}function f(s,d){s.include(i,d);const{vertex:f,fragment:k}=s;switch(c(d)&&(f.uniforms.add(o("strokesTexture",(e=>e.strokesTexture.texture),d.hasWebGL2Context?l.None:l.InvSize)),f.uniforms.add([new r("strokesLog2Resolution",(e=>Math.log2(e.strokesTexture.resolution))),new r("strokeVariants",(e=>e.strokesTexture.variants))]),s.varyings.add("vStrokeUV","vec2"),k.uniforms.add([new u("strokesTexture",(e=>e.strokesTexture.texture)),new r("strokesNormalizationScale",(e=>e.strokesTexture.normalizationScale))]),f.code.add(a`
      void calculateStyleOutputsSketch(float lineLength, UnpackedAttributes unpackedAttributes) {
        vec2 sidenessNorm = unpackedAttributes.sidenessNorm;

        float lineIndex = clamp(ceil(log2(lineLength)), 0.0, strokesLog2Resolution);

        vec2 textureSizeInverse = ${t(d,"strokesTexture",!0)};
        vStrokeUV = vec2(exp2(lineIndex) * sidenessNorm.y, lineIndex * strokeVariants + variantStroke + 0.5) * textureSizeInverse;
        vStrokeUV.x += variantOffset;
      }
    `),s.fragment.include(e),k.code.add(a`float calculateLineOffsetSketch() {
float offsetNorm = rgba2float(texture2D(strokesTexture, vStrokeUV));
return (offsetNorm - 0.5) * strokesNormalizationScale;
}
float calculateLinePressureSketch() {
return rgba2float(texture2D(strokesTexture, vStrokeUV + vec2(0.0, 0.5)));
}`)),d.mode){case n.SOLID:f.code.add(a`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes) {}`),k.code.add(a`float calculateLineOffset() {
return 0.0;
}
float calculateLinePressure() {
return 1.0;
}`);break;case n.SKETCH:f.code.add(a`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}`),k.code.add(a`float calculateLineOffset() {
return calculateLineOffsetSketch();
}
float calculateLinePressure() {
return calculateLinePressureSketch();
}`);break;case n.MIXED:s.varyings.add("vType","float"),f.code.add(a`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
vType = unpackedAttributes.type;
if (unpackedAttributes.type <= 0.0) {
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}
}`),k.code.add(a`float calculateLineOffset() {
if (vType <= 0.0) {
return calculateLineOffsetSketch();
}
else {
return 0.0;
}
}
float calculateLinePressure() {
if (vType <= 0.0) {
return calculateLinePressureSketch();
}
else {
return 1.0;
}
}`)}}export{f as LineOffset,d as LineOffsetDrawParameters};