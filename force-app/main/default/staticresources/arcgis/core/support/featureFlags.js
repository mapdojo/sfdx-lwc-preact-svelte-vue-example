/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import has from"../core/has.js";const e=()=>!!has("enable-feature:force-wosr"),a=()=>!!has("enable-feature:direct-3d-object-feature-layer-display"),r=()=>has.cache["enable-feature:direct-3d-object-feature-layer-display"]=!0,t=()=>!!has("enable-feature:SceneLayer-editing"),c=()=>{has.cache["enable-feature:SceneLayer-editing"]=!0,r()};export{a as enableDirect3DObjectFeatureLayerDisplay,c as enableSceneLayerEditing,e as enableWebStyleForceWOSR,t as sceneLayerEditingEnabled,r as turnOnDirect3DObjectFeatureLayerDisplay};