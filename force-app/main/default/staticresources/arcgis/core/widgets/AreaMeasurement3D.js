/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import{ignoreAbortErrors as t}from"../core/promiseUtils.js";import{isMeasurementSystem as s}from"../core/unitUtils.js";import{property as i}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as n}from"../core/accessorSupport/decorators/subclass.js";import r from"./Widget.js";import a from"./AreaMeasurement3D/AreaMeasurement3DViewModel.js";import{accessibleHandler as l}from"./support/decorators/accessibleHandler.js";import{messageBundle as o}from"./support/decorators/messageBundle.js";import{tsx as u}from"./support/jsxFactory.js";import"./support/widgetUtils.js";const m="esri-area-measurement-3d",p=`${m}__measurement`,c=`${m}__units`,d={buttonDisabled:"esri-button--disabled",base:`${m} esri-widget esri-widget--panel`,container:`${m}__container`,hint:`${m}__hint`,hintText:`${m}__hint-text`,panelError:`${m}__panel--error`,measurement:p,measurementItem:`${p}-item`,measurementItemDisabled:`${p}-item--disabled`,measurementItemTitle:`${p}-item-title`,measurementItemValue:`${p}-item-value`,settings:`${m}__settings`,units:c,unitsLabel:`${c}-label`,unitsSelect:`${c}-select esri-select`,unitsSelectWrapper:`${c}-select-wrapper`,actionSection:`${m}__actions`,newMeasurementButton:`${m}__clear-button esri-button esri-button--primary`,widgetIcon:"esri-icon-measure-area"};let v=class extends r{constructor(e,t){super(e,t),this.iconClass=d.widgetIcon,this.viewModel=new a}get view(){return this.viewModel.view}set view(e){this.viewModel.view=e}get visible(){return this.viewModel.visible}set visible(e){this.viewModel.visible=e}get active(){return this.viewModel.active}get analysis(){return this.viewModel.analysis}set analysis(e){this.viewModel.analysis=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get unitOptions(){return this.viewModel.unitOptions}set unitOptions(e){this.viewModel.unitOptions=e}get unit(){return this.viewModel.unit}set unit(e){this.viewModel.unit=e}render(){const{messages:e,messagesUnits:t}=this,{supported:i,active:n,measurement:r,state:a,unit:l}=this.viewModel,o="disabled"===a,m="measuring"===a||"measured"===a,p=n&&"ready"===a?u("section",{key:"esri-area-measurement-3d__hint",class:d.hint},u("p",{class:d.hintText},e.hint),u("p",{class:d.hintText},e.snappingDisablePromptAlternate)):null,c=i?null:u("section",{key:"esri-area-measurement-3d__unsupported",class:d.panelError},u("p",null,e.unsupported)),v=(t,s,i)=>{switch(s.state){case"available":return u("div",{key:`${i}-enabled`,class:d.measurementItem},u("span",{class:d.measurementItemTitle},t),u("span",{"aria-live":"polite",class:d.measurementItemValue},s.text));case"unavailable":return u("div",{key:`${i}-disabled`,class:this.classes(d.measurementItem,d.measurementItemDisabled)},u("span",{class:d.measurementItemTitle},t));case"invalid":return u("div",{key:`${i}-enabled`,class:d.measurementItem},u("span",{class:d.measurementItemTitle},t),u("span",{class:d.measurementItemValue},e.notApplicable))}},b=m&&r?u("section",{key:"esri-area-measurement-3d__measurement",class:d.measurement},v(e.area,r.area,"area"),v(e.perimeterLength,r.perimeterLength,"perimeter-length")):null,h=`${this.id}__units`,w=u("label",{class:d.unitsLabel,for:h},e.unit),y=u("div",{class:d.unitsSelectWrapper},u("select",{class:d.unitsSelect,id:h,onchange:this._changeUnit,bind:this,value:l},this.viewModel.unitOptions.map((e=>u("option",{key:e,value:e},s(e)?t.systems[e]:t.units[e]?.pluralCapitalized))))),g=m?u("section",{key:"esri-area-measurement-3d__units",class:d.units},w,y):null,_=m?u("div",{key:"settings",class:d.settings},g):null,M=!i||n&&!m?null:u("div",{class:d.actionSection},u("button",{bind:this,class:this.classes(d.newMeasurementButton,o&&d.buttonDisabled),disabled:o,onclick:this._newMeasurement,type:"button"},e.newMeasurement)),$=this.visible?u("div",{class:d.container},c,p,_,b,M):null;return u("div",{"aria-label":e.widgetLabel,key:this,class:d.base,role:"presentation"},$)}_newMeasurement(){t(this.viewModel.start())}_changeUnit(e){const t=e.target,s=t.options[t.selectedIndex];s&&(this.unit=s.value)}};e([i()],v.prototype,"view",null),e([i()],v.prototype,"visible",null),e([i()],v.prototype,"active",null),e([i({constructOnly:!0,nonNullable:!0})],v.prototype,"analysis",null),e([i()],v.prototype,"iconClass",void 0),e([i()],v.prototype,"label",null),e([i(),o("esri/widgets/AreaMeasurement3D/t9n/AreaMeasurement3D")],v.prototype,"messages",void 0),e([i(),o("esri/core/t9n/Units")],v.prototype,"messagesUnits",void 0),e([i()],v.prototype,"uiStrings",void 0),e([i({type:a})],v.prototype,"viewModel",void 0),e([i()],v.prototype,"unitOptions",null),e([i()],v.prototype,"unit",null),e([l()],v.prototype,"_newMeasurement",null),e([l()],v.prototype,"_changeUnit",null),v=e([n("esri.widgets.AreaMeasurement3D")],v);const b=v;export{b as default};