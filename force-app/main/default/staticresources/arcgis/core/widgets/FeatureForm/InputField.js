/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import"../../intl.js";import t from"../../core/Accessor.js";import{HandleOwnerMixin as i}from"../../core/HandleOwner.js";import{isSome as r,unwrap as s,isNone as o,get as l}from"../../core/maybe.js";import{generateUID as n}from"../../core/uid.js";import{property as a}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as u}from"../../core/accessorSupport/decorators/subclass.js";import{CodedValue as p}from"../../layers/support/CodedValue.js";import"../../core/has.js";import d from"../../layers/support/CodedValueDomain.js";import"../../layers/support/Domain.js";import"../../layers/support/InheritedDomain.js";import"../../layers/support/RangeDomain.js";import{validateDomainValue as m,DomainValidationError as y,getDomainRange as h}from"../../layers/support/domainUtils.js";import{isNumericField as c,isStringField as E,isDateField as f,TypeValidationError as g,validateFieldValue as v,getFeatureEditFields as x,getFeatureGeometryFields as b,NumericRangeValidationError as _,getFieldRange as V}from"../../layers/support/fieldUtils.js";import{getEffectiveLayerCapabilities as T}from"../../layers/support/layerUtils.js";import{getNormalizedFeatureTypeInfo as O,isFieldElementWithInputType as j}from"./featureFormUtils.js";import{substitute as D}from"../../intl/substitute.js";var A,F;!function(e){e.Text="text",e.Number="number",e.Date="date",e.Unsupported="unsupported"}(A||(A={})),function(e){e.TOO_SHORT="length-validation-error::too-short"}(F||(F={}));const N={type:"number"},U={type:"number",intlOptions:{notation:"scientific"}},L={type:"date",intlOptions:{day:"2-digit",month:"2-digit",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}},q="__internal-type-based-coded-value-domain__";function w(e){return e>=1e7||e<=-1e7}let I=class extends(i(t)){constructor(e){super(e),this._storedValue=null,this.arcadeEditType="NA",this.editableExpressionExecutor=null,this.id=n().toString(),this.requiredExpressionExecutor=null,this.valueExpressionExecutor=null,this.visibilityExpressionExecutor=null,this.feature=null,this.field=null,this.fieldElement=null,this.layer=null,this.error=null,this.group=null,this.messages=null}get _configAllowsEdits(){const{fieldElement:e,layer:t,name:i}=this;if(r(e))return e.editableExpression?this.evaluatedEditableExpression:!1!==e.editable;if(t.userHasUpdateItemPrivileges)return!0;return("popupTemplate"in t?t?.popupTemplate?.fieldInfos?.find((({fieldName:e})=>e===i)):null)?.isEditable??!0}get _layerFieldAllowsEdits(){const{field:e,layer:t}=this;if(!t||!e)return!1;const i=T(t),r=i?.operations.supportsEditing,s=e.editable,o=R(i,this.arcadeEditType);return!!(r&&s&&o)}get isUsingValueExpression(){return this._shouldUseValueExpression()}get evaluatedEditableExpression(){const{editableExpressionExecutor:e}=this;return r(e)?!!e.lastEvaluatedValue:null}get evaluatedRequiredExpression(){const{requiredExpressionExecutor:e}=this;return r(e)?!!e.lastEvaluatedValue:null}get evaluatedVisibilityExpression(){const{visibilityExpressionExecutor:e}=this;return r(e)?!!e.lastEvaluatedValue:null}get evaluatedValueExpression(){const{valueExpressionExecutor:e}=this;return r(e)?e.lastEvaluatedValue:null}set initialFeature(e){this._set("initialFeature",e),this.notifyChange("valid")}get description(){return s(this.fieldElement)?.description}get domain(){const{layer:e}=this,{typeFieldName:t,types:i}=O(e);if(t===this.name&&o(this.field.domain))return new d({name:q,codedValues:i.map((({code:e,name:t})=>new p({code:e,name:t})))});const{feature:s}=this,n=e.getFieldDomain(this.name,{feature:s}),a=l(this.fieldElement,"domain");return r(a)&&this._isDomainCompatible(a)?a:n}get editable(){return!!this._layerFieldAllowsEdits&&(this.evaluatedEditableExpression??this._configAllowsEdits)}get inputType(){return s(this.fieldElement)?.input?.type}get errorMessage(){return this._toErrorMessage()}get hint(){return s(this.fieldElement)?.hint}get includeTime(){const{fieldElement:e}=this,t=r(e)&&"datetime-picker"===e.input?.type?e.input.includeTime:void 0;return void 0===t||t}get label(){return r(this.fieldElement)&&this.fieldElement.label||this.field.alias||this.field.name}get maxLength(){const e=-1;if(this.type===A.Date)return e;const{field:t,fieldElement:i}=this,r=t?.length,s=S(i)?i.input.maxLength:NaN;return!isNaN(s)&&s>=e&&(r===e||s<=r)?s:r}get minLength(){const e=-1;if(this.type===A.Date)return e;const{field:t,fieldElement:i}=this,r=t?.length,s=S(i)?i.input.minLength:NaN;return!isNaN(s)&&s>=e&&(r===e||s<=r)?s:e}get name(){return this.field?.name}get required(){const{editable:e,evaluatedRequiredExpression:t,field:i,visible:s}=this;return!!e&&(!1===i?.nullable||!(!s||!r(t))&&t)}set required(e){this._overrideIfSome("required",e)}get submittable(){const{field:e,required:t,valid:i,value:r}=this;return(!t||!o(r))&&(!!i||this.initialFeature.getAttribute(e.name)===r)}get type(){const{field:e}=this;return c(e)?A.Number:E(e)?A.Text:f(e)?A.Date:A.Unsupported}get updating(){const{editableExpressionExecutor:e,valueExpressionExecutor:t}=this;return r(t)&&t.updating||r(e)&&e.updating}get valid(){const e=this.editable?this._validate():null;return this._set("error",e),null===e}get value(){if(this._shouldUseValueExpression()){const e=this.evaluatedValueExpression;if(this.type===A.Date){if(e instanceof Date)return e.getTime();if("number"!=typeof e)return parseInt(e,10)}return r(e)&&"object"==typeof e?e.toString():e}return this.get("_storedValue")}set value(e){this.notifyChange("evaluatedVisibilityExpression"),this.set("_storedValue",e)}get visible(){return!this._isEditorField()&&(r(this.evaluatedVisibilityExpression)?this.evaluatedVisibilityExpression:!!r(this.fieldElement)||this._isVisibleByDefault())}_isDomainCompatible(e){const{field:t}=this;if("coded-value"===e?.type){const i=typeof e.codedValues[0].code;if("string"===i&&E(t)||"number"===i&&c(t))return!0}return!!("range"===e?.type&&c(t)||f(t))}_validate(){const{domain:e,field:t,initialFeature:i,minLength:r,required:s,type:o,valid:l,value:n}=this,a=s&&null===n,u=void 0!==l;return!a&&i.getAttribute(t.name)===n&&u?null:a?g.INVALID_TYPE:"text"===o&&r>-1&&"string"==typeof n&&n.length<r?F.TOO_SHORT:e?null!==n||s?m(e,n):null:v(t,n)}_isVisibleByDefault(){const e=this.field?.type;return this.field?.visible&&"oid"!==e&&"global-id"!==e&&!this._isGeometryField()}_isEditorField(){return x(this.layer).includes(this.name)}_isGeometryField(){return b(this.layer).includes(this.name)}_shouldUseValueExpression(){return this._layerFieldAllowsEdits&&!this._configAllowsEdits&&r(this.valueExpressionExecutor)}_toErrorMessage(){const{domain:e,field:t,messages:i,minLength:r,value:s,required:o,type:l}=this,n=this.error;if(o&&null===s)return i.validationErrors.cannotBeNull;if(n===y.VALUE_OUT_OF_RANGE||n===_.OUT_OF_RANGE){const r=h(e)||V(t);return D(i.validationErrors.outsideRange,r,{format:{max:"date"===l?L:w(r.max)?U:N,min:"date"===l?L:w(r.min)?U:N}})}return n===y.INVALID_CODED_VALUE?i.validationErrors.invalidCodedValue:n===g.INVALID_TYPE?i.validationErrors.invalidType:n===F.TOO_SHORT?D(i.validationErrors.tooShort,{min:r}):null}};e([a()],I.prototype,"_storedValue",void 0),e([a()],I.prototype,"_configAllowsEdits",null),e([a()],I.prototype,"_layerFieldAllowsEdits",null),e([a()],I.prototype,"arcadeEditType",void 0),e([a()],I.prototype,"editableExpressionExecutor",void 0),e([a()],I.prototype,"requiredExpressionExecutor",void 0),e([a()],I.prototype,"valueExpressionExecutor",void 0),e([a()],I.prototype,"isUsingValueExpression",null),e([a()],I.prototype,"visibilityExpressionExecutor",void 0),e([a()],I.prototype,"evaluatedEditableExpression",null),e([a()],I.prototype,"evaluatedRequiredExpression",null),e([a()],I.prototype,"evaluatedVisibilityExpression",null),e([a()],I.prototype,"evaluatedValueExpression",null),e([a()],I.prototype,"feature",void 0),e([a()],I.prototype,"field",void 0),e([a({constructOnly:!0})],I.prototype,"fieldElement",void 0),e([a()],I.prototype,"initialFeature",null),e([a()],I.prototype,"layer",void 0),e([a({readOnly:!0})],I.prototype,"description",null),e([a()],I.prototype,"domain",null),e([a()],I.prototype,"editable",null),e([a({readOnly:!0})],I.prototype,"inputType",null),e([a({readOnly:!0})],I.prototype,"error",void 0),e([a({dependsOn:["error","messages","value"]})],I.prototype,"errorMessage",null),e([a()],I.prototype,"group",void 0),e([a({readOnly:!0})],I.prototype,"hint",null),e([a()],I.prototype,"includeTime",null),e([a()],I.prototype,"label",null),e([a()],I.prototype,"maxLength",null),e([a()],I.prototype,"minLength",null),e([a()],I.prototype,"messages",void 0),e([a({readOnly:!0})],I.prototype,"name",null),e([a()],I.prototype,"required",null),e([a()],I.prototype,"submittable",null),e([a()],I.prototype,"type",null),e([a()],I.prototype,"updating",null),e([a()],I.prototype,"valid",null),e([a({value:null})],I.prototype,"value",null),e([a()],I.prototype,"visible",null),I=e([u("esri.widgets.FeatureForm.InputField")],I);const R=(e,t)=>{if(!e)return!0;const{operations:i}=e;switch(t){case"INSERT":return i.supportsAdd;case"UPDATE":case"DELETE":return i.supportsUpdate;default:return!0}},S=e=>r(e)&&(j(e,"text-box")||j(e,"text-area")),C=I;export{C as default};