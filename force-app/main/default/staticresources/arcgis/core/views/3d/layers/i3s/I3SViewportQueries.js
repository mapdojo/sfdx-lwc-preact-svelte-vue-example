/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as e,isSome as t}from"../../../../core/maybe.js";import{d as i,i as s,l as r,g as n,e as o,p as a,b as h,a as c}from"../../../../chunks/vec3.js";import{c as m}from"../../../../chunks/vec3f64.js";import{c as l}from"../../../../chunks/vec4.js";import{getReferenceEllipsoid as p}from"../../../../geometry/ellipsoidUtils.js";import{projectBoundingSphere as _}from"../../../../geometry/projection.js";import{getSphericalPCPF as u}from"../../../../geometry/spatialReferenceEllipsoidUtils.js";import{create as d,fromMatrix as g,intersectsSphere as b}from"../../../../geometry/support/frustum.js";import{isPlateCarree as v}from"../../../../geometry/support/spatialReferenceUtils.js";import{w as x}from"../../../../chunks/sphere.js";import{makeDehydratedPoint as f}from"../../../../layers/graphics/dehydratedFeatures.js";import{evaluateElevationAlignmentAtPoint as M}from"../graphics/elevationAlignmentUtils.js";import{ElevationContext as R}from"../graphics/ElevationContext.js";import{createContextWithoutExpressionSupport as D,extractExpressionInfo as S}from"../graphics/featureExpressionInfoUtils.js";import{LodMetric as C}from"./I3SNode.js";import{isValidMbs as E,isValidObb as P,transformObb as O,intersectBoundingRectWithMbs as L,MbsIntersectResult as j}from"./I3SUtil.js";import{create as F,computeOffsetObb as y,isVisible as B}from"../../support/orientedBoundingBox.js";const I=1e5;class A{constructor(e,t,i,s,r,n,o,a,h={}){this._indexSR=e,this._renderCoordsHelper=t,this._clippingArea=r,this._elevationProvider=n,this._viewingMode=o,this._options=h,this._frustum=d(),this._useFrustumCulling=!1,this._poi=m(),this._elevationContext=null,this.minDistance=1/0,this.maxDistance=0,this.maxLodLevel=2,this._tmpObb=F(),this._tmp1=m(),this._tmp2=m(),this._tmp3=m(),this._tmp0=m(),this._screenspaceErrorBias=h.screenspaceErrorBias||1,this._progressiveLoadFactor=h.progressiveLoadFactor||1,this.updateCamera(i,s),this.engineSR=this._renderCoordsHelper.spatialReference,this.updateElevationInfo(a),this._tmpPoint=f(0,0,0,e),this._isECEFOBBInLocalMode=this._indexSR.isWGS84&&(this.engineSR.isWebMercator||v(this.engineSR)),this._indexSREllipsoidRadius=p(this._indexSR).radius}updateElevationInfo(e){null!=e?(this._elevationContext=R.fromElevationInfo(e),this._elevationContext.updateFeatureExpressionInfoContext(D(S(e,!1)))):this._elevationContext=null}updateCamera(e,t){this._useFrustumCulling=t,t&&g(e.viewMatrix,e.projectionMatrix,this._frustum),this._screenSizeFactor=1/(e.perScreenPixelRatio/2),this._camPos=e.eye,this.minDistance=1/0,this.maxDistance=0}setPointOfInterest(e){this._poi=e}updateScreenSpaceErrorBias(e){const t=this._screenspaceErrorBias;return this._screenspaceErrorBias=e,t}updateClippingArea(e){this._clippingArea=e}getElevationRange(i){if(e(this._elevationContext))return null;const s=i.mbs;if(!s)return null;const r=s[0],n=s[1],o=s[2],a=s[3],h="relative-to-scene"===this._elevationContext.mode?"scene":"ground";if(this._elevationProvider.getSphereElevationBounds)return this._elevationProvider.getSphereElevationBounds(r,n,o,a,this._indexSR,h);const c=this._elevationProvider.getElevation(r,n,o,this._indexSR,h);return t(c)?{min:c,max:c}:null}getRenderMbs(e){const t=e.renderMbs;return E(t)||(e.mbs&&l(t,e.mbs),this._elevationContext&&t[3]<I&&(this._tmpPoint.x=t[0],this._tmpPoint.y=t[1],this._tmpPoint.z=t[2],t[2]=M(this._tmpPoint,this._elevationProvider,this._elevationContext,this._renderCoordsHelper)),_(t,this._indexSR,t,this.engineSR)),t}getVisibilityObb(i){if(t(i.visibilityObb))return i.visibilityObb;const s=i.serviceObb,r=.01*this._indexSREllipsoidRadius;return e(s)||!i.mbs||!P(s)||this._isECEFOBBInLocalMode&&s.halfSize.some((e=>e>r))?null:(i.serviceObbInRenderSR=this._computeRenderObb(s,i.serviceObbInRenderSR,i.mbs[3],i.elevationRange),i.serviceObbInRenderSR)}_computeRenderObb(i,s,r,n){if(e(s))s=F();else if(P(s))return s;let o=0,a=0;if(this._elevationContext&&t(n)&&Number.isFinite(n.min))switch(this._elevationContext.mode){case"relative-to-ground":o=this._elevationContext.geometryZWithOffset(i.center[2],this._renderCoordsHelper)+n.min-i.center[2],a=n.max-n.min;break;case"on-the-ground":o=n.min-i.center[2],a=n.max-n.min}else this._elevationContext&&r<I&&(this._tmpPoint.x=i.center[0],this._tmpPoint.y=i.center[1],this._tmpPoint.z=i.center[2],o=M(this._tmpPoint,this._elevationProvider,this._elevationContext,this._renderCoordsHelper)-i.center[2]);return a>0?(O(i,this._indexSR,this._tmpObb,this.engineSR,o),y(this._tmpObb,0,a,this._viewingMode,s)):O(i,this._indexSR,s,this.engineSR,o),s}isNodeVisible(e){const i=this.getRenderMbs(e);if(!this._isMBSinClippingArea(i))return!1;if(!this._useFrustumCulling)return!0;const s=this.getVisibilityObb(e);return t(s)?B(s,this._frustum):b(this._frustum,x(i))}isGeometryVisible(e){if(!this._useFrustumCulling)return!0;const i=e.geometryObb;return t(i)?B(i,this._frustum):this.isNodeVisible(e)}_isMBSinClippingArea(t){return!!e(this._clippingArea)||L(this._clippingArea,t)!==j.OUTSIDE}_screenSpaceDiameterMbs(e,t){const s=this.getRenderMbs(e),r=Math.sqrt(i(s,this._camPos)),n=r-s[3];return this._updateMinMaxDistance(r),n<0?.5*Number.MAX_VALUE:t/n*this._screenSizeFactor}calcCameraDistance(e){return this.calcCameraDistanceToCenter(e)-this.getRenderMbs(e)[3]}calcCameraDistanceToCenter(e){const t=this.getRenderMbs(e),i=s(t,this._camPos);return this._updateMinMaxDistance(i),i}calcAngleDependentLoD(e){const t=this.getRenderMbs(e),i=t[3],n=(Math.abs(t[0]*(t[0]-this._camPos[0])+t[1]*(t[1]-this._camPos[1])+t[2]*(t[2]-this._camPos[2]))/r(t)+i)/s(t,this._camPos);return Math.min(1,n)}hasLOD(e){return e.lodMetric!==C.None}_getDistancePlanarMode(e,t){const i=e[0]-t[0],s=e[1]-t[1],r=e[2]-t[2],n=i*i+s*s,o=t[3];if(n<=o*o)return Math.abs(r);const a=Math.sqrt(n)-o;return Math.sqrt(r*r+a*a)}_getDistanceGlobeMode(e,t){const m=r(t),l=r(e)-m;n(this._tmp0,e,o(e,t)/a(e));const p=i(t,this._tmp0),_=t[3];if(p<=_*_)return Math.abs(l);{const i=n(this._tmp0,t,1/m),a=m,p=_*_/2/a,u=n(this._tmp1,i,a-p),d=e,g=h(this._tmp2,d,u),b=h(this._tmp2,g,n(this._tmp3,i,o(i,g))),v=c(this._tmp2,u,n(this._tmp2,b,_/r(b)));let x=s(d,v);if(l>=2e5){const e=h(this._tmp1,d,v);let t=o(e,i)/r(e);t<.08&&(t=1e-4),x/=t}return x}}_getDistance(e,t){return this.engineSR===u(this.engineSR)?this._getDistanceGlobeMode(e,t):this._getDistancePlanarMode(e,t)}_updateMinMaxDistance(e){e>0?(this.minDistance=Math.min(this.minDistance,e),this.maxDistance=Math.max(this.maxDistance,e)):(this.minDistance=0,this.maxDistance=Math.max(this.maxDistance,-e))}getLodLevel(e){if(e.lodMetric===C.None)return 0;if(0===e.childCount)return this.maxLodLevel;if(this._useFrustumCulling&&this._progressiveLoadFactor<1){const t=this._progressiveLoadFactor*this._screenspaceErrorBias,i=this._screenspaceErrorBias;return this.evaluateLODmetric(e,t)?this.evaluateLODmetric(e,i)?2:1:0}return this.evaluateLODmetric(e,this._screenspaceErrorBias)?this.maxLodLevel:0}evaluateLODmetric(e,t){switch(e.lodMetric){case C.ScreenSpaceRelative:{const i=this.getRenderMbs(e),s=this._getDistance(this._camPos,i),r=2*s/this._screenSizeFactor,n=s+i[3];return this._updateMinMaxDistance(n),e.maxError*t<=r}case C.MaxScreenThreshold:{let i=this._screenSpaceDiameterMbs(e,e.mbs[3]*t);return this._options.angleDependentLoD&&(i*=this.calcAngleDependentLoD(e)),i<e.maxError}case C.RemovedFeatureDiameter:return this._screenSpaceDiameterMbs(e,e.maxError)*t<10;case C.DistanceRangeFromDefaultCamera:return this.calcCameraDistance(e)>e.maxError*t}return!1}distToPOI(e){const t=this.getRenderMbs(e);return s(t,this._poi)-t[3]}distCameraToPOI(){return s(this._camPos,this._poi)}}export{A as default};