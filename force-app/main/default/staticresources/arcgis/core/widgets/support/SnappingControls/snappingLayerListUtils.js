/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../../../core/maybe.js";import{getNormalizedChildLayerProperty as s}from"../../LayerList/support/layerListUtils.js";const r=e=>t(e)||a(e),t=e=>{if(!("type"in e))return!1;switch(e.type){case"feature":case"geojson":case"csv":case"graphics":case"wfs":case"map-notes":case"oriented-imagery":case"scene":case"building-scene":return!0;default:return!1}},a=t=>{const a=s(t);if(null!=a&&t.hasOwnProperty(a)&&e(t[a]))for(const e of t[a])if(r(e))return!0;return!1};export{r as isValidSnappingLayer,a as isValidSnappingLayerGroup,t as isValidSnappingLayerSource};