/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import has from"../../../core/has.js";import{isSome as r}from"../../../core/maybe.js";import{watch as s,initial as i}from"../../../core/reactiveUtils.js";import"../../../core/Logger.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import"../../../core/Error.js";import{subclass as t}from"../../../core/accessorSupport/decorators/subclass.js";import a from"../../../layers/support/FeatureFilter.js";import n from"./FeatureLayerView2D.js";function l(e,r){return!e.visible||0!==e.minScale&&r>e.minScale||0!==e.maxScale&&r<e.maxScale}let o=class extends n{initialize(){this.addHandles([s((()=>this.view.scale),(()=>this._update()),i)],"constructor")}isUpdating(){const e=this.layer.sublayers.some((e=>null!=e.renderer)),r=this._commandsQueue.updating,s=null!=this._updatingRequiredFieldsPromise,i=!this._proxy||!this._proxy.isReady,t=this._pipelineIsUpdating,a=null==this.tileRenderer||this.tileRenderer?.updating,n=e&&(r||s||i||t||a);return has("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${n}\n  -> hasRenderer ${e}\n  -> hasPendingCommand ${r}\n  -> updatingRequiredFields ${s}\n  -> updatingProxy ${i}\n  -> updatingPipeline ${t}\n  -> updatingTileRenderer ${a}\n`),n}_injectOverrides(e){let s=super._injectOverrides(e);const i=this.view.scale,t=this.layer.sublayers.filter((e=>l(e,i))).map((e=>e.subtypeCode));if(!t.length)return s;s=r(s)?s:(new a).toJSON();const n=`NOT ${this.layer.subtypeField} IN (${t.join(",")})`;return s.where=s.where?`(${s.where}) AND (${n})`:n,s}_setLayersForFeature(e){const r=this.layer.fieldsIndex.get(this.layer.subtypeField),s=e.attributes[r.name],i=this.layer.sublayers.find((e=>e.subtypeCode===s));e.layer=e.sourceLayer=i}_createSchemaConfig(){const e={subtypeField:this.layer.subtypeField,sublayers:Array.from(this.layer.sublayers).map((e=>({featureReduction:null,geometryType:this.layer.geometryType,labelingInfo:e.labelingInfo,labelsVisible:e.labelsVisible,renderer:e.renderer,subtypeCode:e.subtypeCode,orderBy:null})))},r=this.layer.sublayers.map((e=>e.subtypeCode)).join(","),s=this.layer.sublayers.length?`${this.layer.subtypeField} IN (${r})`:"1=2";let i=this.layer.definitionExpression?this.layer.definitionExpression+" AND ":"";return i+=s,{...super._createSchemaConfig(),...e,definitionExpression:i}}};o=e([t("esri.views.2d.layers.SubtypeGroupLayerView2D")],o);const u=o;export{u as default};