/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e,unwrapOr as r}from"../../../core/maybe.js";import{c as t,d as n,g as o,b as i,a as s,e as a,l as c}from"../../../chunks/vec3.js";import{c as l}from"../../../chunks/vec3f64.js";import{getReferenceEllipsoid as d}from"../../../geometry/ellipsoidUtils.js";import{containsPoint as u}from"../../../geometry/support/aaBoundingRect.js";import{newIntersector as f}from"../webgl-engine/lib/Intersector.js";function g(r,t,n,o){return e(r.renderCoordsHelper.fromRenderCoords(t.eye,j,o))&&u(n,j)}function m(e,t){return e.elevationProvider?r(e.elevationProvider.getElevation(t[0],t[1],t[2],e.renderCoordsHelper.spatialReference,"ground"),0):0}function p(e,r,a,c){const l=e.state.camera.clone();r&&a&&c&&(l.eye=r,l.center=a,l.up=c),v(e,l.ray,w)||t(w,l.center);const d=e.state.constraints,u=d.minimumPoiDistance;if(n(l.eye,w)<u){const r=d.collision.enabled;t(H,l.viewForward),o(H,H,u),r?l.eye=i(j,w,H):s(w,l.eye,H);const n=e.renderCoordsHelper,a=n.getAltitude(l.eye),c=d.collision.elevationMargin;r&&a<c&&(i(H,w,l.eye),l.eye=n.setAltitude(j,c,l.eye),s(w,l.eye,H))}return l.center=w,l}function y(e,r,t){if(!e.state.isGlobal||!e.stateManager.constraintsManager)return!1;const o=m(e,r),i=e.stateManager.constraintsManager.nearFarHeuristic,{far:s}=i.compute(r,t,e.renderDataExtent,o,C),a=s*s;return n(r,t)>a}function v(e,r,t){let n=M[e.viewingMode];n||(n=f(e.state.viewingMode),n.options.backfacesTerrain=!e.state.isGlobal,n.options.invisibleTerrain=!0,M[e.viewingMode]=n);const{isGlobal:o}=e.state;return!(!e.sceneIntersectionHelper.intersectRay(r,n,t)||y(e,r.origin,t))||(!(!e.renderCoordsHelper.intersectManifold(r,0,t)||y(e,r.origin,t))||!!o&&b(r,t,d(e.spatialReference).radius))}function b(e,r,t){const n=a(e.origin,e.origin)-t*t,i=n>0?Math.sqrt(n)/3:1;return o(r,e.direction,i/c(e.direction)),s(r,r,e.origin),!0}const M={},j=l(),w=l(),H=l(),C={near:0,far:0};export{p as cameraOnContentAlongViewDirection,g as eyeWithinExtent,m as surfaceElevationBelowRenderLocation};