/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function t(t,e,r){return{objectId:t,target:e,distance:r,type:"vertex"}}function e(t,e,r,n,d,a=!1){return{objectId:t,target:e,distance:r,type:"edge",start:n,end:d,draped:a}}export{e as makeEdgeCandidate,t as makeVertexCandidate};