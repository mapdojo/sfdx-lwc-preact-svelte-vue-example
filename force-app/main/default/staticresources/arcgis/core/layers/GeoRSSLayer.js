/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import o from"../config.js";import r from"../request.js";import"../symbols.js";import{isSome as t}from"../core/maybe.js";import{MultiOriginJSONMixin as s}from"../core/MultiOriginJSONSupport.js";import{throwIfAbortError as i}from"../core/promiseUtils.js";import{getFilename as l}from"../core/urlUtils.js";import{property as p}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{reader as n}from"../core/accessorSupport/decorators/reader.js";import{subclass as a}from"../core/accessorSupport/decorators/subclass.js";import m from"../geometry/Extent.js";import{isWGS84 as y}from"../geometry/support/spatialReferenceUtils.js";import c from"./Layer.js";import{BlendLayer as u}from"./mixins/BlendLayer.js";import{OperationalLayer as d}from"./mixins/OperationalLayer.js";import{PortalLayer as f}from"./mixins/PortalLayer.js";import{RefreshableLayer as h}from"./mixins/RefreshableLayer.js";import{ScaleRangeLayer as S}from"./mixins/ScaleRangeLayer.js";import{id as g,legendEnabled as j,url as b}from"./support/commonProperties.js";import v from"../symbols/Symbol.js";import x from"../symbols/SimpleLineSymbol.js";import C from"../symbols/PictureMarkerSymbol.js";import P from"../symbols/SimpleMarkerSymbol.js";import G from"../symbols/SimpleFillSymbol.js";const L=["atom","xml"],R={base:v,key:"type",typeMap:{"simple-line":x},errorContext:"symbol"},k={base:v,key:"type",typeMap:{"picture-marker":C,"simple-marker":P},errorContext:"symbol"},_={base:v,key:"type",typeMap:{"simple-fill":G},errorContext:"symbol"};let w=class extends(u(h(d(f(S(s(c))))))){constructor(...e){super(...e),this.description=null,this.fullExtent=null,this.legendEnabled=!0,this.lineSymbol=null,this.pointSymbol=null,this.polygonSymbol=null,this.operationalLayerType="GeoRSS",this.url=null,this.type="geo-rss"}normalizeCtorArgs(e,o){return"string"==typeof e?{url:e,...o}:e}readFeatureCollections(e,o){return o.featureCollection.layers.forEach((e=>{const o=e.layerDefinition.drawingInfo.renderer.symbol;o&&"esriSFS"===o.type&&o.outline?.style.includes("esriSFS")&&(o.outline.style="esriSLSSolid")})),o.featureCollection.layers}get hasPoints(){return this._hasGeometry("esriGeometryPoint")}get hasPolylines(){return this._hasGeometry("esriGeometryPolyline")}get hasPolygons(){return this._hasGeometry("esriGeometryPolygon")}get title(){const e=this._get("title");return e&&"defaults"!==this.originOf("title")?e:this.url?l(this.url,L)||"GeoRSS":e||""}set title(e){this._set("title",e)}load(e){const o=t(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service","Feature Service","Feature Collection","Scene Service"]},e).catch(i).then((()=>this._fetchService(o))).then((e=>{this.read(e,{origin:"service"})}))),Promise.resolve(this)}async hasDataChanged(){const e=await this._fetchService();return this.read(e,{origin:"service",ignoreDefaults:!0}),!0}async _fetchService(e){const t=this.spatialReference,{data:s}=await r(o.geoRSSServiceUrl,{query:{url:this.url,refresh:!!this.loaded||void 0,outSR:y(t)?void 0:t.wkid??JSON.stringify(t)},signal:e});return s}_hasGeometry(e){return this.featureCollections?.some((o=>o.featureSet?.geometryType===e&&o.featureSet.features?.length>0))??!1}};e([p()],w.prototype,"description",void 0),e([p()],w.prototype,"featureCollections",void 0),e([n("service","featureCollections",["featureCollection.layers"])],w.prototype,"readFeatureCollections",null),e([p({type:m,json:{name:"lookAtExtent"}})],w.prototype,"fullExtent",void 0),e([p(g)],w.prototype,"id",void 0),e([p(j)],w.prototype,"legendEnabled",void 0),e([p({types:R,json:{write:!0}})],w.prototype,"lineSymbol",void 0),e([p({type:["show","hide"]})],w.prototype,"listMode",void 0),e([p({types:k,json:{write:!0}})],w.prototype,"pointSymbol",void 0),e([p({types:_,json:{write:!0}})],w.prototype,"polygonSymbol",void 0),e([p({type:["GeoRSS"]})],w.prototype,"operationalLayerType",void 0),e([p(b)],w.prototype,"url",void 0),e([p({json:{origins:{service:{read:{source:"name",reader:e=>e||void 0}}}}})],w.prototype,"title",null),e([p({readOnly:!0,json:{read:!1},value:"geo-rss"})],w.prototype,"type",void 0),w=e([a("esri.layers.GeoRSSLayer")],w);const F=w;export{F as default};