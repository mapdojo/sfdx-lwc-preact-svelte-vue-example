/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{z as s,i as o,a as r}from"../../../../../chunks/vec3.js";import{c,g as n}from"../../../../../chunks/sphere.js";const t=1e3;function a(t,a,e){const i=c(),m=n(i);return s(m,m,t,.5),s(m,m,a,.5),i[3]=o(m,t),r(m,m,e),i}export{t as MAX_CANDIDATE_COUNT,a as boundsFromEdge};