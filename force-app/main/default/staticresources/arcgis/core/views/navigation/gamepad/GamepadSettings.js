/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../../chunks/tslib.es6.js";import e from"../../../core/Accessor.js";import{property as t}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as r}from"../../../core/accessorSupport/decorators/subclass.js";import p from"../../input/gamepad/GamepadInputDevice.js";let s=class extends e{constructor(o){super(o),this.enabled=!0,this.device=null,this.mode="pan",this.tiltDirection="forward-down",this.velocityFactor=1}};o([t({type:Boolean,nonNullable:!0})],s.prototype,"enabled",void 0),o([t({type:p})],s.prototype,"device",void 0),o([t({type:["pan","zoom"],nonNullable:!0})],s.prototype,"mode",void 0),o([t({type:["forward-down","forward-up"],nonNullable:!0})],s.prototype,"tiltDirection",void 0),o([t({type:Number,nonNullable:!0})],s.prototype,"velocityFactor",void 0),s=o([r("esri.views.navigation.gamepad.GamepadSettings")],s);const a=s;export{a as default};