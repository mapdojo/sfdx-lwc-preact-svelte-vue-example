/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{canProjectWithoutEngine as o}from"../../geometry/projection.js";import{getSphericalPCPF as e,SphericalECEFSpatialReference as r,WGS84ECEFSpatialReference as t}from"../../geometry/spatialReferenceEllipsoidUtils.js";function i(i){const m=e(i),n=m===r?t:m;return o(i,n)?n:i}export{i as computeEuclideanMeasurementSR};