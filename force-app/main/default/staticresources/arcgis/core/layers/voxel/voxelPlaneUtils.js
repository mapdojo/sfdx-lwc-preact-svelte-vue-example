/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{s,m as a}from"../../chunks/quat.js";import{a as t}from"../../chunks/quatf64.js";import{c as n,f as o}from"../../chunks/vec3f64.js";import{a as c,t as r}from"../../chunks/common.js";import{c as m,n as u,q as f}from"../../chunks/vec3.js";const h=n(),i=t(),p=t(),e=t(),j=o(0,0,1),k=o(0,1,0),q=o(1,0,0);function v(a){m(h,a),u(h,h);const n=Math.atan2(h[1],h[0]),o=s(t(),j,-n);f(h,h,o);const r=-1*Math.atan2(h[2],h[0]);return[c(n)+270,c(r)+90]}function M(t,n){return s(p,j,r(t-270)),s(e,k,r(n-90)),a(i,p,e),m(h,q),f(h,h,i),u(h,h),[h[0],h[1],h[2]]}export{M as computeNormalFromOrientationTilt,v as computeOrientationTiltFromNormal};