/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../../../chunks/tslib.es6.js";import{createScreenPointArray as e}from"../../../../../core/screenUtils.js";import{property as s}from"../../../../../core/accessorSupport/decorators/property.js";import"../../../../../core/accessorSupport/ensureType.js";import"../../../../../core/arrayUtils.js";import{subclass as r}from"../../../../../core/accessorSupport/decorators/subclass.js";import{a as o,c as i}from"../../../../../chunks/vec3f64.js";import{create as n,fromPoints as c}from"../../../../../geometry/support/axisAngle.js";import{c as p}from"../../../../../chunks/sphere.js";import{applyAll as m}from"../../../camera/constraintUtils.js";import{InteractionType as a}from"../../../camera/constraintUtils/InteractionType.js";import{MomentumController as h}from"./MomentumController.js";import{applyZoomOnSphere as l,sphereOrPlanePointFromScreenPoint as u,applyRotation as y}from"../../utils/navigationUtils.js";let _=class extends h{set screenCenter(t){this._set("screenCenter",e(t[0],t[1]))}set sceneCenter(t){this._set("sceneCenter",o(t))}constructor(t){super(t),this.interactionType=a.ZOOM,this.radius=0,this._tmpSceneCenter=i(),this._tmpZoomAxisAngle=n(),this._sphere=p()}initialize(){this._sphere[3]=this.radius}momentumStep(t,e){const s=this.momentum.valueDelta(0,t);l(this._sphere,e,s),this.constraintOptions.interactionType=a.ZOOM,m(this.view,e,this.constraintOptions),u(this._sphere,e,this.screenCenter,this._tmpSceneCenter),c(this.sceneCenter,this._tmpSceneCenter,this._tmpZoomAxisAngle),y(e,this._sphere,this._tmpZoomAxisAngle),this.constraintOptions.interactionType=a.PAN}};t([s({constructOnly:!0})],_.prototype,"momentum",void 0),t([s({constructOnly:!0})],_.prototype,"screenCenter",null),t([s({constructOnly:!0})],_.prototype,"sceneCenter",null),t([s({constructOnly:!0})],_.prototype,"radius",void 0),_=t([r("esri.views.3d.state.controllers.momentum.ZoomSphericalMomentumController")],_);export{_ as ZoomSphericalMomentumController};