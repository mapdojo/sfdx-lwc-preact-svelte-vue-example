/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import"../intl.js";import i from"../core/Handles.js";import{destroyMaybe as t,isNone as s,applySome as o,isSome as a,unwrap as r}from"../core/maybe.js";import{watch as l,syncAndInitial as n}from"../core/reactiveUtils.js";import{convertTime as d}from"../core/timeUtils.js";import{property as m}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as c}from"../core/accessorSupport/decorators/subclass.js";import{substitute as p}from"../intl/substitute.js";import h from"./Slider.js";import u from"./Widget.js";import{CSS as v}from"./ShadowCast/css.js";import{ShadowCastState as w}from"./ShadowCast/ShadowCastState.js";import g from"./ShadowCast/ShadowCastViewModel.js";import f from"./ShadowCast/ShadowCastVisibleElements.js";import{ShadowVisualizationType as b}from"./ShadowCast/ShadowVisualizationType.js";import{DiscreteConfigurator as S}from"./ShadowCast/components/DiscreteConfigurator.js";import{DurationConfigurator as _}from"./ShadowCast/components/DurationConfigurator.js";import{ShadowTooltip as y}from"./ShadowCast/components/ShadowTooltip.js";import{ThresholdConfigurator as C}from"./ShadowCast/components/ThresholdConfigurator.js";import{TimezonePicker as M}from"./ShadowCast/components/TimezonePicker.js";import T from"./support/DatePicker.js";import{Heading as j}from"./support/Heading.js";import{formatSliderLabel as k}from"./support/timeWidgetUtils.js";import"./support/widgetUtils.js";import{messageBundle as D}from"./support/decorators/messageBundle.js";import{tsx as z}from"./support/jsxFactory.js";import{formatDate as V}from"../intl/date.js";var O;!function(e){e.Slider="slider"}(O||(O={}));const R={hour:"2-digit",minute:"2-digit",timeZone:"UTC"},L=/(.*)\s(.*)/,P={labelFormatFunction:k,min:0,max:1439,steps:15,rangeLabelInputsEnabled:!1,visibleElements:{labels:!1,rangeLabels:!1},tickConfigs:[{mode:"position",values:[0,360,720,1080,1439],labelsVisible:!0,tickCreatedFunction:(e,i,t)=>{i.classList.add(v.timeRangePrimaryTick),t.classList.add(v.timeRangePrimaryTickLabel);const s=t.innerText.match(L);s&&(t.innerHTML=`${s[1]}<br><div class="${v.timeRangeAMPMLabel}">${s[2]}</div>`)}},{mode:"position",values:[120,240,480,600,840,960,1200,1320],tickCreatedFunction:(e,i)=>{i.classList.add(v.timeRangeSecondaryTick)}}]};let E=class extends u{constructor(e,t){super(e,t),this.viewModel=null,this.headingLevel=4,this.iconClass=v.widgetIcon,this.visibleElements=new f,this._handles=new i,this._defaultViewModel=null,this._timeSlider=new h({...P,container:document.createElement("div")}),this._tooltip=null,this._onTimezoneChange=e=>{this.viewModel.utcOffset=e},this._onDateChange=e=>{this.viewModel.date=e},e?.viewModel||(this._defaultViewModel=new g({view:e?.view}),this.viewModel=this._defaultViewModel)}initialize(){this._handles.add([l((()=>({viewModel:this.viewModel,slider:this._timeSlider})),(e=>this._connectTimeSlider(e)),n),l((()=>({container:o(this.view,(e=>e.surface)),viewModel:this.viewModel,tooltipVisible:this.visibleElements.tooltip})),(({container:e,viewModel:i,tooltipVisible:o})=>{this._tooltip=t(this._tooltip),!s(e)&&o&&(this._tooltip=new y({viewModel:i,container:e}))}),n),l((()=>({viewModel:this.viewModel,visible:this.visible})),(({viewModel:e,visible:i})=>e.setRunning(i)),n)])}destroy(){this._handles=t(this._handles),this._timeSlider=t(this._timeSlider),a(this._defaultViewModel)&&this.viewModel!==this._defaultViewModel&&this._defaultViewModel.destroy()}loadDependencies(){return Promise.all([import("@esri/calcite-components/dist/components/calcite-select.js"),import("@esri/calcite-components/dist/components/calcite-option.js")])}render(){const{visibleElements:e,viewModel:i}=this,t=i.state===w.Disabled;return z("div",{key:this,class:this.classes(v.base,v.esriWidget,{[v.esriWidgetDisabled]:t})},this._renderTimeRangeSection(),e.visualizationOptions&&this._renderVisualizationOptionsSection())}get view(){return this.viewModel?.view}set view(e){this.viewModel&&(this.viewModel.view=e)}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get testData(){return{tooltip:this._tooltip}}_connectTimeSlider({viewModel:e,slider:i}){if(this._handles.remove(O.Slider),s(i))return;const t=e=>d(e,"milliseconds","minutes"),o=e=>d(e,"minutes","milliseconds"),a=({index:i,value:t})=>{0===i?e.startTimeOfDay=o(t):e.endTimeOfDay=o(t)};this._handles.add([l((()=>[e.startTimeOfDay,e.endTimeOfDay]),(e=>{i.values=e.map(t)}),n),i.on("thumb-change",a),i.on("thumb-drag",a),i.on("segment-drag",(()=>{[e.startTimeOfDay,e.endTimeOfDay]=i.values.map(o)}))],O.Slider)}_renderTimeRangeSection(){const{visibleElements:e}=this;return e.timeRangeSlider||e.datePicker?z("section",{key:"time-range",class:v.timeRange},z(j,{level:this.headingLevel},this.messages.timeLabel),e.timeRangeSlider&&this._renderTimeRange(),e.datePicker&&this._renderDatePicker()):null}_renderTimeRange(){const{messages:e,viewModel:i,visibleElements:t}=this,{startTimeOfDay:s,endTimeOfDay:o}=i,[a,r]=[s,o].map((e=>V(new Date(e),R)));return[z("div",{key:"time-range-indicator",class:v.timeRangeIndicator},p(e.timeRange,{start:a,end:r}),t.timezone&&z(M,{value:i.utcOffset,onChange:this._onTimezoneChange})),z("div",{key:"time-slider-container",bind:this,afterCreate:this._timeSliderContainerAfterCreate,afterRemoved:this._timeSliderContainerAfterRemoved})]}_timeSliderContainerAfterCreate(e){const i=r(this._timeSlider)?.container;i&&e.appendChild(i)}_timeSliderContainerAfterRemoved(e){const i=r(this._timeSlider)?.container;i&&e.removeChild(i)}_renderDatePicker(){return z("div",{key:"date-picker",class:v.datePickerContainer},z(T,{value:this.viewModel.date,onChange:this._onDateChange}))}_renderVisualizationOptionsSection(){const{headingLevel:e,messages:i,viewModel:t,visibleElements:s}=this,o=s.colorPicker,a=e=>this.classes(t.visualizationType===e?null:v.visualizationConfigHidden);return z("section",{key:"visualization",class:v.visualization},z(j,{level:e},i.visualizationLabel),this._renderVisualizationSelect(),z("div",{key:"threshold-configurator",class:a(b.Threshold)},z(C,{options:t.thresholdOptions,colorPickerVisible:o})),z("div",{key:"duration-configurator",class:a(b.Duration)},z(_,{options:t.durationOptions,colorPickerVisible:o})),z("div",{key:"discrete-configurator",class:a(b.Discrete)},z(S,{options:t.discreteOptions,colorPickerVisible:o})))}_renderVisualizationSelect(){const e=this.messages,i=this.viewModel.visualizationType;return z("calcite-select",{class:v.visualizationSelect,key:"visualization-select",label:e.visualizationLabel,bind:this,onCalciteSelectChange:this._onVisualizationTypeChange},[{type:b.Threshold,label:e.threshold.label},{type:b.Duration,label:e.duration.label},{type:b.Discrete,label:e.discrete.label}].map((({type:e,label:t})=>z("calcite-option",{value:e,selected:e===i},t))))}_onVisualizationTypeChange(e){const i=e.target.selectedOption?.value;this.viewModel.visualizationType=i??b.Threshold}};e([m()],E.prototype,"viewModel",void 0),e([m()],E.prototype,"view",null),e([m()],E.prototype,"headingLevel",void 0),e([m()],E.prototype,"iconClass",void 0),e([m()],E.prototype,"label",null),e([m({type:f,nonNullable:!0})],E.prototype,"visibleElements",void 0),e([m(),D("esri/widgets/ShadowCast/t9n/ShadowCast")],E.prototype,"messages",void 0),e([m()],E.prototype,"_defaultViewModel",void 0),e([m()],E.prototype,"_timeSlider",void 0),e([m()],E.prototype,"_tooltip",void 0),E=e([c("esri.widgets.ShadowCast")],E);const x=E;export{x as default};