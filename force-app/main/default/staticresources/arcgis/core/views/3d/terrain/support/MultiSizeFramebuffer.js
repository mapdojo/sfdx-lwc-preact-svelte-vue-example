/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{TargetType as t,DepthStencilTargetType as s}from"../../../webgl/enums.js";import{FramebufferObject as e}from"../../../webgl/FramebufferObject.js";class o{constructor(t){this._rctx=t,this._fbos=new Map}get(t){return this._getPool(t)}dispose(){this._fbos.forEach((t=>t.dispose())),this._fbos.clear()}_getPool(o){const r=this._fbos.get(o);if(r)return r;const i=new e(this._rctx,{colorTarget:t.TEXTURE,depthStencilTarget:s.DEPTH_RENDER_BUFFER,width:o,height:o});return this._fbos.set(o,i),i}}export{o as MultiSizeFramebuffer};