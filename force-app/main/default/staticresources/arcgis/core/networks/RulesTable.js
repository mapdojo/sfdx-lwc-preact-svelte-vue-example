/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import t from"../request.js";import{JSONSupportMixin as s}from"../core/JSONSupport.js";import o from"../core/Loadable.js";import{property as r}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as n}from"../core/accessorSupport/decorators/subclass.js";import{RuleType as i}from"./support/typeUtils.js";let a=class extends(s(o)){constructor(e){super(e),this.request=t}initialize(){}async load(e){const t=this.layer.load(e).then((()=>this._initializeRulesTable()));return this.addResolvingPromise(t),this}getFeatureSQL(e,t){const s=e.layerId.toString(),o=e.fieldsIndex?.normalizeFieldName("assetGroup"),r=e.fieldsIndex?.normalizeFieldName("assetType"),n=o?t.attributes[o]:null,i=r?t.attributes[r]:null,a=this.rulesHash[s];if(a){const e=a.assetGroupHash[n];if(e){const t=e.assetTypeHash[i];return t||null}}return null}async _initializeRulesTable(){const e={};let t;!function(e){e[e.from=0]="from",e[e.to=1]="to",e[e.via=2]="via"}(t||(t={}));const s=[{networkSourceId:"fromNetworkSource",assetGroupId:"fromAssetGroup",assetTypeId:"fromAssetType"},{networkSourceId:"toNetworkSource",assetGroupId:"toAssetGroup",assetTypeId:"toAssetType"},{networkSourceId:"viaNetworkSource",assetGroupId:"viaAssetGroup",assetTypeId:"viaAssetType"}];for(const o of this.rules){if(o.ruleType!==i.RTJunctionJunctionConnectivity&&o.ruleType!==i.RTJunctionEdgeConnectivity&&o.ruleType!==i.RTEdgeJunctionEdgeConnectivity)continue;let r=[[t.from,t.to],[t.to,t.from]];o.ruleType===i.RTEdgeJunctionEdgeConnectivity&&(r=[[t.from,t.via],[t.via,t.from],[t.to,t.via],[t.via,t.to]]);for(const n of r){const r=n.shift(),a=n.shift();let u=!1;switch(o.ruleType){case i.RTEdgeJunctionEdgeConnectivity:u=r===t.from||r===t.to;break;case i.RTJunctionEdgeConnectivity:u=r===t.to}const c=s[r],p=o[c.networkSourceId].layerId.toString(),d=o[c.assetGroupId]?.assetGroupCode?.toString(),l=o[c.assetTypeId]?.assetTypeCode?.toString(),y=s[a],f=o[y.networkSourceId].layerId.toString(),m=o[y.assetGroupId]?.assetGroupCode?.toString(),T=o[y.assetTypeId],h=T?.assetTypeCode?.toString(),v=e[p]?e[p]:{assetGroupHash:{}};if(!(d&&l&&m&&h))continue;const S=v.assetGroupHash[d]?v.assetGroupHash[d]:{assetTypeHash:{}},I=S.assetTypeHash[l]?S.assetTypeHash[l]:{};if(I[f]=I[f]?I[f]:{},u){I[p]=I[p]?I[p]:{};const e=`(assetgroup = ${d} AND assettype = ${l})`;I[p].anyVertex=I[p].anyVertex?`${I[p].anyVertex}`:`${e}`,"esriNECPEndVertex"===T.connectivityPolicy&&(I[p].endVertex=I[p]?.endVertex?`${I[p].endVertex}`:`${e}`)}const g=`(assetgroup = ${m} AND assettype = ${h})`;I[f].anyVertex=I[f]?.anyVertex?`${I[f].anyVertex} OR ${g}`:`${g}`,"esriNECPEndVertex"===T.connectivityPolicy&&(I[f].endVertex=I[f]?.endVertex?`${I[f].endVertex} OR ${g}`:`${g}`),S.assetTypeHash[l]=I,v.assetGroupHash[d]=S,e[p]=v}}this.rulesHash=e}};e([r({constructOnly:!0})],a.prototype,"layer",void 0),e([r({constructOnly:!0})],a.prototype,"rules",void 0),e([r()],a.prototype,"rulesHash",void 0),e([r({constructOnly:!0})],a.prototype,"request",void 0),a=e([n("esri.networks.RulesTable")],a);const u=a;export{u as default};