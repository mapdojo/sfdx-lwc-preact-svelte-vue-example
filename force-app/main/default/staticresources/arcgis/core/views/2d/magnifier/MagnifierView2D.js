/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../request.js";import{createTask as r}from"../../../core/asyncUtils.js";import t from"../../../core/Handles.js";import{clamp as s}from"../../../core/mathUtils.js";import{destroyMaybe as i,abortMaybe as a,isNone as o,isSome as n,disposeMaybe as l}from"../../../core/maybe.js";import{watch as h,initial as m}from"../../../core/reactiveUtils.js";import{isSVG as u}from"../../../core/urlUtils.js";import{c}from"../../../chunks/mat3f32.js";import{DisplayObject as d}from"../engine/DisplayObject.js";import{Pos2us as _}from"../engine/webgl/DefaultVertexAttributeLayouts.js";import{WGLDrawPhase as p}from"../engine/webgl/enums.js";import{createMagnifierProgram as f,magnifierProgramTemplate as g}from"../engine/webgl/shaders/MagnifierPrograms.js";import{loadMagnifierResources as T}from"../../magnifier/resources.js";import{BufferObject as x}from"../../webgl/BufferObject.js";import{PrimitiveType as b,Usage as R,TextureType as y,PixelFormat as k,PixelType as A,TextureWrapMode as v,TextureSamplingMode as E}from"../../webgl/enums.js";import{Texture as j}from"../../webgl/Texture.js";import{VertexArrayObject as w}from"../../webgl/VertexArrayObject.js";class U extends d{constructor(){super(),this._handles=new t,this._resourcePixelRatio=1,this.visible=!1}destroy(){this._handles=i(this._handles),this._disposeRenderResources(),this._resourcesTask=a(this._resourcesTask)}get background(){return this._background}set background(e){this._background=e,this.requestRender()}get magnifier(){return this._magnifier}set magnifier(e){this._magnifier=e,this._handles.removeAll(),this._handles.add([h((()=>e.version),(()=>{this.visible=e.visible&&n(e.position)&&e.size>0,this.requestRender()}),m),h((()=>[e.maskUrl,e.overlayUrl]),(()=>this._reloadResources())),h((()=>e.size),(()=>{this._disposeRenderResources(),this.requestRender()}))])}_createTransforms(){return{dvs:c()}}doRender(e){const r=e.context;if(!this._resourcesTask)return void this._reloadResources();if(e.drawPhase!==p.MAP||!this._canRender())return;this._updateResources(e);const t=this._magnifier;if(o(t.position))return;const i=e.pixelRatio,a=t.size*i,n=1/t.factor,l=Math.ceil(n*a);this._readbackTexture.resize(l,l);const{size:h}=e.state,m=i*h[0],u=i*h[1],c=.5*l,d=.5*l,_=s(i*t.position.x,c,m-c-1),f=s(u-i*t.position.y,d,u-d-1);r.setBlendingEnabled(!0);const g=_-c,T=f-d,x=this._readbackTexture;r.bindTexture(x,0),r.gl.copyTexImage2D(x.descriptor.target,0,x.descriptor.pixelFormat,g,T,l,l,0);const R=this.background?.color,y=R?[R.a*R.r/255,R.a*R.g/255,R.a*R.b/255,R.a]:[1,1,1,1],k=(_+t.offset.x*i)/m*2-1,A=(f-t.offset.y*i)/u*2-1,v=a/m*2,E=a/u*2,j=this._program;r.bindVAO(this._vertexArrayObject),r.bindTexture(this._overlayTexture,6),r.bindTexture(this._maskTexture,7),r.useProgram(j),j.setUniform4fv("u_background",y),j.setUniform1i("u_readbackTexture",0),j.setUniform1i("u_overlayTexture",6),j.setUniform1i("u_maskTexture",7),j.setUniform4f("u_drawPos",k,A,v,E),j.setUniform1i("u_maskEnabled",t.maskEnabled?1:0),j.setUniform1i("u_overlayEnabled",t.overlayEnabled?1:0),r.setStencilTestEnabled(!1),r.setColorMask(!0,!0,!0,!0),r.drawArrays(b.TRIANGLE_STRIP,0,4),r.bindVAO()}_canRender(){return this.mask&&this.overlay&&null!=this._magnifier}_reloadResources(){this._resourcesTask&&this._resourcesTask.abort();const t=n(this._magnifier)?this._magnifier.maskUrl:null,s=n(this._magnifier)?this._magnifier.overlayUrl:null;this._resourcesTask=r((async r=>{const i=o(t)||o(s)?T(r):null,a=n(t)?e(t,{responseType:"image",signal:r}).then((e=>e.data)):i.then((e=>e.mask)),l=n(s)?e(s,{responseType:"image",signal:r}).then((e=>e.data)):i.then((e=>e.overlay)),[h,m]=await Promise.all([a,l]);this.mask=h,this.overlay=m,this._disposeRenderResources(),this.requestRender()}))}_disposeRenderResources(){this._readbackTexture=l(this._readbackTexture),this._overlayTexture=l(this._overlayTexture),this._maskTexture=l(this._maskTexture),this._vertexArrayObject=l(this._vertexArrayObject),this._program=l(this._program)}_updateResources(e){if(e.pixelRatio!==this._resourcePixelRatio&&this._disposeRenderResources(),this._readbackTexture)return;const r=e.context;this._resourcePixelRatio=e.pixelRatio;const t=Math.ceil(this._magnifier.size*e.pixelRatio);this._program=f(r);const s=new Uint16Array([0,1,0,0,1,1,1,0]),i=g.attributes;this._vertexArrayObject=new w(r,i,_,{geometry:x.createVertex(r,R.STATIC_DRAW,s)}),this.overlay.width=t,this.overlay.height=t,this._overlayTexture=new j(r,{target:y.TEXTURE_2D,pixelFormat:k.RGBA,internalFormat:k.RGBA,dataType:A.UNSIGNED_BYTE,wrapMode:v.CLAMP_TO_EDGE,samplingMode:E.NEAREST,flipped:!0,preMultiplyAlpha:!u(this.overlay.src)||!e.context.driverTest.svgPremultipliesAlpha.result},this.overlay),this.mask.width=t,this.mask.height=t,this._maskTexture=new j(r,{target:y.TEXTURE_2D,pixelFormat:k.ALPHA,internalFormat:k.ALPHA,dataType:A.UNSIGNED_BYTE,wrapMode:v.CLAMP_TO_EDGE,samplingMode:E.NEAREST,flipped:!0},this.mask);const a=1/this._magnifier.factor;this._readbackTexture=new j(r,{target:y.TEXTURE_2D,pixelFormat:k.RGBA,internalFormat:k.RGBA,dataType:A.UNSIGNED_BYTE,wrapMode:v.CLAMP_TO_EDGE,samplingMode:E.LINEAR,flipped:!1,width:Math.ceil(a*t),height:Math.ceil(a*t)})}}export{U as default};