/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../../chunks/tslib.es6.js";import{handlesGroup as t,makeHandle as i}from"../../../../../core/handleUtils.js";import{isSome as s,isNone as a,applySome as r,destroyMaybe as n}from"../../../../../core/maybe.js";import{watch as l,initial as o}from"../../../../../core/reactiveUtils.js";import{property as c}from"../../../../../core/accessorSupport/decorators/property.js";import"../../../../../core/accessorSupport/ensureType.js";import"../../../../../core/arrayUtils.js";import{subclass as h}from"../../../../../core/accessorSupport/decorators/subclass.js";import{s as p}from"../../../../../chunks/vec3.js";import{c as u}from"../../../../../chunks/vec3f64.js";import{getEffectiveElevationInfo as m,getEffectiveElevationMode as v}from"../../../../../support/elevationInfoUtils.js";import d from"../../../../../symbols/support/ElevationInfo.js";import{SegmentLabels3D as f}from"../../SegmentLabels3D.js";import{SnappingVisualizer3D as V}from"../../SnappingVisualizer3D.js";import{settings as E}from"../settings.js";import{ExtendedLineVisualElement as w}from"../../visualElements/ExtendedLineVisualElement.js";import{OutlineVisualElement as _}from"../../visualElements/OutlineVisualElement.js";import{VerticesVisualElement as y}from"../../visualElements/VerticesVisualElement.js";import{evaluateElevationAlignmentAtPoint as g}from"../../../layers/graphics/elevationAlignmentUtils.js";import{ElevationContext as j}from"../../../layers/graphics/ElevationContext.js";import{GraphicState as I}from"../../../layers/graphics/GraphicState.js";import{RenderOccludedFlag as L}from"../../../webgl-engine/lib/Material.js";import{DrawGraphicTool as S,geometryTypeToDrawOperationGeometryType as G}from"../../../../draw/DrawGraphicTool.js";import{DrawOperation as D}from"../../../../draw/DrawOperation.js";import{SceneDrawSurface as O,ElevationDrawSurface as x}from"../../../../draw/drawSurfaces.js";let T=class extends S{constructor(e){super(e),this._activeVertexVisualElement=null,this._createGraphicState=null,this._outlineVisualElement=null,this._verticesVisualElement=null,this._verticalLineVisualElement=null,this.geometryType=null,this.type="draw-3d"}initialize(){const{mode:e,offset:t}=this.elevationInfo;this.internalGraphicsLayer.elevationInfo=new d({mode:e,offset:t})}normalizeCtorArgs(e){if(!e.elevationInfo){const t=e.hasZ??!0;return{...e,elevationInfo:m(t)}}return e}initializeGraphic(e){const i=this._createGraphicState=new I({graphic:e});return t([this.view.maskOccludee(e),this.view.trackGraphicState(i),l((()=>({element:this._outlineVisualElement,isDraped:i.isDraped})),(({element:e,isDraped:t})=>{r(e,(e=>e.isDraped=t))}),o)])}makeDrawOperation(){const{geometryType:e}=this,t="circle"!==e&&"rectangle"!==e;return new D({view:this.view,manipulators:this.manipulators,geometryType:G(e),drawingMode:this.mode,hasZ:this.hasZ,defaultZ:this.defaultZ,snapToSceneEnabled:this.snapToScene,drawSurface:new O(this.view,this.elevationInfo,[this.internalGraphicsLayer]),elevationDrawSurface:new x(this.elevationInfo,this.defaultZ,this.view,this.internalGraphicsLayer),hasM:!1,elevationInfo:this.elevationInfo,snappingManager:this.snappingManager,snappingVisualizer:new V,segmentLabels:t?new f:null,labelOptions:this.labelOptions,tooltipOptions:this.tooltipOptions,isDraped:s(this._createGraphicState)?this._createGraphicState.isDraped:"on-the-ground"===v(this.hasZ,this.elevationInfo)})}onActiveVertexChanged(e){const{view:t}=this;return s(this._activeVertexVisualElement)?(this._activeVertexVisualElement.vertices=[e],this._updateVerticalLineVisualElement(e),null):(this._activeVertexVisualElement=new y({view:t,spatialReference:t.spatialReference,vertices:[e],elevationInfo:this.internalGraphicsLayer.elevationInfo,renderOccluded:E.reshapeManipulators.vertex.renderOccluded,attached:!1}),this._activeVertexVisualElement.color=E.colorToVec4(E.reshapeManipulators.selected.color),this._activeVertexVisualElement.attached=!0,this._verticalLineVisualElement=new w({view:t,extensionType:E.visualElements.zVerticalLine.extensionType,innerWidth:1,attached:!1,writeDepthEnabled:!1,renderOccluded:L.OccludeAndTransparent}),E.visualElements.zVerticalLine.apply(this._verticalLineVisualElement),i((()=>{this._activeVertexVisualElement=n(this._activeVertexVisualElement),this._verticalLineVisualElement=n(this._verticalLineVisualElement)})))}_updateVerticalLineVisualElement(e){const t=this._verticalLineVisualElement;if(a(t))return;const{renderCoordsHelper:i,elevationProvider:s}=this.view;p(M,e[0],e[1],e[2]),b.setFromElevationInfo(this.elevationInfo),M[2]=g(M,s,b,i);i.toRenderCoords(M,this.view.spatialReference,M)?(t.setStartEndFromWorldDownAtLocation(M),t.attached=!0):t.attached=!1}onOutlineChanged(e){if(s(this._outlineVisualElement))return this._outlineVisualElement.geometry=e,null;const t=this.internalGraphicsLayer.elevationInfo;return this._outlineVisualElement=new _({view:this.view,geometry:e,elevationInfo:t,isDraped:s(this._createGraphicState)?this._createGraphicState.isDraped:"on-the-ground"===v(this.hasZ,t),attached:!1}),E.visualElements.lineGraphics.outline.apply(this._outlineVisualElement),E.visualElements.lineGraphics.shadowStyle.apply(this._outlineVisualElement),this._outlineVisualElement.attached=!0,this._outlineVisualElement.laserlineEnabled=!0,i((()=>{this._outlineVisualElement=n(this._outlineVisualElement)}))}onRegularVerticesChanged(e){return s(this._verticesVisualElement)?(this._verticesVisualElement.vertices=e,null):(this._verticesVisualElement=new y({view:this.view,spatialReference:this.view.spatialReference,vertices:e,elevationInfo:this.internalGraphicsLayer.elevationInfo,renderOccluded:E.reshapeManipulators.vertex.renderOccluded,attached:!1}),this._verticesVisualElement.attached=!0,i((()=>{this._verticesVisualElement=n(this._verticesVisualElement)})))}};e([c({constructOnly:!0})],T.prototype,"elevationInfo",void 0),e([c({constructOnly:!0})],T.prototype,"geometryType",void 0),e([c()],T.prototype,"type",void 0),e([c({constructOnly:!0})],T.prototype,"view",void 0),T=e([h("esri.views.3d.interactive.editingTools.draw.DrawGraphicTool3D")],T);const b=new j,M=u();export{T as DrawGraphicTool3D};