/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e,isNone as t,disposeMaybe as i,releaseMaybe as n}from"../../../core/maybe.js";import{c as s,a}from"../../../chunks/vec3.js";import{create as r,fromRay as h,getStart as l,getEnd as c}from"../../../geometry/support/clipRay.js";import{intersectClipRay as o}from"../../../geometry/support/frustum.js";import{copy as d}from"../../../geometry/support/lineSegment.js";import{wrap as _}from"../../../geometry/support/ray.js";import{ViewingMode as p}from"../../ViewingMode.js";import{LaserlinePathData as g}from"./LaserlinePathData.js";import{createQuadVAO as u}from"../webgl-engine/lib/glUtil3D.js";import{RenderSlot as m}from"../webgl-engine/lib/RenderSlot.js";import{copyParameters as P,updateParameters as b}from"../webgl-engine/materials/internal/MaterialUtil.js";import{LaserlinePathTechnique as f}from"../webgl-engine/shaders/LaserlinePathTechnique.js";import{LaserlinePathTechniqueConfiguration as E}from"../webgl-engine/shaders/LaserlinePathTechniqueConfiguration.js";import{LaserlinePassParameters as q,LaserlineTechnique as L}from"../webgl-engine/shaders/LaserlineTechnique.js";import{LaserlineTechniqueConfiguration as V}from"../webgl-engine/shaders/LaserlineTechniqueConfiguration.js";import{PrimitiveType as R}from"../../webgl/enums.js";class D{constructor(e,t={contrastControlEnabled:!1}){this._config=t,this._technique=null,this._heightManifoldEnabled=!1,this._pointDistanceEnabled=!1,this._lineVerticalPlaneEnabled=!1,this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._viewingMode=p.Local,this._pathVerticalPlaneEnabled=!1,this._pathVerticalPlaneData=null,this._pathTechnique=null,this.canRender=!0,this._passParameters=P(e,new q)}get renderSlots(){return[this._config.contrastControlEnabled?m.LASERLINES_CONTRAST_CONTROL:m.LASERLINES]}get needsLinearDepth(){return!0}get heightManifoldEnabled(){return this._heightManifoldEnabled}set heightManifoldEnabled(e){this._heightManifoldEnabled!==e&&(this._heightManifoldEnabled=e,this._requestRender())}get heightManifoldTarget(){return this._passParameters.heightManifoldTarget}set heightManifoldTarget(e){s(this._passParameters.heightManifoldTarget,e),this._requestRender()}get pointDistanceEnabled(){return this._pointDistanceEnabled}set pointDistanceEnabled(e){e!==this._pointDistanceEnabled&&(this._pointDistanceEnabled=e,this._requestRender())}get pointDistanceTarget(){return this._passParameters.pointDistanceTarget}set pointDistanceTarget(e){s(this._passParameters.pointDistanceTarget,e),this._requestRender()}get pointDistanceOrigin(){return this._passParameters.pointDistanceOrigin}set pointDistanceOrigin(e){s(this._passParameters.pointDistanceOrigin,e),this._requestRender()}get lineVerticalPlaneEnabled(){return this._lineVerticalPlaneEnabled}set lineVerticalPlaneEnabled(e){e!==this._lineVerticalPlaneEnabled&&(this._lineVerticalPlaneEnabled=e,this._requestRender())}get lineVerticalPlaneSegment(){return this._passParameters.lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){d(e,this._passParameters.lineVerticalPlaneSegment),this._requestRender()}get intersectsLineEnabled(){return this._intersectsLineEnabled}set intersectsLineEnabled(e){e!==this._intersectsLineEnabled&&(this._intersectsLineEnabled=e,this._requestRender())}get intersectsLineSegment(){return this._passParameters.intersectsLineSegment}set intersectsLineSegment(e){d(e,this._passParameters.intersectsLineSegment),this._requestRender()}get intersectsLineRadius(){return this._passParameters.intersectsLineRadius}set intersectsLineRadius(e){e!==this._passParameters.intersectsLineRadius&&(this._passParameters.intersectsLineRadius=e,this._requestRender())}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){e!==this._intersectsLineInfinite&&(this._intersectsLineInfinite=e,this._requestRender())}get viewingMode(){return this._viewingMode}set viewingMode(e){e!==this._viewingMode&&(this._viewingMode=e,this._requestRender())}get pathVerticalPlaneEnabled(){return this._pathVerticalPlaneEnabled}set pathVerticalPlaneEnabled(t){t!==this._pathVerticalPlaneEnabled&&(this._pathVerticalPlaneEnabled=t,e(this._pathVerticalPlaneData)&&this._requestRender())}set pathVerticalPlaneVertices(e){t(this._pathVerticalPlaneData)&&(this._pathVerticalPlaneData=new g(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.vertices=e,this.pathVerticalPlaneEnabled&&this._requestRender()}set pathVerticalPlaneBuffers(e){t(this._pathVerticalPlaneData)&&(this._pathVerticalPlaneData=new g(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.buffers=e,this.pathVerticalPlaneEnabled&&this._requestRender()}setParameters(e){b(this._passParameters,e)&&this._requestRender()}initializeRenderContext(e){this._context=e;const t=e.renderContext.rctx;this._quadVAO=u(t),this._techniqueRepository=e.techniqueRepository,this._techniqueConfig=new V;const i=new E;i.contrastControlEnabled=this._config.contrastControlEnabled,this._pathTechnique=this._techniqueRepository.acquire(f,i)}uninitializeRenderContext(){this._quadVAO=i(this._quadVAO),this._technique=n(this._technique),this._pathVerticalPlaneData=i(this._pathVerticalPlaneData),this._pathTechnique=n(this._pathTechnique)}prepareTechnique(){return this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled?(this._techniqueConfig.heightManifoldEnabled=this.heightManifoldEnabled,this._techniqueConfig.lineVerticalPlaneEnabled=this.lineVerticalPlaneEnabled,this._techniqueConfig.pointDistanceEnabled=this.pointDistanceEnabled,this._techniqueConfig.intersectsLineEnabled=this.intersectsLineEnabled,this._techniqueConfig.contrastControlEnabled=this._config.contrastControlEnabled,this._techniqueConfig.spherical=this._viewingMode===p.Global,this._technique=this._techniqueRepository.releaseAndAcquire(L,this._techniqueConfig,this._technique),this._technique):this._pathTechnique}render(e,t){(this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled)&&this._renderUnified(e,t),this.pathVerticalPlaneEnabled&&this._renderPath(e)}_renderUnified(e,t){const i=e.rctx;this._updatePassParameters(e),i.bindTechnique(t,this._passParameters,e.bindParameters),i.bindVAO(this._quadVAO),i.drawArrays(R.TRIANGLE_STRIP,0,4)}_renderPath(e){if(t(this._pathVerticalPlaneData)||t(this._pathTechnique))return;const i=e.rctx,n=this._pathTechnique;i.bindTechnique(n,{...this._passParameters,origin:this._pathVerticalPlaneData.origin},e.bindParameters),this._pathVerticalPlaneData.draw(e.rctx)}_updatePassParameters(e){if(!this._intersectsLineEnabled)return;const t=e.bindParameters.camera;if(this._intersectsLineInfinite){if(h(_(this._passParameters.intersectsLineSegment.origin,this._passParameters.intersectsLineSegment.vector),T),T.c0=-Number.MAX_VALUE,!o(t.frustum,T))return;l(T,this._passParameters.lineStartWorld),c(T,this._passParameters.lineEndWorld)}else s(this._passParameters.lineStartWorld,this._passParameters.intersectsLineSegment.origin),a(this._passParameters.lineEndWorld,this._passParameters.intersectsLineSegment.origin,this._passParameters.intersectsLineSegment.vector)}_requestRender(){this._context&&this._context.requestRender()}}const T=r();export{D as LaserLineRenderer};