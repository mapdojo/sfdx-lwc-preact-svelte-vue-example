/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"../../../../../Color.js";import a from"../../../../../core/Evented.js";import r from"../../../../../core/Handles.js";import{handlesGroup as e}from"../../../../../core/handleUtils.js";import{destroyMaybe as i,unwrap as o,isNone as s}from"../../../../../core/maybe.js";import{f as n,b as l,m as p,d as u,E as h}from"../../../../../chunks/mat4.js";import{c as m}from"../../../../../chunks/mat4f64.js";import{s as c}from"../../../../../chunks/vec3.js";import{f}from"../../../../../chunks/vec3f64.js";import{sv3d as d,sm4d as _}from"../../../../../geometry/support/vectorStacks.js";import{getGraphicEffectiveElevationInfo as g}from"../../../../../support/elevationInfoUtils.js";import{Manipulator3D as M}from"../../Manipulator3D.js";import{RenderObject as w}from"../../RenderObject.js";import{screenToMapXYAtLocation as j}from"../dragEventPipeline3D.js";import{ManipulatorType as v}from"../ManipulatorType.js";import{colors as A}from"../settings.js";import{DISC_RADIUS as b,DISC_TRANSLATE_ARROW_OFFSET as y,DISC_HEIGHT as I,DISC_TRANSLATE_ARROW_SIZE as T}from"./config.js";import{Manipulation as D}from"./Manipulation.js";import{createGraphicMoveDragPipeline as E}from"./moveUtils.js";import{CullFaceOptions as S}from"../../../webgl-engine/lib/basicInterfaces.js";import{createExtrudedTriangle as x,transformInPlace as P}from"../../../webgl-engine/lib/GeometryUtil.js";import{RenderOccludedFlag as k}from"../../../webgl-engine/lib/Material.js";import{ColorMaterial as R}from"../../../webgl-engine/materials/ColorMaterial.js";import{createManipulatorDragEventPipeline as U,dragAtLocation as O,constrainToMapAxis as L,addScreenDelta as q}from"../../../../interactive/dragEventPipeline.js";import{ManipulatorStateFlags as G}from"../../../../interactive/interfaces.js";class B extends D{constructor(t){super(),this._handles=new r,this._arrowManipulatorInfos=new Array,this._opaqueMaterial=this._createMaterial(),this._transparentMaterial=this._createMaterial(.5),this._angle=0,this._scale=1,this._radius=b,this._updateAfterDrag=!1,this.events=new a,this._tool=t.tool,this._view=t.view,null!=t.radius&&(this._radius=t.radius),this._createManipulators(),this.forEachManipulator((t=>this._tool.manipulators.add(t)))}set orthogonalAvailable(t){this._arrowManipulatorInfos[1].manipulator.available=t,this._arrowManipulatorInfos[3].manipulator.available=t}destroy(){this._handles=i(this._handles),this.forEachManipulator((t=>{this._tool.manipulators.remove(t),t.destroy()})),this._tool=null,this._view=null,this._arrowManipulatorInfos.length=0}forEachManipulator(t){for(const{manipulator:a}of this._arrowManipulatorInfos)t(a,v.TRANSLATE_XY)}createGraphicDragPipeline(t,a,r){const e=a.graphic,i=g(e),s=o(e.geometry).spatialReference;return E(a,r,(a=>this.createDragPipeline(((r,e,i,o,s)=>(({steps:e,cancel:i}=t(r,e,i,o,s)),a(r,e,i))),i,s,e)),this._view.state.viewingMode)}createDragPipeline(t,a,r,i){return e(this._arrowManipulatorInfos.map((({manipulator:e},o)=>U(e,((e,s,n,l,p)=>{const u=s.next((t=>({...t,manipulatorType:v.TRANSLATE_XY}))).next(O(this._view,e.elevationAlignedLocation)).next(j(this._view,e.elevationAlignedLocation,a,r,i)).next(L(e.location,this.angle+(o+1)*Math.PI*.5)).next(q());t(e,u,n,l,p)})))))}get angle(){return this._angle}set angle(t){this._angle=t,this.dragging?this._updateAfterDrag=!0:this._updateManipulatorTransform()}get displayScale(){return this._scale}set displayScale(t){this._scale=t,this._updateManipulatorTransform()}get radius(){return this._radius}set radius(t){this._radius!==t&&(this._radius=t,this._updateManipulators())}_updateManipulators(){for(let t=0;t<this._arrowManipulatorInfos.length;t++)this._updateArrowManipulator(this._arrowManipulatorInfos[t],t);this._updateManipulatorTransform()}_updateArrowManipulator({manipulator:t,transform:a},r){const e=this._radius/b,i=T*e,o=i*Math.sqrt(3)/2,s=x(this._opaqueMaterial,o,i/2,i/2,I);P(s,n(_.get(),c(d.get(),0,-o/3,0))),t.renderObjects=[new w(s,G.Focused),new w(s.instantiate({material:this._transparentMaterial}),G.Unfocused)],t.radius=o/3*2*1.2;const u=l(_.get(),r*Math.PI/2),h=n(_.get(),c(d.get(),0,y*e,0));p(a,u,h)}_createManipulators(){for(let t=0;t<4;t++){const a=this._createArrowManipulator(t);this._arrowManipulatorInfos.push(a)}this._updateManipulatorTransform()}_updateManipulatorTransform(){const t=this.angle,a=u(_.get(),t,f(0,0,1));if(s(a))return;const r=h(_.get(),c(d.get(),this.displayScale,this.displayScale,this.displayScale)),e=p(_.get(),r,a);for(const i of this._arrowManipulatorInfos){const t=p(_.get(),e,i.transform);i.manipulator.modelTransform=t}}_createArrowManipulator(t){const a=new M({view:this._view,autoScaleRenderObjects:!1,worldOriented:!0,focusMultiplier:1,touchMultiplier:1,collisionType:{type:"disc",direction:f(0,0,1)}}),r={manipulator:a,transform:m()};return this._updateArrowManipulator(r,t),this._handles.add(a.events.on("drag",(t=>{this._updateAfterDrag&&"end"===t.action&&!this.dragging&&(this._updateManipulatorTransform(),this._updateAfterDrag=!1)}))),r}_createMaterial(a=1){const r=t.toUnitRGBA(A.main);return r[3]*=a,new R({color:r,transparent:1!==a,cullFace:S.Back,renderOccluded:k.Transparent})}get test(){return{arrowManipulators:this._arrowManipulatorInfos.map((({manipulator:t})=>t))}}}export{B as MoveXYAxisManipulation};