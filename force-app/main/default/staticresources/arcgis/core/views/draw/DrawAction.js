/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../core/Evented.js";import i from"../../core/Handles.js";import{clone as r}from"../../core/lang.js";import{isSome as s,destroyMaybe as o,isNone as n,unwrapOr as a}from"../../core/maybe.js";import{ignoreAbortErrors as p}from"../../core/promiseUtils.js";import{createScreenPointArray as d}from"../../core/screenUtils.js";import{property as h}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import{subclass as c}from"../../core/accessorSupport/decorators/subclass.js";import l from"../../layers/GraphicsLayer.js";import{makeDehydratedPoint as m}from"../../layers/graphics/dehydratedFeatures.js";import{ViewingMode as _}from"../ViewingMode.js";import{SnappingVisualizer2D as y}from"../2d/interactive/SnappingVisualizer2D.js";import{createCoordinateHelper as u}from"../interactive/coordinateHelper.js";import{EditGeometry as g,Component as v}from"../interactive/editGeometry/EditGeometry.js";import{EditGeometryOperations as f}from"../interactive/editGeometry/EditGeometryOperations.js";import{SnappingContext as x}from"../interactive/snapping/SnappingContext.js";import{SnappingOperation as w}from"../interactive/snapping/SnappingOperation.js";var G;let V=G=class extends t.EventedAccessor{constructor(e){super(e),this._hasZ=null,this._cursorScreenPoint=null,this._activePointerId=null,this._stagedVertexUnsnapped=null,this._lastVertexUnsnapped=null,this._handles=new i,this._viewHandlesKey="view-handles",this._undoRedoHandlesKey="undo-redo-handles",this._drawToolHandlesKey="draw-tool",this._nativeEventHistory={undoStack:[],redoStack:[]},this.interactiveUndoDisabled=!1,this.history=[],this.redoHistory=[],this.snapToScene=!1,this.view=null,this.elevationInfo=null,this.defaultZ=0,this._coordinateHelper=u(!!e.hasZ,!1,e.view.spatialReference),this._snappingManager=e.snappingManager,this._editGeometryOperations=new f(new g(e.editGeometryType??"polygon",this._coordinateHelper)),this._snappingGraphicsLayer=new l({id:G.SNAPPING_GRAPHICS_LAYER_ID,listMode:"hide",internal:!0}),this._snappingContext=new x({editGeometryOperations:this._editGeometryOperations,elevationInfo:{mode:"on-the-ground",offset:0},pointer:"mouse",visualizer:new y(this._snappingGraphicsLayer)}),this._activeComponent=new v(e.view.spatialReference,_.Local),this._editGeometryOperations.data.components.push(this._activeComponent)}normalizeCtorArgs(e){const t={...e};return delete t.editGeometryType,t}initialize(){this._snappingOperation=new w({view:this.view}),"2d"===this.view.type&&this.view.map.layers.add(this._snappingGraphicsLayer)}destroy(){this._handles.destroy(),this.view.map.layers.remove(this._snappingGraphicsLayer),this._snappingGraphicsLayer.destroy(),s(this._snappingManager)&&this._snappingManager.doneSnapping(),this._snappingOperation=o(this._snappingOperation),this._editGeometryOperations.destroy()}get _committedVertices(){return this._editGeometryOperations.data.components[0].vertices.map((e=>e.pos))}get vertices(){return s(this._stagedVertex)?[...this._committedVertices,this._coordinateHelper.pointToArray(this._stagedVertex)]:this._committedVertices}get hasZ(){return s(this._hasZ)?this._hasZ:"3d"===this.view.type}set hasZ(e){this._hasZ=e,this.notifyChange("hasZ")}get _stagedVertex(){return this._snappingOperation.stagedPoint}set _stagedVertex(e){this._snappingOperation.stagedPoint=r(e)}canUndo(){return this._editGeometryOperations.canUndo}canRedo(){return this._editGeometryOperations.canRedo}undo(){this.canUndo&&this._editGeometryOperations.undo()}redo(){this.canRedo&&this._editGeometryOperations.redo()}getCoordsFromScreenPoint(e){const t=e&&this.screenToMap(e);return n(t)?null:t.hasZ?[t.x,t.y,t.z]:[t.x,t.y]}getCoordsAndPointFromScreenPoint(e){const t=this.screenToMap(e);return n(t)?null:t.hasZ?{vertex:[t.x,t.y,t.z],mapPoint:t}:{vertex:[t.x,t.y],mapPoint:t}}screenToMap(e){let t=null;if("3d"===this.view.type)if(this.hasZ){const i=a(this.elevationInfo,O);t=this.view.sceneIntersectionHelper.intersectElevationFromScreen(d(e.x,e.y),i,this._getGeometryZValue())}else{const i=a(this.elevationInfo,P);t=this.view.sceneIntersectionHelper.intersectElevationFromScreen(d(e.x,e.y),i,0),s(t)&&(t.z=void 0)}else t=this.view.toMap(e),s(t)&&(t.z=this.hasZ?this._getGeometryZValue():void 0);return t}_pushCursorVertex(e,t){const i=m(e[0],e[1],void 0,this.view.spatialReference);this._stagedVertexUnsnapped=i;const r=this._snappingManager;if(n(r))return this._stagedVertex=i,void t();p(this._snappingOperation.snap({point:i},r,this._snappingContext)).then((()=>{t()}))}_popCursorVertex(){this._stagedVertexUnsnapped=null,this._stagedVertex=null}_getGeometryZValue(){return this.defaultZ}_abortSnapping(){this._snappingOperation.abort()}_isDuplicateOfLastVertex(e){const t=this._editGeometryOperations.data.components[0].getLastVertex();if(s(t)&&e[0]===t[0]&&e[1]===t[1])return!0;const{x:i,y:r}=this._coordinateHelper.vectorToDehydratedPoint(e);return!(!s(this._lastVertexUnsnapped)||i!==this._lastVertexUnsnapped.x||r!==this._lastVertexUnsnapped.y)}_shouldHandlePointerEvent(e){return this._isPrimaryPointerAction(e)&&(n(this._activePointerId)||this._activePointerId===e.pointerId)}_vertexAddHandler(e){const t=s(this._stagedVertex)?this._coordinateHelper.pointToArray(this._stagedVertex):this.getCoordsFromScreenPoint(this._cursorScreenPoint);s(t)&&this._addVertex(t,e.native)}_drawCompleteHandler(e){this._completeDrawing(e.native)}_isPrimaryPointerAction(e){return"mouse"!==e.pointerType||0===e.button}};V.SNAPPING_GRAPHICS_LAYER_ID="DrawAction-snapping-graphics-layer",e([h({readOnly:!0})],V.prototype,"vertices",null),e([h({type:Boolean,nonNullable:!0})],V.prototype,"interactiveUndoDisabled",void 0),e([h({readOnly:!0})],V.prototype,"history",void 0),e([h({readOnly:!0})],V.prototype,"redoHistory",void 0),e([h()],V.prototype,"snapToScene",void 0),e([h()],V.prototype,"view",void 0),e([h()],V.prototype,"elevationInfo",void 0),e([h({nonNullable:!0})],V.prototype,"defaultZ",void 0),e([h()],V.prototype,"hasZ",null),e([h()],V.prototype,"_snappingOperation",void 0),e([h()],V.prototype,"_stagedVertex",null),V=G=e([c("esri.views.draw.DrawAction")],V);const O={mode:"absolute-height",offset:0},P={mode:"on-the-ground",offset:0},S=V;export{S as default};