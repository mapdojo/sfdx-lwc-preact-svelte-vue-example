/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ShaderOutput as e}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as o}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{Transform as i}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{VertexColor as r}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl.js";import{OutputHighlight as t}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{LineStipple as l,computePixelSize as s}from"../views/3d/webgl-engine/core/shaderLibrary/shading/LineStipple.glsl.js";import{symbolAlphaCutoff as n}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{addProjViewLocalOrigin as a}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float4PassUniform as d}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as p}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as c}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as g}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{VertexAttribute as m}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function u(u){const v=new g,{vertex:f,fragment:h}=v;return v.include(i,u),v.include(r,u),v.include(l,u),a(f,u),u.stippleEnabled&&(v.attributes.add(m.UV0,"vec2"),v.attributes.add(m.AUXPOS1,"vec3"),f.uniforms.add(new d("viewport",((e,o)=>o.camera.fullViewport)))),v.attributes.add(m.POSITION,"vec3"),v.varyings.add("vpos","vec3"),f.code.add(c`void main(void) {
vpos = position;
forwardNormalizedVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),u.stippleEnabled&&(f.code.add(c`vec4 vpos2 = transformPosition(proj, view, auxpos1);
vec2 ndcToPixel = viewport.zw * 0.5;
float lineSegmentPixelSize = length((vpos2.xy / vpos2.w - gl_Position.xy / gl_Position.w) * ndcToPixel);`),u.draped?f.uniforms.add(new p("worldToScreenRatio",((e,o)=>1/o.screenToPCSRatio))):f.code.add(c`vec3 segmentCenter = (position + auxpos1) * 0.5;
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),f.code.add(c`float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);`),u.draped?f.code.add(c`float startPseudoScreen = uv0.y * discreteWorldToScreenRatio - mix(0.0, lineSegmentPixelSize, uv0.x);
float segmentLengthPseudoScreen = lineSegmentPixelSize;`):f.code.add(c`float segmentLengthRender = length(position - auxpos1);
float startPseudoScreen = mix(uv0.y, uv0.y - segmentLengthRender, uv0.x) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),f.uniforms.add(new p("stipplePatternPixelSize",(e=>s(e)))),f.code.add(c`vec2 stippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, lineSegmentPixelSize, stipplePatternPixelSize);
vStippleDistance = mix(stippleDistanceLimits.x, stippleDistanceLimits.y, uv0.x);
vStippleDistance *= gl_Position.w;`)),f.code.add(c`}`),u.output===e.Highlight&&v.include(t,u),v.include(o,u),h.uniforms.add(new p("alphaCoverage",((e,o)=>Math.min(1,e.width*o.camera.pixelRatio)))),u.hasVertexColors||h.uniforms.add(new d("constantColor",(e=>e.color))),h.code.add(c`
  void main() {
    discardBySlice(vpos);

    vec4 color = ${u.hasVertexColors?"vColor":"constantColor"};

    float stippleAlpha = getStippleAlpha();
    discardByStippleAlpha(stippleAlpha, stippleAlphaColorDiscard);

    vec4 finalColor = blendStipple(vec4(color.rgb, color.a * alphaCoverage), stippleAlpha);

    ${u.output===e.ObjectAndLayerIdColor?c`finalColor.a = 1.0;`:""}

    if (finalColor.a < ${c.float(n)}) {
      discard;
    }

    ${u.output===e.Color?c`gl_FragColor = highlightSlice(finalColor, vpos);`:""}
    ${u.output===e.Highlight?c`outputHighlight();`:""}
  }
  `),v}const v=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:"Module"}));export{v as N,u as b};