/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{PathTransformationCursor as t}from"../CIMCursor.js";import{GeometryWalker as i,DashPattern as s,Pos as e,EndType as n}from"../GeometryWalker.js";class a{static local(){return null===a.instance&&(a.instance=new a),a.instance}execute(t,i,s,e,n){return new r(t,i,s)}}a.instance=null;class r extends t{constructor(t,e,n){super(t,!0,!0),this._walker=new i,this._walker.updateTolerance(n),this._angleToLine=void 0===e.angleToLine||e.angleToLine,this._offset=void 0!==e.offset?e.offset*n:0,this._beginGap=void 0!==e.beginPosition?e.beginPosition*n:0,this._endGap=void 0!==e.endPosition?e.endPosition*n:0,this._flipFirst=void 0===e.flipFirst||e.flipFirst,this._pattern=new s,this._pattern.init(e.positionArray,!1,!1),this._subPathLen=0,this._posCount=this._pattern.size(),this._isFirst=!0,this._prevPos=0}processPath(t){if(this._pattern.isEmpty())return null;let i;if(this.iteratePath){const t=this._pattern.nextValue()*this._subPathLen,s=this._beginGap+t;i=s-this._prevPos,this._prevPos=s}else{if(this._posCount=this._pattern.size(),this._isFirst=!0,this._prevPos=0,this._subPathLen=this._walker.calculatePathLength(t)-this._beginGap-this._endGap,this._subPathLen<0)return this.iteratePath=!1,null;if(!this._walker.init(t,this._pattern,!1))return null;this._pattern.reset();const s=this._pattern.nextValue()*this._subPathLen,e=this._beginGap+s;i=e-this._prevPos,this._prevPos=e,this.iteratePath=!0}const s=new e;if(!this._walker.nextPointAndAngle(i,s,n.END))return this.iteratePath=!1,null;this.internalPlacement.setTranslate(s.pt[0]-this._offset*s.sa,s.pt[1]+this._offset*s.ca);const a=this._isFirst&&this._flipFirst;let r,h;return this._angleToLine?(r=s.ca,h=s.sa):(r=1,h=0),a&&(r=-r,h=-h),this.internalPlacement.setRotateCS(r,h),this._isFirst=!1,this._posCount--,0===this._posCount&&(this.iteratePath=!1),this.internalPlacement}}export{a as PlacementAtRatioPositions};