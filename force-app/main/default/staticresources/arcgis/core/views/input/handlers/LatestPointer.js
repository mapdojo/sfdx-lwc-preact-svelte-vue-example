/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{InputHandler as t}from"../InputHandler.js";class s extends t{constructor(t){super(!0),this._onChange=t,this._value="mouse",this._x=null,this._y=null,this.registerIncoming("pointer-move",(t=>{this._update(t.data)}))}_update(t){const s="touch"===t.native.pointerType?"touch":"mouse",{x:e,y:i}=t;s===this._value&&this._x===e&&this._y===i||(this._value=s,this._x=e,this._y=i,this._onChange(s,e,i))}}export{s as LatestPointer};