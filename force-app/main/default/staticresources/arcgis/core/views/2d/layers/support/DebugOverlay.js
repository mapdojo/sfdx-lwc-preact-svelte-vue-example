/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{disposeMaybe as e}from"../../../../core/maybe.js";import{g as t,h as r,d as s}from"../../../../chunks/mat3.js";import{c as a}from"../../../../chunks/mat3f32.js";import{BufferObject as o}from"../../../webgl/BufferObject.js";import"../../../webgl/FramebufferObject.js";import"../../../../core/arrayUtils.js";import"../../../../core/has.js";import"../../../webgl/checkWebGLError.js";import"../../../webgl/context-util.js";import{DataType as i,BlendFactor as n,PrimitiveType as m,Usage as f}from"../../../webgl/enums.js";import"../../../../chunks/builtins.js";import"../../../webgl/Texture.js";import{VertexArrayObject as h}from"../../../webgl/VertexArrayObject.js";import{DisplayObject as c}from"../../engine/DisplayObject.js";import{VertexElementDescriptor as _}from"../../../webgl/VertexElementDescriptor.js";const u={geometry:[new _("a_PositionAndFlags",3,i.SHORT,0,6)]},d=new Map;d.set("a_PositionAndFlags",0);const g={vsPath:"debug/overlay",fsPath:"debug/overlay",attributes:d};class l extends c{constructor(e){super(),this._conf=e}static makeFlags(e,t){return e|t<<2}_createTransforms(){return{dvs:a()}}doRender(e){this._updateTransforms(e),this._ensureResources(e);const{context:t}=e;t.useProgram(this._program),this._program.setUniformMatrix3fv("u_dvsMat3",this.transforms.dvs),this._program.setUniform4fv("u_colors",this._conf.getColors(e)),this._program.setUniform1fv("u_opacities",this._conf.getOpacities(e));const{vertexData:r,indexData:s}=this._conf.getMesh(e);this._vertexBuffer.setData(r),this._indexBuffer.setData(s),t.bindVAO(this._vertexArray),t.setBlendingEnabled(!0),t.setBlendFunction(n.ONE,n.ONE_MINUS_SRC_ALPHA),t.setDepthTestEnabled(!1),t.setStencilTestEnabled(!1),t.setColorMask(!0,!0,!0,!0),t.drawElements(m.TRIANGLES,s.length,i.UNSIGNED_INT,0)}onDetach(){this._vertexArray=e(this._vertexArray)}_updateTransforms(e){t(this.transforms.dvs),r(this.transforms.dvs,this.transforms.dvs,[-1,1]),s(this.transforms.dvs,this.transforms.dvs,[2/e.state.size[0],-2/e.state.size[1],1])}_ensureResources(e){const{context:t}=e;this._program||(this._program=e.painter.materialManager.getProgram(g)),this._vertexBuffer||(this._vertexBuffer=o.createVertex(t,f.STREAM_DRAW)),this._indexBuffer||(this._indexBuffer=o.createIndex(t,f.STREAM_DRAW)),this._vertexArray||(this._vertexArray=new h(t,d,u,{geometry:this._vertexBuffer},this._indexBuffer))}}export{l as default};