/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as i}from"../../../../chunks/tslib.es6.js";import{property as t}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as e}from"../../../../core/accessorSupport/decorators/subclass.js";import{c as n}from"../../../../chunks/vec3f64.js";import s from"../../../ViewAnimation.js";import{Animation as o}from"../../animation/pointToPoint/Animation.js";import{AnimationController as r}from"./AnimationController.js";import{Camera as a}from"../../webgl-engine/lib/Camera.js";import{newIntersector as m}from"../../webgl-engine/lib/Intersector.js";import{EasingFunctions as c}from"../../../animation/easing.js";let h=class extends r{get intersectionHelper(){return this.view.sceneIntersectionHelper}constructor(i){super(i),this.mode="interaction",this._hasTarget=!1}initialize(){this.animation=new o(this.view.state.viewingMode),this.viewAnimation="interaction"===this.mode?null:new s}get isInteractive(){return"interaction"===this.mode}begin(i,t){this._hasTarget=!0;const e=this.animationSettings(t);p.copyFrom(this.view.state.camera);const n=m(this.view.state.viewingMode);this.intersectionHelper.intersectRay(p.ray,n,l)&&(p.center=l),this.animation.update(p,i,e),this.animation.finished&&this.finish()}finish(){this.animation.currentTime=this.animation.time,super.finish()}get steppingFinished(){return this._hasTarget&&this.animation.finished}stepController(i,t){this._hasTarget&&this.animation.step(i,t)}onControllerEnd(i){this._hasTarget&&(this.animation.cameraAt(this.animation.currentTime/this.animation.time,i),this.animation.currentTime=this.animation.time),super.onControllerEnd(i)}animationSettings(i={}){return{apex:{maximumDistance:this.view.state.constraints.clampAltitude(1/0)/6,ascensionFactor:void 0,descensionFactor:void 0},...i,easing:"string"==typeof i.easing?c[i.easing]:i.easing}}};i([t({constructOnly:!0})],h.prototype,"mode",void 0),i([t({readOnly:!0})],h.prototype,"isInteractive",null),h=i([e("esri.views.3d.state.controllers.PointToPointAnimationController")],h);const p=new a,l=n();export{h as PointToPointAnimationController};