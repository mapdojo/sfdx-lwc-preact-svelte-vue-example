/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as t}from"../../../../core/maybe.js";import{Manipulator3D as i}from"../Manipulator3D.js";import{GrabbingState as e}from"./GrabbingState.js";import{ManipulatorType as r}from"./ManipulatorType.js";class a{constructor(){this.grabbingState=e.NONE,this.zManipulator=null,this.firstSelected=null,this.numSelected=0,this.firstGrabbedXY=null}update(a){this.grabbingState=e.NONE,this.zManipulator=null,this.numSelected=0,this.firstSelected=null,this.firstGrabbedXY=null,a.forEachManipulator(((a,s)=>{if(s===r.TRANSLATE_Z&&(this.zManipulator=a),a instanceof i&&(a.selected&&(0===this.numSelected&&(this.firstSelected=a),this.numSelected++),t(this.firstGrabbedXY)&&a.grabbing&&s===r.TRANSLATE_XY&&(this.firstGrabbedXY=a)),a.grabbing)switch(this.grabbingState|=e.ANY,s){case r.TRANSLATE_Z:this.grabbingState|=e.Z;break;case r.TRANSLATE_XY:this.grabbingState|=e.XY}}))}}export{a as ManipulatorState};