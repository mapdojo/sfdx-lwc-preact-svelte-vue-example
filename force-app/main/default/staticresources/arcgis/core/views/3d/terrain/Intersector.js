/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{IntersectorType as e}from"../webgl-engine/lib/IntersectorInterfaces.js";import{Graphic3DTarget as r}from"../webgl-engine/lib/IntersectorTarget.js";import{isValidIntersectorResult as t}from"../webgl-engine/lib/intersectorUtils.js";function n(r){return t(r)&&r.intersector===e.TERRAIN&&!!r.target}class i extends r{constructor(e,r,t){super(e,r),this.triangleNr=t}}function o(r){return t(r)&&r.intersector===e.OVERLAY&&!!r.target}export{i as OverlayTarget,o as isOverlayIntersectorResult,n as isTerrainIntersectorResult};