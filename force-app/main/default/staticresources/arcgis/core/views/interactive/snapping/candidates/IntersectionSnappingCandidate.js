/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{IntersectionConstraint as t}from"../SnappingConstraint.js";import{SnappingDomain as i}from"../SnappingDomain.js";import{SnappingCandidate as n}from"./SnappingCandidate.js";import{IntersectionSnappingHint as s}from"../hints/IntersectionSnappingHint.js";class r extends n{constructor(n,s,r,o){super(n,new t(n,s.constraint,r.constraint),o,i.ALL),this.first=s,this.second=r}get hints(){return this.first.targetPoint=this.targetPoint,this.second.targetPoint=this.targetPoint,[...this.first.hints,...this.second.hints,new s(this.targetPoint,this.isDraped,this.domain)]}}export{r as IntersectionSnappingCandidate};