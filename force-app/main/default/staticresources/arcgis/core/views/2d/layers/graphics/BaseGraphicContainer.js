/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{destroyMaybe as e}from"../../../../core/maybe.js";import{FeatureContainer as t}from"../../engine/FeatureContainer.js";import r from"./GraphicBoundsRenderer.js";import{CompareFunction as s}from"../../../webgl/enums.js";let n=class extends t{constructor(e){super(e),this.hasHighlight=()=>!0}destroy(){super.destroy(),this._boundsRenderer=e(this._boundsRenderer)}enableRenderingBounds(e){this._boundsRenderer=new r(e),this.requestRender()}get hasLabels(){return!1}onTileData(e,t){e.patch(t),this.contains(e)||this.addChild(e),this.requestRender()}onTileError(e){e.clear(),this.contains(e)||this.addChild(e)}_renderChildren(e,t){for(const r of this.children)r.isReady&&r.hasData&&(r.commit(e),e.context.setStencilFunction(s.EQUAL,r.stencilRef,255),r.getDisplayList().replay(e,r,t))}};export{n as default};