/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{create as e}from"../../../geometry/support/aaBoundingRect.js";import{BitmapTile as i}from"./BitmapTile.js";import{brushes as r}from"./brushes.js";import{WGLDrawPhase as t}from"./webgl/enums.js";import s from"./webgl/TileContainer.js";class n extends s{get requiresDedicatedFBO(){return this.children.some((e=>"additive"===e.bitmap.blendFunction))}createTile(r){const t=this._tileInfoView.getTileBounds(e(),r),s=this._tileInfoView.getTileResolution(r.level),[n,o]=this._tileInfoView.tileInfo.size;return new i(r,s,t[0],t[3],n,o)}prepareRenderPasses(e){const i=e.registerRenderPass({name:"bitmap (tile)",brushes:[r.bitmap],target:()=>this.children.map((e=>e.bitmap)),drawPhase:t.MAP});return[...super.prepareRenderPasses(e),i]}doRender(e){this.visible&&e.drawPhase===t.MAP&&super.doRender(e)}}export{n as BitmapTileContainer};