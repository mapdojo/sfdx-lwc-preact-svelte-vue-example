/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Pos2us as e}from"../2d/engine/webgl/DefaultVertexAttributeLayouts.js";import{BufferObject as t}from"./BufferObject.js";import{TargetType as r,DepthStencilTargetType as i,TextureType as s,TextureWrapMode as o,PixelFormat as a,PixelType as n,TextureSamplingMode as p,Usage as m,ClearBufferBit as g,PrimitiveType as d}from"./enums.js";import{FramebufferObject as _}from"./FramebufferObject.js";import{Texture as u}from"./Texture.js";import{VertexArrayObject as c}from"./VertexArrayObject.js";import{WebGLDriverTestModule as h}from"./WebGLDriverTestModule.js";class l extends h{constructor(e){super(),this._rctx=e,this._image=new Image,this._image.src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='5' height='5' version='1.1' viewBox='0 0 5 5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23f00' fill-opacity='.5'/%3E%3C/svg%3E%0A",this._image.width=5,this._image.height=5,this._image.decode();const t="\n    precision highp float;\n\n    attribute vec2 a_pos;\n    varying vec2 v_uv;\n\n    void main() {\n      v_uv = a_pos;\n      gl_Position = vec4(a_pos * 2.0 - 1.0, 0.0, 1.0);\n    }\n    ",r="\n    precision highp float;\n\n    varying vec2 v_uv;\n    uniform sampler2D u_texture;\n\n    void main() {\n      gl_FragColor = texture2D(u_texture, v_uv);\n    }\n    ";this._program=e.programCache.acquire(t,r,new Map([["a_pos",0]]))}dispose(){super.dispose(),this._image.src=""}_test(h){const l=this._rctx;if(!l.gl)return h.dispose(),!0;const f=new _(l,{colorTarget:r.TEXTURE,depthStencilTarget:i.NONE},{target:s.TEXTURE_2D,wrapMode:o.CLAMP_TO_EDGE,pixelFormat:a.RGBA,dataType:n.UNSIGNED_BYTE,samplingMode:p.NEAREST,width:1,height:1}),w=t.createVertex(l,m.STATIC_DRAW,new Uint16Array([0,0,1,0,0,1,1,1])),E=new c(l,new Map([["a_pos",0]]),e,{geometry:w}),v=new u(l,{dataType:n.UNSIGNED_BYTE,pixelFormat:a.RGBA,preMultiplyAlpha:!1,wrapMode:o.CLAMP_TO_EDGE,samplingMode:p.LINEAR},this._image);l.useProgram(h),l.bindTexture(v,0),h.setUniform1i("u_texture",0);const T=l.getBoundFramebufferObject(),{x,y:A,width:b,height:y}=l.getViewport();l.bindFramebuffer(f),l.setViewport(0,0,1,1),l.setClearColor(0,0,0,0),l.setBlendingEnabled(!1),l.clearSafe(g.COLOR_BUFFER_BIT),l.bindVAO(E),l.drawArrays(d.TRIANGLE_STRIP,0,4);const j=new Uint8Array(4);return f.readPixels(0,0,1,1,a.RGBA,n.UNSIGNED_BYTE,j),E.dispose(!1),w.dispose(),f.dispose(),v.dispose(),l.setViewport(x,A,b,y),l.bindFramebuffer(T),255!==j[0]}}export{l as SVGPremultipliedAlpha};