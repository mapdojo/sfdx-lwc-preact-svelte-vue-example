/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"./chunks/tslib.es6.js";import{ClonableMixin as e}from"./core/Clonable.js";import o from"./core/Collection.js";import{JSONSupport as s}from"./core/JSONSupport.js";import{clone as r}from"./core/lang.js";import i from"./core/Logger.js";import{isPromiseLike as n}from"./core/promiseUtils.js";import{property as p}from"./core/accessorSupport/decorators/property.js";import{cast as l}from"./core/accessorSupport/decorators/cast.js";import{reader as a}from"./core/accessorSupport/decorators/reader.js";import{subclass as d}from"./core/accessorSupport/decorators/subclass.js";import{writer as c}from"./core/accessorSupport/decorators/writer.js";import{ensureOneOfType as f}from"./core/accessorSupport/ensureType.js";import{collectFields as m,collectArcadeFieldNames as u}from"./layers/support/fieldUtils.js";import{persistableTypes as h}from"./popup/content.js";import y from"./popup/ExpressionInfo.js";import I from"./popup/FieldInfo.js";import F from"./popup/LayerOptions.js";import _ from"./popup/RelatedRecordsInfo.js";import{types as x}from"./popup/content/support/mediaInfoTypes.js";import g from"./support/actions/ActionBase.js";import w from"./support/actions/ActionButton.js";import A from"./support/actions/ActionToggle.js";import C from"./popup/content/MediaContent.js";import N from"./popup/content/TextContent.js";import j from"./popup/content/AttachmentsContent.js";import E from"./popup/content/FieldsContent.js";import O from"./popup/content/ExpressionContent.js";import R from"./popup/content/RelationshipContent.js";import S from"./popup/content/Content.js";import v from"./popup/content/CustomContent.js";const T="esri.PopupTemplate",b=i.getLogger(T),J="relationships/",L="expression/",B=o.ofType({key:"type",defaultKeyValue:"button",base:g,typeMap:{button:w,toggle:A}}),M={base:S,key:"type",typeMap:{media:C,custom:v,text:N,attachments:j,fields:E,expression:O,relationship:R}},P=["attachments","fields","media","text","expression","relationship"];let $=class extends(e(s)){constructor(){super(...arguments),this.actions=null,this.content="",this.expressionInfos=null,this.fieldInfos=null,this.layerOptions=null,this.lastEditInfoEnabled=!0,this.outFields=null,this.overwriteActions=!1,this.returnGeometry=!1,this.title=""}castContent(t){return Array.isArray(t)?t.map((t=>f(M,t))):"string"==typeof t||"function"==typeof t||t instanceof HTMLElement||n(t)?t:(b.error("content error","unsupported content value",{value:t}),null)}readContent(t,e){const{popupElements:o}=e;return Array.isArray(o)&&o.length>0?this._readPopupInfoElements(e.description,e.mediaInfos,o):this._readPopupInfo(e)}writeContent(t,e,o,s){"string"!=typeof t?Array.isArray(t)&&(e.popupElements=t.filter((t=>P.includes(t.type))).map((t=>t&&t.toJSON(s))),e.popupElements.forEach((t=>{"attachments"===t.type?this._writeAttachmentContent(e):"media"===t.type?this._writeMediaContent(t,e):"text"===t.type?this._writeTextContent(t,e):"relationship"===t.type&&this._writeRelationshipContent(t,e)}))):e.description=t}writeFieldInfos(t,e,o,s){const{content:r}=this,i=Array.isArray(r)?r:null;if(t){const o=i?i.filter((t=>"fields"===t.type)):[],r=o.length&&o.every((t=>t.fieldInfos?.length));e.fieldInfos=t.filter(Boolean).map((t=>{const e=t.toJSON(s);return r&&(e.visible=!1),e}))}if(i)for(const n of i)"fields"===n.type&&this._writeFieldsContent(n,e)}writeLayerOptions(t,e,o,s){e[o]=!t||null===t.showNoDataRecords&&null===t.returnTopmostRaster?null:t.toJSON(s)}writeTitle(t,e){e.title=t||""}async collectRequiredFields(t,e){const o=this.expressionInfos||[];await this._collectExpressionInfoFields(t,e,[...o,...this._getContentExpressionInfos(this.content,o)]),m(t,e,[...this.outFields||[],...this._getActionsFields(this.actions),...this._getTitleFields(this.title),...this._getContentFields(this.content)])}async getRequiredFields(t){const e=new Set;return await this.collectRequiredFields(e,t),[...e].sort()}_writeFieldsContent(t,e){if(!Array.isArray(t.fieldInfos)||!t.fieldInfos.length)return;const o=r(t.fieldInfos);Array.isArray(e.fieldInfos)?o.forEach((t=>{const o=e.fieldInfos.find((e=>e.fieldName.toLowerCase()===t.fieldName.toLowerCase()));o?o.visible=!0:e.fieldInfos.push(t)})):e.fieldInfos=o}_writeAttachmentContent(t){t.showAttachments||(t.showAttachments=!0)}_writeRelationshipContent(t,e){const o=t.orderByFields?.map((e=>this._toFieldOrderJSON(e,t.relationshipId)))||[],s=[...e.relatedRecordsInfo?.orderByFields||[],...o];e.relatedRecordsInfo={showRelatedRecords:!0,...s?.length&&{orderByFields:s}}}_writeTextContent(t,e){!e.description&&t.text&&(e.description=t.text)}_writeMediaContent(t,e){if(!Array.isArray(t.mediaInfos)||!t.mediaInfos.length)return;const o=r(t.mediaInfos);Array.isArray(e.mediaInfos)?e.mediaInfos=[...e.mediaInfos,...o]:e.mediaInfos=o}_readPopupInfoElements(t,e,o){const s={description:!1,mediaInfos:!1};return o.map((o=>"media"===o.type?(o.mediaInfos||!e||s.mediaInfos||(o.mediaInfos=e,s.mediaInfos=!0),C.fromJSON(o)):"text"===o.type?(o.text||!t||s.description||(o.text=t,s.description=!0),N.fromJSON(o)):"attachments"===o.type?j.fromJSON(o):"fields"===o.type?E.fromJSON(o):"expression"===o.type?O.fromJSON(o):"relationship"===o.type?R.fromJSON(o):void 0)).filter(Boolean)}_toRelationshipContent(t){const{field:e,order:o}=t;if(!e?.startsWith(J))return null;const s=e.replace(J,"").split("/");if(2!==s.length)return null;const r=parseInt(s[0],10),i=s[1];return"number"==typeof r&&i?R.fromJSON({relationshipId:r,orderByFields:[{field:i,order:o}]}):null}_toFieldOrderJSON(t,e){const{order:o,field:s}=t;return{field:`${J}${e}/${s}`,order:o}}_readPopupInfo({description:t,mediaInfos:e,showAttachments:o,relatedRecordsInfo:s={showRelatedRecords:!1}}){const r=[];t?r.push(new N({text:t})):r.push(new E),Array.isArray(e)&&e.length&&r.push(C.fromJSON({mediaInfos:e})),o&&r.push(j.fromJSON({displayType:"auto"}));const{showRelatedRecords:i,orderByFields:n}=s;return i&&n?.length&&n.forEach((t=>{const e=this._toRelationshipContent(t);e&&r.push(e)})),r.length?r:t}_getContentElementFields(t){const e=t?.type;if("attachments"===e)return[...this._extractFieldNames(t.title),...this._extractFieldNames(t.description)];if("custom"===e)return t.outFields||[];if("fields"===e)return[...this._extractFieldNames(t.title),...this._extractFieldNames(t.description),...this._getFieldInfoFields(t.fieldInfos??this.fieldInfos)];if("media"===e){const e=t.mediaInfos||[];return[...this._extractFieldNames(t.title),...this._extractFieldNames(t.description),...e.reduce(((t,e)=>[...t,...this._getMediaInfoFields(e)]),[])]}return"text"===e?this._extractFieldNames(t.text):[]}_getMediaInfoFields(t){const{caption:e,title:o,value:s}=t,r=s||{},{fields:i,normalizeField:n,tooltipField:p,sourceURL:l,linkURL:a}=r,d=[...this._extractFieldNames(o),...this._extractFieldNames(e),...this._extractFieldNames(l),...this._extractFieldNames(a),...i??[]];return n&&d.push(n),p&&d.push(p),d}_getContentExpressionInfos(t,e){return Array.isArray(t)?t.reduce(((t,e)=>[...t,..."expression"===e.type&&e.expressionInfo?[e.expressionInfo]:[]]),e):[]}_getContentFields(t){return"string"==typeof t?this._extractFieldNames(t):Array.isArray(t)?t.reduce(((t,e)=>[...t,...this._getContentElementFields(e)]),[]):[]}async _collectExpressionInfoFields(t,e,o){o&&await Promise.all(o.map((o=>u(t,e,o.expression))))}_getFieldInfoFields(t){return t?t.filter((t=>void 0===t.visible||!!t.visible)).map((t=>t.fieldName)).filter((t=>!t.startsWith(J)&&!t.startsWith(L))):[]}_getActionsFields(t){return t?t.toArray().reduce(((t,e)=>[...t,...this._getActionFields(e)]),[]):[]}_getActionFields(t){const{className:e,title:o,type:s}=t,r="button"===s||"toggle"===s?t.image:"";return[...this._extractFieldNames(o),...this._extractFieldNames(e),...this._extractFieldNames(r)]}_getTitleFields(t){return"string"==typeof t?this._extractFieldNames(t):[]}_extractFieldNames(t){if(!t||"string"!=typeof t)return[];const e=/{[^}]*}/g,o=t.match(e);if(!o)return[];const s=/\{(\w+):.+\}/,r=o.filter((t=>!(0===t.indexOf(`{${J}`)||0===t.indexOf(`{${L}`)))).map((t=>t.replace(s,"{$1}")));return r?r.map((t=>t.slice(1,-1))):[]}};t([p({type:B})],$.prototype,"actions",void 0),t([p()],$.prototype,"content",void 0),t([l("content")],$.prototype,"castContent",null),t([a("content",["description","fieldInfos","popupElements","mediaInfos","showAttachments","relatedRecordsInfo"])],$.prototype,"readContent",null),t([c("content",{popupElements:{type:o.ofType(h)},showAttachments:{type:Boolean},mediaInfos:{type:o.ofType(x)},description:{type:String},relatedRecordsInfo:{type:_}})],$.prototype,"writeContent",null),t([p({type:[y],json:{write:!0}})],$.prototype,"expressionInfos",void 0),t([p({type:[I]})],$.prototype,"fieldInfos",void 0),t([c("fieldInfos")],$.prototype,"writeFieldInfos",null),t([p({type:F})],$.prototype,"layerOptions",void 0),t([c("layerOptions")],$.prototype,"writeLayerOptions",null),t([p({type:Boolean,json:{read:{source:"showLastEditInfo"},write:{target:"showLastEditInfo"},default:!0}})],$.prototype,"lastEditInfoEnabled",void 0),t([p()],$.prototype,"outFields",void 0),t([p()],$.prototype,"overwriteActions",void 0),t([p()],$.prototype,"returnGeometry",void 0),t([p({json:{type:String}})],$.prototype,"title",void 0),t([c("title")],$.prototype,"writeTitle",null),$=t([d("esri.PopupTemplate")],$);const k=$;export{k as default};