/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ObjectStack as T}from"../../core/ObjectStack.js";import{m as _,a as O}from"../../chunks/mat4.js";import{s as R}from"../../chunks/vec3.js";import{c as t}from"../../chunks/vec3f64.js";import{t as A}from"../../chunks/vec4.js";import{f as E}from"../../chunks/vec4f64.js";import{create as F,fromRay as r,fromLineSegmentAndDirection as n}from"./clipRay.js";import{create as o,copy as M,fromPoints as N,clipInfinite as c,signedDistance as f,clip as e}from"./plane.js";import{sm4d as B,sv4d as G}from"./vectorStacks.js";function H(T){return T?[o(T[0]),o(T[1]),o(T[2]),o(T[3]),o(T[4]),o(T[5])]:[o(),o(),o(),o(),o(),o()]}function I(){return[t(),t(),t(),t(),t(),t(),t(),t()]}function u(T,_){for(let O=0;O<v.NUM;O++)M(T[O],_[O])}function s(T,t,E,F=y){const r=_(B.get(),t,T);O(r,r);for(let _=0;_<h.NUM;++_){const T=A(G.get(),g[_],r);R(F[_],T[0]/T[3],T[1]/T[3],T[2]/T[3])}L(E,F)}function L(T,_){N(_[l.FAR_BOTTOM_LEFT],_[l.NEAR_BOTTOM_LEFT],_[l.NEAR_TOP_LEFT],T[U.LEFT]),N(_[l.NEAR_BOTTOM_RIGHT],_[l.FAR_BOTTOM_RIGHT],_[l.FAR_TOP_RIGHT],T[U.RIGHT]),N(_[l.FAR_BOTTOM_LEFT],_[l.FAR_BOTTOM_RIGHT],_[l.NEAR_BOTTOM_RIGHT],T[U.BOTTOM]),N(_[l.NEAR_TOP_LEFT],_[l.NEAR_TOP_RIGHT],_[l.FAR_TOP_RIGHT],T[U.TOP]),N(_[l.NEAR_BOTTOM_LEFT],_[l.NEAR_BOTTOM_RIGHT],_[l.NEAR_TOP_RIGHT],T[U.NEAR]),N(_[l.FAR_BOTTOM_RIGHT],_[l.FAR_BOTTOM_LEFT],_[l.FAR_TOP_LEFT],T[U.FAR])}function i(T,_){for(let O=0;O<v.NUM;O++){const R=T[O];if(R[0]*_[0]+R[1]*_[1]+R[2]*_[2]+R[3]>=_[3])return!1}return!0}function P(T,_){return j(T,r(_,b.get()))}function a(T,_){for(let O=0;O<v.NUM;O++){const R=T[O];if(!c(R,_))return!1}return!0}function m(T,_,O){return j(T,n(_,O,b.get()))}function p(T,_){for(let O=0;O<v.NUM;O++){if(f(T[O],_)>0)return!1}return!0}function j(T,_){for(let O=0;O<v.NUM;O++)if(!e(T[O],_))return!1;return!0}var U,l;!function(T){T[T.LEFT=0]="LEFT",T[T.RIGHT=1]="RIGHT",T[T.BOTTOM=2]="BOTTOM",T[T.TOP=3]="TOP",T[T.NEAR=4]="NEAR",T[T.FAR=5]="FAR"}(U||(U={})),function(T){T[T.NEAR_BOTTOM_LEFT=0]="NEAR_BOTTOM_LEFT",T[T.NEAR_BOTTOM_RIGHT=1]="NEAR_BOTTOM_RIGHT",T[T.NEAR_TOP_RIGHT=2]="NEAR_TOP_RIGHT",T[T.NEAR_TOP_LEFT=3]="NEAR_TOP_LEFT",T[T.FAR_BOTTOM_LEFT=4]="FAR_BOTTOM_LEFT",T[T.FAR_BOTTOM_RIGHT=5]="FAR_BOTTOM_RIGHT",T[T.FAR_TOP_RIGHT=6]="FAR_TOP_RIGHT",T[T.FAR_TOP_LEFT=7]="FAR_TOP_LEFT"}(l||(l={}));const k={bottom:[l.FAR_BOTTOM_RIGHT,l.NEAR_BOTTOM_RIGHT,l.NEAR_BOTTOM_LEFT,l.FAR_BOTTOM_LEFT],near:[l.NEAR_BOTTOM_LEFT,l.NEAR_BOTTOM_RIGHT,l.NEAR_TOP_RIGHT,l.NEAR_TOP_LEFT],far:[l.FAR_BOTTOM_RIGHT,l.FAR_BOTTOM_LEFT,l.FAR_TOP_LEFT,l.FAR_TOP_RIGHT],right:[l.NEAR_BOTTOM_RIGHT,l.FAR_BOTTOM_RIGHT,l.FAR_TOP_RIGHT,l.NEAR_TOP_RIGHT],left:[l.FAR_BOTTOM_LEFT,l.NEAR_BOTTOM_LEFT,l.NEAR_TOP_LEFT,l.FAR_TOP_LEFT],top:[l.FAR_TOP_LEFT,l.NEAR_TOP_LEFT,l.NEAR_TOP_RIGHT,l.FAR_TOP_RIGHT]};var v,h;!function(T){T[T.NUM=6]="NUM"}(v||(v={})),function(T){T[T.NUM=8]="NUM"}(h||(h={}));const g=[E(-1,-1,-1,1),E(1,-1,-1,1),E(1,1,-1,1),E(-1,1,-1,1),E(-1,-1,1,1),E(1,-1,1,1),E(1,1,1,1),E(-1,1,1,1)],b=new T(F),y=I();export{v as NumPlanes,h as NumPoints,U as PlaneIndex,l as PointIndex,L as computePlanes,u as copy,H as create,I as createPoints,s as fromMatrix,a as intersectClipRay,m as intersectsLineSegment,p as intersectsPoint,P as intersectsRay,i as intersectsSphere,k as planePointIndices};