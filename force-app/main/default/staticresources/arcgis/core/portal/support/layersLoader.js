/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../core/Error.js";import t from"../../layers/Layer.js";import{isArcGISUrl as r}from"../../layers/support/arcgisLayerUrl.js";import{fetchFeatureService as a}from"../../layers/support/fetchService.js";import n from"../Portal.js";import o from"../PortalItem.js";import{createForItemRead as l}from"./jsonContext.js";import{hasTypeKeyword as s}from"./portalItemUtils.js";import{loadStyleRenderer as i}from"../../renderers/support/styleUtils.js";import{fetchArcGISServiceJSON as u}from"../../support/requestPresets.js";async function p(e,t){const r=e.instance.portalItem;if(r&&r.id)return await r.load(t),c(e),y(e,t)}function c(t){const r=t.instance.portalItem;if(!r?.type||!t.supportedTypes.includes(r.type))throw new e("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}'",{type:r?.type,expectedType:t.supportedTypes.join(", ")})}async function y(e,t){const r=e.instance,a=r.portalItem;if(!a)return;const{url:n,title:o}=a,s=l(a);if("group"===r.type)return r.read({title:o},s),d(r,e);n&&r.read({url:n},s);const u=await h(e,t);return u&&r.read(u,s),r.resourceReferences={portalItem:a,paths:s.readResourcePaths??[]},"subtype-group"!==r.type&&r.read({title:o},s),i(r,s)}async function d(t,r){let a;const{portalItem:n}=t;if(!n)return;const o=n.type,l=r.layerModuleTypeMap,i=s(n,"Oriented Imagery Layer")??!1;switch(o){case"Feature Service":a=i?l.OrientedImageryLayer:l.FeatureLayer;break;case"Stream Service":a=l.StreamLayer;break;case"Scene Service":a=l.SceneLayer;break;case"Feature Collection":a=l.FeatureLayer;break;default:throw new e("portal:unsupported-item-type-as-group",`The item type '${o}' is not supported as a 'IGroupLayer'`)}let[u,p]=await Promise.all([a(),h(r)]),c=()=>u;if("Feature Service"===o){p=n.url?await w(p,n.url):{};if(j(p).length){const e=l.SubtypeGroupLayer,t=await e();c=e=>"SubtypeGroupLayer"===e.layerType?t:u}return b(t,c,p,await P(n.url))}return v(p)>0?b(t,c,p):f(t,c)}async function f(e,t){const{portalItem:r}=e;if(!r?.url)return;const a=await u(r.url);a&&b(e,t,{layers:a.layers?.map(m),tables:a.tables?.map(m)})}function m(e){return{id:e.id,name:e.name}}function b(e,t,r,a){let n=r.layers||[];const o=r.tables||[];if("Feature Collection"===e.portalItem?.type&&(n.forEach((e=>{"Table"===e?.layerDefinition?.type&&o.push(e)})),n=n.filter((e=>"Table"!==e?.layerDefinition?.type))),"coverage"in r){const t=T(r);t&&e.add(t)}n.reverse().forEach((n=>{const o=g(e,t(n),r,n,a?.(n));e.add(o)})),o.reverse().forEach((n=>{const o=g(e,t(n),r,n,a?.(n));e.tables.add(o)}))}function g(e,t,r,a,o){const l=e.portalItem,s=new t({portalItem:l.clone(),layerId:a.id});if("sourceJSON"in s&&(s.sourceJSON=o),"subtype-group"!==s.type&&(s.sublayerTitleMode="service-name"),"Feature Collection"===l.type){const e={origin:"portal-item",portal:l.portal||n.getDefault()};s.read(a,e);const t=r.showLegend;null!=t&&s.read({showLegend:t},e)}return s}async function h(e,t){if(!1===e.supportsData)return;const r=e.instance,a=r.portalItem;if(!a)return;let n=null;try{n=await a.fetchData("json",t)}catch(o){}if(S(r)){let e=null,t=!0;if(n&&v(n)>0){if(null==r.layerId){const e=j(n);r.layerId="subtype-group"===r.type?e?.[0]:I(n)}e=L(n,r),e&&(1===v(n)&&(t=!1),null!=n.showLegend&&(e.showLegend=n.showLegend))}return t&&"service-name"!==r.sublayerTitleMode&&(r.sublayerTitleMode="item-title-and-service-name"),e}return n}async function w(e,t){if(null==e?.layers||null==e?.tables){const r=await u(t);(e=e||{}).layers=e.layers||r?.layers,e.tables=e.tables||r?.tables}return e}function I(e){const t=e.layers;if(t&&t.length)return t[0].id;const r=e.tables;return r&&r.length?r[0].id:null}function L(e,t){const{layerId:r}=t,a=e.layers?.find((e=>e.id===r))||e.tables?.find((e=>e.id===r));return a&&F(a,t)?a:null}function v(e){return(e?.layers?.length??0)+(e?.tables?.length??0)}function S(e){return"stream"!==e.type&&"oriented-imagery"!==e.type&&"layerId"in e}function T(a){const{coverage:n}=a;if(!n)return null;const l=new URL(n);if(n.toLowerCase().includes("item.html")){const e=l.searchParams.get("id"),r=l.origin;return t.fromPortalItem({portalItem:new o({id:e,url:r})})}if(r(n))return t.fromArcGISServerUrl({url:n});throw new e("portal:oriented-imagery-layer-coverage","the provided coverage url couldn't be loaded as a layer")}function j(e){const t=[];return e?.layers?.forEach((e=>{"SubtypeGroupLayer"===e.layerType&&t.push(e.id)})),t}function F(e,t){return!("feature"===t.type&&"layerType"in e&&"SubtypeGroupLayer"===e.layerType||"subtype-group"===t.type&&!("layerType"in e))}async function P(e){const{layersJSON:t}=await a(e);if(!t)return null;const r=[...t.layers,...t.tables];return e=>r.find((t=>t.id===e.id))}export{I as getFirstLayerOrTableId,v as getNumLayersAndTables,j as getSubtypeGroupLayerIds,p as load,w as preprocessFSItemData};