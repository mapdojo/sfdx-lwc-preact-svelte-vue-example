/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{nextHighestPowerOfTwo as e}from"../../../core/mathUtils.js";import{disposeMaybe as t,releaseMaybe as r,isNone as s,isSome as o}from"../../../core/maybe.js";import{s as a,c as i}from"../../../chunks/vec2.js";import{Z as n}from"../../../chunks/vec2f64.js";import{isBaseLayer as c,isGroupLayer as u}from"../../../layers/support/layerUtils.js";import{ImageWithType as l}from"../support/StreamDataLoader.js";import{BlendLayersPassParameters as p}from"./BlendLayersTechnique.js";import{TextureUpdate as h}from"./interfaces.js";import{LayerClass as d}from"./LayerClass.js";import{isBlendableLayerView as m,isVectorTileLayerView as _,isVectorTileRenderInfo as f,isImageryTileRenderInfo as y,isRasterTileRenderInfo as T,isTextureTileRenderInfo as g}from"./terrainUtils.js";import{ActivationTime as x}from"./TextureFader.js";import{TextureReference as b}from"./TextureReference.js";import{TileCompositor as k}from"./TileCompositor.js";import w from"./TileTexture.js";import{TileUpdate as I}from"./TileUpdate.js";import{blendModeFromString as P}from"../webgl-engine/core/shaderLibrary/output/BlendOptions.js";import{BaseOpacityMode as A,BlendLayersOutput as D}from"../webgl-engine/core/shaderLibrary/terrain/TileBackground.glsl.js";import{createColorTexture as E,createEmptyTexture as M}from"../webgl-engine/lib/glUtil3D.js";import{ContextType as R}from"../../webgl/context-util.js";import{TextureSamplingMode as L,TextureType as j,PixelFormat as C,PixelType as N,TextureWrapMode as O}from"../../webgl/enums.js";import{Texture as U}from"../../webgl/Texture.js";class B{constructor(e,t,r,s){this.start=e,this.end=t,this.blendMode=r,this.opacity=s}}class G{constructor(e,t,r){this._rctx=e,this.tileSize=t,this._techniqueRepository=r,this._passParameters=new p,this._backgroundTexture=null,this._backgroundColor=null,this._backgroundDirty=!1,this._blackTex=null,this._maxAnisotropy=this._rctx.parameters.maxMaxAnisotropy,this._composition=new k(this._rctx,this._techniqueRepository),this._blackTex=new w(E(this._rctx,[0,0,0,1])),this._ensureBackgroundTexture(this.tileSize)}dispose(){this._composition=t(this._composition),this._backgroundTexture=r(this._backgroundTexture),this._blackTex=r(this._blackTex)}get backgroundIsGrid(){return s(this._backgroundColor)}get backgroundColor(){return this._backgroundColor}updateTileTexture(e,t){if(!e.renderData)return;const r=e.surface,s=r.baseOpacity;let a=0,i=0,n=this.tileSize,l=!1;const p=r.view.state.contentPixelRatio;let h=!1;Y.clear(),Z.length=0;const f=e.layerInfo[d.MAP];let y=f.length,T=0;for(;T<f.length;T++){const t=r.layerViewByIndex(T,d.MAP),g=t.layer.opacity;v[T]=g;const x=t.fullOpacity;if(V[T]=x,c(t.layer)&&y>=f.length&&(y=T),m(t)){W[T]=t.layer.blendMode;let e="normal"!==t.layer.blendMode;if(u(t.layer.parent)){const r=q(t.layer.parent);o(r)&&""!==r&&(e=z(t.layer.parent)||e)}e&&(h=e,l=!1)}if(0===g&&!h){f[T].pendingUpdates&=~(I.TEXTURE_NOFADING&I.TEXTURE_FADING);continue}++i;const b=S(e,T);if(b){if(f[T].pendingUpdates&=~(I.TEXTURE_NOFADING&I.TEXTURE_FADING),u(t.layer.parent)){const e=q(t.layer.parent);o(e)&&""!==e&&X(t.layer.parent,T)}_(t)?n=Math.max(n,this.tileSize*p):1===s&&1===x&&(t.isOpaque||this._dataToTexture(b)&&b.sourceLayerInfo.data.descriptor.isOpaque)&&(l=!0),++a}}this._rctx.type===R.WEBGL1&&(n=F(n));const g=n/this.tileSize,x=T-1;this._ensureBackgroundTexture(this.tileSize),0!==a?1===a&&!h&&this._useLayerTexture(e,x,y,V[x])||this._composeMapLayers(e,t,x,y,v,W,n,g,!l||h,Y,h):this._useBackgroundTexture(e,i)}_ensureBackgroundTexture(e){s(this._backgroundTexture)&&(this._backgroundTexture=this._buildTexture(e),this._backgroundDirty=!0),this._backgroundDirty&&(this._composition.bind(e),this._passParameters.offset=n,this._passParameters.scale=1,this._passParameters.opacity=1,o(this.backgroundColor)&&(this._passParameters.backgroundColor=this.backgroundColor),this._composition.drawBackground(this._passParameters,o(this.backgroundColor)),this._composition.copyFBOToTexture(this._backgroundTexture),this._composition.unbind(),this._backgroundDirty=!1)}_useBackgroundTexture(e,t){let r=x.Immediate;(e.surface.view.layerViewManager.updating||t>0)&&(r=x.Delayed);const a=e.renderData;this._backgroundTexture&&s(a.textureReference)&&(r=x.Immediate),a.setTextureReference(o(this._backgroundTexture)?new b(this._backgroundTexture,h.FADING,J,e.surface.baseOpacity,0,1):null,r)}_useLayerTexture(e,t,r,s){const o=t<r,a=o?1:e.surface.baseOpacity,i=o?e.surface.baseOpacity:1,n=S(e,t);return!!this._dataToTexture(n)&&(e.renderData.setTextureReference(new b(n.sourceLayerInfo.data,h.FADING,n,a,i,s)),!0)}_composeMapLayers(e,t,r,s,o,a,i,c,u,l,p){this._composition.ensureBuffer(i);const h=e.surface.baseOpacity;let d=!1,m=L.LINEAR_MIPMAP_LINEAR,_=!1,T=0;for(let b=r;b>=0;b--){const t=S(e,b);if(!t)continue;if(0===o[b]&&!p)continue;const r=b<s&&h<1&&!d;this._passParameters.baseOpacity=r?h:1;const g=this._passParameters.baseOpacity<1?A.Required:A.NotRequired;r&&(d=!0);let x=!1;l.forEach((e=>{e.start===b&&(Z.push(e),this._composition.openGroup(i),x=!0)}));const k=0===T,w=x?D.GroupBackgroundComposite:u&&k?this.backgroundIsGrid?D.GridComposite:D.ColorComposite:D.Composite,I=P[a[b]];for(f(t)?(this._passParameters.opacity=o[b],_=this._composition.drawVectorData(this._passParameters,w,i,I,g,t,c,this.tileSize,_)):y(t)?(this._passParameters.opacity=o[b],this._composition.drawImageryTileData(this._passParameters,w,i,I,g,t),this._hasNearestInterpolation(t)&&(m=L.NEAREST)):this._dataToTexture(t)&&(this._passParameters.texture=t.sourceLayerInfo.data.texture,this._passParameters.offset=t.offset,this._passParameters.scale=t.scale,this._passParameters.opacity=o[b],this._composition.drawRasterData(this._passParameters,w,i,I,g));Z.length>0&&Z[Z.length-1].end===b;){const e=Z.pop();this._passParameters.opacity=e.opacity,this._passParameters.offset=n,this._passParameters.scale=1;const t=u&&k?this.backgroundIsGrid?D.GridComposite:D.ColorComposite:D.Composite;this._composition.drawGroup(this._passParameters,t,i,P[e.blendMode],g)}T++}const g=e.renderData,x=g.ensureTexture(i,(()=>this._buildTexture(i,m)));this._composition.copyFBOToTexture(x),this._composition.unbind(),g.setTextureReference(new b(x,t,J,d?1:h,0,1))}_hasNearestInterpolation(e){const t=e.sourceLayerInfo.data;return!!t.source&&"nearest"===t.interpolation}_dataToTexture(e){if(T(e)){const t=e.sourceLayerInfo;t.data=this._buildTexture(t.data),e.tile.setMemoryDirty()}return g(e)}setBackground(e){this._backgroundColor!==e&&(this._backgroundColor=e,this._backgroundDirty=!0)}_buildTexture(e,t=L.LINEAR_MIPMAP_LINEAR){if(s(e))return null;const r={target:j.TEXTURE_2D,pixelFormat:C.RGBA,dataType:N.UNSIGNED_BYTE,wrapMode:O.CLAMP_TO_EDGE,samplingMode:t,maxAnisotropy:this._maxAnisotropy,preMultiplyAlpha:!0,flipped:!0,hasMipmap:!0},o=this._rctx;let a;if("number"==typeof e)r.width=r.height=e,a=new w(new U(o,r));else if(e instanceof l)r.isOpaque=e.isOpaque,a=new w(new U(o,r,e.image)),e.release();else try{r.width=e.width,r.height=e.height,a=new w(new U(o,r,e))}catch(n){a=new w(M(o)),console.warn("TileRenderer: failed to execute 'texImage2D', cross-origin image may not be loaded.")}const i=o.bindTexture(a.texture,U.TEXTURE_UNIT_FOR_UPDATES);return a.generateMipmap(),o.bindTexture(i,U.TEXTURE_UNIT_FOR_UPDATES),a}get test(){return{backgroundTexture:this._backgroundTexture}}}function F(t){const r=e(t),s=r*r,o=t*t;if(s===o)return t;const a=r/2;return s-o<o-a*a?r:a}function S(e,t){H.layerIndex=t;const r=e.layerInfo[d.MAP][t];if(o(r.data))return a(H.offset,0,0),H.tile=e,H.scale=1,H.sourceLod=e.lij,H.sourceLayerInfo=r,H;const s=r.upsampleInfo;if(o(s)){const e=s.tile.layerInfo[d.MAP][t];return H.tile=s.tile,i(H.offset,s.offset),H.scale=s.scale,H.sourceLod=s.tile.lij,H.sourceLayerInfo=e,H}return null}function q(e){return e.get("uid")}function z(e){let t="normal"!==e.blendMode;return u(e.parent)&&(t=z(e.parent)||t),t}function X(e,t){u(e.parent)&&X(e.parent,t);const r=q(e);if(o(r)&&""!==r){const s=Y.get(r);s?s.start=t:Y.set(r,new B(t,t,e.blendMode,e.opacity))}}const v=new Array,V=new Array,W=new Array,Y=new Map,Z=new Array,H={tile:null,sourceLayerInfo:null,sourceLod:null,offset:[0,0],scale:1,layerIndex:0},J={offset:[0,0],scale:1};export{B as GroupInfo,G as TileRenderer};