/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Manipulator3D as a}from"../../Manipulator3D.js";class t{constructor(){this._available=!0}set location(a){this._forEachManipulator3D((t=>t.location=a))}set elevationAlignedLocation(a){this._forEachManipulator3D((t=>t.elevationAlignedLocation=a))}set elevationInfo(a){this._forEachManipulator3D((t=>t.elevationInfo=a))}get renderLocation(){let a;return this._forEachManipulator3D((t=>{a||(a=t.renderLocation)})),a}get available(){return this._available}set available(a){this._available=a,this._forEachManipulator3D((t=>t.available=a))}get hovering(){return this.someManipulator((a=>a.hovering))}get grabbing(){return this.someManipulator((a=>a.grabbing))}get dragging(){return this.someManipulator((a=>a.dragging))}hasManipulator(a){return this.someManipulator((t=>t===a))}someManipulator(a){let t=!1;return this.forEachManipulator((i=>{!t&&a(i)&&(t=!0)})),t}_forEachManipulator3D(t){this.forEachManipulator(((i,o)=>{i instanceof a&&t(i,o)}))}}export{t as Manipulation};