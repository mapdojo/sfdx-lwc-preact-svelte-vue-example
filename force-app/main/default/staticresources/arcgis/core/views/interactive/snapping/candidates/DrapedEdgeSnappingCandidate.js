/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{DrapedLineConstraint as t}from"../SnappingConstraint.js";import{LineSegmentHintType as n}from"../snappingUtils.js";import{FeatureSnappingCandidate as i}from"./FeatureSnappingCandidate.js";import{LineSnappingHint as r}from"../hints/LineSnappingHint.js";class s extends i{constructor(n){super({...n,isDraped:!0,constraint:new t(n.edgeStart,n.edgeEnd,n.getGroundElevation)})}get hints(){return[new r(n.REFERENCE,this.constraint.start,this.constraint.end,this.isDraped,this.domain)]}}export{s as DrapedEdgeSnappingCandidate};