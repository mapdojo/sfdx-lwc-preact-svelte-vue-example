/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../Camera.js";import{Cyclical as t}from"../../../core/Cyclical.js";import n from"../../../core/Logger.js";import{deg2rad as r,rad2deg as i}from"../../../core/mathUtils.js";import{isNone as o,unwrapOr as a,isSome as s}from"../../../core/maybe.js";import{createResolver as l}from"../../../core/promiseUtils.js";import{g as c,a as f,j as u,c as m}from"../../../chunks/vec3.js";import{a as p,c as d}from"../../../chunks/vec3f64.js";import{getReferenceEllipsoid as v}from"../../../geometry/ellipsoidUtils.js";import h from"../../../geometry/Point.js";import{projectPointToVector as g,projectVectorToVector as y,projectVectorToPoint as x,project as R}from"../../../geometry/projection.js";import M from"../../../geometry/SpatialReference.js";import{ViewingMode as j}from"../../ViewingMode.js";import{cameraOnContentAlongViewDirection as w}from"../camera/intersectionUtils.js";import{t as S,c as T}from"../../../chunks/cameraUtilsPlanar.js";import{t as z,c as C}from"../../../chunks/cameraUtilsSpherical.js";import{getGreatCircleSpanAt as U}from"./earthUtils.js";import{getElevationAtPoint as b}from"./ElevationProvider.js";import{isSpatialReferenceSupported as P}from"../../support/spatialReferenceSupport.js";const A=n.getLogger("esri.views.3d.support.cameraUtils"),D=39.37,H=96,L=1,G=8,E=5,O=1,k=d(),I={heading:0,tilt:0},q=new h,J=new t(-20037508.342788905,20037508.342788905),F=new t(-180,180);var W;function X(e){return e.spatialReference||M.WGS84}function K(e){return"global"===e.viewingMode?C:T}function Y(e,t,n,r,i){return K(e).headingTiltToDirectionUp(t,n,r,i)}function N(e,t){if(o(t))return null;const n=e.renderSpatialReference,i=K(e).headingTiltToDirectionUp,a=d();if(!g(t.position,a,n))return null;const s=i(a,t.heading,t.tilt);c(s.direction,s.direction,e.state.camera.distance),f(s.direction,s.direction,a);const l=w(e,a,s.direction,s.up);return l.fov=r(t.fov),l}!function(e){e[e.LOCKED=0]="LOCKED",e[e.ADJUST=1]="ADJUST"}(W||(W={}));const V=d();function Z(t,n,r){const a=t.renderSpatialReference,s=ee(t,n.eye,n.viewForward,n.up,I);let l=X(t);return y(n.eye,a,V,l)||(l=M.WGS84,y(n.eye,a,V,l)),o(r)?new e(new h(V,l),s.heading,s.tilt,i(n.fov)):(r.position.x=V[0],r.position.y=V[1],r.position.z=V[2],r.position.spatialReference=l,r.heading=s.heading,r.tilt=s.tilt,r.fov=i(n.fov),r)}function B(e,t,n){const i=e.state.camera,o=i.width/2/i.pixelRatio;e.renderCoordsHelper.viewingMode===j.Global&&null!=n&&(t*=Math.cos(r(n))),t/=e.renderCoordsHelper.unitInMeters;return o/(H*D/t)/Math.tan(i.fovX/2)}function Q(e,t,n){const i=e.state.camera,o=t*Math.tan(i.fovX/2),a=i.width/2/i.pixelRatio;let s=H*D/(a/o);return e.renderCoordsHelper.viewingMode===j.Global&&null!=n&&(s/=Math.cos(r(n))),s*=e.renderCoordsHelper.unitInMeters,s}function $(e,t,n,r,i,o){return _(e,t,B(e,n,t.latitude),r,i,o)}function _(e,t,n,r,i,a){if(Me(a)){const s=new Re(a.signal);return oe(e,r.heading,r.tilt,t,n,i,s),void s.resolver.promise.then((t=>{const n=he(e,t,r.fov);if(!o(n))return a.resolver.resolve(n);a.resolver.reject()}),(e=>a.resolver.reject(e)))}const s=oe(e,r.heading,r.tilt,t,n,i);return he(e,s,r.fov,a)}function ee(e,t,n,r,i){return K(e).directionToHeadingTilt(t,n,r,i)}function te(e,t){return!!(e.basemapTerrain&&e.renderCoordsHelper.fromRenderCoords(t,q,e.spatialReference)&&e.elevationProvider&&a(b(e.elevationProvider,q),0)>(q.z??0)-O)}async function ne(e,t,n){if(!e.renderCoordsHelper.fromRenderCoords(t,q,e.spatialReference)||!e.elevationProvider)return!1;const r=q.z??0,i=await e.elevationProvider.queryElevation(q.x,q.y,r,q.spatialReference,"ground",n);return a(i,0)>r-O}async function re(e,t,n){const r=d();if(t)if(t instanceof h){if(g(t,r,e.renderSpatialReference),null==t.z&&null!=e.basemapTerrain&&null!=e.elevationProvider){const i=await e.elevationProvider.queryElevation(t.x,t.y,t.z??0,t.spatialReference,"ground",n);return s(i)&&e.renderCoordsHelper.setAltitude(r,i),r}}else m(r,t);else m(r,e.state.camera.center);return r}function ie(e,t){const n=d();if(t&&t instanceof h){if(g(t,n,e.renderSpatialReference),null==t.z&&null!=e.basemapTerrain&&null!=e.elevationProvider){const r=b(e.elevationProvider,t);s(r)&&e.renderCoordsHelper.setAltitude(n,r)}}else m(n,t||e.state.camera.center);return n}function oe(e,t,n,r,i,o,a){const s=r&&r instanceof h?r:null;if(Me(a))return re(e,r,a.signal).then((r=>{ae(e,t,n,s,r,i,o,a)}),(e=>a.resolver.reject(e))),null;const l=ie(e,r);return ae(e,t,n,s,l,i,o,a)}function ae(e,t,n,r,i,a,s,l){if(o(r)){const t=e.renderSpatialReference;if(r=x(i,t,X(e)),o(r))return null}a=Math.max(a,e.state.constraints.minimumPoiDistance);const c=fe(e,t,n,i,a,s),f=(0,K(e).eyeForCenterWithHeadingTilt)(i,a,c.heading,c.tilt);if(s===W.ADJUST&&"global"===e.viewingMode&&n>0){const o=()=>{const o=de(e,i,a,pe(e,a,n,i));return s=n-o<1?W.LOCKED:W.ADJUST,ae(e,t,o,r,i,a,s,l)},c=e.map.ground.navigationConstraint;if(!c||"stay-above"===c.type){if(te(e,f.eye))return o();if(Me(l))return ne(e,f.eye,l.signal).then((e=>e?o():(l.resolver.resolve({eye:f.eye,up:f.up,center:p(i),heading:f.heading,tilt:f.tilt}),null))),null}}const u=!l||Me(l)?{center:d(),eye:d(),up:d(),tilt:0,heading:0}:l;return u.eye=f.eye,u.up=f.up,u.center=p(i),u.heading=f.heading,u.tilt=f.tilt,Me(l)&&l.resolver.resolve(u),u}function se(e,t,n,r,i,s=null){let l,c,f;if(e.state.isGlobal){if(!P(t.spatialReference,j.Global))return Me(s)&&s.resolver.reject(),null;const e=new h(t.xmin,t.ymin,t.spatialReference),n=new h(t.xmax,t.ymax,t.spatialReference),r=t.spatialReference.isGeographic?F:J;l=new h({x:r.center(e.x,n.x),y:(n.y+e.y)/2,z:null!=t.zmax&&null!=t.zmin?(t.zmax+t.zmin)/2:void 0,spatialReference:t.spatialReference});const i=v(t.spatialReference),o=U(l,e,n);c=o.lon,f=o.lat,r.diff(e.x,n.x)>r.range/2&&(c+=i.halfCircumference),c=Math.min(c,i.halfCircumference),f=Math.min(f,i.halfCircumference)}else{const n=a(e.renderSpatialReference,t.spatialReference);n.equals(t.spatialReference)||(t=R(t,n)),c=t.xmax-t.xmin,f=t.ymax-t.ymin;const r=null!=t.zmax&&null!=t.zmin?(t.zmax+t.zmin)/2:void 0;l=new h({x:t.xmin+.5*c,y:t.ymin+.5*f,z:r,spatialReference:n})}const u=null!=t.zmax&&null!=t.zmin?t.zmax-t.zmin:0,m=e.state.camera,p=1/Math.tan(m.fovX/2),d=1/Math.tan(m.fovY/2),g=1/Math.tan(m.fov/2),y=Math.max(.5*c*p,.5*f*d,.5*u*g)/L;if(Me(s)){const t=new Re(s.signal);return oe(e,n,r,l,y,i,t),void t.resolver.promise.then((t=>{const n=he(e,t,e.camera.fov);if(!o(n))return s.resolver.resolve(n);s.resolver.reject()}),(e=>s.resolver.reject(e)))}const x=oe(e,n,r,l,y,i);return he(e,x,e.camera.fov,s)}function le(e,t,n){const r=e.renderSpatialReference,i=x(n,r,X(e));if(o(i))return null;const a=Math.tan(t.fovX/2),s=Math.tan(t.fovY/2),l=u(t.eye,n),c=2*l*a*L,f=2*l*s*L;return"global"===e.viewingMode?z(e,i,c,f):S(e,i,c,f)}function ce(e,t,n){const r=e.pointsOfInterest.centerOnSurfaceFrequent.distance;if(Math.log(n/r)/Math.LN2>G)return!0;const i=e.renderSpatialReference,a=X(e),s=x(t,i,a),l=x(e.pointsOfInterest.centerOnSurfaceFrequent.renderLocation,i,a);if(o(s)||o(l))return!1;const c=Math.tan(.5*e.state.camera.fov)*r;return l.distance(s)/c>E}function fe(e,t,n,r,i,o){let a=0;return o===W.ADJUST&&ce(e,r,i)?(t=0,a=me(e,i,n,r)):a=ve(e,r,i,n),a=e.state.constraints.clampTilt(i,a),{heading:t,tilt:n=de(e,r,i,a)}}const ue=.7;function me(e,t,n,r){const i=ve(e,r,t,n);if(!e.state.constraints.tilt)return i;const o=e.state.constraints.tilt(t);o.max=Math.min(o.max,.5*Math.PI);const a=o.min*(1-ue)+o.max*ue;return Math.min(i,a)}function pe(e,t,n,r){let i=ve(e,r,t,n);if(!e.state.constraints.tilt)return i;const o=e.state.constraints.tilt(t);return i=Math.min(i,.5*Math.PI),o.min*(1-ue)+i*ue}function de(e,t,n,r){return K(e).lookAtTiltToEyeTilt(r,t,n)}function ve(e,t,n,r){return K(e).eyeTiltToLookAtTilt(r,t,n)}function he(t,n,r,i){if(o(n))return null;const a=t.renderSpatialReference,l=x(n.eye,a,X(t));return o(l)?null:s(i)?(i.position=l,i.heading=n.heading,i.tilt=n.tilt,i.fov=r,i):new e(l,n.heading,n.tilt,r)}function ge(e,t){const n=e.basemapTerrain?.tilingScheme;if(n)return n.levelAtScale(t);A.error("#scaleToZoom()","Cannot compute zoom from scale without a tiling scheme")}function ye(e,t){const n=e.basemapTerrain?.tilingScheme;if(n)return n.scaleAtLevel(t);A.error("#zoomToScale()","Cannot compute scale from zoom without a tiling scheme")}function xe(e,t){return y(t.center,e.renderSpatialReference,k,M.WGS84),Q(e,t.distance,k[1])}class Re{constructor(e){this.signal=e,this.resolver=l()}}function Me(e){return e&&"resolver"in e}export{Re as AsyncContext,W as OrientationMode,xe as computeScale,ee as directionToHeadingTilt,Q as distanceToScale,N as externalToInternal,_ as fromCenterDistance,$ as fromCenterScale,se as fromExtent,oe as getObserverForPointAtDistance,Y as headingTiltToDirectionUp,Z as internalToExternal,he as observerToCamera,B as scaleToDistance,ge as scaleToZoom,le as toExtent,ye as zoomToScale};