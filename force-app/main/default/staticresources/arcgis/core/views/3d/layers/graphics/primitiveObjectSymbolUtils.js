/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../../core/has.js";import{cgToGIS as e,createDiamondGeometry as n,createTetrahedronGeometry as s,createCylinderGeometry as a,createConeGeometry as c,createBoxGeometry as i,createPolySphereGeometry as t}from"../../webgl-engine/lib/GeometryUtil.js";import{LodComponentResources as r}from"../../webgl-engine/lib/lodRendering/LodResources.js";function o(e){switch(e){case"sphere":case"cube":case"diamond":case"cylinder":case"cone":case"inverted-cone":case"tetrahedron":return!0}return!1}function u(o,u){const S=(n,s,a=!1)=>({levels:n.map((n=>{const c=s(n.tesselation);return a&&e(c),{components:[new r(c)],faceCount:c.indexCount/3,minScreenSpaceRadius:n.minScreenSpaceRadius}}))});switch(o){case"sphere":return S([{tesselation:0,minScreenSpaceRadius:0},{tesselation:1,minScreenSpaceRadius:8},{tesselation:2,minScreenSpaceRadius:16},{tesselation:3,minScreenSpaceRadius:50},{tesselation:4,minScreenSpaceRadius:250}],(e=>t(u,.5,e,!0)));case"cube":return S([{tesselation:0,minScreenSpaceRadius:0}],(()=>i(u,1)));case"cone":return S(d,(e=>c(u,1,.5,e,!1)),!0);case"inverted-cone":return S(d,(e=>c(u,1,.5,e,!0)),!0);case"cylinder":return S(d,(e=>a(u,1,.5,e,[0,0,1],[0,0,.5])));case"tetrahedron":return S([{tesselation:0,minScreenSpaceRadius:0}],(()=>s(u,1)),!0);case"diamond":return S([{tesselation:0,minScreenSpaceRadius:0}],(()=>n(u,1)),!0);default:return}}const d=[{tesselation:6,minScreenSpaceRadius:0},{tesselation:18,minScreenSpaceRadius:7},{tesselation:64,minScreenSpaceRadius:65}];export{o as isValidPrimitive,u as primitiveLodResources};