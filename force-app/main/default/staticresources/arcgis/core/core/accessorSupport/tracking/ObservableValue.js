/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{trackAccess as e}from"../tracking.js";import{SimpleObservable as s}from"./SimpleObservable.js";class t{constructor(e){this._observable=new s,this._value=e}get(){return e(this._observable),this._value}set(e){e!==this._value&&(this._value=e,this._observable.notify())}}export{t as ObservableValue};