/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{extentIntersectsExtent as e,getFeatureExtentIntersector as t}from"./intersectsBase.js";export{extentIntersectsMultipoint,extentIntersectsPoint,extentIntersectsPolygon,extentIntersectsPolyline,extentIntersectsRings,isSelfIntersecting,segmentIntersects}from"./intersectsBase.js";function s(s){return"mesh"===s?e:t(s)}export{e as extentIntersectsExtent,s as getExtentIntersector,t as getFeatureExtentIntersector};