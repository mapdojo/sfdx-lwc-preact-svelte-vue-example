/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class r{get hovering(){return this.someManipulator((r=>r.hovering))}get grabbing(){return this.someManipulator((r=>r.grabbing))}get dragging(){return this.someManipulator((r=>r.dragging))}hasManipulator(r){return this.someManipulator((t=>t===r))}someManipulator(r){let t=!1;return this.forEachManipulator((a=>{!t&&r(a)&&(t=!0)})),t}}var t;!function(r){r[r.TRANSLATE_XY=0]="TRANSLATE_XY",r[r.SCALE=1]="SCALE",r[r.ROTATE=2]="ROTATE"}(t||(t={}));export{r as Manipulation,t as ManipulatorType};