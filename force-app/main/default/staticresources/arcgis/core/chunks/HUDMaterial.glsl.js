/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../core/maybe.js";import{s as o,c as r}from"./vec2.js";import{O as i,a as l}from"./vec2f64.js";import{Z as t}from"./vec4f64.js";import{DEFAULT_TEX_SIZE as a}from"../views/3d/support/engineContent/sdfPrimitives.js";import{ShaderOutput as s}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SliceDraw as n}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{ObjectAndLayerIdColor as c}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl.js";import{AlignPixel as d}from"../views/3d/webgl-engine/core/shaderLibrary/hud/AlignPixel.glsl.js";import{HUD as u}from"../views/3d/webgl-engine/core/shaderLibrary/hud/HUD.glsl.js";import{HUDOcclusionPass as p}from"../views/3d/webgl-engine/core/shaderLibrary/hud/HUDOcclusionPass.glsl.js";import{OutputHighlight as v}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{VisualVariables as g}from"../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl.js";import{symbolAlphaCutoff as f,defaultMaskAlphaCutoff as m}from"../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff.js";import{ColorConversion as b}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{RgbaFloatEncoding as h}from"../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl.js";import{ScreenSizePerspective as w,addScreenSizePerspective as C,addScreenSizePerspectiveAlignment as x}from"../views/3d/webgl-engine/core/shaderLibrary/util/ScreenSizePerspective.glsl.js";import{Float2PassUniform as P}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{Float4PassUniform as j}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{Float4sPassUniform as S}from"../views/3d/webgl-engine/core/shaderModules/Float4sPassUniform.js";import{FloatPassUniform as z}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{FloatsPassUniform as y}from"../views/3d/webgl-engine/core/shaderModules/FloatsPassUniform.js";import{glsl as F}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as O}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as A}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{TransparencyPassType as $}from"../views/3d/webgl-engine/lib/TransparencyPassType.js";import{VertexAttribute as D}from"../views/3d/webgl-engine/lib/VertexAttribute.js";import{vvColorNumber as L}from"../views/3d/webgl-engine/materials/VisualVariablePassParameters.js";function B(r){const l=new O,B=r.signedDistanceFieldEnabled;if(l.include(d),l.include(u,r),l.include(n,r),r.occlusionPass)return l.include(p,r),l;const{vertex:T,fragment:V}=l;l.include(w),V.include(h),V.include(b),l.include(g,r),l.include(c,r),l.varyings.add("vcolor","vec4"),l.varyings.add("vtc","vec2"),l.varyings.add("vsize","vec2"),r.binaryHighlightOcclusionEnabled&&l.varyings.add("voccluded","float"),T.uniforms.add([new j("viewport",((e,o)=>o.camera.fullViewport)),new P("screenOffset",((e,r)=>o(U,2*e.screenOffset[0]*r.camera.pixelRatio,2*e.screenOffset[1]*r.camera.pixelRatio))),new P("anchorPosition",(e=>H(e))),new j("materialColor",(e=>e.color)),new z("pixelRatio",((e,o)=>o.camera.pixelRatio))]),B&&(T.uniforms.add(new j("outlineColor",(e=>e.outlineColor))),V.uniforms.add([new j("outlineColor",(e=>_(e)?e.outlineColor:t)),new z("outlineSize",(e=>_(e)?e.outlineSize:0))])),r.hasScreenSizePerspective&&(C(T),x(T)),(r.debugDrawLabelBorder||r.binaryHighlightOcclusionEnabled)&&l.varyings.add("debugBorderCoords","vec4"),l.attributes.add(D.UV0,"vec2"),l.attributes.add(D.COLOR,"vec4"),l.attributes.add(D.SIZE,"vec2"),l.attributes.add(D.AUXPOS2,"vec4"),T.code.add(F`
    void main(void) {
      ProjectHUDAux projectAux;
      vec4 posProj = projectPositionHUD(projectAux);
      forwardObjectAndLayerIdColor();

      if (rejectBySlice(projectAux.posModel)) {
        // Project outside of clip plane
        gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
        return;
      }
      vec2 inputSize;
      ${r.hasScreenSizePerspective?F`
      inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
      vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
         `:F`
      inputSize = size;
      vec2 screenOffsetScaled = screenOffset;`}

      ${r.vvSize?"inputSize *= vvScale(auxpos2).xx;":""}

      vec2 combinedSize = inputSize * pixelRatio;
      vec4 quadOffset = vec4(0.0);

      ${r.occlusionTestEnabled||r.binaryHighlightOcclusionEnabled?"bool visible = testVisibilityHUD(posProj);":""}

      ${r.binaryHighlightOcclusionEnabled?"voccluded = visible ? 0.0 : 1.0;":""}
    `);const E=F`vec2 uv01 = floor(uv0);
vec2 uv = uv0 - uv01;
quadOffset.xy = ((uv01 - anchorPosition) * 2.0 * combinedSize + screenOffsetScaled) / viewport.zw * posProj.w;`,M=r.pixelSnappingEnabled?B?F`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:F`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:F`posProj += quadOffset;`;r.vvColor&&T.uniforms.add([new S("vvColorColors",(e=>e.vvColorColors),L),new y("vvColorValues",(e=>e.vvColorValues),L)]),T.uniforms.add(new P("textureCoordinateScaleFactor",(o=>e(o.texture)&&e(o.texture.descriptor.textureCoordinateScaleFactor)?o.texture.descriptor.textureCoordinateScaleFactor:i))),T.code.add(F`
    ${r.occlusionTestEnabled?"if (visible) {":""}
    ${E}
    ${r.vvColor?"vcolor = vvGetColor(auxpos2, vvColorValues, vvColorColors) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${r.output===s.ObjectAndLayerIdColor?F`vcolor.a = 1.0;`:""}

    bool alphaDiscard = vcolor.a < ${F.float(f)};
    ${B?`alphaDiscard = alphaDiscard && outlineColor.a < ${F.float(f)};`:""}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${M}
      gl_Position = posProj;
    }

    vtc = uv * textureCoordinateScaleFactor;

    ${r.debugDrawLabelBorder?"debugBorderCoords = vec4(uv01, 1.5 / combinedSize);":""}
    vsize = inputSize;
    ${r.occlusionTestEnabled?F`} else { vtc = vec2(0.0);
      ${r.debugDrawLabelBorder?"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);}":"}"}`:""}
  }
  `),V.uniforms.add(new A("tex",(e=>e.texture)));const I=r.debugDrawLabelBorder?F`(isBorder > 0.0 ? 0.0 : ${F.float(m)})`:F.float(m),R=F`
    ${r.debugDrawLabelBorder?F`
      float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`:""}

    ${B?F`
      vec4 fillPixelColor = vcolor;

      // Attempt to sample texel centers to avoid that thin cross outlines
      // disappear with large symbol sizes.
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/7058#issuecomment-603041
      const float txSize = ${F.float(a)};
      const float texelSize = 1.0 / txSize;
      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      vec2 samplePos = vtc + (vec2(1.0, -1.0) * texelSize) * scaleFactor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgba2float(texture2D(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${I} ||
          fillPixelColor.a + outlinePixelColor.a < ${F.float(f)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        gl_FragColor = vec4(compositeColor, compositeAlpha);
      } else {
        if (fillAlphaFactor < ${I}) {
          discard;
        }

        gl_FragColor = premultiplyAlpha(fillPixelColor);
      }

      // visualize SDF:
      // gl_FragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:F`
          vec4 texColor = texture2D(tex, vtc, -0.5);
          if (texColor.a < ${I}) {
            discard;
          }
          gl_FragColor = texColor * premultiplyAlpha(vcolor);
          `}

    // Draw debug border with transparency, so that original texels along border are still partially visible
    ${r.debugDrawLabelBorder?F`gl_FragColor = mix(gl_FragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`:""}
  `;return r.output===s.Alpha&&V.code.add(F`
      void main() {
        ${R}
        gl_FragColor = vec4(gl_FragColor.a);
      }
      `),r.output===s.ObjectAndLayerIdColor&&V.code.add(F`
      void main() {
        ${R}
        outputObjectAndLayerIdColor();
      }
      `),r.output===s.Color&&V.code.add(F`
    void main() {
      ${R}
      ${r.transparencyPassType===$.FrontFace?"gl_FragColor.rgb /= gl_FragColor.a;":""}
    }
    `),r.output===s.Highlight&&(l.include(v,r),V.code.add(F`
    void main() {
      ${R}
      ${r.binaryHighlightOcclusionEnabled?F`
          if (voccluded == 1.0) {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
          } else {
            gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
          }`:"outputHighlight();"}
    }
    `)),l}function _(e){return e.outlineColor[3]>0&&e.outlineSize>0}function H(e,o=U){return e.textureIsSignedDistanceField?T(e.anchorPosition,e.distanceFieldBoundingBox,o):r(o,e.anchorPosition),o}function T(r,i,l){e(i)?o(l,r[0]*(i[2]-i[0])+i[0],r[1]*(i[3]-i[1])+i[1]):o(l,0,0)}const U=l(),V=Object.freeze(Object.defineProperty({__proto__:null,build:B,calculateAnchorPosForRendering:H},Symbol.toStringTag,{value:"Module"}));export{V as H,B as b,H as c};