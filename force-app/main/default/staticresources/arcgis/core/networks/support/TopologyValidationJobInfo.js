/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../request.js";import"../../core/has.js";import{strict as s}from"../../core/jsonMap.js";import{createAbortError as r}from"../../core/promiseUtils.js";import{property as i}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{enumeration as o}from"../../core/accessorSupport/decorators/enumeration.js";import{subclass as a}from"../../core/accessorSupport/decorators/subclass.js";import{editEventBus as c}from"../../layers/mixins/EditBusLayer.js";import n from"../../rest/networks/support/ValidateNetworkTopologyResult.js";const l=s()({Pending:"job-waiting",InProgress:"job-executing",Completed:"job-succeeded"});let m=class extends n{constructor(e){super(e),this.featureServiceUrl=null,this.statusUrl=null,this.status=null,this.submissionTime=null,this.lastUpdatedTime=null,this._timer=void 0}destroy(){clearInterval(this._timer)}async checkJobStatus(e){const s={...e,query:{f:"json"}},{data:r}=await t(this.statusUrl,s);if(this.read(r),(this.serviceEdits||this.exceededTransferLimit)&&this.featureServiceUrl){const e={edits:null,addedFeatures:[],updatedFeatures:[],deletedFeatures:[],addedAttachments:[],updatedAttachments:[],deletedAttachments:[],exceededTransferLimit:!0};c.emit("edits",{serviceUrl:this.featureServiceUrl??"",layerId:null,event:e})}return this}async waitForJobCompletion(e={}){const{interval:t=1e3,statusCallback:s}=e;return new Promise(((e,i)=>{this._clearTimer();const o=setInterval((()=>{this._timer||i(r()),this.checkJobStatus().then((t=>{const{status:r}=t;switch(this.status=r,r){case"job-succeeded":this._clearTimer(),e(this);break;case"job-waiting":case"job-executing":s&&s(this)}}),(e=>{this._clearTimer(),i(e)}))}),t);this._timer=o}))}_clearTimer(){clearInterval(this._timer),this._timer=void 0}};e([i()],m.prototype,"featureServiceUrl",void 0),e([i({type:String,json:{write:!0}})],m.prototype,"statusUrl",void 0),e([o(l)],m.prototype,"status",void 0),e([i({type:Date,json:{type:Number,write:{writer:(e,t)=>{t.submissionTime=e?e.getTime():null}}}})],m.prototype,"submissionTime",void 0),e([i({type:Date,json:{type:Number,write:{writer:(e,t)=>{t.lastUpdatedTime=e?e.getTime():null}}}})],m.prototype,"lastUpdatedTime",void 0),m=e([a("esri.networks.support.TopologyValidationJobInfo")],m);const u=m;export{u as default};