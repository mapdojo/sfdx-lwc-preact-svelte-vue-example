/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import e from"../../../core/Accessor.js";import r from"../../../core/Handles.js";import{destroyMaybe as o}from"../../../core/maybe.js";import{watch as n,initial as i}from"../../../core/reactiveUtils.js";import{property as a}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as s}from"../../../core/accessorSupport/decorators/subclass.js";import{DoubleClickZoom as p}from"./handlers/DoubleClickZoom.js";import{DragRotate as m}from"./handlers/DragRotate.js";import{DragZoom as d}from"./handlers/DragZoom.js";import{GamepadNavigation as c}from"./handlers/GamepadNavigation.js";import{KeyboardNavigation as l}from"./handlers/KeyboardNavigation.js";import{MouseWheelZoom as g}from"./handlers/MouseWheelZoom.js";import{PinchAndPanNavigation as u}from"./handlers/PinchAndPanNavigation.js";import{PointerDownCancelAnimation as h}from"./handlers/PointerDownCancelAnimation.js";import{SingleKeyResetHeading as w}from"./handlers/SingleKeyResetHeading.js";import{SingleKeyResetTilt as y}from"./handlers/SingleKeyResetTilt.js";import{TwoFingerTilt as _}from"./handlers/TwoFingerTilt.js";import{BrowserEventSource as f}from"../../input/BrowserEventSource.js";import{InputManager as D,ViewEventPriorities as j}from"../../input/InputManager.js";import{PreventContextMenu as v}from"../../input/handlers/PreventContextMenu.js";import{Drag as A}from"../../input/recognizers/Drag.js";import{ImmediateDoubleClick as P}from"../../input/recognizers/ImmediateDoubleClick.js";import{PointerClickHoldAndDrag as M}from"../../input/recognizers/PointerClickHoldAndDrag.js";import{SingleAndDoubleClick as T}from"../../input/recognizers/SingleAndDoubleClick.js";import{VerticalTwoFingerDrag as R}from"../../input/recognizers/VerticalTwoFingerDrag.js";import{PivotPoint as b}from"../state/controllers/RotateController.js";let z=class extends e{constructor(){super(...arguments),this._handles=new r}destroy(){this._handles=o(this._handles),this.disconnect()}get primaryDragAction(){return this._get("primaryDragAction")}set primaryDragAction(t){"pan"!==t&&"rotate"!==t||t===this._get("primaryDragAction")||(this._set("primaryDragAction",t),this._updateMode())}get mode(){return this._get("mode")}set mode(t){"default"!==t&&"pro"!==t||t===this._get("mode")||(this._set("mode",t),this._updateMode())}get hasPendingInputs(){return!!this._inputManager?.hasPendingInputs}get latestPointerType(){return this._inputManager?.latestPointerType}get latestPointerLocation(){return this._inputManager?.latestPointerLocation}get multiTouchActive(){return this._inputManager?.multiTouchActive??!1}disconnect(){this.view.viewEvents.disconnect(),this._inputManager=o(this._inputManager)}connect(){const t=this.view;this._source=new f(this.view.surface,t.input);const e=[new P,new M,new T,new A(this.view.navigation),new R],r=new D({eventSource:this._source,recognizers:e});this._inputManager=r,r.installHandlers("prevent-context-menu",[new v],j.INTERNAL),this._modeDragPan=new u(t,"primary"),this._modeDragRotate=new m(t,"secondary",b.CENTER),this._modeDragZoom=new d(t,"tertiary");const o={lookAround:"b",pan:{left:"ArrowLeft",right:"ArrowRight",forward:"ArrowUp",backward:"ArrowDown",up:"u",down:"j",headingLeft:"a",headingRight:"d",tiltUp:"w",tiltDown:"s",zoomIn:"+",zoomOut:"-"},resetHeading:"n",resetTilt:"p"};r.installHandlers("navigation",[new h(t),new p(t),new c(t),new l(t,o.pan),new g(t),new y(t,o.resetTilt),new w(t,o.resetHeading),new m(t,"primary",b.EYE,[o.lookAround]),new m(t,"secondary",b.CENTER,[o.lookAround]),new u(t,"tertiary",[o.lookAround]),this._modeDragRotate,this._modeDragZoom,this._modeDragPan,new _(t)],j.INTERNAL),this.view.viewEvents.connect(r),this._updateMode(),this._handles.add(n((()=>this.view.navigation?.browserTouchPanEnabled),(t=>{this._source.browserTouchPanningEnabled=!t}),i))}_updateMode(){const t=this.mode,e=this.primaryDragAction,r=E.get(t)?.get(e);r&&(this._modeDragPan&&(this._modeDragPan.pointerAction=r.pan),this._modeDragRotate&&(this._modeDragRotate.pointerAction=r.rotate),this._modeDragZoom&&(this._modeDragZoom.pointerAction=r.zoom))}get test(){return{inputManager:this._inputManager,modeDragPan:this._modeDragPan,modeDragRotate:this._modeDragRotate,modeDragZoom:this._modeDragZoom}}};t([a()],z.prototype,"view",void 0),t([a({value:"pan"})],z.prototype,"primaryDragAction",null),t([a({value:"default"})],z.prototype,"mode",null),t([a({readOnly:!0})],z.prototype,"hasPendingInputs",null),t([a()],z.prototype,"latestPointerType",null),t([a()],z.prototype,"latestPointerLocation",null),t([a()],z.prototype,"multiTouchActive",null),t([a()],z.prototype,"_inputManager",void 0),z=t([s("esri.views.3d.input.SceneInputManager")],z);const E=new Map,k=new Map,C=new Map;k.set("pan",{pan:"primary",rotate:"secondary",zoom:"tertiary"}),k.set("rotate",{pan:"secondary",rotate:"primary",zoom:"tertiary"}),C.set("pan",{pan:"primary",rotate:"tertiary",zoom:"secondary"}),C.set("rotate",{pan:"tertiary",rotate:"primary",zoom:"secondary"}),E.set("default",k),E.set("pro",C);const I=z;export{I as default};