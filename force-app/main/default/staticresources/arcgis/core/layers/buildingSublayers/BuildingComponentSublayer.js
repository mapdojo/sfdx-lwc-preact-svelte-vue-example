/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import r from"../../Graphic.js";import t from"../../PopupTemplate.js";import"../../renderers/ClassBreaksRenderer.js";import"../../renderers/DictionaryRenderer.js";import"../../renderers/DotDensityRenderer.js";import"../../renderers/HeatmapRenderer.js";import"../../renderers/PieChartRenderer.js";import"../../renderers/Renderer.js";import"../../renderers/SimpleRenderer.js";import"../../renderers/UniqueValueRenderer.js";import"../../renderers/support/jsonUtils.js";import{webSceneRendererTypes as o}from"../../renderers/support/types.js";import s from"../../request.js";import i from"../../core/Error.js";import{JSONMap as a}from"../../core/jsonMap.js";import n from"../../core/Loadable.js";import p from"../../core/Logger.js";import{isSome as l,isNone as d}from"../../core/maybe.js";import{EsriPromiseMixin as y}from"../../core/Promise.js";import{property as u}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{enumeration as c}from"../../core/accessorSupport/decorators/enumeration.js";import{reader as m}from"../../core/accessorSupport/decorators/reader.js";import{subclass as h}from"../../core/accessorSupport/decorators/subclass.js";import f from"../../geometry/Extent.js";import g from"../../geometry/SpatialReference.js";import j from"../FeatureLayer.js";import v from"./BuildingSublayer.js";import{zeroCapabilities as b}from"../support/capabilities.js";import{popupEnabled as L}from"../support/commonProperties.js";import{defineFieldProperties as S}from"../support/fieldProperties.js";import I from"../support/FieldsIndex.js";import{unpackFieldNames as F}from"../support/fieldUtils.js";import{fetchIndexInfo as w}from"../support/I3SIndexInfo.js";import{I3SNodePageDefinition as x,I3SMaterialDefinition as O,I3STextureSetDefinition as T,I3SGeometryDefinition as q}from"../support/I3SLayerDefinitions.js";import R from"../../rest/support/Query.js";import{createPopupTemplate as P}from"../../support/popupUtils.js";import U from"../../symbols/support/ElevationInfo.js";import{queryAttributesFromCachedAttributesId as D}from"../../views/3d/layers/i3s/I3SUtil.js";import{getRequiredFields as Q,getFetchPopupTemplate as E}from"../../views/layers/support/popupUtils.js";const A="esri.layers.buildingSublayers.BuildingComponentSublayer",_=p.getLogger(A),C=S();let N=class extends(n.LoadableMixin(y(v))){constructor(e){super(e),this.type="building-component",this.nodePages=null,this.materialDefinitions=[],this.textureSetDefinitions=[],this.geometryDefinitions=[],this.indexInfo=null,this.serviceUpdateTimeStamp=null,this.store=null,this.attributeStorageInfo=[],this.fields=[],this.associatedLayer=null,this.outFields=null,this.listMode="show",this.renderer=null,this.definitionExpression=null,this.popupEnabled=!0,this.popupTemplate=null,this.layerType="3d-object"}get parsedUrl(){return this.layer?{path:`${this.layer.parsedUrl?.path}/sublayers/${this.id}`,query:this.layer.parsedUrl?.query}:{path:""}}get fieldsIndex(){return new I(this.fields)}readAssociatedLayer(e,r){const t=this.layer.associatedFeatureServiceItem,o=r.associatedLayerID;return l(t)&&"number"==typeof o?new j({portalItem:t,layerId:o}):null}get objectIdField(){if(null!=this.fields)for(const e of this.fields)if("oid"===e.type)return e.name;return null}get displayField(){return l(this.associatedLayer)?this.associatedLayer.displayField:void 0}get apiKey(){return this.layer.apiKey}get fullExtent(){return this.layer.fullExtent}get spatialReference(){return this.layer.spatialReference}get version(){return this.layer.version}get elevationInfo(){return this.layer.elevationInfo}get minScale(){return this.layer.minScale}get maxScale(){return this.layer.maxScale}get effectiveScaleRange(){return this.layer.effectiveScaleRange}get defaultPopupTemplate(){return this.createPopupTemplate()}load(e){const r=l(e)?e.signal:null,t=this._fetchService(r).then((()=>{this.indexInfo=w(this.parsedUrl.path,this.rootNode,this.nodePages,this.apiKey,_,r)}));return this.addResolvingPromise(t),Promise.resolve(this)}createPopupTemplate(e){return P(this,e)}async _fetchService(e){const r=(await s(this.parsedUrl.path,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(r,{origin:"service",url:this.parsedUrl})}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,r){const t=this.getFeatureType(r?.feature)?.domains?.[e];return t&&"inherited"!==t.type?t:this.getField(e)?.domain??null}getFeatureType(e){return e&&l(this.associatedLayer)?this.associatedLayer.getFeatureType(e):null}get types(){return l(this.associatedLayer)?this.associatedLayer.types??[]:[]}get typeIdField(){return l(this.associatedLayer)?this.associatedLayer.typeIdField:null}get geometryType(){return"3d-object"===this.layerType?"mesh":"point"}get profile(){return"3d-object"===this.layerType?"mesh-pyramids":"points"}get capabilities(){const e=l(this.associatedLayer)&&this.associatedLayer.capabilities?this.associatedLayer.capabilities:b,{query:r,data:{supportsZ:t,supportsM:o,isVersioned:s}}=e;return{query:r,data:{supportsZ:t,supportsM:o,isVersioned:s}}}createQuery(){const e=new R;return"mesh"!==this.geometryType&&(e.returnGeometry=!0,e.returnZ=!0),e.where=this.definitionExpression||"1=1",e.sqlFormat="standard",e}queryExtent(e,r){return this._getAssociatedLayerForQuery().then((t=>t.queryExtent(e||this.createQuery(),r)))}queryFeatureCount(e,r){return this._getAssociatedLayerForQuery().then((t=>t.queryFeatureCount(e||this.createQuery(),r)))}queryFeatures(e,r){return this._getAssociatedLayerForQuery().then((t=>t.queryFeatures(e||this.createQuery(),r))).then((e=>{if(e?.features)for(const r of e.features)r.layer=this.layer,r.sourceLayer=this;return e}))}queryObjectIds(e,r){return this._getAssociatedLayerForQuery().then((t=>t.queryObjectIds(e||this.createQuery(),r)))}async queryCachedAttributes(e,r){const t=F(this.fieldsIndex,await Q(this,E(this)));return D(this.parsedUrl.path,this.attributeStorageInfo,e,r,t)}async queryCachedFeature(e,t){const o=await this.queryCachedAttributes(e,[t]);if(!o||0===o.length)throw new i("scenelayer:feature-not-in-cached-data","Feature not found in cached data");const s=new r;return s.attributes=o[0],s.layer=this,s.sourceLayer=this,s}getFieldUsageInfo(e){return this.fieldsIndex.has(e)?{supportsLabelingInfo:!1,supportsRenderer:!1,supportsPopupTemplate:!1,supportsLayerQuery:!1}:{supportsLabelingInfo:!1,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:l(this.associatedLayer)}}_getAssociatedLayerForQuery(){const e=this.associatedLayer;return l(e)&&e.loaded?Promise.resolve(e):this._loadAssociatedLayerForQuery()}async _loadAssociatedLayerForQuery(){if(await this.load(),d(this.associatedLayer))throw new i("buildingscenelayer:query-not-available","BuildingSceneLayer component layer queries are not available without an associated feature layer",{layer:this});try{await this.associatedLayer.load()}catch(e){throw new i("buildingscenelayer:query-not-available","BuildingSceneLayer associated feature layer could not be loaded",{layer:this,error:e})}return this.associatedLayer}};e([u({readOnly:!0})],N.prototype,"parsedUrl",null),e([u({type:x,readOnly:!0})],N.prototype,"nodePages",void 0),e([u({type:[O],readOnly:!0})],N.prototype,"materialDefinitions",void 0),e([u({type:[T],readOnly:!0})],N.prototype,"textureSetDefinitions",void 0),e([u({type:[q],readOnly:!0})],N.prototype,"geometryDefinitions",void 0),e([u({readOnly:!0})],N.prototype,"serviceUpdateTimeStamp",void 0),e([u({readOnly:!0})],N.prototype,"store",void 0),e([u({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],N.prototype,"rootNode",void 0),e([u({readOnly:!0})],N.prototype,"attributeStorageInfo",void 0),e([u(C.fields)],N.prototype,"fields",void 0),e([u({readOnly:!0})],N.prototype,"fieldsIndex",null),e([u({readOnly:!0,type:j})],N.prototype,"associatedLayer",void 0),e([m("service","associatedLayer",["associatedLayerID"])],N.prototype,"readAssociatedLayer",null),e([u(C.outFields)],N.prototype,"outFields",void 0),e([u({type:String,readOnly:!0})],N.prototype,"objectIdField",null),e([u({readOnly:!0,type:String,json:{read:!1}})],N.prototype,"displayField",null),e([u({readOnly:!0,type:String})],N.prototype,"apiKey",null),e([u({readOnly:!0,type:f})],N.prototype,"fullExtent",null),e([u({readOnly:!0,type:g})],N.prototype,"spatialReference",null),e([u({readOnly:!0})],N.prototype,"version",null),e([u({readOnly:!0,type:U})],N.prototype,"elevationInfo",null),e([u({readOnly:!0,type:Number})],N.prototype,"minScale",null),e([u({readOnly:!0,type:Number})],N.prototype,"maxScale",null),e([u({readOnly:!0,type:Number})],N.prototype,"effectiveScaleRange",null),e([u({type:["hide","show"],json:{write:!0}})],N.prototype,"listMode",void 0),e([u({types:o,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:!0},value:null})],N.prototype,"renderer",void 0),e([u({type:String,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],N.prototype,"definitionExpression",void 0),e([u(L)],N.prototype,"popupEnabled",void 0),e([u({type:t,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],N.prototype,"popupTemplate",void 0),e([u({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],N.prototype,"normalReferenceFrame",void 0),e([u({readOnly:!0,json:{read:!1}})],N.prototype,"defaultPopupTemplate",null),e([u()],N.prototype,"types",null),e([u()],N.prototype,"typeIdField",null),e([u({json:{write:!1}}),c(new a({"3DObject":"3d-object",Point:"point"}))],N.prototype,"layerType",void 0),e([u()],N.prototype,"geometryType",null),e([u()],N.prototype,"profile",null),e([u({readOnly:!0,json:{read:!1}})],N.prototype,"capabilities",null),N=e([h(A)],N);const M=N;export{M as default};