/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{disposeMaybe as t,applySome as e,isNone as s,isSome as i,unwrapOr as a}from"../../core/maybe.js";import{after as r}from"../../core/promiseUtils.js";import{Milliseconds as n}from"../../core/time.js";import{webglDebugEnabled as l}from"./checkWebGLError.js";import{ContextType as h}from"./context-util.js";import{ContextState as f}from"./ContextState.js";import{BufferType as o,Face as _,BASE_TEXTURE_UNIT as u,ClearBufferBit as c,FramebufferTarget as d,TextureSamplingMode as b,SyncCondition as F,ResourceType as g,ClientWaitSyncStatus as E,BlendFactor as B,BlendOperation as p,CullMode as m,CompareFunction as R,StencilOperation as T,ColorAttachment as A,TextureType as x,PrimitiveType as O}from"./enums.js";import{InstanceCounter as U}from"./InstanceCounter.js";import{ProgramCache as C}from"./ProgramCache.js";import{StateTracker as S}from"./renderState.js";import{Texture as P}from"./Texture.js";import{getErrorString as M}from"./Util.js";import{WebGLDriverTest as y}from"./WebGLDriverTest.js";import{Capabilities as N}from"./capabilities/Capabilities.js";import k from"./capabilities/isWebGL2Context.js";let I=class{constructor(t,e){this.gl=t,this.instanceCounter=new U,this.programCache=new C(this),this._state=new f,this._numOfDrawCalls=0,this._numOfTriangles=0,this.type=k(t)?h.WEBGL2:h.WEBGL1,this._loadExtensions(),this.configure(e)}get gl2(){return this.type===h.WEBGL1?null:this.gl}configure(e){this._capabilities=new N(this.gl,e),this._parameters=this._loadParameters(e);const s=this.gl.getParameter(this.gl.VIEWPORT);this._state=new f,this._state.viewport={x:s[0],y:s[1],width:s[2],height:s[3]},this._stateTracker=new S({setBlending:t=>{if(t){this.setBlendingEnabled(!0),this.setBlendEquationSeparate(t.opRgb,t.opAlpha),this.setBlendFunctionSeparate(t.srcRgb,t.dstRgb,t.srcAlpha,t.dstAlpha);const e=t.color;this.setBlendColor(e.r,e.g,e.b,e.a)}else this.setBlendingEnabled(!1)},setCulling:t=>{t?(this.setFaceCullingEnabled(!0),this.setCullFace(t.face),this.setFrontFace(t.mode)):this.setFaceCullingEnabled(!1)},setPolygonOffset:t=>{t?(this.setPolygonOffsetFillEnabled(!0),this.setPolygonOffset(t.factor,t.units)):this.setPolygonOffsetFillEnabled(!1)},setDepthTest:t=>{t?(this.setDepthTestEnabled(!0),this.setDepthFunction(t.func)):this.setDepthTestEnabled(!1)},setStencilTest:t=>{if(t){this.setStencilTestEnabled(!0);const e=t.function;this.setStencilFunction(e.func,e.ref,e.mask);const s=t.operation;this.setStencilOp(s.fail,s.zFail,s.zPass)}else this.setStencilTestEnabled(!1)},setDepthWrite:t=>{t?(this.setDepthWriteEnabled(!0),this.setDepthRange(t.zNear,t.zFar)):this.setDepthWriteEnabled(!1)},setColorWrite:t=>{t?this.setColorMask(t.r,t.g,t.b,t.a):this.setColorMask(!1,!1,!1,!1)},setStencilWrite:t=>{t?this.setStencilWriteMask(t.mask):this.setStencilWriteMask(0)}}),this.enforceState(),t(this._driverTest),this._driverTest=new y(this)}dispose(){t(this._driverTest),this.programCache.dispose(),this.bindVAO(null),this.unbindBuffer(o.ARRAY_BUFFER),this.unbindBuffer(o.ELEMENT_ARRAY_BUFFER),this.type===h.WEBGL2&&(this.unbindBuffer(o.UNIFORM_BUFFER),this._state.uniformBufferBindingPoints.length=0,this.unbindBuffer(o.PIXEL_PACK_BUFFER),this.unbindBuffer(o.PIXEL_UNPACK_BUFFER),this.unbindBuffer(o.COPY_READ_BUFFER),this.unbindBuffer(o.COPY_WRITE_BUFFER)),this._state.textureUnitMap.length=0,l()&&console.log(this.instanceCounter.resourceInformation)}get driverTest(){return this._driverTest}get contextAttributes(){return this.gl.getContextAttributes()}get parameters(){return this._parameters}setPipelineState(t){this._stateTracker.setPipeline(t)}setBlendingEnabled(t){this._state.blend!==t&&(!0===t?this.gl.enable(this.gl.BLEND):this.gl.disable(this.gl.BLEND),this._state.blend=t,this._stateTracker.invalidateBlending())}externalProgramUpdate(){this._state.program?.stop(),this._state.program=null}externalTextureUnitUpdate(t,e){for(let s=0;s<t.length;++s)this._state.textureUnitMap[t[s]]=null;e>=0&&(this._state.activeTexture=e)}externalVertexArrayObjectUpdate(){const t=this.capabilities.vao;t&&(t.bindVertexArray(null),this._state.vertexArrayObject=null),this._state.vertexBuffer=null,this._state.indexBuffer=null}externalVertexBufferUpdate(){this._state.vertexBuffer=null}externalIndexBufferUpdate(){this._state.indexBuffer=null}setBlendColor(t,e,s,i){t===this._state.blendColor.r&&e===this._state.blendColor.g&&s===this._state.blendColor.b&&i===this._state.blendColor.a||(this.gl.blendColor(t,e,s,i),this._state.blendColor.r=t,this._state.blendColor.g=e,this._state.blendColor.b=s,this._state.blendColor.a=i,this._stateTracker.invalidateBlending())}setBlendFunction(t,e){t===this._state.blendFunction.srcRGB&&e===this._state.blendFunction.dstRGB||(this.gl.blendFunc(t,e),this._state.blendFunction.srcRGB=t,this._state.blendFunction.srcAlpha=t,this._state.blendFunction.dstRGB=e,this._state.blendFunction.dstAlpha=e,this._stateTracker.invalidateBlending())}setBlendFunctionSeparate(t,e,s,i){this._state.blendFunction.srcRGB===t&&this._state.blendFunction.srcAlpha===s&&this._state.blendFunction.dstRGB===e&&this._state.blendFunction.dstAlpha===i||(this.gl.blendFuncSeparate(t,e,s,i),this._state.blendFunction.srcRGB=t,this._state.blendFunction.srcAlpha=s,this._state.blendFunction.dstRGB=e,this._state.blendFunction.dstAlpha=i,this._stateTracker.invalidateBlending())}setBlendEquation(t){this._state.blendEquation.mode!==t&&(this.gl.blendEquation(t),this._state.blendEquation.mode=t,this._state.blendEquation.modeAlpha=t,this._stateTracker.invalidateBlending())}setBlendEquationSeparate(t,e){this._state.blendEquation.mode===t&&this._state.blendEquation.modeAlpha===e||(this.gl.blendEquationSeparate(t,e),this._state.blendEquation.mode=t,this._state.blendEquation.modeAlpha=e,this._stateTracker.invalidateBlending())}setColorMask(t,e,s,i){this._state.colorMask.r===t&&this._state.colorMask.g===e&&this._state.colorMask.b===s&&this._state.colorMask.a===i||(this.gl.colorMask(t,e,s,i),this._state.colorMask.r=t,this._state.colorMask.g=e,this._state.colorMask.b=s,this._state.colorMask.a=i,this._stateTracker.invalidateColorWrite())}setClearColor(t,e,s,i){this._state.clearColor.r===t&&this._state.clearColor.g===e&&this._state.clearColor.b===s&&this._state.clearColor.a===i||(this.gl.clearColor(t,e,s,i),this._state.clearColor.r=t,this._state.clearColor.g=e,this._state.clearColor.b=s,this._state.clearColor.a=i)}setFaceCullingEnabled(t){this._state.faceCulling!==t&&(!0===t?this.gl.enable(this.gl.CULL_FACE):this.gl.disable(this.gl.CULL_FACE),this._state.faceCulling=t,this._stateTracker.invalidateCulling())}setPolygonOffsetFillEnabled(t){this._state.polygonOffsetFill!==t&&(!0===t?this.gl.enable(this.gl.POLYGON_OFFSET_FILL):this.gl.disable(this.gl.POLYGON_OFFSET_FILL),this._state.polygonOffsetFill=t,this._stateTracker.invalidatePolygonOffset())}setPolygonOffset(t,e){this._state.polygonOffset[0]===t&&this._state.polygonOffset[1]===e||(this._state.polygonOffset[0]=t,this._state.polygonOffset[1]=e,this.gl.polygonOffset(t,e),this._stateTracker.invalidatePolygonOffset())}setCullFace(t){this._state.cullFace!==t&&(this.gl.cullFace(t),this._state.cullFace=t,this._stateTracker.invalidateCulling())}setFrontFace(t){this._state.frontFace!==t&&(this.gl.frontFace(t),this._state.frontFace=t,this._stateTracker.invalidateCulling())}setScissorTestEnabled(t){this._state.scissorTest!==t&&(!0===t?this.gl.enable(this.gl.SCISSOR_TEST):this.gl.disable(this.gl.SCISSOR_TEST),this._state.scissorTest=t)}setScissorRect(t,e,s,i){this._state.scissorRect.x===t&&this._state.scissorRect.y===e&&this._state.scissorRect.width===s&&this._state.scissorRect.height===i||(this.gl.scissor(t,e,s,i),this._state.scissorRect.x=t,this._state.scissorRect.y=e,this._state.scissorRect.width=s,this._state.scissorRect.height=i)}setDepthTestEnabled(t){this._state.depthTest!==t&&(!0===t?this.gl.enable(this.gl.DEPTH_TEST):this.gl.disable(this.gl.DEPTH_TEST),this._state.depthTest=t,this._stateTracker.invalidateDepthTest())}setClearDepth(t){this._state.clearDepth!==t&&(this.gl.clearDepth(t),this._state.clearDepth=t)}setDepthFunction(t){this._state.depthFunction!==t&&(this.gl.depthFunc(t),this._state.depthFunction=t,this._stateTracker.invalidateDepthTest())}setDepthWriteEnabled(t){this._state.depthWrite!==t&&(this.gl.depthMask(t),this._state.depthWrite=t,this._stateTracker.invalidateDepthWrite())}setDepthRange(t,e){this._state.depthRange.zNear===t&&this._state.depthRange.zFar===e||(this.gl.depthRange(t,e),this._state.depthRange.zNear=t,this._state.depthRange.zFar=e,this._stateTracker.invalidateDepthWrite())}setStencilTestEnabled(t){this._state.stencilTest!==t&&(!0===t?this.gl.enable(this.gl.STENCIL_TEST):this.gl.disable(this.gl.STENCIL_TEST),this._state.stencilTest=t,this._stateTracker.invalidateStencilTest())}setClearStencil(t){t!==this._state.clearStencil&&(this.gl.clearStencil(t),this._state.clearStencil=t)}setStencilFunction(t,e,s){this._state.stencilFunction.func===t&&this._state.stencilFunction.ref===e&&this._state.stencilFunction.mask===s||(this.gl.stencilFunc(t,e,s),this._state.stencilFunction.face=_.FRONT_AND_BACK,this._state.stencilFunction.func=t,this._state.stencilFunction.ref=e,this._state.stencilFunction.mask=s,this._stateTracker.invalidateStencilTest())}setStencilFunctionSeparate(t,e,s,i){this._state.stencilFunction.face===t&&this._state.stencilFunction.func===e&&this._state.stencilFunction.ref===s&&this._state.stencilFunction.mask===i||(this.gl.stencilFuncSeparate(t,e,s,i),this._state.stencilFunction.face=t,this._state.stencilFunction.func=e,this._state.stencilFunction.ref=s,this._state.stencilFunction.mask=i,this._stateTracker.invalidateStencilTest())}setStencilWriteMask(t){this._state.stencilWriteMask!==t&&(this.gl.stencilMask(t),this._state.stencilWriteMask=t,this._stateTracker.invalidateStencilWrite())}setStencilOp(t,e,s){this._state.stencilOperation.face===_.FRONT_AND_BACK&&this._state.stencilOperation.fail===t&&this._state.stencilOperation.zFail===e&&this._state.stencilOperation.zPass===s||(this.gl.stencilOp(t,e,s),this._state.stencilOperation.face=_.FRONT_AND_BACK,this._state.stencilOperation.fail=t,this._state.stencilOperation.zFail=e,this._state.stencilOperation.zPass=s,this._stateTracker.invalidateStencilTest())}setStencilOpSeparate(t,e,s,i){this._state.stencilOperation.face===t&&this._state.stencilOperation.fail===e&&this._state.stencilOperation.zFail===s&&this._state.stencilOperation.zPass===i||(this.gl.stencilOpSeparate(t,e,s,i),this._state.stencilOperation.face=t,this._state.stencilOperation.fail=e,this._state.stencilOperation.zFail=s,this._state.stencilOperation.zPass=i,this._stateTracker.invalidateStencilTest())}setActiveTexture(t,e=!1){const s=this._state.activeTexture;return t>=0&&(e||t!==this._state.activeTexture)&&(this.gl.activeTexture(u+t),this._state.activeTexture=t),s}clear(t){t&&this.gl.clear(t)}clearSafe(t,e=255){t&&(t&c.COLOR_BUFFER_BIT&&this.setColorMask(!0,!0,!0,!0),t&c.DEPTH_BUFFER_BIT&&this.setDepthWriteEnabled(!0),t&c.STENCIL_BUFFER_BIT&&this.setStencilWriteMask(e),this.gl.clear(t))}drawArrays(t,e,s){if(l()&&(this._numOfDrawCalls++,this._numOfTriangles+=D(t,s)),this.gl.drawArrays(t,e,s),l()){const t=M(this);t&&console.error("drawArrays:",t)}}drawElements(t,s,i,a){if(l()&&(this._numOfDrawCalls++,this._numOfTriangles+=D(t,s)),this.gl.drawElements(t,s,i,a),l()){const r=M(this);if(r){const n=this.getBoundVAO(),l=n?.indexBuffer,h=n?.vertexBuffers,f={indexBuffer:l,vertexBuffers:h},o={mode:t,count:s,type:i,offset:a},_=e(l,(t=>t.size))??0,u=a+s,c=_<u?`. Buffer is too small. Attempted to draw index ${u} of ${_}`:"";console.error(`drawElements: ${r}${c}`,{args:o,vao:f})}}}logInfo(){l()&&console.log(`DrawCalls: ${this._numOfDrawCalls}, Triangles: ${this._numOfTriangles}`)}resetInfo(){l()&&(this._numOfDrawCalls=0,this._numOfTriangles=0)}get capabilities(){return this._capabilities}setViewport(t,e,s,i){s=Math.max(Math.round(s),1),i=Math.max(Math.round(i),1);const a=this._state.viewport;a.x===t&&a.y===e&&a.width===s&&a.height===i||(a.x=t,a.y=e,a.width=s,a.height=i,this.gl.viewport(t,e,s,i))}getViewport(){const t=this._state.viewport;return{x:t.x,y:t.y,width:t.width,height:t.height}}useProgram(t){this._state.program!==t&&(this._state.program?.stop(),this._state.program=t,this.gl.useProgram(t?.glName??null))}bindTexture(t,e,a=!1){(e>=this.parameters.maxTextureImageUnits||e<0)&&console.error("Input texture unit is out of range of available units!");const r=this._state.textureUnitMap[e];return s(t)||null==t.glName?(i(r)&&(this.setActiveTexture(e,a),this.gl.bindTexture(r.descriptor.target,null)),this._state.textureUnitMap[e]=null,r):a||r!==t?(this.setActiveTexture(e,a),this.gl.bindTexture(t.descriptor.target,t.glName),t.applyChanges(),this._state.textureUnitMap[e]=t,r):(t.isDirty&&(this.setActiveTexture(e,a),t.applyChanges()),r)}unbindTexture(t){if(!s(t))for(let e=0;e<this.parameters.maxTextureImageUnits;e++)this._state.textureUnitMap[e]===t&&(this.bindTexture(null,e),this._state.textureUnitMap[e]=null)}bindFramebuffer(t,e=!1){if(e||this._state.readFramebuffer!==t||this._state.drawFramebuffer!==t){if(s(t))return this.gl.bindFramebuffer(d.FRAMEBUFFER,null),this._state.readFramebuffer=null,void(this._state.drawFramebuffer=null);t.initializeAndBind(d.FRAMEBUFFER),this._state.readFramebuffer=t,this._state.drawFramebuffer=t}}bindFramebufferSeparate(t,e,i=!1){const r=e===d.READ_FRAMEBUFFER,n=r?this._state.readFramebuffer:this._state.drawFramebuffer;(i||n!==t)&&(s(t)?this.gl.bindFramebuffer(e,null):t.initializeAndBind(e),r?this._state.readFramebuffer=a(t,null):this._state.drawFramebuffer=a(t,null))}blitFramebuffer(t,e,s=0,i=0,a=t.width,r=t.height,n=0,l=0,h=e.width,f=e.height,o=c.COLOR_BUFFER_BIT,_=b.NEAREST){this.bindFramebufferSeparate(t,d.READ_FRAMEBUFFER),this.bindFramebufferSeparate(e,d.DRAW_FRAMEBUFFER);this.gl.blitFramebuffer(s,i,a,r,n,l,h,f,o,_)}bindBuffer(t,e){if(t)switch(e??(e=t.bufferType),e){case o.ARRAY_BUFFER:this._state.vertexBuffer=v(this.gl,t,e,this._state.vertexBuffer);break;case o.ELEMENT_ARRAY_BUFFER:this._state.indexBuffer=v(this.gl,t,e,this._state.indexBuffer);break;case o.UNIFORM_BUFFER:this._state.uniformBuffer=v(this.gl,t,e,this._state.uniformBuffer);break;case o.PIXEL_PACK_BUFFER:this._state.pixelPackBuffer=v(this.gl,t,e,this._state.pixelPackBuffer);break;case o.PIXEL_UNPACK_BUFFER:this._state.pixelUnpackBuffer=v(this.gl,t,e,this._state.pixelUnpackBuffer);break;case o.COPY_READ_BUFFER:this._state.copyReadBuffer=v(this.gl,t,e,this._state.copyReadBuffer);break;case o.COPY_WRITE_BUFFER:this._state.copyWriteBuffer=v(this.gl,t,e,this._state.copyWriteBuffer)}}bindRenderbuffer(t){const e=this.gl;t||(e.bindRenderbuffer(e.RENDERBUFFER,null),this._state.renderbuffer=null),this._state.renderbuffer!==t&&(e.bindRenderbuffer(e.RENDERBUFFER,t.glName),this._state.renderbuffer=t)}_getBufferBinding(t,e){if(e>=this.parameters.maxUniformBufferBindings||e<0)return console.error("Uniform buffer binding point is out of range!"),null;const i=this._state.uniformBufferBindingPoints;let a=i[e];return s(a)&&(a={buffer:null,offset:0,size:0},i[e]=a),a}bindBufferBase(t,e,i){const a=this._getBufferBinding(t,e);if(s(a))return;if(a.buffer===i&&0===a.offset&&0===a.size)return;this.gl.bindBufferBase(t,e,i?i.glName:null),a.buffer=i,a.offset=0,a.size=0}bindBufferRange(t,e,i,a,r){const n=this._getBufferBinding(t,e);if(s(n))return;if(n.buffer===i&&n.offset===a&&n.size===r)return;if(a%this._parameters.uniformBufferOffsetAlignment!=0)return void console.error("Uniform buffer binding offset is not a multiple of the context offset alignment");this.gl.bindBufferRange(t,e,i.glName,a,r),n.buffer=i,n.offset=a,n.size=r}bindUBO(t,e,i,a){s(e)?this.bindBufferBase(o.UNIFORM_BUFFER,t,null):(l()&&(a??e.byteLength)>this._parameters.maxUniformBlockSize&&console.error("Attempting to bind more data than the maximum uniform block size"),e.initialize(),void 0!==i&&void 0!==a?this.bindBufferRange(o.UNIFORM_BUFFER,t,e.buffer,i,a):this.bindBufferBase(o.UNIFORM_BUFFER,t,e.buffer))}unbindUBO(t){for(let e=0,s=this._state.uniformBufferBindingPoints.length;e<s;e++){const s=this._state.uniformBufferBindingPoints[e];i(s)&&s.buffer===t.buffer&&this.bindBufferBase(o.UNIFORM_BUFFER,e,null)}}unbindBuffer(t){switch(t){case o.ARRAY_BUFFER:this._state.vertexBuffer=v(this.gl,null,t,this._state.vertexBuffer);break;case o.ELEMENT_ARRAY_BUFFER:this._state.indexBuffer=v(this.gl,null,t,this._state.indexBuffer);break;case o.UNIFORM_BUFFER:this._state.uniformBuffer=v(this.gl,null,t,this._state.uniformBuffer);break;case o.PIXEL_PACK_BUFFER:this._state.pixelPackBuffer=v(this.gl,null,t,this._state.pixelPackBuffer);break;case o.PIXEL_UNPACK_BUFFER:this._state.pixelUnpackBuffer=v(this.gl,null,t,this._state.pixelUnpackBuffer);break;case o.COPY_READ_BUFFER:this._state.copyReadBuffer=v(this.gl,null,t,this._state.copyReadBuffer);break;case o.COPY_WRITE_BUFFER:this._state.copyWriteBuffer=v(this.gl,null,t,this._state.copyWriteBuffer)}}bindVAO(t=null){s(t)?this._state.vertexArrayObject&&(this._state.vertexArrayObject.unbind(),this._state.vertexArrayObject=null):this._state.vertexArrayObject!==t&&(t.bind(),this._state.vertexArrayObject=t)}async clientWaitAsync(t=n(10)){const e=this.gl,s=e.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);if(!s)throw new Error("Client wait failed, could not create sync object");let i;this.instanceCounter.increment(g.Sync,s),e.flush();do{await r(t),i=e.clientWaitSync(s,0,0)}while(i===E.TIMEOUT_EXPIRED);if(this.instanceCounter.decrement(g.Sync,s),e.deleteSync(s),i===E.WAIT_FAILED)throw new Error("Client wait failed")}getBoundFramebufferObject(t=d.FRAMEBUFFER){return t===d.READ_FRAMEBUFFER?this._state.readFramebuffer:this._state.drawFramebuffer}getBoundVAO(){return this._state.vertexArrayObject}resetState(){this.useProgram(null),this.bindVAO(null),this.bindFramebuffer(null,!0),this.unbindBuffer(o.ARRAY_BUFFER),this.unbindBuffer(o.ELEMENT_ARRAY_BUFFER),this.type===h.WEBGL2&&(this.unbindBuffer(o.UNIFORM_BUFFER),this._state.uniformBufferBindingPoints.length=0,this.unbindBuffer(o.PIXEL_PACK_BUFFER),this.unbindBuffer(o.PIXEL_UNPACK_BUFFER),this.unbindBuffer(o.COPY_READ_BUFFER),this.unbindBuffer(o.COPY_WRITE_BUFFER));for(let t=0;t<this.parameters.maxTextureImageUnits;++t)this.bindTexture(null,t);this.setBlendingEnabled(!1),this.setBlendFunction(B.ONE,B.ZERO),this.setBlendEquation(p.ADD),this.setBlendColor(0,0,0,0),this.setFaceCullingEnabled(!1),this.setCullFace(_.BACK),this.setFrontFace(m.CCW),this.setPolygonOffsetFillEnabled(!1),this.setPolygonOffset(0,0),this.setScissorTestEnabled(!1),this.setScissorRect(0,0,this.gl.canvas.width,this.gl.canvas.height),this.setDepthTestEnabled(!1),this.setDepthFunction(R.LESS),this.setDepthRange(0,1),this.setStencilTestEnabled(!1),this.setStencilFunction(R.ALWAYS,0,0),this.setStencilOp(T.KEEP,T.KEEP,T.KEEP),this.setClearColor(0,0,0,0),this.setClearDepth(1),this.setClearStencil(0),this.setColorMask(!0,!0,!0,!0),this.setStencilWriteMask(4294967295),this.setDepthWriteEnabled(!0),this.setViewport(0,0,this.gl.canvas.width,this.gl.canvas.height)}enforceState(){const t=this.capabilities.vao;t&&t.bindVertexArray(null);const{gl:e,gl2:s}=this;for(let i=0;i<this.parameters.maxVertexAttributes;i++)e.disableVertexAttribArray(i);if(this._state.vertexBuffer?e.bindBuffer(this._state.vertexBuffer.bufferType,this._state.vertexBuffer.glName):e.bindBuffer(o.ARRAY_BUFFER,null),this._state.indexBuffer?e.bindBuffer(this._state.indexBuffer.bufferType,this._state.indexBuffer.glName):e.bindBuffer(o.ELEMENT_ARRAY_BUFFER,null),i(s)){this._state.uniformBuffer?s.bindBuffer(this._state.uniformBuffer.bufferType,this._state.uniformBuffer.glName):s.bindBuffer(o.UNIFORM_BUFFER,null);for(let t=0;t<this._parameters.maxUniformBufferBindings;t++){const e=this._state.uniformBufferBindingPoints[t];if(i(e)){const{buffer:i,offset:a,size:r}=e;null!==i?0===a&&0===r?s.bindBufferBase(o.UNIFORM_BUFFER,t,i.glName):s.bindBufferRange(o.UNIFORM_BUFFER,t,i.glName,a,r):s.bindBufferBase(o.UNIFORM_BUFFER,t,null)}}this._state.pixelPackBuffer?s.bindBuffer(this._state.pixelPackBuffer.bufferType,this._state.pixelPackBuffer.glName):s.bindBuffer(o.PIXEL_PACK_BUFFER,null),this._state.pixelUnpackBuffer?s.bindBuffer(this._state.pixelUnpackBuffer.bufferType,this._state.pixelUnpackBuffer.glName):s.bindBuffer(o.PIXEL_UNPACK_BUFFER,null),this._state.copyReadBuffer?s.bindBuffer(this._state.copyReadBuffer.bufferType,this._state.copyReadBuffer.glName):s.bindBuffer(o.COPY_READ_BUFFER,null),this._state.copyWriteBuffer?s.bindBuffer(this._state.copyWriteBuffer.bufferType,this._state.copyWriteBuffer.glName):s.bindBuffer(o.COPY_WRITE_BUFFER,null),s.bindFramebuffer(d.READ_FRAMEBUFFER,null),s.readBuffer(s.BACK),this._state.readFramebuffer&&(s.bindFramebuffer(d.READ_FRAMEBUFFER,this._state.readFramebuffer.glName),s.readBuffer(A.COLOR_ATTACHMENT0)),s.bindFramebuffer(d.DRAW_FRAMEBUFFER,this._state.drawFramebuffer?.glName??null)}else this._state.readFramebuffer=this._state.drawFramebuffer,e.bindFramebuffer(d.FRAMEBUFFER,this._state.drawFramebuffer?.glName??null);if(t&&this._state.vertexArrayObject){const t=this._state.vertexArrayObject;this._state.vertexArrayObject&&(this._state.vertexArrayObject.unbind(),this._state.vertexArrayObject=null),this.bindVAO(t)}e.useProgram(this._state.program?.glName??null),e.blendColor(this._state.blendColor.r,this._state.blendColor.g,this._state.blendColor.b,this._state.blendColor.a),e.bindRenderbuffer(e.RENDERBUFFER,this._state.renderbuffer?this._state.renderbuffer.glName:null),!0===this._state.blend?e.enable(this.gl.BLEND):e.disable(this.gl.BLEND),e.blendEquationSeparate(this._state.blendEquation.mode,this._state.blendEquation.modeAlpha),e.blendFuncSeparate(this._state.blendFunction.srcRGB,this._state.blendFunction.dstRGB,this._state.blendFunction.srcAlpha,this._state.blendFunction.dstAlpha),e.clearColor(this._state.clearColor.r,this._state.clearColor.g,this._state.clearColor.b,this._state.clearColor.a),e.clearDepth(this._state.clearDepth),e.clearStencil(this._state.clearStencil),e.colorMask(this._state.colorMask.r,this._state.colorMask.g,this._state.colorMask.b,this._state.colorMask.a),e.cullFace(this._state.cullFace),e.depthFunc(this._state.depthFunction),e.depthRange(this._state.depthRange.zNear,this._state.depthRange.zFar),!0===this._state.depthTest?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST),e.depthMask(this._state.depthWrite),e.frontFace(this._state.frontFace),e.lineWidth(1),!0===this._state.faceCulling?e.enable(e.CULL_FACE):e.disable(e.CULL_FACE),e.polygonOffset(this._state.polygonOffset[0],this._state.polygonOffset[1]),!0===this._state.polygonOffsetFill?e.enable(e.POLYGON_OFFSET_FILL):e.disable(e.POLYGON_OFFSET_FILL),e.scissor(this._state.scissorRect.x,this._state.scissorRect.y,this._state.scissorRect.width,this._state.scissorRect.height),!0===this._state.scissorTest?e.enable(e.SCISSOR_TEST):e.disable(e.SCISSOR_TEST),e.stencilFunc(this._state.stencilFunction.func,this._state.stencilFunction.ref,this._state.stencilFunction.mask),e.stencilOpSeparate(this._state.stencilOperation.face,this._state.stencilOperation.fail,this._state.stencilOperation.zFail,this._state.stencilOperation.zPass),!0===this._state.stencilTest?e.enable(e.STENCIL_TEST):e.disable(e.STENCIL_TEST),e.stencilMask(this._state.stencilWriteMask);for(let r=0;r<this.parameters.maxTextureImageUnits;r++){e.activeTexture(u+r),e.bindTexture(x.TEXTURE_2D,null),e.bindTexture(x.TEXTURE_CUBE_MAP,null),this.type===h.WEBGL2&&(e.bindTexture(x.TEXTURE_3D,null),e.bindTexture(x.TEXTURE_2D_ARRAY,null));const t=this._state.textureUnitMap[r];i(t)&&e.bindTexture(t.descriptor.target,t.glName)}e.activeTexture(u+this._state.activeTexture);const a=this._state.viewport;e.viewport(a.x,a.y,a.width,a.height),this.resetInfo()}_loadExtensions(){this.type===h.WEBGL1&&this.gl.getExtension("OES_element_index_uint"),this.gl.getExtension("KHR_parallel_shader_compile")}_loadParameters(t){const e=this.capabilities.textureFilterAnisotropic,s=t.maxAnisotropy??1/0,i=this.type===h.WEBGL2,a=this.gl,r={versionString:this.gl.getParameter(this.gl.VERSION),maxVertexTextureImageUnits:this.gl.getParameter(this.gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxVertexAttributes:this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS),maxMaxAnisotropy:e?Math.min(this.gl.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY),s):1,maxTextureImageUnits:this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS),maxTextureSize:this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE),maxUniformBufferBindings:i?a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS):0,maxVertexUniformBlocks:i?a.getParameter(a.MAX_VERTEX_UNIFORM_BLOCKS):0,maxFragmentUniformBlocks:i?a.getParameter(a.MAX_FRAGMENT_UNIFORM_BLOCKS):0,maxUniformBlockSize:i?a.getParameter(a.MAX_UNIFORM_BLOCK_SIZE):0,uniformBufferOffsetAlignment:i?a.getParameter(a.UNIFORM_BUFFER_OFFSET_ALIGNMENT):1,maxArrayTextureLayers:i?a.getParameter(a.MAX_ARRAY_TEXTURE_LAYERS):1,maxSamples:i?a.getParameter(a.MAX_SAMPLES):1};return P.TEXTURE_UNIT_FOR_UPDATES=r.maxTextureImageUnits-1,r}};function v(t,e,s,i){return e?i!==e&&t.bindBuffer(s,e.glName):t.bindBuffer(s,null),e}function D(t,e){switch(t){case O.POINTS:return 2*e;case O.TRIANGLES:return e/3;case O.TRIANGLE_STRIP:case O.TRIANGLE_FAN:return e-2;default:return 0}}export{I as RenderingContext};