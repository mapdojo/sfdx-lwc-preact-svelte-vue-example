/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
var e,t,r={},n={get exports(){return r},set exports(e){r=e}};e=n,void 0!==(t=function(){var e=function(e){window.console&&window.console.log&&window.console.log(e)},t=function(t){window.console&&window.console.error?window.console.error(t):e(t)},r={enable:{1:{0:!0}},disable:{1:{0:!0}},getParameter:{1:{0:!0}},drawArrays:{3:{0:!0}},drawElements:{4:{0:!0,2:!0}},createShader:{1:{0:!0}},getShaderParameter:{2:{1:!0}},getProgramParameter:{2:{1:!0}},getShaderPrecisionFormat:{2:{0:!0,1:!0}},getVertexAttrib:{2:{1:!0}},vertexAttribPointer:{6:{2:!0}},bindTexture:{2:{0:!0}},activeTexture:{1:{0:!0}},getTexParameter:{2:{0:!0,1:!0}},texParameterf:{3:{0:!0,1:!0}},texParameteri:{3:{0:!0,1:!0,2:!0}},texImage2D:{9:{0:!0,2:!0,6:!0,7:!0},6:{0:!0,2:!0,3:!0,4:!0}},texSubImage2D:{9:{0:!0,6:!0,7:!0},7:{0:!0,4:!0,5:!0}},copyTexImage2D:{8:{0:!0,2:!0}},copyTexSubImage2D:{8:{0:!0}},generateMipmap:{1:{0:!0}},compressedTexImage2D:{7:{0:!0,2:!0}},compressedTexSubImage2D:{8:{0:!0,6:!0}},bindBuffer:{2:{0:!0}},bufferData:{3:{0:!0,2:!0}},bufferSubData:{3:{0:!0}},getBufferParameter:{2:{0:!0,1:!0}},pixelStorei:{2:{0:!0,1:!0}},readPixels:{7:{4:!0,5:!0}},bindRenderbuffer:{2:{0:!0}},bindFramebuffer:{2:{0:!0}},checkFramebufferStatus:{1:{0:!0}},framebufferRenderbuffer:{4:{0:!0,1:!0,2:!0}},framebufferTexture2D:{5:{0:!0,1:!0,2:!0}},getFramebufferAttachmentParameter:{3:{0:!0,1:!0,2:!0}},getRenderbufferParameter:{2:{0:!0,1:!0}},renderbufferStorage:{4:{0:!0,1:!0}},clear:{1:{0:{enumBitwiseOr:["COLOR_BUFFER_BIT","DEPTH_BUFFER_BIT","STENCIL_BUFFER_BIT"]}}},depthFunc:{1:{0:!0}},blendFunc:{2:{0:!0,1:!0}},blendFuncSeparate:{4:{0:!0,1:!0,2:!0,3:!0}},blendEquation:{1:{0:!0}},blendEquationSeparate:{2:{0:!0,1:!0}},stencilFunc:{3:{0:!0}},stencilFuncSeparate:{4:{0:!0,1:!0}},stencilMaskSeparate:{2:{0:!0}},stencilOp:{3:{0:!0,1:!0,2:!0}},stencilOpSeparate:{4:{0:!0,1:!0,2:!0,3:!0}},cullFace:{1:{0:!0}},frontFace:{1:{0:!0}},drawArraysInstancedANGLE:{4:{0:!0}},drawElementsInstancedANGLE:{5:{0:!0,2:!0}},blendEquationEXT:{1:{0:!0}}},n=null,o=null;function a(e){if(null==n)for(var t in n={},o={},e)"number"==typeof e[t]&&(n[e[t]]=t,o[t]=e[t])}function i(){if(null==n)throw"WebGLDebugUtils.init(ctx) not called"}function u(e){return i(),void 0!==n[e]}function f(e){i();var t=n[e];return void 0!==t?"gl."+t:"/*UNKNOWN WebGL ENUM*/ 0x"+e.toString(16)}function c(e,t,n,a){var i;if(void 0!==(i=r[e])&&void 0!==(i=i[t])&&i[n]){if("object"==typeof i[n]&&void 0!==i[n].enumBitwiseOr){for(var u=i[n].enumBitwiseOr,c=0,l=[],s=0;s<u.length;++s){var d=o[u[s]];0!=(a&d)&&(c|=d,l.push(f(d)))}return c===a?l.join(" | "):f(a)}return f(a)}return null===a?"null":void 0===a?"undefined":a.toString()}function l(e,t){for(var r="",n=t.length,o=0;o<n;++o)r+=(0==o?"":", ")+c(e,n,o,t[o]);return r}function s(e,t,r){e.__defineGetter__(r,(function(){return t[r]})),e.__defineSetter__(r,(function(e){t[r]=e}))}function d(e,r,n,o){o=o||e,a(e),r=r||function(e,r,n){for(var o="",a=n.length,i=0;i<a;++i)o+=(0==i?"":", ")+c(r,a,i,n[i]);t("WebGL error "+f(e)+" in "+r+"("+o+")")};var i={};function u(e,t){return function(){n&&n(t,arguments);var a=e[t].apply(e,arguments),u=o.getError();return 0!=u&&(i[u]=!0,r(u,t,arguments)),a}}var l={};for(var g in e)if("function"==typeof e[g])if("getExtension"!=g)l[g]=u(e,g);else{var E=u(e,g);l[g]=function(){return d(E.apply(e,arguments),r,n,o)}}else s(l,e,g);return l.getError=function(){for(var t in i)if(i.hasOwnProperty(t)&&i[t])return i[t]=!1,t;return e.NO_ERROR},l}function g(e){var t=e.getParameter(e.MAX_VERTEX_ATTRIBS),r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r);for(var n=0;n<t;++n)e.disableVertexAttribArray(n),e.vertexAttribPointer(n,4,e.FLOAT,!1,0,0),e.vertexAttrib1f(n,0);e.deleteBuffer(r);var o=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);for(n=0;n<o;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_CUBE_MAP,null),e.bindTexture(e.TEXTURE_2D,null);for(e.activeTexture(e.TEXTURE0),e.useProgram(null),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindRenderbuffer(e.RENDERBUFFER,null),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.DITHER),e.disable(e.SCISSOR_TEST),e.blendColor(0,0,0,0),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.clearColor(0,0,0,0),e.clearDepth(1),e.clearStencil(-1),e.colorMask(!0,!0,!0,!0),e.cullFace(e.BACK),e.depthFunc(e.LESS),e.depthMask(!0),e.depthRange(0,1),e.frontFace(e.CCW),e.hint(e.GENERATE_MIPMAP_HINT,e.DONT_CARE),e.lineWidth(1),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.UNPACK_COLORSPACE_CONVERSION_WEBGL&&e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.polygonOffset(0,0),e.sampleCoverage(1,!1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilMask(4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT|e.STENCIL_BUFFER_BIT);e.getError(););}function E(e){var t,r,n=[],o=[],a={},i=1,u=!1,f=[],c=0,l=0,d=!1,E=0,b={};function m(e){return"function"==typeof e?e:function(t){e.handleEvent(t)}}e.getContext=(r=e.getContext,function(){var n=r.apply(e,arguments);if(n instanceof WebGLRenderingContext){if(n!=t){if(t)throw"got different context";a=F(t=n)}return a}return n});var T=function(e){n.push(m(e))},p=function(e){o.push(m(e))};function v(e){var t=e.addEventListener;e.addEventListener=function(r,n,o){switch(r){case"webglcontextlost":T(n);break;case"webglcontextrestored":p(n);break;default:t.apply(e,arguments)}}}function _(){for(var e=Object.keys(b),t=0;t<e.length;++t)delete b[e]}function R(){++l,u||c==l&&e.loseContext()}function x(e,t){var r=e[t];return function(){if(R(),!u)return r.apply(e,arguments)}}function A(){for(var e=0;e<f.length;++e){var r=f[e];r instanceof WebGLBuffer?t.deleteBuffer(r):r instanceof WebGLFramebuffer?t.deleteFramebuffer(r):r instanceof WebGLProgram?t.deleteProgram(r):r instanceof WebGLRenderbuffer?t.deleteRenderbuffer(r):r instanceof WebGLShader?t.deleteShader(r):r instanceof WebGLTexture&&t.deleteTexture(r)}}function S(e){return{statusMessage:e,preventDefault:function(){d=!0}}}return v(e),e.loseContext=function(){if(!u){for(u=!0,c=0,++i;t.getError(););_(),b[t.CONTEXT_LOST_WEBGL]=!0;var r=S("context lost"),o=n.slice();setTimeout((function(){for(var t=0;t<o.length;++t)o[t](r);E>=0&&setTimeout((function(){e.restoreContext()}),E)}),0)}},e.restoreContext=function(){u&&o.length&&setTimeout((function(){if(!d)throw"can not restore. webglcontestlost listener did not call event.preventDefault";A(),g(t),u=!1,l=0,d=!1;for(var e=o.slice(),r=S("context restored"),n=0;n<e.length;++n)e[n](r)}),0)},e.loseContextInNCalls=function(e){if(u)throw"You can not ask a lost contet to be lost";c=l+e},e.getNumCalls=function(){return l},e.setRestoreTimeout=function(e){E=e},e;function F(e){for(var r in e)"function"==typeof e[r]?a[r]=x(e,r):s(a,e,r);a.getError=function(){if(R(),!u)for(;e=t.getError();)b[e]=!0;for(var e in b)if(b[e])return delete b[e],e;return a.NO_ERROR};for(var n=["createBuffer","createFramebuffer","createProgram","createRenderbuffer","createShader","createTexture"],o=0;o<n.length;++o){var c=n[o];a[c]=function(t){return function(){if(R(),u)return null;var r=t.apply(e,arguments);return r.__webglDebugContextLostId__=i,f.push(r),r}}(e[c])}var l=["getActiveAttrib","getActiveUniform","getBufferParameter","getContextAttributes","getAttachedShaders","getFramebufferAttachmentParameter","getParameter","getProgramParameter","getProgramInfoLog","getRenderbufferParameter","getShaderParameter","getShaderInfoLog","getShaderSource","getTexParameter","getUniform","getUniformLocation","getVertexAttrib"];for(o=0;o<l.length;++o)c=l[o],a[c]=function(t){return function(){return R(),u?null:t.apply(e,arguments)}}(a[c]);var d=["isBuffer","isEnabled","isFramebuffer","isProgram","isRenderbuffer","isShader","isTexture"];for(o=0;o<d.length;++o)c=d[o],a[c]=function(t){return function(){return R(),!u&&t.apply(e,arguments)}}(a[c]);return a.checkFramebufferStatus=function(t){return function(){return R(),u?a.FRAMEBUFFER_UNSUPPORTED:t.apply(e,arguments)}}(a.checkFramebufferStatus),a.getAttribLocation=function(t){return function(){return R(),u?-1:t.apply(e,arguments)}}(a.getAttribLocation),a.getVertexAttribOffset=function(t){return function(){return R(),u?0:t.apply(e,arguments)}}(a.getVertexAttribOffset),a.isContextLost=function(){return u},a}}return{init:a,mightBeEnum:u,glEnumToString:f,glFunctionArgToString:c,glFunctionArgsToString:l,makeDebugContext:d,makeLostContextSimulatingCanvas:E,resetToInitialState:g}}())&&(e.exports=t);export{r as w};