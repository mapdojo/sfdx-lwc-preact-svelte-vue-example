/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../core/Error.js";import{clone as r}from"../../core/lang.js";import o from"../../core/Logger.js";import t from"./LabelClass.js";const n=o.getLogger("esri.layers.support.labelingInfo"),l=/\[([^\[\]]+)\]/gi;function i(e,r,o){return e?e.map((e=>{const n=new t;if(n.read(e,o),n.labelExpression){const e=r.fields||r.layerDefinition&&r.layerDefinition.fields||this.fields;n.labelExpression=n.labelExpression.replace(l,((r,o)=>`[${s(o,e)}]`))}return n})):null}function s(e,r){if(!r)return e;const o=e.toLowerCase();for(let t=0;t<r.length;t++){const e=r[t].name;if(e.toLowerCase()===o)return e}return e}const a={esriGeometryPoint:["above-right","above-center","above-left","center-center","center-left","center-right","below-center","below-left","below-right"],esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:["center-along"],esriGeometryMultipoint:null};function c(e,o){const t=r(e);return t.some((e=>f(e,o)))?[]:t}function f(r,o){const t=r.labelPlacement,l=a[o];if(!r.symbol)return n.warn("No ILabelClass symbol specified."),!0;if(!l)return n.error(new e("labeling:unsupported-geometry-type",`Unable to create labels for layer, geometry type '${o}' is not supported`)),!0;if(!l.includes(t)){const e=l[0];t&&n.warn(`Found invalid label placement type ${t} for ${o}. Defaulting to ${e}`),r.labelPlacement=e}return!1}export{i as reader,c as validateLabelingInfo};