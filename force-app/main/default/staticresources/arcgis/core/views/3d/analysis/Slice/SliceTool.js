/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../../chunks/tslib.es6.js";import e from"../../../../analysis/SlicePlane.js";import{clock as i}from"../../../../core/clock.js";import a from"../../../../core/Handles.js";import{releaseMaybe as s,destroyMaybe as n,isSome as r,isNone as l,removeMaybe as o}from"../../../../core/maybe.js";import{watch as h,sync as p,syncAndInitial as u}from"../../../../core/reactiveUtils.js";import{addFrameTask as c}from"../../../../core/scheduling.js";import{createScreenPoint as d,screenPointObjectToArray as _,createScreenPointArray as v}from"../../../../core/screenUtils.js";import{property as P}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as y}from"../../../../core/accessorSupport/decorators/subclass.js";import{d as m,E as g,m as w}from"../../../../chunks/mat4.js";import{e as f,l as M,c as D,g as T,a as V,m as b,n as k,s as E}from"../../../../chunks/vec3.js";import{a as S,c as H}from"../../../../chunks/vec3f64.js";import{a as x,c as I,n as R,f as j}from"../../../../chunks/boundedPlane.js";import{signedDistance as O,create as C,intersectRay as z,normal as G}from"../../../../geometry/support/plane.js";import{create as U}from"../../../../geometry/support/ray.js";import{sv3d as L,sm4d as K,sv2d as A}from"../../../../geometry/support/vectorStacks.js";import{POINTER_MOVE_TIMER_MS as B,PLANE_PREVIEW_OUTLINE_WIDTH as F,forceVerticalModifier as N,forceHorizontalModifier as q,PLANE_OUTLINE_COLOR as Z,PLANE_BACKGROUND_COLOR as J,PREVIEW_FADE_DOT_THRESHOLD as Q,PREVIEW_FADE_DURATION_SECONDS as W,INITIAL_DEPTH_OFFSET_FRAC as X}from"./sliceToolConfig.js";import{createShiftManipulator as Y,createRotateManipulator as $,createResizeManipulator as tt,createGridVisualElement as et,createOutlineVisualElement as it,planeToShape as at,createRotatePlane as st,RotationAxis as nt,resizePlane as rt,calculatePlaneHalfSize as lt,SliceOrientation as ot,createPlane as ht,DidPointerMoveRecentlyFlag as pt,calculateBoundedPlaneTranslateRotate as ut,updateShiftRestartHandle as ct,updateRotateHeadingHandle as dt,updateRotateTiltHandle as _t,updateResizeHandle as vt,createShiftPlane as Pt}from"./sliceToolUtils.js";import{getRotateHeadingTexture as yt,getTiltRotateTexture as mt}from"./images/Factory.js";import{calculateInputRotationTransform as gt}from"../../interactive/manipulatorUtils.js";import{screenToRenderPlane as wt}from"../../interactive/editingTools/dragEventPipeline3D.js";import{fromScreen as ft}from"../../support/geometryUtils/ray.js";import{newIntersector as Mt}from"../../webgl-engine/lib/Intersector.js";import{StoreResults as Dt}from"../../webgl-engine/lib/IntersectorInterfaces.js";import{AnalysisToolBase as Tt}from"../../../interactive/AnalysisToolBase.js";import{createManipulatorDragEventPipeline as Vt}from"../../../interactive/dragEventPipeline.js";import{createScreenPointFromEvent as bt}from"../../../support/screenUtils.js";var kt;let Et=kt=class extends Tt{constructor(t){super(t),this._clock=i,this._previewPlaneOpacity=1,this.removeIncompleteOnCancel=!1,this.layersMode="none",this.shiftManipulator=null,this.rotateHeadingManipulator=null,this.rotateTiltManipulator=null,this.resizeManipulators=null,this._handles=new a,this._viewHandles=new a,this._frameTask=null,this._pointerMoveTimerMs=B,this._prevPointerMoveTimeout=null,this._previewPlaneGridVisualElement=null,this._previewPlaneOutlineVisualElement=null,this._startPlane=x(),this._previewPlane=null,this._activeKeyModifiers={},this._lastCursorPosition=d(),this._resizeHandles=[{direction:[1,0]},{direction:[1,1]},{direction:[0,1]},{direction:[-1,1]},{direction:[-1,0]},{direction:[-1,-1]},{direction:[0,-1]},{direction:[1,-1]}],this._intersector=Mt(t.view.state.viewingMode),this._intersector.options.store=Dt.MIN}initialize(){if(null==this.analysis)throw new Error("SliceTool requires valid analysis, but null was provided.");this._rotateHeadingImage=yt(this.view.toolViewManager.textures),this._rotateTiltImage=mt(this.view.toolViewManager.textures);const t=t=>{this._updateManipulatorsInteractive(t),t.grabbing||(r(this.analysisViewData.plane)&&I(this.analysisViewData.plane,this._startPlane),this.inputState=null)};this.shiftManipulator=Y(this.view),this.manipulators.add(this.shiftManipulator),this.shiftManipulator.events.on("grab-changed",(e=>{this._onShiftGrab(e),t(this.shiftManipulator)})),this._handles.add(this._createShiftDragPipeline(this.shiftManipulator)),this.rotateHeadingManipulator=$(this.view,this._rotateHeadingImage.texture),this.manipulators.add(this.rotateHeadingManipulator),this.rotateHeadingManipulator.events.on("grab-changed",(e=>{this._onRotateHeadingGrab(e),t(this.rotateHeadingManipulator)})),this._handles.add(this._createRotateHeadingDragPipeline(this.rotateHeadingManipulator)),this.rotateTiltManipulator=$(this.view,this._rotateTiltImage.texture),this.manipulators.add(this.rotateTiltManipulator),this.rotateTiltManipulator.events.on("grab-changed",(e=>{this._onRotateTiltGrab(e),t(this.rotateTiltManipulator)})),this._handles.add(this._createRotateTiltDragPipeline(this.rotateTiltManipulator)),this.resizeManipulators=this._resizeHandles.map(((e,i)=>{const a=tt(this.view,e);return a.events.on("grab-changed",(e=>{this._onResizeGrab(e,i),t(a)})),this._handles.add(this._createResizeDragPipeline(a)),a})),this.manipulators.addMany(this.resizeManipulators),this._previewPlaneGridVisualElement=et(this.view),this._previewPlaneOutlineVisualElement=it(this.view),this._previewPlaneOutlineVisualElement.width=F,this._handles.add(h((()=>this.analysisViewData.plane),(()=>this._updateManipulators()),p));const e=h((()=>this.state),(t=>{"sliced"===t&&this.finishToolCreation()}),u);this._handles.add([e,h((()=>this.view.state.camera),(()=>this._onCameraChange()))])}destroy(){this._rotateHeadingImage=s(this._rotateHeadingImage),this._rotateTiltImage=s(this._rotateTiltImage),this._handles=n(this._handles),this._viewHandles=n(this._viewHandles),this._removeFrameTask(),this._clearPointerMoveTimeout(),this._previewPlaneOutlineVisualElement=n(this._previewPlaneOutlineVisualElement),this._previewPlaneGridVisualElement=n(this._previewPlaneGridVisualElement)}get state(){const t=!!this.analysisViewData.plane,e=!!this.inputState;return t?t&&e?"slicing":t&&!e?"sliced":"ready":"ready"}get cursor(){return this._isPlacingSlicePlane||"exclude"===this.layersMode?"crosshair":r(this._creatingPointerId)?"grabbing":null}set analysis(t){if(null==t)throw new Error("SliceTool requires valid analysis, but null was provided.");this._handles.remove("analysis"),this._set("analysis",t)}get inputState(){return this._get("inputState")}set inputState(t){this._set("inputState",t),this.analysisViewData.showGrid=r(t)&&"resize"===t.type,this._updateMaterials()}get _isPlacingSlicePlane(){return!this.inputState&&!this.analysisViewData.plane&&this.active}get _creatingPointerId(){return r(this.inputState)&&"shift"===this.inputState.type?this.inputState.creatingPointerId:null}enterExcludeLayerMode(){l(this.analysisViewData.plane)||(this._set("layersMode","exclude"),this.active||(this.view.activeTool=this))}exitExcludeLayerMode(){l(this.analysisViewData.plane)||(this._set("layersMode","none"),this.active&&(this.view.activeTool=null))}onDeactivate(){this._set("layersMode","none"),this._updatePreviewPlane(null)}onShow(){this._updateVisibility(!0)}onHide(){this._updateVisibility(!1)}_updateVisibility(t){this._updateManipulators(),t||this._clearPointerMoveTimeout()}onInputEvent(t){switch(t.type){case"pointer-drag":if(!Ht(t))return;this._isPlacingSlicePlane?this._onClickPlacePlane(t)&&t.stopPropagation():this._onPointerDrag(t)&&t.stopPropagation();break;case"pointer-move":this._onPointerMove(t);break;case"pointer-up":this._onPointerUp(t)&&t.stopPropagation();break;case"immediate-click":if(!Ht(t))return;this._onClickPlacePlane(t)&&t.stopPropagation();break;case"click":if(!Ht(t))return;this._onClickExcludeLayer(t)&&t.stopPropagation();break;case"drag":this.inputState&&t.stopPropagation();break;case"key-down":this._onKeyDown(t)&&t.stopPropagation();break;case"key-up":this._onKeyUp(t)&&t.stopPropagation()}}onEditableChange(){this.analysisViewData.editable=this.internallyEditable}_onPointerDrag(t){const e=this.inputState;if(t.pointerId===this._creatingPointerId&&r(e)&&"shift"===e.type){const i=bt(t);return this.shiftManipulator.events.emit("drag",{action:e.hasBeenDragged?"update":"start",pointerType:t.pointerType,start:i,screenPoint:i}),e.hasBeenDragged=!0,!0}return!1}_onPointerMove(t){this._lastCursorPosition.x=t.x,this._lastCursorPosition.y=t.y,this._resetPointerMoveTimeout(),"touch"!==t.pointerType&&this._updatePreviewPlane(bt(t),this._activeKeyModifiers)}_onCameraChange(){this._updatePreviewPlane(this._lastCursorPosition,this._activeKeyModifiers),this._updateManipulators()}_onPointerUp(t){if(t.pointerId===this._creatingPointerId&&r(this.analysisViewData.plane)){const e=bt(t);return this.shiftManipulator.events.emit("drag",{action:"end",start:e,screenPoint:e}),I(this.analysisViewData.plane,this._startPlane),this.inputState=null,!0}return!1}_onClickPlacePlane(t){if("exclude"===this.layersMode)return!1;if(this._isPlacingSlicePlane){const i=bt(t),a=x();if(this._pickPlane(i,!1,this._activeKeyModifiers,a)){if(I(a,this._startPlane),this.analysis.shape=at(a,this.view,this.view.spatialReference,new e),"pointer-drag"===t.type){const e=this._calculatePickRay(i);this.inputState=St(e,t.pointerId,a.origin,a)}return!0}}return!1}_onClickExcludeLayer(t){return!("exclude"!==this.layersMode||!this.created)&&(this.view.hitTest(bt(t)).then((t=>{if(t.results.length){const e=t.results[0],i="graphic"===e?.type&&e.graphic;if(i){const t=i.sourceLayer||i.layer;t&&this.analysis.excludedLayers.push(t)}}else t.ground.layer?this.analysis.excludedLayers.push(t.ground.layer):this.analysis.excludeGroundSurface=!0})),this._set("layersMode","none"),this.active&&(this.view.activeTool=null),!0)}_onKeyDown(t){return(t.key===N||t.key===q)&&(this._activeKeyModifiers[t.key]=!0,r(this._previewPlane)&&this._updatePreviewPlane(this._lastCursorPosition,this._activeKeyModifiers),!0)}_onKeyUp(t){return!(t.key!==N&&t.key!==q||!this._activeKeyModifiers[t.key])&&(delete this._activeKeyModifiers[t.key],r(this._previewPlane)&&this._updatePreviewPlane(this._lastCursorPosition,this._activeKeyModifiers),!0)}_onShiftGrab(t){if("start"!==t.action||l(this.analysisViewData.plane)||!t.screenPoint)return;const e=this._calculatePickRay(t.screenPoint);I(this.analysisViewData.plane,this._startPlane),this.inputState=St(e,null,this.shiftManipulator.renderLocation,this.analysisViewData.plane)}_createShiftDragPipeline(t){return Vt(t,((t,e,i)=>{const a=this.inputState;if(l(a)||"shift"!==a.type)return;const s=r(this.analysisViewData.plane)?I(this.analysisViewData.plane,x()):null;e.next(wt(this.view,a.shiftPlane)).next(this._shiftDragAdjustSensitivity(a)).next(this._shiftDragUpdatePlane(a)),i.next((()=>{r(s)&&this._updateBoundedPlane(s)}))}))}_shiftDragAdjustSensitivity(t){return e=>{if(l(this.analysisViewData.plane))return null;const i=.001,a=Math.min((1-Math.abs(f(R(this.analysisViewData.plane),e.ray.direction)/M(e.ray.direction)))/i,1),s=-O(this._startPlane.plane,e.renderEnd),n=-O(this._startPlane.plane,t.startPoint);return t.depth=t.depth*(1-a)+s*a-n,e}}_shiftDragUpdatePlane(t){return()=>{if(l(this.analysisViewData.plane))return;const e=D(L.get(),this._startPlane.origin),i=D(L.get(),R(this._startPlane));T(i,i,-t.depth),V(i,i,e);const a=j(i,this.analysisViewData.plane.basis1,this.analysisViewData.plane.basis2,x());this._updateBoundedPlane(a)}}_onRotateHeadingGrab(t){if("start"!==t.action||l(this.analysisViewData.plane)||!t.screenPoint)return;const e=st(this.analysisViewData.plane,this.view.renderCoordsHelper,nt.HEADING,C()),i=this._calculatePickRay(t.screenPoint),a=H();z(e,i,a)&&(I(this.analysisViewData.plane,this._startPlane),this.inputState={type:"rotate",rotatePlane:e,startPoint:a})}_createRotateHeadingDragPipeline(t){return Vt(t,((t,e,i)=>{const a=this.inputState;if(l(a)||"rotate"!==a.type)return;const s=r(this.analysisViewData.plane)?I(this.analysisViewData.plane,x()):null;e.next(wt(this.view,a.rotatePlane)).next(this._rotateDragRenderPlaneToRotate(a)).next(this._rotateDragUpdatePlaneFromRotate()),i.next((()=>{r(s)&&this._updateBoundedPlane(s)}))}))}_onRotateTiltGrab(t){if("start"!==t.action||l(this.analysisViewData.plane)||!t.screenPoint)return;const e=st(this.analysisViewData.plane,this.view.renderCoordsHelper,nt.TILT,C()),i=this._calculatePickRay(t.screenPoint),a=H();z(e,i,a)&&(I(this.analysisViewData.plane,this._startPlane),this.inputState={type:"rotate",rotatePlane:e,startPoint:a})}_createRotateTiltDragPipeline(t){return Vt(t,((t,e,i)=>{const a=this.inputState;if(l(a)||"rotate"!==a.type)return;const s=r(this.analysisViewData.plane)?I(this.analysisViewData.plane,x()):null;e.next(wt(this.view,a.rotatePlane)).next(this._rotateDragRenderPlaneToRotate(a)).next(this._rotateDragUpdatePlaneFromRotate()),i.next((()=>{r(s)&&this._updateBoundedPlane(s)}))}))}_rotateDragRenderPlaneToRotate(t){return e=>{if(l(this.analysisViewData.plane))return null;const i=G(t.rotatePlane),a=gt(t.startPoint,e.renderEnd,this.analysisViewData.plane.origin,i);return{...e,rotateAxis:i,rotateAngle:a}}}_rotateDragUpdatePlaneFromRotate(){return t=>{if(l(this.analysisViewData.plane))return;const e=m(K.get(),t.rotateAngle,t.rotateAxis);if(l(e))return;const i=b(L.get(),this._startPlane.basis1,e),a=b(L.get(),this._startPlane.basis2,e),s=j(this.analysisViewData.plane.origin,i,a,x());this._updateBoundedPlane(s)}}_onResizeGrab(t,e){if("start"!==t.action||l(this.analysisViewData.plane)||!t.screenPoint)return;const i=this._calculatePickRay(t.screenPoint),a=L.get();z(this.analysisViewData.plane.plane,i,a)&&(I(this.analysisViewData.plane,this._startPlane),this.inputState={type:"resize",activeHandleIdx:e,startPoint:S(a)})}_createResizeDragPipeline(t){return Vt(t,((t,e,i)=>{const a=this.inputState;if(l(a)||"resize"!==a.type||l(this.analysisViewData.plane))return;const s=I(this.analysisViewData.plane,x());e.next(wt(this.view,this.analysisViewData.plane.plane)).next(this._resizeDragUpdatePlane(a)),i.next((()=>{this._updateBoundedPlane(s)}))}))}_resizeDragUpdatePlane(t){return e=>{if(l(this.analysisViewData.plane))return;const i=this._resizeHandles[t.activeHandleIdx],a=rt(i,t.startPoint,e.renderEnd,this.view.state.camera,this._startPlane,I(this.analysisViewData.plane));this._updateBoundedPlane(a)}}_updateBoundedPlane(t){const e=this.analysisViewData;if(!r(e))throw new Error("valid internal object expected");e.plane=t}_updatePreviewPlane(t,e={}){let i=this._previewPlane;if(this._previewPlane=null,l(t))return this._removeFrameTask(),void this._updateManipulators();if(!this.analysisViewData.plane&&this.active){const a=r(i)?i:x();if(i=r(i)?I(i,xt):null,this._pickPlane(t,!0,e,a)){const t=Q;let e=!1;r(i)&&(e=f(i.plane,a.plane)<t||f(k(L.get(),i.basis1),k(L.get(),a.basis1))<t),e&&(this._previewPlaneOpacity=0),this._previewPlane=a}}r(this._previewPlane)&&l(this._frameTask)&&0===this._previewPlaneOpacity?this._frameTask=c({update:({deltaTime:t})=>{this._previewPlaneOpacity=Math.min(this._previewPlaneOpacity+t/(1e3*W),1),this._updateManipulators(),1===this._previewPlaneOpacity&&this._removeFrameTask()}}):l(this._previewPlane)&&r(this._frameTask)?this._removeFrameTask():r(this._previewPlane)&&this._updateManipulators()}_removeFrameTask(){this._frameTask=o(this._frameTask)}_calculatePickRay(t){const e=U(),i=_(t,It);return ft(this.view.state.camera,i,e),k(e.direction,e.direction),e}_pickMinResult(t){const e=_(t,A.get());return this.view.sceneIntersectionHelper.intersectToolIntersectorScreen(e,this._intersector),this._intersector.results.min}_pickPlane(t,e,i,a){const s=this._pickMinResult(t),n=L.get();if(!s.getIntersectionPoint(n))return!1;const r=s.getTransformedNormal(L.get()),l=this.view.state.camera;f(r,l.viewForward)>0&&T(r,r,-1);const o=lt(n,l),h=(e?1:-1)*o*X,p=T(L.get(),r,h);V(p,p,n);const u=this.analysis.tiltEnabled?ot.TILTED:ot.HORIZONTAL_OR_VERTICAL,c=i[N]?ot.VERTICAL:i[q]?ot.HORIZONTAL:u;return ht(p,r,o,o,l,c,this.view.renderCoordsHelper,a),!0}_clearPointerMoveTimeout(){this._prevPointerMoveTimeout=o(this._prevPointerMoveTimeout)}_resetPointerMoveTimeout(){this._clearPointerMoveTimeout(),this.shiftManipulator.state|=pt,this.rotateHeadingManipulator.state|=pt,this.rotateTiltManipulator.state|=pt,this._prevPointerMoveTimeout=this._clock.setTimeout((()=>{this.shiftManipulator.state&=~pt,this.rotateHeadingManipulator.state&=~pt,this.rotateTiltManipulator.state&=~pt}),this._pointerMoveTimerMs)}_updateManipulators(){if(kt.disableEngineLayers)return;let t,e=!1;if(r(this.analysisViewData.plane))t=this.analysisViewData.plane,e=!1;else{if(!r(this._previewPlane))return this.shiftManipulator.available=!1,this.rotateHeadingManipulator.available=!1,this.rotateTiltManipulator.available=!1,this.resizeManipulators.forEach((t=>t.available=!1)),this._previewPlaneOutlineVisualElement.visible=!1,void(this._previewPlaneGridVisualElement.visible=!1);t=this._previewPlane,e=!0}const i=ut(t,K.get());e?(this.shiftManipulator.available=!1,this.rotateHeadingManipulator.available=!1,this.rotateTiltManipulator.available=!1,this.resizeManipulators.forEach((t=>t.available=!1)),this._previewPlaneOutlineVisualElement.attached=!0,this._previewPlaneGridVisualElement.attached=!0,this._previewPlaneOutlineVisualElement.visible=!0,this._previewPlaneGridVisualElement.visible=!0):(this.shiftManipulator.available=!0,this.rotateHeadingManipulator.available=!0,this.rotateTiltManipulator.available=this.analysis.tiltEnabled,this.resizeManipulators.forEach((t=>t.available=!0)),ct(this.shiftManipulator,i,t,this.view.state.camera),dt(this.rotateHeadingManipulator,i,t,this.view.renderCoordsHelper),_t(this.rotateTiltManipulator,i,t),this.resizeManipulators.forEach(((e,a)=>vt(e,this._resizeHandles[a],i,t))),this._previewPlaneOutlineVisualElement.visible=!1,this._previewPlaneGridVisualElement.visible=!1);const a=E(L.get(),M(t.basis1),M(t.basis2),1),s=g(K.get(),a),n=w(s,i,s);this._previewPlaneOutlineVisualElement.transform=n,this._previewPlaneGridVisualElement.transform=n,this._updateMaterials()}_updateMaterials(){const t=[Z[0],Z[1],Z[2],Z[3]*this._previewPlaneOpacity];this._previewPlaneOutlineVisualElement.color=t;const e=[J[0],J[1],J[2],J[3]*this._previewPlaneOpacity],i=[0,0,0,0];this._previewPlaneGridVisualElement.backgroundColor=e,this._previewPlaneGridVisualElement.gridColor=i}_updateManipulatorsInteractive(t){if(!t.grabbing)return this.shiftManipulator.interactive=!0,this.rotateHeadingManipulator.interactive=!0,this.rotateTiltManipulator.interactive=!0,void this.resizeManipulators.forEach((t=>{t.interactive=!0}));this.shiftManipulator.interactive=this.shiftManipulator===t,this.rotateHeadingManipulator.interactive=this.rotateHeadingManipulator===t,this.rotateTiltManipulator.interactive=this.rotateTiltManipulator===t,this.resizeManipulators.forEach((e=>{e.interactive=e===t}))}testData(){return{plane:this.analysisViewData.plane,setPointerMoveTimerMs:t=>{this._pointerMoveTimerMs=t}}}};function St(t,e,i,a){const s=Pt(i,R(a),t.direction,C()),n=H();return z(s,t,n)?{type:"shift",creatingPointerId:e,hasBeenDragged:!1,shiftPlane:s,depth:0,startPoint:n}:null}function Ht(t){return"mouse"!==t.pointerType||0===t.button}Et.disableEngineLayers=!1,t([P()],Et.prototype,"_clock",void 0),t([P({constructOnly:!0})],Et.prototype,"view",void 0),t([P()],Et.prototype,"analysisViewData",void 0),t([P({readOnly:!0})],Et.prototype,"state",null),t([P({readOnly:!0})],Et.prototype,"cursor",null),t([P()],Et.prototype,"analysis",null),t([P()],Et.prototype,"removeIncompleteOnCancel",void 0),t([P({readOnly:!0})],Et.prototype,"layersMode",void 0),t([P({value:null})],Et.prototype,"inputState",null),t([P()],Et.prototype,"_isPlacingSlicePlane",null),t([P()],Et.prototype,"_creatingPointerId",null),Et=kt=t([y("esri.views.3d.analysis.Slice.SliceTool")],Et);const xt=x(),It=v(),Rt=Et;export{Rt as default};