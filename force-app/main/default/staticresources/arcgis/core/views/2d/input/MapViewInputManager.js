/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import t from"../../../core/Accessor.js";import o from"../../../core/Handles.js";import{destroyMaybe as r}from"../../../core/maybe.js";import{when as i,watch as n,initial as s}from"../../../core/reactiveUtils.js";import{property as a}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as p}from"../../../core/accessorSupport/decorators/subclass.js";import{DoubleClickZoom as c}from"./handlers/DoubleClickZoom.js";import{DoubleTapDragZoom as m}from"./handlers/DoubleTapDragZoom.js";import{DragPan as l}from"./handlers/DragPan.js";import{DragRotate as u}from"./handlers/DragRotate.js";import{GamepadNavigation as h}from"./handlers/GamepadNavigation.js";import{KeyPan as w}from"./handlers/KeyPan.js";import{KeyRotate as d}from"./handlers/KeyRotate.js";import{KeyZoom as v}from"./handlers/KeyZoom.js";import{MouseWheelZoom as g}from"./handlers/MouseWheelZoom.js";import{PinchRotateAndZoom as f}from"./handlers/PinchAction.js";import{BrowserEventSource as j}from"../../input/BrowserEventSource.js";import{InputManager as _,ViewEventPriorities as y}from"../../input/InputManager.js";import{PreventContextMenu as A}from"../../input/handlers/PreventContextMenu.js";import{DoubleTapDrag as D}from"../../input/recognizers/DoubleTapDrag.js";import{Drag as M}from"../../input/recognizers/Drag.js";import{ImmediateDoubleClick as P}from"../../input/recognizers/ImmediateDoubleClick.js";import{PointerClickHoldAndDrag as T}from"../../input/recognizers/PointerClickHoldAndDrag.js";import{SingleAndDoubleClick as b}from"../../input/recognizers/SingleAndDoubleClick.js";const z={counter:"Ctrl",pan:{left:"ArrowLeft",right:"ArrowRight",up:"ArrowUp",down:"ArrowDown"},zoom:{zoomIn:["=","+"],zoomOut:["-","_"]},rotate:{clockwiseOption1:"a",clockwiseOption2:"A",counterClockwiseOption1:"d",counterClockwiseOption2:"D",resetOption1:"n",resetOption2:"N"}};let k=class extends t{constructor(){super(...arguments),this._handles=new o}initialize(){const e=()=>this.view?.ready;this._handles.add([i((()=>!e()),(()=>this._disconnect())),i(e,(()=>this._connect()))])}destroy(){this._handles=r(this._handles),this._disconnect()}get latestPointerType(){return this._inputManager?.latestPointerType}get latestPointerLocation(){return this._inputManager?.latestPointerLocation}get multiTouchActive(){return this._inputManager?.multiTouchActive??!1}_disconnect(){this.view.viewEvents.disconnect(),this._inputManager=r(this._inputManager)}_connect(){const e=this.view.surface,t=new j(e,this.view.input),o=[new P,new T,new b,new M(this.view.navigation),new D],r=new _({eventSource:t,recognizers:o});r.installHandlers("prevent-context-menu",[new A],y.INTERNAL),r.installHandlers("navigation",[new f(this.view),new h(this.view),new g(this.view),new c(this.view),new c(this.view,[z.counter]),new l(this.view,"primary"),new w(this.view,z.pan),new v(this.view,z.zoom),new d(this.view,z.rotate),new u(this.view,"secondary"),new m(this.view,"touch")],y.INTERNAL),this.view.viewEvents.connect(r),this._source=t,this._inputManager=r,n((()=>this.view?.navigation?.browserTouchPanEnabled),(e=>{this._source&&(this._source.browserTouchPanningEnabled=!e)}),s)}get test(){return{inputManager:this._inputManager}}};e([a()],k.prototype,"view",void 0),e([a()],k.prototype,"latestPointerType",null),e([a()],k.prototype,"latestPointerLocation",null),e([a()],k.prototype,"multiTouchActive",null),k=e([p("esri.views.2d.input.MapViewInputManager")],k);const C=k;export{C as default};