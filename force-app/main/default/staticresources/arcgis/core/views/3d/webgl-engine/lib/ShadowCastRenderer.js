/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../chunks/tslib.es6.js";import t from"../../../../core/Accessor.js";import{disposeMaybe as s}from"../../../../core/maybe.js";import{property as i}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as a}from"../../../../core/accessorSupport/decorators/subclass.js";import{g as r,c as o}from"../../../../chunks/vec4.js";import{createQuadVAO as n}from"./glUtil3D.js";import{S as h}from"../../../../chunks/ShadowCastVisualize.glsl.js";import{ShadowCastVisualizeTechnique as _}from"../shaders/ShadowCastVisualizeTechnique.js";import{ShadowCastVisualizeTechniqueConfiguration as l,ShadowCastVisualization as u}from"../shaders/ShadowCastVisualizeTechniqueConfiguration.js";import{vertexCount as d}from"../../../webgl/Util.js";const c=4e4,p=5e4,m=1/512;let b=class extends t{constructor(e,t,s,i){super({}),this._techniqueRepository=e,this._rctx=t,this._data=s,this._requestRender=i,this._passParameters=new h(this._data.shadowCastTexture),this._techniqueConfig=new l,this._enabled=!1,this._vao=n(t),this._techniqueConfig.visualization=u.Gradient}normalizeCtorArgs(){return{}}dispose(){this._stop(),this._vao=s(this._vao),this._techniqueRepository.release(this._technique),this._technique=null}get _visualizeShadowCastTechnique(){return this._technique=this._techniqueRepository.releaseAndAcquire(_,this._techniqueConfig,this._technique),this._technique}render(e){if(!this._showVisualization)return;this._passParameters.sampleScale=1/this._data.computedSamples;const t=this._visualizeShadowCastTechnique;this._rctx.bindVAO(this._vao),this._rctx.bindTechnique(t,this._passParameters,e),this._rctx.drawArrays(t.primitiveType,0,d(this._vao,"geometry"))}setOptions(e){void 0!==e.enabled&&this._setEnabled(e.enabled),void 0!==e.color&&this._setColor(e.color),void 0!==e.threshold&&(this._threshold=e.threshold),void 0!==e.visualization&&(this._visualization=e.visualization),void 0!==e.bandSize&&(this._bandSize=e.bandSize),void 0!==e.bandsEnabled&&(this._bandsEnabled=e.bandsEnabled)}get opacityFromElevation(){return this._passParameters.opacityFromElevation}set opacityFromElevation(e){this._passParameters.opacityFromElevation!==e&&(this._passParameters.opacityFromElevation=e,this.notifyChange("opacityFromElevation"))}get _showVisualization(){return this._enabled&&this._data.computedSamples>0&&this.opacityFromElevation>m}get _threshold(){return this._passParameters.threshold}set _threshold(e){this._threshold!==e&&(this._passParameters.threshold=e,this._requestRenderIfRunning())}get _visualization(){return this._techniqueConfig.visualization}set _visualization(e){e!==this._visualization&&(this._techniqueConfig.visualization=e,this._techniqueRepository.release(this._technique),this._technique=null,this._requestRenderIfRunning())}get _bandSize(){return this._passParameters.bandSize}set _bandSize(e){e!==this._bandSize&&(this._passParameters.bandSize=e,this._requestRenderIfRunning())}get _bandsEnabled(){return this._techniqueConfig.bandsEnabled}set _bandsEnabled(e){e!==this._bandsEnabled&&(this._techniqueConfig.bandsEnabled=e,this._techniqueRepository.release(this._technique),this._technique=null,this._requestRenderIfRunning())}_setColor(e){const t=this._passParameters.color;r(e,t)||(o(this._passParameters.color,e),this._requestRenderIfRunning())}_setEnabled(e){e!==this._enabled&&(e?this._start():this._stop())}_requestRenderIfRunning(){this._enabled&&this._requestRender()}_start(){this._enabled=!0,this._requestRender()}_stop(){this._enabled=!1,this._requestRender()}};e([i()],b.prototype,"opacityFromElevation",null),b=e([a("esri.views.3d.webgl-engine.lib.ShadowCastRenderer")],b);export{b as ShadowCastRenderer,p as shadowCastDisableElevationMax,c as shadowCastDisableElevationMin,m as shadowCastDisabledElevationThreshold};