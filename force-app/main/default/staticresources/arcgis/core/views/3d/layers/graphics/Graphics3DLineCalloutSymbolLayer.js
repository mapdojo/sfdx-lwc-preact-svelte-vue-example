/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../../Color.js";import{isSome as t,isNone as r}from"../../../../core/maybe.js";import{pt2px as i}from"../../../../core/screenUtils.js";import{Z as a,a as n}from"../../../../chunks/vec2f64.js";import{c as s}from"../../../../chunks/vec3f64.js";import{c as o}from"../../../../chunks/vec4f64.js";import{textSymbolLayerSupportsVerticalOffset as l}from"../../../../symbols/callouts/calloutUtils.js";import{perObjectElevationAligner as c}from"./ElevationAligners.js";import{SymbolUpdateType as m,elevationModeChangeUpdateType as h,needsElevationUpdates2D as d}from"./elevationAlignmentUtils.js";import{ElevationContext as p}from"./ElevationContext.js";import f from"./Graphics3DGraphicCreationContext.js";import{Graphics3DObject3DGraphicLayer as u}from"./Graphics3DObject3DGraphicLayer.js";import{Graphics3DObjectMetadata as g}from"./Graphics3DObjectMetadata.js";import{Graphics3DSymbolLayer as y}from"./Graphics3DSymbolLayer.js";import{computeCentroid as v}from"./graphicUtils.js";import{createStageObject as b,extendPointGraphicElevationContext as C}from"./pointUtils.js";import{emptySymbolComplexity as _}from"./symbolComplexity.js";import{Attribute as O}from"../../webgl-engine/lib/Attribute.js";import{ContentObjectType as x}from"../../webgl-engine/lib/ContentObjectType.js";import{Geometry as P}from"../../webgl-engine/lib/Geometry.js";import{VertexAttribute as j}from"../../webgl-engine/lib/VertexAttribute.js";import{LineCalloutMaterial as E,Parameters as U}from"../../webgl-engine/materials/LineCalloutMaterial.js";class w extends y{constructor(e,t){super(e,null,t,S),this._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!1},this.ensureDrapedStatus(!1)}async doLoad(){this._material=new E(this._materialParameters),this._context.stage.add(this._material)}destroy(){super.destroy(),this._context.stage.remove(this._material),this._material=null}_perInstanceMaterialParameters(e){const t=this._materialParameters;return t.screenOffset=e.screenOffset||a,t.centerOffsetUnits=e.centerOffsetUnits||"world",t}get _materialParameters(){const r=new U,a=this.symbol,n=a.callout;if(r.color=t(n.color)?e.toUnitRGBA(n.color):[0,0,0,0],r.color[3]*=this._getLayerOpacity(),r.size=i(n.size||0),a.verticalOffset){const{screenLength:e,minWorldLength:n,maxWorldLength:s}=a.verticalOffset;r.verticalOffset={screenLength:i(e),minWorldLength:n||0,maxWorldLength:t(s)?s:1/0}}r.borderColor=t(n.border)&&t(n.border.color)?e.toUnitRGBA(n.border.color):null;const s="object"===a.symbolLayers.getItemAt(0).type,o="label-3d"===a.type;return r.occlusionTest=!s,r.shaderPolygonOffset=s?0:void 0,r.depthHUDAlignStart=o,r.hasSlicePlane=this._context.slicePlaneEnabled,r.screenSizePerspective=this._context.screenSizePerspectiveEnabled?this._context.sharedResources.screenSizePerspectiveSettings:null,r}_defaultElevationInfoNoZ(){return L}createGraphics3DGraphic(e){const t=e.renderingInfo,i=e.graphic,a=this.setGraphicElevationContext(i,new p,t.elevationOffset||0),n=t.symbol,s="on-the-ground"===this._elevationContext.mode&&("cim"===n.type||!n.symbolLayers.some((e=>"object"===e.type||"text"===e.type)));if("label-3d"!==n.type&&s)return null;if("point-3d"===n.type&&n.symbolLayers.every((e=>"text"===e.type&&!l(e))))return null;const o=v(i.geometry);return r(o)?null:this._createAs3DShape(o,a,t,i.uid)}layerOpacityChanged(){t(this._material)&&this._material.setParameters(this._materialParameters)}layerElevationInfoChanged(e,r,i){const a=this._elevationContext.mode,n=h(w.elevationModeChangeTypes,i,a);return n!==m.UPDATE||e.forEach((e=>{const i=r(e);t(i)&&this.updateGraphicElevationContext(e.graphic,i)})),n}slicePlaneEnabledChanged(){return r(this._material)||this._material.setParameters({hasSlicePlane:this._context.slicePlaneEnabled}),!0}physicalBasedRenderingChanged(){return!0}pixelRatioChanged(){return!0}skipHighSymbolLodsChanged(){return!0}setGraphicElevationContext(e,t,r=0){const i=super.setGraphicElevationContext(e,t);return i.addOffsetRenderUnits(r),i}updateGraphicElevationContext(e,r){this.setGraphicElevationContext(e,r.elevationContext,t(r.metadata)?r.metadata.elevationOffset:0),r.needsElevationUpdates=d(r.elevationContext.mode)}computeComplexity(){return{primitivesPerFeature:2,primitivesPerCoordinate:0,drawCallsPerFeature:0,estimated:!1,memory:_.memory}}_createVertexData(e){const{translation:t,centerOffset:r}=e,i=new O(t?[t[0],t[1],t[2]]:[0,0,0],3,!0),a=new O(r?[r[0],r[1],r[2],r[3]]:[0,0,0,1],4,!0);return[[j.POSITION,i],[j.NORMAL,new O([0,0,1],3,!0)],[j.AUXPOS1,a]]}_getOrCreateMaterial(e){const i=this._perInstanceMaterialParameters(e),a=E.uniqueMaterialIdentifier(i);if(t(this._material)&&a===this._material.uniqueMaterialIdentifier)return{material:this._material,isUnique:!1};if(t(e.materialCollection)){let t=e.materialCollection.get(a);return r(t)&&(t=new E(i),e.materialCollection.add(a,t)),{material:t,isUnique:!1}}return{material:new E(i),isUnique:!0}}_createAs3DShape(e,t,i,a){const n=this._context.layer.uid,s=this._context.stage.renderView.getObjectAndLayerIdColor({graphicUid:a,layerUid:n}),o=this._getOrCreateMaterial(i),l=new P(o.material,this._createVertexData(i),G,null,x.Point,s),m=b(this._context,e,l,t,a);if(r(m))return null;const h=new u(this,m.object,[l],o.isUnique?[o.material]:null,null,c,t);return h.metadata=new g(i.elevationOffset),h.alignedSampledElevation=m.sampledElevation,h.needsElevationUpdates=d(t.mode),C(h,e,this._context.elevationProvider),h}}w.elevationModeChangeTypes={definedChanged:m.UPDATE,staysOnTheGround:m.UPDATE,onTheGroundChanged:m.RECREATE};const A=[0],G=[[j.POSITION,A],[j.NORMAL,A],[j.AUXPOS1,A]],L={mode:"relative-to-ground",offset:0},S={ignoreDrivers:!0,renderPriority:0,renderPriorityStep:1};class D{constructor(e,t,r=s(),i=o(),a=n(),l="world",c=0,m=null){this.renderer=e,this.symbol=t,this.translation=r,this.centerOffset=i,this.screenOffset=a,this.centerOffsetUnits=l,this.elevationOffset=c,this.materialCollection=m}}class I extends f{}export{w as Graphics3DLineCalloutSymbolLayer,I as LineCalloutCreationContext,D as LineCalloutSymbolLayerRenderingInfo};