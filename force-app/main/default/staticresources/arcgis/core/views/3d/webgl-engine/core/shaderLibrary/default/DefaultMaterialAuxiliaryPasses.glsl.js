/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as o}from"../../../../../../core/maybe.js";import{I as r}from"../../../../../../chunks/mat4f64.js";import{addNearFar as e}from"../ForwardLinearDepth.glsl.js";import{ShaderOutput as t}from"../ShaderOutput.js";import{SliceDraw as i}from"../Slice.glsl.js";import{Transform as a}from"../Transform.glsl.js";import{NormalAttribute as s,NormalAttributeType as l}from"../attributes/NormalAttribute.glsl.js";import{ObjectAndLayerIdColor as d}from"../attributes/ObjectAndLayerIdColor.glsl.js";import{TextureCoordinateAttribute as n}from"../attributes/TextureCoordinateAttribute.glsl.js";import{VertexNormal as c}from"../attributes/VertexNormal.glsl.js";import{OutputDepth as u}from"../output/OutputDepth.glsl.js";import{OutputHighlight as m}from"../output/OutputHighlight.glsl.js";import{VisualVariables as p}from"../shading/VisualVariables.glsl.js";import{DiscardOrAdjustAlphaPass as v}from"../util/AlphaDiscard.glsl.js";import{addProjViewLocalOrigin as f}from"../util/View.glsl.js";import{glsl as g}from"../../shaderModules/interfaces.js";import{Matrix4PassUniform as h}from"../../shaderModules/Matrix4PassUniform.js";import{Texture2DPassUniform as x}from"../../shaderModules/Texture2DPassUniform.js";import{AlphaDiscardMode as j}from"../../../lib/basicInterfaces.js";function b(b,O){const{vertex:w,fragment:C}=b,T=O.hasModelTransformation;T&&w.uniforms.add(new h("model",(e=>o(e.modelTransformation)?e.modelTransformation:r)));const V=O.hasColorTexture&&O.alphaDiscardMode!==j.Opaque;switch(O.output){case t.Depth:case t.Shadow:case t.ShadowHighlight:case t.ShadowExcludeHighlight:case t.ObjectAndLayerIdColor:f(w,O),b.include(a,O),b.include(n,O),b.include(p,O),b.include(u,O),b.include(i,O),b.include(d,O),e(b),b.varyings.add("depth","float"),V&&C.uniforms.add(new x("tex",(o=>o.texture))),w.code.add(g`
          void main(void) {
            vpos = calculateVPos();
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPositionWithDepth(proj, view, ${T?"model,":""} vpos, nearFar, depth);
            forwardTextureCoordinates();
            forwardObjectAndLayerIdColor();
          }
        `),b.include(v,O),C.code.add(g`
          void main(void) {
            discardBySlice(vpos);
            ${V?g`
                    vec4 texColor = texture2D(tex, ${O.hasColorTextureTransform?g`colorUV`:g`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${O.output===t.ObjectAndLayerIdColor?g`outputObjectAndLayerIdColor();`:g`outputDepth(depth);`}
          }
        `);break;case t.Normal:f(w,O),b.include(a,O),b.include(s,O),b.include(c,O),b.include(n,O),b.include(p,O),V&&C.uniforms.add(new x("tex",(o=>o.texture))),b.varyings.add("vPositionView","vec3"),w.code.add(g`
          void main(void) {
            vpos = calculateVPos();
            vpos = subtractOrigin(vpos);
            ${O.normalType===l.Attribute?g`
            vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:""}
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, ${T?"model,":""} vpos);
            forwardTextureCoordinates();
          }
        `),b.include(i,O),b.include(v,O),C.code.add(g`
          void main() {
            discardBySlice(vpos);
            ${V?g`
                    vec4 texColor = texture2D(tex, ${O.hasColorTextureTransform?g`colorUV`:g`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${O.normalType===l.ScreenDerivative?g`
                vec3 normal = screenDerivativeNormal(vPositionView);`:g`
                vec3 normal = normalize(vNormalWorld);
                if (gl_FrontFacing == false) normal = -normal;`}
            gl_FragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
          }
        `);break;case t.Highlight:f(w,O),b.include(a,O),b.include(n,O),b.include(p,O),V&&C.uniforms.add(new x("tex",(o=>o.texture))),w.code.add(g`
          void main(void) {
            vpos = calculateVPos();
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, ${T?"model,":""} vpos);
            forwardTextureCoordinates();
          }
        `),b.include(i,O),b.include(v,O),b.include(m,O),C.code.add(g`
          void main() {
            discardBySlice(vpos);
            ${V?g`
                    vec4 texColor = texture2D(tex, ${O.hasColorTextureTransform?g`colorUV`:g`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}export{b as DefaultMaterialAuxiliaryPasses};