/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{disposeMaybe as t}from"../../../../core/maybe.js";import{t as s}from"../../../../chunks/common.js";import{j as i,d as r,r as e,h as o}from"../../../../chunks/mat3.js";import{c as a}from"../../../../chunks/mat3f32.js";import{f as n}from"../../../../chunks/vec2f64.js";import{s as h}from"../../../../chunks/vec3.js";import{c as m}from"../../../../chunks/vec3f64.js";import c from"./VertexStream.js";import{stencil as d}from"./shaders/StencilPrograms.js";import{StencilOperation as p,CompareFunction as _}from"../../../webgl/enums.js";import{createProgram as l}from"../../../webgl/ProgramTemplate.js";const u=n(-.5,-.5);class f{constructor(){this._centerNdc=m(),this._pxToNdc=m(),this._worldDimensionsPx=m(),this._mat3=a(),this._initialized=!1}dispose(){this._program=t(this._program),this._quad=t(this._quad)}render(t,s){const{context:i}=t;return!!this._updateGeometry(t,s)&&(this._initialized||this._initialize(i),i.setDepthWriteEnabled(!1),i.setDepthTestEnabled(!1),i.setColorMask(!1,!1,!1,!1),i.setBlendingEnabled(!1),i.setStencilOp(p.KEEP,p.KEEP,p.REPLACE),i.setStencilFunction(_.ALWAYS,1,255),i.setStencilTestEnabled(!0),i.useProgram(this._program),this._program.setUniformMatrix3fv("u_worldExtent",this._mat3),this._quad.draw(),this._quad.unbind(),!0)}_initialize(t){if(this._initialized)return;const s=l(t,d);s&&(this._program=s,this._quad=new c(t,[0,0,1,0,0,1,1,1]),this._initialized=!0)}_updateGeometry(t,a){const{state:n,pixelRatio:m}=t,{size:c,rotation:d}=n,p=Math.round(c[0]*m),_=Math.round(c[1]*m);if(!n.spatialReference.isWrappable)return!1;const l=s(d),f=Math.abs(Math.cos(l)),b=Math.abs(Math.sin(l)),g=Math.round(p*f+_*b),j=Math.round(n.worldScreenWidth);if(g<=j)return!1;const x=p*b+_*f,E=j*m,M=(a.left-a.right)*m/p,w=(a.bottom-a.top)*m/_;h(this._worldDimensionsPx,E,x,1),h(this._pxToNdc,2/p,-2/_,1),h(this._centerNdc,M,w,1);const P=this._mat3;return i(P,this._centerNdc),r(P,P,this._pxToNdc),0!==d&&e(P,P,l),r(P,P,this._worldDimensionsPx),o(P,P,u),!0}}export{f as WorldExtentClipRenderer};