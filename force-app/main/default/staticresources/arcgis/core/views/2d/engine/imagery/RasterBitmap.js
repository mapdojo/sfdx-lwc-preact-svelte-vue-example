/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{disposeMaybe as e,isSome as t}from"../../../../core/maybe.js";import{g as s,h as r,r as i,k as o,m as a}from"../../../../chunks/mat3.js";import{c as u}from"../../../../chunks/mat3f32.js";import{f as h}from"../../../../chunks/vec2f32.js";import{extractBands as n}from"../../../../layers/support/rasterFunctions/pixelUtils.js";import{DisplayObject as l}from"../DisplayObject.js";import{TextureSamplingMode as d}from"../../../webgl/enums.js";import{createTransformTexture as p,createRasterTexture as _,createColormapTexture as x}from"../../../webgl/rasterUtils.js";const c={bandCount:3,outMin:0,outMax:1,minCutOff:[0,0,0],maxCutOff:[255,255,255],factor:[1/255,1/255,1/255],useGamma:!1,gamma:[1,1,1],gammaCorrection:[1,1,1],colormap:null,colormapOffset:null,stretchType:"none",type:"stretch"};class m extends l{constructor(e=null,t=null,s=null){super(),this._textureInvalidated=!0,this._colormapTextureInvalidated=!0,this._rasterTexture=null,this._rasterTextureBandIds=null,this._transformGridTexture=null,this._colormapTexture=null,this._colormap=null,this._supportsBilinearTexture=!0,this._processedTexture=null,this.functionTextures=[],this.projected=!1,this.stencilRef=0,this.coordScale=[1,1],this._processed=!1,this._symbolizerParameters=null,this.height=null,this.isRendereredSource=!1,this.pixelRatio=1,this.resolution=0,this.rotation=0,this._source=null,this.rawPixelData=null,this._suspended=!1,this._bandIds=null,this._interpolation=null,this._transformGrid=null,this.width=null,this.x=0,this.y=0,this.source=e,this.transformGrid=t,this.interpolation=s}destroy(){this._disposeTextures()}get processedTexture(){return this._processedTexture}set processedTexture(e){this._processedTexture!==e&&(this._disposeTextures(!0),this._processedTexture=e)}get rasterTexture(){return this._rasterTexture}set rasterTexture(e){this._rasterTexture!==e&&(this._rasterTexture?.dispose(),this._rasterTexture=e)}get processed(){return this._processed}set processed(t){this._processed=t,t||(e(this.processedTexture),this.invalidateTexture())}get symbolizerParameters(){return this._symbolizerParameters||c}set symbolizerParameters(e){this._symbolizerParameters!==e&&(this._symbolizerParameters=e,this._colormapTextureInvalidated=!0,this.commonUniforms=null)}get source(){return this._source}set source(e){this._source!==e&&(this._source=e,this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null,this._rasterTextureBandIds=null),this.projected=!1,this.invalidateTexture())}get suspended(){return this._suspended}set suspended(e){this._suspended&&!e&&this.stage&&(this.ready(),this.requestRender()),this._suspended=e}get bandIds(){return this._bandIds}set bandIds(e){this._bandIds=e,this._isBandIdschanged(e)&&(this.projected=!1,this.invalidateTexture())}get interpolation(){return this._interpolation||"nearest"}set interpolation(e){this._interpolation=e,this._rasterTexture&&this._rasterTexture.setSamplingMode("bilinear"===this._getTextureSamplingMethod(e||"nearest")?d.LINEAR:d.NEAREST)}get transformGrid(){return this._transformGrid}set transformGrid(t){this._transformGrid=t,this._transformGridTexture=e(this._transformGridTexture)}invalidateTexture(){this._textureInvalidated||(this._textureInvalidated=!0,this.requestRender())}_createTransforms(){return{dvs:u()}}setTransform(e){const t=s(this.transforms.dvs),[u,n]=e.toScreenNoRotation([0,0],[this.x,this.y]),l=this.resolution/this.pixelRatio/e.resolution,d=l*this.width,p=l*this.height,_=Math.PI*this.rotation/180;r(t,t,h(u,n)),r(t,t,h(d/2,p/2)),i(t,t,-_),r(t,t,h(-d/2,-p/2)),o(t,t,h(d,p)),a(this.transforms.dvs,e.displayViewMat3,t)}getTextures({forProcessing:e=!1,useProcessedTexture:t=!1}={}){const s=t?this._processedTexture??this._rasterTexture:this._rasterTexture,r=[],i=[];return s?t?(i.push(s),r.push("u_image"),this._colormapTexture&&(i.push(this._colormapTexture),r.push("u_colormap")),{names:r,textures:i}):(this._transformGridTexture&&(i.push(this._transformGridTexture),r.push("u_transformGrid")),i.push(s),r.push("u_image"),this._colormapTexture&&!e&&(i.push(this._colormapTexture),r.push("u_colormap")),{names:r,textures:i}):{names:r,textures:i}}onAttach(){this.invalidateTexture()}onDetach(){this.invalidateTexture()}updateTexture({context:e}){if(!this.stage)return void this._disposeTextures();const t=this._isValidSource(this.source);t&&this._colormapTextureInvalidated&&(this._colormapTextureInvalidated=!1,this._updateColormapTexture(e)),this._textureInvalidated&&(this._textureInvalidated=!1,this._createOrDestroyRasterTexture(e),this._rasterTexture&&(t?this.transformGrid&&!this._transformGridTexture&&(this._transformGridTexture=p(e,this.transformGrid)):this._rasterTexture.setData(null)),this.suspended||(this.ready(),this.requestRender()))}updateProcessedTexture(){const{functionTextures:e}=this;0!==e.length&&(this.processedTexture=e.shift(),e.forEach((e=>e?.dispose())),e.length=0)}_createOrDestroyRasterTexture(e){const s=t(this.source)?n(this.source,this.bandIds):null;if(!this._isValidSource(s))return void(this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTextureBandIds=null,this._rasterTexture=null));const r=!this._isBandIdschanged(this.bandIds);if(this._rasterTexture){if(r)return;this._rasterTexture.dispose(),this._rasterTextureBandIds=null,this._rasterTexture=null}this._supportsBilinearTexture=!!e.capabilities.textureFloat?.textureFloatLinear;const i=this._getTextureSamplingMethod(this.interpolation),o=this.isRendereredSource||!e.capabilities.textureFloat?.textureFloat;this._rasterTexture=_(e,s,i,o),this.projected=!1,this._processed=!1,this._rasterTextureBandIds=this.bandIds?[...this.bandIds]:null}_isBandIdschanged(e){const t=this._rasterTextureBandIds;return!(null==t&&null==e||t&&e&&t.join("")===e.join(""))}_isValidSource(e){return t(e)&&e.pixels?.length>0}_getTextureSamplingMethod(e){const{type:s,colormap:r}=this.symbolizerParameters,i="lut"===s||"stretch"===s&&t(r);return!this._supportsBilinearTexture||i||"bilinear"!==e&&"cubic"!==e?"nearest":"bilinear"}_updateColormapTexture(e){const t=this._colormap,s=this.symbolizerParameters.colormap;return s?t?s.length!==t.length||s.some(((e,s)=>e!==t[s]))?(this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),this._colormapTexture=x(e,s),void(this._colormap=s)):void 0:(this._colormapTexture=x(e,s),void(this._colormap=s)):(this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),void(this._colormap=null))}_disposeTextures(e=!1){this._transformGridTexture&&(this._transformGridTexture.dispose(),this._transformGridTexture=null),!e&&this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null,this._colormap=null,this._colormapTextureInvalidated=!0),!e&&this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null,this._rasterTextureBandIds=null),this._processedTexture&&(this._processedTexture.dispose(),this._processedTexture=null)}}class T extends m{get source(){return this._source}}function f(e){return t(e.source)}export{m as RasterBitmap,T as RasterBitmapWithSource,f as hasSource};