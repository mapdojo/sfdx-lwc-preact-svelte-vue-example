/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ObservableBase as o}from"../ObservableBase.js";class s extends o{notify(){const o=this._observers;if(o&&o.length>0){const s=o.slice();for(const o of s)o.onInvalidated(),o.onCommitted()}}}export{s as SimpleObservable};