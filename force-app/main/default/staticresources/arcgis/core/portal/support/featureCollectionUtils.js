/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function e(e){return t(e,"notes")}function r(e){return t(e,"markup")}function n(e){return t(e,"route")}function t(e,r){return!(!e.layerType||"ArcGISFeatureLayer"!==e.layerType)&&e.featureCollectionType===r}export{e as isMapNotesLayer,r as isMarkupLayer,n as isRouteLayer};