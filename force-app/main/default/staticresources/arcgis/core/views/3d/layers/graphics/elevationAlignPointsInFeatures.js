/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../geometry.js";import{isNone as e}from"../../../../core/maybe.js";import{throwIfAborted as o}from"../../../../core/promiseUtils.js";import{makeDehydratedPoint as t}from"../../../../layers/graphics/dehydratedFeatures.js";import{getGeometryEffectiveElevationInfo as r}from"../../../../support/elevationInfoUtils.js";import{evaluateElevationInfoAtPoint as s,SampleElevationInfo as n}from"./elevationAlignmentUtils.js";import{ElevationContext as i}from"./ElevationContext.js";import{extractExpressionInfo as a,createContext as p}from"./featureExpressionInfoUtils.js";import f from"../../../../geometry/SpatialReference.js";async function m(t,n,i,f,m){const{elevationProvider:j,renderCoordsHelper:u,spatialReference:y}=t,{elevationInfo:v}=n,I=a(v,!0),g=await p(I,y,m);o(m);const x=[],h=new Set,w=new Set;for(const{objectId:o,points:a}of f){const p=i(o);if(e(p)){for(const e of a)x.push(e[2]);h.add(o);continue}p.isDraped&&w.add(o);const f=p.graphic.geometry;c.setFromElevationInfo(r(f,v)),c.updateFeatureExpressionInfoContext(g,p.graphic,n),l.spatialReference=t.spatialReference;for(const{x:e,y:o,z:t}of a)l.x=e,l.y=o,l.z=t??0,s(l,j,c,u,d),x.push(d.z)}return{elevations:x,drapedObjectIds:w,failedObjectIds:h}}const c=new i,l=t(0,0,0,f.WGS84),d=new n;export{m as elevationAlignPointsInFeatures};