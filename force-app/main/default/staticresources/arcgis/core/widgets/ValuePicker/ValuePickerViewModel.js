/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import o from"../../core/Evented.js";import e from"../../core/Logger.js";import{after as r,isAbortError as s}from"../../core/promiseUtils.js";import{property as i}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as a}from"../../core/accessorSupport/decorators/subclass.js";let l=class extends o.EventedAccessor{constructor(t){super(t),this._animationController=null,this.disabled=!1,this.layout="horizontal",this.loop=!1,this.playRate=1e3,this.values=null}destroy(){this._pause()}get state(){return this._animationController?"playing":"ready"}next(){this.emit("next")}pause(){this.emit("pause"),this._pause()}play(){this.emit("play"),this._play()}previous(){this.emit("previous")}_pause(){this._animationController?.abort(),this._animationController=null}_play(){this._pause(),this._animationController=new AbortController,this._animate()}async _animate(){if(this.emit("animate"),this._animationController){try{await r(this.playRate,null,this._animationController.signal)}catch(t){return s(t)||e.getLogger(this.declaredClass).error(t),void this._pause()}this._animate()}}};t([i()],l.prototype,"_animationController",void 0),t([i({nonNullable:!0})],l.prototype,"disabled",void 0),t([i({nonNullable:!0})],l.prototype,"layout",void 0),t([i({nonNullable:!0})],l.prototype,"loop",void 0),t([i({nonNullable:!0})],l.prototype,"playRate",void 0),t([i({readOnly:!0})],l.prototype,"state",null),t([i()],l.prototype,"values",void 0),t([i()],l.prototype,"next",null),t([i()],l.prototype,"pause",null),t([i()],l.prototype,"play",null),t([i()],l.prototype,"previous",null),l=t([a("esri.widgets.ValuePicker.ValuePickerViewModel")],l);const n=l;export{n as default};