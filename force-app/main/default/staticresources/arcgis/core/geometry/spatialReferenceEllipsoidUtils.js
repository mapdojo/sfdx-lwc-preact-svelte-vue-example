/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{SphericalECEFSpatialReferenceLike as e,SphericalPCPFMarsLike as r,SphericalPCPFMoonLike as t,WGS84ECEFSpatialReferenceLike as o}from"./ellipsoidUtils.js";import i from"./SpatialReference.js";import{isMars as n,equals as p,isMoon as s}from"./support/spatialReferenceUtils.js";const f=new i(e),l=new i(r),m=new i(t),a=new i(o);function c(e){return e&&(n(e)||p(e,l))?l:e&&(s(e)||p(e,m))?m:f}export{f as SphericalECEFSpatialReference,l as SphericalPCPFMars,m as SphericalPCPFMoon,a as WGS84ECEFSpatialReference,c as getSphericalPCPF};