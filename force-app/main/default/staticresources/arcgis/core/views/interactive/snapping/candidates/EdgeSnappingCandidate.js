/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{LineConstraint as t}from"../SnappingConstraint.js";import{LineSegmentHintType as n}from"../snappingUtils.js";import{FeatureSnappingCandidate as i}from"./FeatureSnappingCandidate.js";import{LineSnappingHint as s}from"../hints/LineSnappingHint.js";class r extends i{constructor(n){super({...n,constraint:new t(n.edgeStart,n.edgeEnd)})}get hints(){return[new s(n.REFERENCE,this.constraint.start,this.constraint.end,this.isDraped,this.domain)]}}export{r as EdgeSnappingCandidate};