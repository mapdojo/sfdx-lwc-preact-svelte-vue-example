/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import r from"../../core/Error.js";import{isBlobProtocol as t}from"../../core/urlUtils.js";import{property as o}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as i}from"../../core/accessorSupport/decorators/subclass.js";import{writer as s}from"../../core/accessorSupport/decorators/writer.js";import{readLoadable as a}from"../../core/accessorSupport/read.js";import{willPropertyWrite as p}from"../../core/accessorSupport/write.js";import{supportedTypes as n}from"./operationalLayers.js";import{listMode as l,opacity as y}from"../support/commonProperties.js";const c=c=>{let u=class extends c{constructor(){super(...arguments),this.title=null}writeListMode(e,r,t,o){(o&&"ground"===o.layerContainerType||e&&p(this,t,{},o))&&(r[t]=e)}writeOperationalLayerType(e,r,t,o){!e||o&&"tables"===o.layerContainerType||(r.layerType=e)}writeTitle(e,r){r.title=e??"Layer"}read(e,r){r&&(r.layer=this),a(this,e,(r=>super.read(e,r)),r)}write(e,o){if(o?.origin){const e=`${o.origin}/${o.layerContainerType||"operational-layers"}`,t=n[e];let i=t&&t[this.operationalLayerType];if("ArcGISTiledElevationServiceLayer"===this.operationalLayerType&&"web-scene/operational-layers"===e&&(i=!1),"ArcGISDimensionLayer"===this.operationalLayerType&&"web-map/operational-layers"===e&&(i=!1),!i)return o.messages?.push(new r("layer:unsupported",`Layers (${this.title}, ${this.id}) of type '${this.declaredClass}' are not supported in the context of '${e}'`,{layer:this})),null}const i=super.write(e,{...o,layer:this}),s=!!o&&!!o.messages&&!!o.messages.filter((e=>e instanceof r&&"web-document-write:property-required"===e.name)).length;return t(i?.url)?(o?.messages?.push(new r("layer:invalid-url",`Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' using a Blob URL cannot be written to web scenes and web maps`,{layer:this})),null):!this.url&&s?null:i}beforeSave(){}};return e([o({type:String,json:{write:{ignoreOrigin:!0},origins:{"web-scene":{write:{isRequired:!0,ignoreOrigin:!0}},"portal-item":{write:!1}}}})],u.prototype,"id",void 0),e([o(l)],u.prototype,"listMode",void 0),e([s("listMode")],u.prototype,"writeListMode",null),e([o({type:String,readOnly:!0,json:{read:!1,write:{target:"layerType",ignoreOrigin:!0},origins:{"portal-item":{write:!1}}}})],u.prototype,"operationalLayerType",void 0),e([s("operationalLayerType")],u.prototype,"writeOperationalLayerType",null),e([o(y)],u.prototype,"opacity",void 0),e([o({type:String,json:{write:{ignoreOrigin:!0,writerEnsuresNonNull:!0},origins:{"web-scene":{write:{isRequired:!0,ignoreOrigin:!0,writerEnsuresNonNull:!0}},"portal-item":{write:!1}}},value:"Layer"})],u.prototype,"title",void 0),e([s("title"),s(["web-scene"],"title")],u.prototype,"writeTitle",null),e([o({type:Boolean,json:{name:"visibility"}})],u.prototype,"visible",void 0),u=e([i("esri.layers.mixins.OperationalLayer")],u),u};function u(e){return"operationalLayerType"in e}export{c as OperationalLayer,u as isOperationalLayer};