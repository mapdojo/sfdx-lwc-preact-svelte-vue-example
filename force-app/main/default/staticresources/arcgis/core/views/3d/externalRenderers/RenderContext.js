/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Camera as e}from"../webgl-engine/lib/Camera.js";class r{get gl(){return this.rctx.gl}constructor(r){this.view=r,this.camera=new e,this._renderTargetHelper=null}resetWebGLState(){null!=this.rctx&&(this.rctx.enforceState(),this._renderTargetHelper&&this._renderTargetHelper.bindFramebuffer())}bindRenderTarget(){this._renderTargetHelper&&this._renderTargetHelper.framebuffer.initializeAndBind()}}export{r as default};