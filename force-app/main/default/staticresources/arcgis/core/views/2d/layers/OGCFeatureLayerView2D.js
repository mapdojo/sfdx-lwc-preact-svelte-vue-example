/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import"../../../core/Logger.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import"../../../core/Error.js";import"../../../core/has.js";import{subclass as e}from"../../../core/accessorSupport/decorators/subclass.js";import s from"./FeatureLayerView2D.js";import o from"../../layers/OGCFeatureLayerView.js";let t=class extends(o(s)){supportsSpatialReference(r){return this.layer.serviceSupportsSpatialReference(r)}};t=r([e("esri.views.2d.layers.OGCFeatureLayerView2D")],t);const a=t;export{a as default};