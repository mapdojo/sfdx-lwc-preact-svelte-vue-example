/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as r}from"../../../../core/maybe.js";import{c as e}from"../../../../chunks/vec4.js";import{f as t}from"../../../../chunks/vec4f64.js";import{Object3DVisualElement as i}from"./Object3DVisualElement.js";import{createSquareGeometry as a}from"../../webgl-engine/lib/GeometryUtil.js";import{RenderOccludedFlag as s}from"../../webgl-engine/lib/Material.js";import{SlicePlaneMaterial as d}from"../../webgl-engine/materials/SlicePlaneMaterial.js";class l extends i{constructor(r){super(r),this._material=null,this._renderOccluded=s.OccludeAndTransparent,this._gridWidth=1,this._gridColor=t(1,0,0,1),this._backgroundColor=t(1,0,0,1),this.applyProps(r)}get renderOccluded(){return this._renderOccluded}set renderOccluded(r){r!==this._renderOccluded&&(this._renderOccluded=r,this._updateMaterial())}get gridWidth(){return this._gridWidth}set gridWidth(r){this._gridWidth!==r&&(this._gridWidth=r,this._updateMaterial())}get gridColor(){return this._gridColor}set gridColor(r){e(this._gridColor,r),this._updateMaterial()}get backgroundColor(){return this._backgroundColor}set backgroundColor(r){e(this._backgroundColor,r),this._updateMaterial()}createExternalResources(){this._material=new d(this._materialParameters)}destroyExternalResources(){this._material=null}forEachExternalMaterial(e){r(this._material)&&e(this._material)}createGeometries(e){if(r(this._material)){const r=a(this._material);e.addGeometry(r)}}get _materialParameters(){return{backgroundColor:this._backgroundColor,gridWidth:this._gridWidth,gridColor:this._gridColor,renderOccluded:this._renderOccluded}}_updateMaterial(){r(this._material)&&this._material.setParameters(this._materialParameters)}}export{l as SlicePlaneVisualElement};