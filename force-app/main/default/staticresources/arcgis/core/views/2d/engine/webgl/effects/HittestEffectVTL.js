/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as t}from"../../../../../core/maybe.js";import{HITTEST_RADIUS as e}from"../definitions.js";import{Effect as s}from"./Effect.js";import{PixelFormat as o,PixelType as r}from"../../../../webgl/enums.js";class i extends s{constructor(){super(...arguments),this.name=this.constructor.name,this.defines=["id"],this._lastSize=0,this._boundFBO=null}dispose(){t(this._fbo)&&this._fbo.dispose()}bind({context:t,painter:e}){const{width:s,height:o}=t.getViewport();this._boundFBO=t.getBoundFramebufferObject();const r=e.getFbos(s,o).effect0;t.bindFramebuffer(r),t.setColorMask(!0,!0,!0,!0),t.setClearColor(0,0,0,0),t.clear(t.gl.COLOR_BUFFER_BIT)}unbind({context:t}){t.bindFramebuffer(this._boundFBO),this._boundFBO=null}draw(t,s,o=2*e){this._resolve(t,s,o)}async _resolve({context:t,state:e,pixelRatio:s},i,n){const f=t.getBoundFramebufferObject(),a=e.size[1]*s,h=Math.round(n*s),u=h/2,b=h/2;this._ensureBuffer(h),i.forEach((async(t,e)=>{const n=new Map,c=Math.floor(e.x*s-h/2),l=Math.floor(a-e.y*s-h/2);await f.readPixelsAsync(c,l,h,h,o.RGBA,r.UNSIGNED_BYTE,this._buf);for(let s=0;s<this._buf32.length;s++){const t=this._buf32[s];if(4294967295!==t&&0!==t){const e=s%h,o=h-Math.floor(s/h),r=(u-e)*(u-e)+(b-o)*(b-o),i=n.has(t)?n.get(t):4294967295;n.set(t,Math.min(r,i))}}const _=Array.from(n).sort(((t,e)=>t[1]-e[1])).map((t=>t[0]));t.resolve(_),i.delete(e)}))}_ensureBuffer(t){this._lastSize!==t&&(this._lastSize=t,this._buf=new Uint8Array(4*t*t),this._buf32=new Uint32Array(this._buf.buffer))}}export{i as HittestEffectVTL};