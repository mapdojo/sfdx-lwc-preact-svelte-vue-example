/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{createScreenPointArray as e}from"../../../../core/screenUtils.js";import{RotateController as t,PivotPoint as r}from"../../state/controllers/RotateController.js";import{InputHandler as a}from"../../../input/InputHandler.js";class o extends a{constructor(e,t=!1){super(!0),this._view=e,this._invert=t,this.registerIncoming("vertical-two-finger-drag",(e=>this._handleTwoFinger(e)))}_handleTwoFinger(a){const o=this._invert?-1:1,i=e(0,a.data.delta*o);switch(a.data.action){case"begin":this._cameraController?.end(),this._cameraController=new t({view:this._view,pivot:r.CENTER}),this._view.state.switchCameraController(this._cameraController),this._cameraController.begin(i);break;case"update":this._cameraController?.update(i);break;case"end":this._cameraController?.end(),this._cameraController=null}}}export{o as TwoFingerTilt};