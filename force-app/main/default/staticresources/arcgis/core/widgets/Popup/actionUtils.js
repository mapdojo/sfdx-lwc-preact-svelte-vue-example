/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../core/Error.js";import t from"../../core/Logger.js";import{isSome as r,isNone as o}from"../../core/maybe.js";import{throwIfNotAbortError as i}from"../../core/promiseUtils.js";import{zoomToFeature as n,zoomToClusteredFeatures as a,browseClusteredFeatures as s,removeSelectedFeature as c}from"./actions.js";const u="esri.widgets.Popup.PopupViewModel",l=t.getLogger(u),d=t=>{const{event:r,view:o}=t,{action:u}=r,l=o&&o.popup;if(!u)return Promise.reject(new e("trigger-action:missing-arguments","Event has no action"));if(!l)return Promise.reject(new e("trigger-action:missing-arguments","view.popup is missing"));const{disabled:d,id:g}=u;if(!g)return Promise.reject(new e("trigger-action:invalid-action","action.id is missing"));if(d)return Promise.reject(new e("trigger-action:invalid-action","Action is disabled"));if(g===n.id)return p(l.viewModel).catch(i);if(g===a.id)return m(l.viewModel);if(g===s.id)return l.featureMenuOpen=!l.featureMenuOpen,l.viewModel.browseClusterEnabled=!l.viewModel.browseClusterEnabled,Promise.resolve();if(l.viewModel.browseClusterEnabled=!1,g===c.id){l.close();const{selectedFeature:t}=l;if(!t)return Promise.reject(new e(`trigger-action:${c.id}`,"selectedFeature is required",{selectedFeature:t}));const{sourceLayer:r}=t;return r?r.remove(t):o.graphics.remove(t),Promise.resolve()}return Promise.resolve()};function g(e){const{selectedFeature:t,location:r,view:o}=e;if(!o)return null;if("3d"===o.type)return t??r??null;return e.get("selectedFeature.geometry")||r}function w(e){return!!e&&e.isAggregate&&"cluster"===e.sourceLayer?.featureReduction?.type}async function f(e,t){if("3d"!==t?.type||!e||"esri.Graphic"!==e.declaredClass)return!0;const r=t.getViewForGraphic(e);if(r&&"whenGraphicBounds"in r){let t;try{t=await r.whenGraphicBounds(e,{useViewElevation:!0})}catch(o){}return!t||!t.boundingBox||t.boundingBox[0]===t.boundingBox[3]&&t.boundingBox[1]===t.boundingBox[4]&&t.boundingBox[2]===t.boundingBox[5]}return!0}async function p(t){const{location:o,selectedFeature:i,view:a,zoomFactor:s}=t,c=g(t);if(!a||!c){const t=new e("zoom-to:invalid-target-or-view","Cannot zoom to location without a target and view.",{target:c,view:a});throw l.error(t),t}const u=a.scale/s,d=t.selectedFeature?.geometry,w=d??o,p=r(w)&&"point"===w.type&&await f(i,a);n.active=!0,n.disabled=!0;try{await t.zoomTo({target:{target:c,scale:p?u:void 0}})}catch(m){const t=new e("zoom-to:invalid-graphic","Could not zoom to the location of the graphic.",{graphic:i});l.error(t)}finally{n.active=!1,n.disabled=!1,t.zoomToLocation=null,p&&(t.location=w)}}async function m(t){const{selectedFeature:r,view:o}=t;if("2d"!==o?.type){const t=new e("zoomToCluster:invalid-view","View must be 2d MapView.",{view:o});throw l.error(t),t}if(!r||!w(r)){const t=new e("zoomToCluster:invalid-selectedFeature","Selected feature must represent an aggregate/cluster graphic.",{selectedFeature:r});throw l.error(t),t}const[i,n]=await h(o,r);a.active=!0,a.disabled=!0;const{extent:s}=await i.queryExtent(n);await t.zoomTo({target:s}),a.active=!1,a.disabled=!1}async function v(e){const{view:t,selectedFeature:r}=e;if(!t||!r)return;const[o,i]=await h(t,r),{extent:n}=await o.queryExtent(i);e.selectedClusterBoundaryFeature.geometry=n,t.graphics.add(e.selectedClusterBoundaryFeature)}async function y(e){const{selectedFeature:t,view:r}=e;if(!r||!t)return;const[o,i]=await h(r,t);s.active=!0,s.disabled=!0;const{features:n}=await o.queryFeatures(i);s.active=!1,s.disabled=!1,r.popup?.open({features:[t].concat(n),featureMenuOpen:!0})}async function h(e,t){const r=await e.whenLayerView(t.sourceLayer),o=r.createQuery(),i=t.getObjectId();return o.aggregateIds=null!=i?[i]:[],[r,o]}function b(e){const t=e.features.filter((e=>w(e)));t.length&&(e.features=t)}function F(e){if(o(e))return null;switch(e.type){case"point":return e;case"extent":return e.center;case"polygon":return e.centroid;case"multipoint":case"polyline":return e.extent?.center;default:return null}}export{y as browseAggregateFeatures,v as displayClusterExtent,F as getPointFromGeometry,g as getSelectedTarget,w as isClusterFeature,b as removeClusteredFeaturesForBrowsing,d as triggerAction,m as zoomToClusterExtent,p as zoomToLocation};