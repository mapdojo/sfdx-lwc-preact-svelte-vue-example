/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{IntersectorType as t}from"../IntersectorInterfaces.js";import{Graphic3DTarget as r}from"../IntersectorTarget.js";import{isValidIntersectorResult as e}from"../intersectorUtils.js";class s extends r{constructor(t,r,e,s,i,o){super(t,r),this.layerUid=t,this.graphicUid=r,this.geometryId=e,this.triangleNr=s,this.baseBoundingSphere=i,this.numLodLevels=o}}function i(r){return e(r)&&r.intersector===t.LOD&&!!r.target}export{s as LodTarget,i as isLodIntersectorResult};