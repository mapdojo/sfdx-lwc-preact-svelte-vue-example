/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(){this.setIdentity()}getAngle(){return(null==this.rz||0===this.rz&&1!==this.rzCos&&0!==this.rzSin)&&(this.rz=Math.atan2(this.rzSin,this.rzCos)),this.rz}setIdentity(){this.tx=0,this.ty=0,this.tz=0,this.s=1,this.rx=0,this.ry=0,this.rz=0,this.rzCos=1,this.rzSin=0}setTranslate(t,s){this.tx=t,this.ty=s}setTranslateZ(t){this.tz=t}setRotateCS(t,s){this.rz=void 0,this.rzCos=t,this.rzSin=s}setRotate(t){this.rz=t,this.rzCos=void 0,this.rzSin=void 0}setRotateY(t){this.ry=t}setScale(t){this.s=t}setMeasure(t){this.m=t}}class s{next(){return null}}export{s as EmptyPlacementCursor,t as Placement};