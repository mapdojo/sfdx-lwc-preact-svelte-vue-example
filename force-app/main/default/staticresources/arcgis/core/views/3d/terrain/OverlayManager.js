/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import t from"../../../core/Accessor.js";import{Cyclical as r,cyclicalPI as s}from"../../../core/Cyclical.js";import i from"../../../core/Handles.js";import has from"../../../core/has.js";import{nextHighestPowerOfTwo as a,clamp as n,deg2rad as o}from"../../../core/mathUtils.js";import{isSome as l,destroyMaybe as h,isNone as c,unwrap as d}from"../../../core/maybe.js";import{watch as u,sync as p}from"../../../core/reactiveUtils.js";import{Milliseconds as _}from"../../../core/time.js";import{property as m}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as y}from"../../../core/accessorSupport/decorators/subclass.js";import{a as g}from"../../../chunks/vec2.js";import{a as f,b as v,E as R,c as T,i as w}from"../../../chunks/vec3.js";import{c as O}from"../../../chunks/vec3f64.js";import{t as D,b as x,a as S}from"../../../chunks/vec4.js";import{c as E,f as P}from"../../../chunks/vec4f64.js";import{getReferenceEllipsoid as M}from"../../../geometry/ellipsoidUtils.js";import{projectVectorToVector as U}from"../../../geometry/projection.js";import{create as C,width as I,copy as N,center as j,height as b,intersection as A,contains as G,intersects as L,offset as H}from"../../../geometry/support/aaBoundingRect.js";import{create as k,wrap as q}from"../../../geometry/support/ray.js";import{b as B,e as F,t as V}from"../../../chunks/sphere.js";import{angleAroundAxis as W}from"../../../geometry/support/vector.js";import{y2lat as Y}from"../../../geometry/support/webMercatorUtils.js";import{viewAngle as z}from"../state/utils/viewUtils.js";import X from"../support/debugFlags.js";import{PointGraphics as K}from"../support/debugUtils.js";import{OverlayIndex as Z}from"./interfaces.js";import{OverlayRenderer as J}from"./OverlayRenderer.js";import{RenderRequestType as Q,ValidationState as $}from"../webgl-engine/lib/basicInterfaces.js";import{newIntersector as ee}from"../webgl-engine/lib/Intersector.js";import{fromValues as te}from"../webgl-engine/lib/LocalOriginFactory.js";import{UpdateParameters as re}from"../webgl-engine/lib/Material.js";import{SortedRenderGeometryRenderer as se}from"../webgl-engine/lib/SortedRenderGeometryRenderer.js";import{removeLoadedShaderModules as ie}from"../webgl-engine/parts/requireUtils.js";import{TaskPriority as ae,noBudget as ne,Task as oe}from"../../support/Scheduler.js";const le=[[-.1,-2,3.9,2],[-.1,-3.9,3.9,.1],[-2,-3.9,2,.1],[-3.9,-3.9,.1,.1],[-3.9,-2,.1,2],[-3.9,-.1,.1,3.9],[-2,-.1,2,3.9],[-.1,-.1,3.9,3.9]];let he,ce=class extends t{get running(){return this._placementDirty&&(this._drapeSources.size>0||this._view.graphics.length>0||X.OVERLAY_DRAW_DEBUG_TEXTURE)&&!!this._spatialReference&&!this.suspended&&this.surface.ready}get _isSpherical(){return this._view.state.isGlobal}get _worldToPCSRatio(){return l(this._spatialReference)&&this._spatialReference.isGeographic&&!this._view.state.isLocal?M(this._spatialReference).metersPerDegree:1}get _view(){return this.surface.view}get suspended(){return this.surface.suspended}get updating(){return this.running||this.renderer.updating||this._contentUpdated}get hasHighlights(){return this.renderer.hasHighlights}get rendersOccluded(){return this.renderer.rendersOccluded}constructor(e){super(e),this._handles=new i,this._spatialReference=null,this._renderSR=null,this._overlaySREqualsRenderSR=!0,this._drapeSources=new Set,this._drapeTargets=new Set,this._placementDirty=!1,this._contentUpdated=!1,this._drawTexturesDirty=!1,this._drawTexturesAnimateDirty=!1,this._hasUnusedRenderTargets=!1,this._longitudeCyclical=null,this._latestOriginId=0,this._maxResolution=has("esri-mobile")?2048:4096,this._animationTimeLast=0}initialize(){const e=this._view;this.renderer=new J({view:e,worldToPCSRatio:this._worldToPCSRatio,spatialReference:this._spatialReference}),this._groundIntersector=ee(this._view.state.viewingMode),this._groundIntersector.options.backfacesTerrain=!0,this._groundIntersector.options.invisibleTerrain=!0,this._groundIntersector.options.hud=!1,this._handles.add([this.renderer.events.on("has-highlights",(()=>{this.setDrawTexturesDirty(),this.notifyChange("hasHighlights")})),this.renderer.events.on("has-water",(t=>e._stage?.renderer.setParameters({hasOverlayWater:t}))),this.renderer.events.on("renders-occluded",(()=>{this.setDrawTexturesDirty(),this.notifyChange("rendersOccluded")})),this.renderer.events.on("content-changed",(()=>this.setDrawTexturesDirty())),this.renderer.events.on("textures-disposed",(()=>this.updateOverlayResult())),u((()=>[e.pointsOfInterest?.renderPointOfView,e.pointsOfInterest?.centerOnSurfaceFrequent?.location]),(()=>this.setPlacementDirty())),u((()=>[e.state?.pixelRatio,e.state?.contentPixelRatio]),(()=>this.setPlacementDirty()),p),this.surface.on("elevation-change",(()=>this.setPlacementDirty())),e.on("resize",(()=>this.setPlacementDirty())),e.resourceController.scheduler.registerTask(ae.OVERLAY,this),e._stage.renderView.events.on("force-camera-for-screenshot",(e=>{this._updateOverlays(ne,e,Q.BACKGROUND),this.renderer.hasOverlays&&this._drawOverlayTextures(this.renderer.overlays,Q.BACKGROUND,e.pixelRatio)}))]),e._stage?.renderer.setParameters({renderOverlay:e=>{this._contentUpdated=!1,this.renderer.processSyncDrapeSources(),this.renderer.hasOverlays&&(this._dispatchAnimationUpdate(e),this._drawOverlayTextures(this.renderer.overlays,Q.UPDATE)),this._hasUnusedRenderTargets&&this._collectUnusedRenderTargetMemory()}})}destroy(){this._handles=h(this._handles),l(he)&&(he.hide(),he=null)}get hasOverlays(){return this.renderer.hasOverlays}setSpatialReference(e){this._spatialReference=e,this.renderer.spatialReference=e,this._longitudeCyclical=null;const t=this._view.renderSpatialReference;l(e)&&l(t)?(this._renderSR=t,this._overlaySREqualsRenderSR=e.equals(this._renderSR),this._isSpherical&&(this._longitudeCyclical=e.isWebMercator?new r(-20037508.342787,20037508.342787):new r(-180,180),this.renderer.longitudeCyclical=this._longitudeCyclical),this.renderer&&(this.renderer.worldToPCSRatio=this._worldToPCSRatio)):this.renderer.disposeOverlays()}get gpuMemoryUsage(){return this.renderer.gpuMemoryUsage}registerDrapeSource(e,t,r){this._drapeSources.add(e),this.renderer.ensureOverlays(this._drapeTargets,this._drapeSources);const s=this.renderer.createDrapeSourceRenderer(e,t,r);return this._updateDrapeSourceExtent(e),this._setContentDirty(),this.notifyChange("running"),s}registerGeometryDrapeSource(e){return this.registerDrapeSource(e,se)}_updateDrapeSourceExtent(e){2===this.renderer.overlays.length&&l(e.setDrapingExtent)&&l(this._spatialReference)&&e.setDrapingExtent(this.renderer.overlays,this._spatialReference)}unregisterDrapeSource(e){this._drapeSources.has(e)&&(this._drapeSources.delete(e),this.renderer.removeDrapeSourceRenderer(e),this.renderer.ensureDrapeSources(this._drapeSources),this._setContentDirty(),this.notifyChange("running"))}registerDrapeTarget(e){this._drapeTargets.add(e),this.renderer.ensureOverlays(this._drapeTargets,this._drapeSources)}updateOverlayResult(){this._view._stage?.renderer.setParameters({overlays:this.renderer.overlays})}unregisterDrapeTarget(e){this._drapeTargets.delete(e),this.renderer.ensureDrapeTargets(this._drapeTargets)}_setContentDirty(){this.setPlacementDirty(),this.setDrawTexturesDirty()}setPlacementDirty(){this._placementDirty=!0}runTask(e){return this._updateOverlays(e,this._view.state.contentCamera,Q.UPDATE)}_updateOverlays(e,t,r){if(!this._spatialReference)return oe.YIELD;const s=this._computeOverlayResolution(t);this._computeOverlayExtents(t,s,_e);const i=I(_e.inner)/I(_e.outer);this.renderer.ensureOverlays(this._drapeTargets,this._drapeSources);const a=this._updateOverlay(Z.INNER,_e.inner,s,1*_e.pixelRatioAdjustment,_e.mapUnitsPerPixel),n=this._updateOverlay(Z.OUTER,_e.outer,s,i*_e.pixelRatioAdjustment,_e.mapUnitsPerPixel);a!==fe.EXTENT&&n!==fe.EXTENT||(this._drapeSources.forEach((e=>this._updateDrapeSourceExtent(e))),this.surface.updateTileOverlayParams(r)),a===fe.NONE&&n===fe.NONE||this.setDrawTexturesDirty(),this._placementDirty=!1,e.madeProgress()}_computeOverlayResolution(e){const t=this._view.state.contentPixelRatio,r=e.fullWidth/e.pixelRatio*t,s=e.fullHeight/e.pixelRatio*t;return Math.min(a(Math.max(r,s)+256),this._maxResolution)}_updateOverlay(e,t,r,s,i){if(0===this.renderer.overlays.length)return fe.NONE;const a=this.renderer.overlays[e],n=a.mapUnitsPerPixel;if(a.mapUnitsPerPixel=i,a.pixelRatio=s,de(t,a.extent)&&r===a.resolution)return n===i?fe.NONE:fe.RERENDER_ONLY;N(a.extent,t),a.resolution=r;const o=j(a.extent);return a.renderLocalOrigin=te(o[0],o[1],0,"OV_"+this._latestOriginId++),fe.EXTENT}setTileParameters(e){const t=e.renderData.overlay;if(this.renderer.overlays.length>0){const r=this.renderer.overlays[Z.INNER],s=this.renderer.overlays[Z.OUTER],i=e.extent;this._rectInsideRect(r.extent,i)||this._rectanglesOverlap(i,r.extent)||this._rectanglesOverlap(i,s.extent)?(this._setTileOverlayData(i,Z.INNER,t),this._setTileOverlayData(i,Z.OUTER,t)):(this._clearTileOverlayData(Z.INNER,t),this._clearTileOverlayData(Z.OUTER,t))}else this._clearTileOverlayData(Z.INNER,t),this._clearTileOverlayData(Z.OUTER,t)}overlayPixelSizeInMapUnits(e){if(0===this.renderer.overlays.length)return 0;const t=this.renderer.overlays[Z.INNER],r=this.renderer.overlays[Z.OUTER],s=this._pointIsInExtent(e,t.extent)?t:r;return(s.extent[2]-s.extent[0])/s.resolution}_setTileOverlayData(e,t,r){if(0===this.renderer.overlays.length)return;const s=this.renderer.overlays[t].extent,i=I(s),a=b(s);let n=e[0];if(this._longitudeCyclical){n=this._longitudeCyclical.minimalMonotonic(s[0],n);const t=this._longitudeCyclical.minimalMonotonic(s[0],e[2]);n>t&&(n=t-(e[2]-e[0]))}r.setScale(t,I(e)/i,b(e)/a),r.setOffset(t,(n-s[0])/i,(e[1]-s[1])/a)}_clearTileOverlayData(e,t){t.setScale(e,-1,-1),t.setOffset(e,-1,-1)}async reloadShaders(){ie(),await this.renderer.reloadShaders(),this.setDrawTexturesDirty(),this.runTask(ne)}_dispatchAnimationUpdate(e){const t=_(e-this._animationTimeLast);if(t>=this.surface.view._stage.renderer.animationTimestep||l(this._view.state.forcedAnimationTime)||this._drawTexturesDirty||this._drawTexturesAnimateDirty){const r=_(t/this.surface.view._stage.renderer.animationTimeDilation),s=new re(this._view.state.camera,r,this._view.state.forcedAnimationTime);this.renderer.updateAnimation(s)&&(this._drawTexturesAnimateDirty=!0),this._animationTimeLast=e}}setDrawTexturesDirty(){this.renderer.hasOverlays?(this._contentUpdated=!0,this._drawTexturesDirty=!0,this._view._stage.renderView.requestRender()):this.setPlacementDirty()}_intersectGroundFromView(e,t,r,s){const i=this._view.sceneIntersectionHelper.getCenterRayWithSubpixelOffset(e,ge,t,r);if(c(i))return!1;const a=i.origin,n=f(pe,i.origin,i.direction);return this._groundIntersector.reset(a,n,e),this._groundIntersector.intersect([]),this._view.basemapTerrain.intersect(this._groundIntersector,null,a,n),this._groundIntersector.results.min.getIntersectionPoint(s)}_findHorizonBasedPointOfInterest(e,t){let r=.5;const i=.55,a=this._view.renderCoordsHelper.getAltitude(e.eye),o=this._view.pointsOfInterest.centerOnSurfaceFrequent,l=1e-5,h=n(o.estimatedSurfaceAltitude,e.aboveGround?-1/0:a+l,e.aboveGround?a-l:1/0),c=e.aboveGround;if("global"===this._view.viewingMode){const t=pe;B(F(V,M(this._view.spatialReference).radius+h),q(e.eye,e.viewForward),t),v(t,t,e.eye);const a=s.normalize(W(e.viewForward,t,e.viewRight))/e.fovY+.5,n=a<=0||a>=1?.5:i;r=c?n*a:a+n*(1-a)}else{const t=.5*Math.PI-Math.acos(-e.viewForward[2]),s=Math.tan(t),a=P(0,s,1,0),o=D(a,a,e.projectionMatrix)[1],l=n(.5+.5*o,0,1);r=1===l||0===l?.5:c?l*i:1-(1-l)*i}return!!this._intersectGroundFromView(e,.5,r,t)&&R(t,e.eye)<o.distance*o.distance}_computeOverlayExtents(e,t,r){const s=this._view.pointsOfInterest.centerOnSurfaceFrequent.renderLocation,i=O();this._findHorizonBasedPointOfInterest(e,i)||T(i,s);const a=Math.max(.1,w(e.eye,i)),n=z(this._view.renderCoordsHelper,s,e.eye),h=Math.PI/2-Math.abs(n-Math.PI/2);X.OVERLAY_SHOW_CENTER?(c(he)&&(he=new K(this._view.graphics,"red")),he.show(i,this._renderSR)):l(he)&&he.hide(),this._overlaySREqualsRenderSR||U(i,this._renderSR,i,this._spatialReference);const u=this.surface.extent,p=!this._isSpherical&&l(this._spatialReference)&&this._spatialReference.isGeographic,_=p&&l(this._spatialReference)?1/M(this._spatialReference).metersPerDegree:1,m=this._view.state.contentPixelRatio,y=e.perScreenPixelRatio/m*a*_;r.mapUnitsPerPixel=y/this._worldToPCSRatio;let f=t*y/2,v=!1,R=p?90:1/0;this._isSpherical&&l(u)&&l(this._spatialReference)&&(this._spatialReference.isWebMercator?(f/=Math.cos(Y(i[1])),R=u[3]):(v=!0,f/=M(this._spatialReference).metersPerDegree,R=90),f>=R&&(f=R,i[1]=0,this._spatialReference.isWebMercator&&(i[0]=0)));let D=1;v&&(D=1/Math.max(.2,Math.cos(Math.abs(o(i[1])))),f*D>180&&(D=180/f),r.mapUnitsPerPixel*=D);const E=Math.log(2)/12;f=Math.exp(Math.round(Math.log(f)/E)*E);const P=f*D,C=32,j=.5*t/(C*P),b=.5*t/(C*f);i[0]=Math.round(i[0]*j)/j,i[1]=Math.round(i[1]*b)/b;const L=r.inner;L[0]=i[0]-P,L[1]=i[1]-f,L[2]=i[0]+P,L[3]=i[1]+f,this._isSpherical&&this._shiftExtentToFitBounds(L,1/0,R);const H=r.outer;if(6*P>I(u))N(H,d(u));else if(h<=.25*Math.PI)H[0]=L[0]-P,H[1]=L[1]-f,H[2]=L[2]+P,H[3]=L[3]+f;else{U(e.eye,this._renderSR,pe,this._spatialReference),g(ue,i,pe);let t=-Math.atan2(ue[1],ue[0])+.125*Math.PI;t<0&&(t+=2*Math.PI);const r=Math.floor(t/(.25*Math.PI));x(ue,le[r],2*f),ue[0]*=D,ue[2]*=D,S(H,L,ue)}if(this._isSpherical)H[0]=this._longitudeCyclical.clamp(H[0]),H[2]=this._longitudeCyclical.clamp(H[2]),H[1]=Math.max(H[1],-R),H[3]=Math.min(H[3],R);else{const e=A(L,u,me),t=A(H,u,ye);G(e,t)&&(H[2]=H[0],H[3]=H[1])}const k=Math.abs(L[2]-L[0])/t;r.mapUnitsPerPixel=Math.max(r.mapUnitsPerPixel,k),r.pixelRatioAdjustment=r.mapUnitsPerPixel/k}_drawOverlayTextures(e,t,r=this._view.state.contentPixelRatio){if(0===e.length||!this._drawTexturesDirty&&!this._drawTexturesAnimateDirty)return;const s=this._drawTexturesDirty;this._drawTexturesDirty=!1,this._drawTexturesAnimateDirty=!1;const i=this._drawOverlay(e[Z.INNER],r),a=this._drawOverlay(e[Z.OUTER],r);i!==$.CHANGED&&a!==$.CHANGED||this.surface.updateTileOverlayParams(Q.UPDATE),this._collectUnusedRenderTargetMemory(),this.updateOverlayResult(),s?(this.surface.requestRender(t),t===Q.UPDATE&&this.surface.requestUpdate()):this.surface.requestRender(Q.BACKGROUND)}_drawOverlay(e,t){return this._longitudeCyclical?e.setupGeometryViewsCyclical(this._longitudeCyclical):e.setupGeometryViewsDirect(),e.draw(this.renderer,t)}_collectUnusedRenderTargetMemory(){if(this._hasUnusedRenderTargets=!1,this.renderer.hasOverlays){const e=performance.now();this._hasUnusedRenderTargets=this.renderer.collectUnusedRenderTargetMemory(e)}}_rectanglesOverlap(e,t){return!c(e)&&(this._longitudeCyclical?(this._longitudeCyclical.contains(t[0],t[2],e[0])||this._longitudeCyclical.contains(t[0],t[2],e[2])||this._longitudeCyclical.contains(e[0],e[2],t[0]))&&!(e[1]>t[3]||e[3]<t[1]):L(e,t))}_rectInsideRect(e,t){return!c(t)&&(this._longitudeCyclical?this._longitudeCyclical.contains(e[0],e[2],t[0])&&this._longitudeCyclical.contains(e[0],e[2],t[2])&&t[1]>e[1]&&t[3]<e[3]:G(e,t))}_pointIsInExtent(e,t){if(this._longitudeCyclical)return this._longitudeCyclical.contains(t[0],t[2],e.x)&&e.y>=t[1]&&e.y<=t[3];const r=e.x,s=e.y;return r>t[0]&&r<t[2]&&s>t[1]&&s<t[3]}_shiftExtentToFitBounds(e,t,r){let s=0,i=0;e[0]<-t?s=e[0]+t:e[2]>t&&(s=t-e[2]),e[1]<-r?i=e[1]+r:e[3]>r&&(i=r-e[3]),H(e,s,i)}get test(){return{renderer:this.renderer,update:()=>this.runTask(ne)}}};function de(e,t){const r=1e-5,s=X.TESTS_DISABLE_OPTIMIZATIONS?0:r*Math.max(e[2]-e[0],e[3]-e[1],t[2]-t[0],t[3]-t[1]);return Math.abs(t[0]-e[0])<=s&&Math.abs(t[1]-e[1])<=s&&Math.abs(t[2]-e[2])<=s&&Math.abs(t[3]-e[3])<=s}e([m()],ce.prototype,"_spatialReference",void 0),e([m({readOnly:!0})],ce.prototype,"running",null),e([m()],ce.prototype,"_placementDirty",void 0),e([m()],ce.prototype,"_contentUpdated",void 0),e([m()],ce.prototype,"_isSpherical",null),e([m()],ce.prototype,"_worldToPCSRatio",null),e([m({autoDestroy:!0})],ce.prototype,"renderer",void 0),e([m({constructOnly:!0})],ce.prototype,"surface",void 0),e([m()],ce.prototype,"suspended",null),e([m()],ce.prototype,"updating",null),e([m({type:Boolean})],ce.prototype,"hasHighlights",null),e([m({type:Boolean})],ce.prototype,"rendersOccluded",null),ce=e([y("esri.views.3d.terrain.OverlayManager")],ce);const ue=E(),pe=O(),_e={inner:C(),outer:C(),mapUnitsPerPixel:0,pixelRatioAdjustment:1},me=C(),ye=C(),ge=k();var fe;!function(e){e[e.NONE=0]="NONE",e[e.EXTENT=1]="EXTENT",e[e.RERENDER_ONLY=2]="RERENDER_ONLY"}(fe||(fe={}));export{ce as OverlayManager};