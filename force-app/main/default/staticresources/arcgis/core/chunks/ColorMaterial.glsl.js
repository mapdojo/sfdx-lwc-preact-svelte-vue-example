/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{addNearFar as e,addLinearDepth as r}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as o}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as i}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{Transform as t}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{ObjectAndLayerIdColor as l}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl.js";import{VertexColor as s}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl.js";import{OutputDepth as a}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl.js";import{OutputHighlight as d}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{multipassTerrainTest as n}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl.js";import{symbolAlphaCutoff as p}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{ColorConversion as g}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{addProjViewLocalOrigin as u}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{Float4PassUniform as c}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{glsl as h}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as b}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{TransparencyPassType as m}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as w}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function v(v){const f=new b,{vertex:C,fragment:y}=f,j=v.output===o.Depth,L=v.hasMultipassTerrain&&(v.output===o.Color||v.output===o.Alpha);return u(C,v),f.include(t,v),f.include(s,v),f.include(l,v),f.attributes.add(w.POSITION,"vec3"),f.varyings.add("vpos","vec3"),L&&f.varyings.add("depth","float"),j&&(f.include(a,v),e(f),r(f)),C.code.add(h`
    void main(void) {
      vpos = position;
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();
      ${L?"depth = (view * vec4(vpos, 1.0)).z;":""}
      gl_Position = ${j?h`transformPositionWithDepth(proj, view, vpos, nearFar, linearDepth);`:h`transformPosition(proj, view, vpos);`}
    }
  `),f.include(i,v),L&&f.include(n,v),y.include(g),y.uniforms.add(new c("eColor",(e=>e.color))),v.output===o.Highlight&&f.include(d,v),y.code.add(h`
  void main() {
    discardBySlice(vpos);
    ${L?"terrainDepthTest(gl_FragCoord, depth);":""}
    vec4 fColor = ${v.hasVertexColors?"vColor * eColor;":"eColor;"}

    ${v.output===o.ObjectAndLayerIdColor?h`fColor.a = 1.0;`:""}

    if (fColor.a < ${h.float(p)}) {
      discard;
    }

    ${v.output===o.Alpha?h`gl_FragColor = vec4(fColor.a);`:""}

    ${v.output===o.Color?h`gl_FragColor = highlightSlice(fColor, vpos); ${v.transparencyPassType===m.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}`:""}
    ${v.output===o.Highlight?h`outputHighlight();`:""};
    ${v.output===o.Depth?h`outputDepth(linearDepth);`:""};
    ${v.output===o.ObjectAndLayerIdColor?h`outputObjectAndLayerIdColor();`:""}
  }
  `),f}const f=Object.freeze(Object.defineProperty({__proto__:null,build:v},Symbol.toStringTag,{value:"Module"}));export{f as C,v as b};