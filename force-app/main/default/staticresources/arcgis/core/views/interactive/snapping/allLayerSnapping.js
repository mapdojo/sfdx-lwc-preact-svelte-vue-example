/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../core/Collection.js";import{watch as t,initial as i}from"../../../core/reactiveUtils.js";import r from"./FeatureSnappingLayerSource.js";import{defaults as o}from"./Settings.js";import n from"./SnappingOptions.js";function a(a,s){const l=new n({enabled:!0,selfEnabled:!1,featureEnabled:!0,distance:s?.distance??o.distance,touchSensitivityMultiplier:s?.touchSensitivityMultiplier??o.touchSensitivityMultiplier});return{...t((()=>a.map?.allLayers?.toArray()??[]),(t=>{l.featureSources=new e(t.map((e=>new r({layer:e,enabled:!0}))))}),i),options:l}}export{a as makeAllLayerSnappingOptions};