/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{SnappingDomain as t}from"../SnappingDomain.js";import{SnappingCandidate as o}from"./SnappingCandidate.js";class n extends o{constructor({targetPoint:o,objectId:n,constraint:r,isDraped:i}){super(o,r,i,t.FEATURE),this.objectId=n}}export{n as FeatureSnappingCandidate};