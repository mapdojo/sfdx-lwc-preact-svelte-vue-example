/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as t}from"../../../../../core/maybe.js";import{f as e}from"../../../../../chunks/vec4f32.js";import{Pos2b as r}from"../DefaultVertexAttributeLayouts.js";import i from"./WGLBrush.js";import{background as o}from"../shaders/BackgroundPrograms.js";import{tileInfo as s}from"../shaders/TileInfoPrograms.js";import{BufferObject as n}from"../../../../webgl/BufferObject.js";import{BlendFactor as a,PrimitiveType as l,Usage as u,TextureType as m,PixelFormat as _,PixelType as f,TextureSamplingMode as c,TextureWrapMode as d}from"../../../../webgl/enums.js";import{createProgram as g}from"../../../../webgl/ProgramTemplate.js";import{Texture as h}from"../../../../webgl/Texture.js";import{VertexArrayObject as p}from"../../../../webgl/VertexArrayObject.js";const A=300,b=32;class x extends i{constructor(){super(...arguments),this._color=e(1,0,0,1)}dispose(){this._outlineProgram?.dispose(),this._outlineProgram=null,this._tileInfoProgram?.dispose(),this._tileInfoProgram=null,this._outlineVertexArrayObject?.dispose(),this._outlineVertexArrayObject=null,this._tileInfoVertexArrayObject?.dispose(),this._tileInfoVertexArrayObject=null,this._canvas=null}prepareState({context:t}){t.setBlendingEnabled(!0),t.setBlendFunctionSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA),t.setColorMask(!0,!0,!0,!0),t.setStencilWriteMask(0),t.setStencilTestEnabled(!1)}draw(e,r){const{context:i,requestRender:o,allowDelayedRender:s}=e;if(!r.isReady)return;if(this._loadWGLResources(i),s&&t(o)&&(!this._outlineProgram.compiled||!this._tileInfoProgram.compiled))return void o();i.bindVAO(this._outlineVertexArrayObject),i.useProgram(this._outlineProgram),this._outlineProgram.setUniformMatrix3fv("u_dvsMat3",r.transforms.dvs),this._outlineProgram.setUniform2f("u_coord_range",r.rangeX,r.rangeY),this._outlineProgram.setUniform1f("u_depth",0),this._outlineProgram.setUniform4fv("u_color",this._color),i.drawArrays(l.LINE_STRIP,0,4);const n=this._getTexture(i,r);n?(i.bindVAO(this._tileInfoVertexArrayObject),i.useProgram(this._tileInfoProgram),i.bindTexture(n,0),this._tileInfoProgram.setUniformMatrix3fv("u_dvsMat3",r.transforms.dvs),this._tileInfoProgram.setUniform1f("u_depth",0),this._tileInfoProgram.setUniform2f("u_coord_ratio",r.rangeX/r.width,r.rangeY/r.height),this._tileInfoProgram.setUniform2f("u_delta",8,8),this._tileInfoProgram.setUniform2f("u_dimensions",n.descriptor.width,n.descriptor.height),i.drawArrays(l.TRIANGLE_STRIP,0,4),i.bindVAO()):i.bindVAO()}_loadWGLResources(t){if(this._outlineProgram&&this._tileInfoProgram)return;const e=g(t,o),i=g(t,s),a=new Int8Array([0,0,1,0,1,1,0,1]),l=n.createVertex(t,u.STATIC_DRAW,a),m=new p(t,o.attributes,r,{geometry:l}),_=new Int8Array([0,0,1,0,0,1,1,1]),f=n.createVertex(t,u.STATIC_DRAW,_),c=new p(t,s.attributes,r,{geometry:f});this._outlineProgram=e,this._tileInfoProgram=i,this._outlineVertexArrayObject=m,this._tileInfoVertexArrayObject=c}_getTexture(t,e){if(e.texture&&e.triangleCountReportedInDebug===e.triangleCount)return e.texture;e.triangleCountReportedInDebug=e.triangleCount,this._canvas||(this._canvas=document.createElement("canvas"),this._canvas.setAttribute("id","canvas2d"),this._canvas.setAttribute("width",`${A}`),this._canvas.setAttribute("height",`${b}`),this._canvas.setAttribute("style","display:none"));const r=e.triangleCount;let i=e.key.id;e.triangleCount>0&&(i+=`, ${r}`);const o=this._canvas,s=o.getContext("2d");return s.font="24px sans-serif",s.textAlign="left",s.textBaseline="top",s.clearRect(0,0,A,b),r>1e5?(s.fillStyle="red",s.fillRect(0,0,A,b),s.fillStyle="black"):(s.clearRect(0,0,A,b),s.fillStyle="blue"),s.fillText(i,0,0),e.texture=new h(t,{target:m.TEXTURE_2D,pixelFormat:_.RGBA,dataType:f.UNSIGNED_BYTE,samplingMode:c.NEAREST,wrapMode:d.CLAMP_TO_EDGE},o),e.texture}}export{x as default};