/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{releaseMaybe as e,disposeMaybe as t,isSome as r}from"../../../../core/maybe.js";import{s as i}from"../../../../chunks/vec2.js";import{c as s}from"../../../../chunks/vec4.js";import{c as a}from"../../../../chunks/vec4f64.js";import{Default3D as o}from"./DefaultVertexAttributeLocations.js";import{Pos2Tex as h}from"./DefaultVertexBufferLayouts.js";import{createQuadVAO as l}from"./glUtil3D.js";import{VertexArrayObject as p}from"./VertexArrayObject.js";import{HighlightApplyTechnique as u}from"../shaders/HighlightApplyTechnique.js";import{H as m}from"../../../../chunks/HighlightBlur.glsl.js";import{HighlightBlurTechnique as c}from"../shaders/HighlightBlurTechnique.js";import{H as _}from"../../../../chunks/HighlightDownsample.glsl.js";import{HighlightDownsampleTechnique as n}from"../shaders/HighlightDownsampleTechnique.js";import{HighlightPassParameters as g}from"../shaders/HighlightPassParameters.js";import{BufferObject as d}from"../../../webgl/BufferObject.js";import{TargetType as b,DepthStencilTargetType as w,TextureType as T,PixelFormat as v,PixelType as f,TextureSamplingMode as M,TextureWrapMode as q,ClearBufferBit as x,Usage as P,PrimitiveType as F}from"../../../webgl/enums.js";import{FramebufferObject as R}from"../../../webgl/FramebufferObject.js";import{vertexCount as y}from"../../../webgl/Util.js";const A=32;class D{constructor(e,t){this._techniqueRep=e,this._rctx=t,this._viewportToRestore=a(),this._passParameters=new g,this._downsampleDrawParameters=new _,this._blurDrawParameters=new m,this._grid={coverageMipmap:null,vao:null,verticalCellCount:0,horizontalCellCount:0,cellPixelSize:0,mipmapLevels:0,viewportWidth:0,viewportHeight:0}}_assertResources(){if(this._quadVAO)return;this._quadVAO=l(this._rctx);const e={colorTarget:b.TEXTURE,depthStencilTarget:w.NONE,width:0,height:0},t={target:T.TEXTURE_2D,pixelFormat:v.RGBA,dataType:f.UNSIGNED_BYTE,samplingMode:M.LINEAR,wrapMode:q.CLAMP_TO_EDGE,width:0,height:0};this._blur0Fbo=new R(this._rctx,e,t),this._blur1Fbo=new R(this._rctx,e,t),this._blurTechnique=this._techniqueRep.acquire(c),this._downsampleTechnique=this._techniqueRep.acquire(n),this._applyTechnique=this._techniqueRep.acquire(u)}dispose(){if(this._blurTechnique=e(this._blurTechnique),this._downsampleTechnique=e(this._downsampleTechnique),this._applyTechnique=e(this._applyTechnique),this._grid.coverageMipmap)for(let e=1;e<this._grid.coverageMipmap.length;e++)this._grid.coverageMipmap[e].dispose();this._grid.vao&&this._grid.vao.dispose(!0),this._quadVAO&&(this._quadVAO.dispose(!0),this._quadVAO=null),this._blur0Fbo=t(this._blur0Fbo),this._blur1Fbo=t(this._blur1Fbo)}setDefaultOptions(e){this._passParameters={...new g,...e}}render(e,t,r){this._passParameters.highlightColorTexture=t.colorTexture,this._assertResources();const a=e.camera;s(this._viewportToRestore,a.fullViewport);const o=a.fullWidth,h=a.fullHeight,l=a.pixelRatio,p=Math.ceil(o/l),u=Math.ceil(h/l);this._blur0Fbo.resize(p,u),this._blur1Fbo.resize(p,u);const m=this._rctx;m.bindVAO(this._quadVAO);let c=null;this._gridUpdateResources(t,A),this._gridComputeMipmap(e),this._passParameters.coverageTexture=this._grid.coverageMipmap[this._grid.mipmapLevels].colorTexture,c=this._grid.vao;const _=m.bindTechnique(this._blurTechnique,this._passParameters,e);m.bindVAO(c),m.bindFramebuffer(this._blur0Fbo),m.setViewport(0,0,p,u),m.setClearColor(0,0,0,0),m.clear(x.COLOR_BUFFER_BIT),this._blurDrawParameters.blurInputTexture=t.colorTexture,i(this._blurDrawParameters.blurSize,1/p,0),_.bindDraw(this._blurDrawParameters,e,this._passParameters),m.drawArrays(this._blurTechnique.primitiveType,0,y(c,"geometry")),m.bindFramebuffer(this._blur1Fbo),m.clear(x.COLOR_BUFFER_BIT),this._blurDrawParameters.blurInputTexture=this._blur0Fbo.colorTexture,i(this._blurDrawParameters.blurSize,0,1/u),_.bindDraw(this._blurDrawParameters,e,this._passParameters),m.drawArrays(this._blurTechnique.primitiveType,0,y(c,"geometry")),m.bindFramebuffer(r),m.setViewport(this._viewportToRestore[0],this._viewportToRestore[1],this._viewportToRestore[2],this._viewportToRestore[3]),this._passParameters.blurColorTexture=this._blur1Fbo.colorTexture,m.bindTechnique(this._applyTechnique,this._passParameters,e),m.drawArrays(this._applyTechnique.primitiveType,0,y(c,"geometry")),m.bindVAO(null)}_gridUpdateResources(e,t){const r=this._rctx,i=this._grid;let s=!1;if(null===i.coverageMipmap&&(i.coverageMipmap=[e],s=!0),i.viewportWidth===e.width&&i.viewportHeight===e.height||(s=!0,i.viewportWidth=e.width,i.viewportHeight=e.height),i.coverageMipmap[0]=e,i.cellPixelSize!==t&&(i.cellPixelSize=t,s=!0),s){for(let e=1;e<i.coverageMipmap.length;e++)i.coverageMipmap[e].dispose();i.mipmapLevels=Math.ceil(Math.log(i.cellPixelSize)*Math.LOG2E),i.coverageMipmap.length=i.mipmapLevels+1;for(let e=0;e<i.mipmapLevels;e++){const t=i.coverageMipmap[e],s={target:T.TEXTURE_2D,pixelFormat:v.RGB,dataType:f.UNSIGNED_SHORT_5_6_5,samplingMode:M.LINEAR,wrapMode:q.CLAMP_TO_EDGE,width:Math.ceil(t.width/2),height:Math.ceil(t.height/2)},a={colorTarget:b.TEXTURE,depthStencilTarget:w.NONE,width:Math.ceil(t.width/2),height:Math.ceil(t.height/2)};i.coverageMipmap[e+1]=new R(r,a,s)}}const a=Math.ceil(e.height/i.cellPixelSize),l=Math.ceil(e.width/i.cellPixelSize);if(!i.vao||i.verticalCellCount!==a||i.horizontalCellCount!==l){i.verticalCellCount=a,i.horizontalCellCount=l;const e=a+1,t=l+1,s=1/a,u=1/l,m=6,c=4,_=new Float32Array(m*c*e*t);let n=0;for(let r=0;r<e;r++)for(let e=0;e<t;e++)_[n+0]=(e-.5)*u*2-1,_[n+1]=(r-.5)*s*2-1,_[n+2]=e*u,_[n+3]=r*s,_[n+4]=(e+.5)*u*2-1,_[n+5]=(r-.5)*s*2-1,_[n+6]=e*u,_[n+7]=r*s,_[n+8]=(e-.5)*u*2-1,_[n+9]=(r+.5)*s*2-1,_[n+10]=e*u,_[n+11]=r*s,_[n+12]=(e-.5)*u*2-1,_[n+13]=(r+.5)*s*2-1,_[n+14]=e*u,_[n+15]=r*s,_[n+16]=(e+.5)*u*2-1,_[n+17]=(r-.5)*s*2-1,_[n+18]=e*u,_[n+19]=r*s,_[n+20]=(e+.5)*u*2-1,_[n+21]=(r+.5)*s*2-1,_[n+22]=e*u,_[n+23]=r*s,n+=m*c;i.vao&&i.vao.dispose(!0),i.vao=new p(r,o,{geometry:h},{geometry:d.createVertex(r,P.STATIC_DRAW,_)})}}_gridComputeMipmap(e){const t=this._rctx,r=this._grid,s=t.bindTechnique(this._downsampleTechnique,this._passParameters,e);t.bindVAO(this._quadVAO);for(let a=0;a<r.mipmapLevels;a++){t.bindFramebuffer(r.coverageMipmap[a+1]);const o=r.coverageMipmap[a+1].width,h=r.coverageMipmap[a+1].height;this._downsampleDrawParameters.inputTexture=r.coverageMipmap[a].colorTexture,i(this._downsampleDrawParameters.invFramebufferDim,1/o,1/h),s.bindDraw(this._downsampleDrawParameters,e,this._passParameters),t.setViewport(0,0,o,h),t.drawArrays(F.TRIANGLE_STRIP,0,y(this._quadVAO,"geometry"))}}get gpuMemoryUsage(){let e=(r(this._blur0Fbo)?this._blur0Fbo.gpuMemoryUsage:0)+(r(this._blur1Fbo)?this._blur1Fbo.gpuMemoryUsage:0);if(this._grid.coverageMipmap)for(const t of this._grid.coverageMipmap)e+=t.gpuMemoryUsage;return e}get test(){return{coverage:this._grid.coverageMipmap,blur:[this._blur0Fbo,this._blur1Fbo]}}}export{D as Highlight};