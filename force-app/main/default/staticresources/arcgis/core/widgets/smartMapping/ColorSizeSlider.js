/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import i from"../../core/Error.js";import{isSome as r,isNone as s}from"../../core/maybe.js";import{property as t}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as a}from"../../core/accessorSupport/decorators/subclass.js";import l from"../../renderers/visualVariables/support/ColorSizeStop.js";import o from"../../renderers/visualVariables/support/ColorStop.js";import n from"../../renderers/visualVariables/support/SizeStop.js";import{SmartMappingSliderBase as d}from"./SmartMappingSliderBase.js";import p from"./ColorSizeSlider/ColorSizeSliderViewModel.js";import{getDynamicPathForSizeStops as m,getPathForSizeStops as u}from"./support/utils.js";import{storeNode as h}from"../support/widgetUtils.js";import{messageBundle as c}from"../support/decorators/messageBundle.js";import{tsx as b}from"../support/jsxFactory.js";var g;const v="esri-color-size-slider",f={base:v,rampElement:`${v}__ramp`,sliderContainer:`${v}__slider-container`,histogramContainer:`${v}__histogram-container`,primaryHandle:`${v}--primary-handle`,track:`${v}--interactive-track`,esriWidget:"esri-widget",esriWidgetPanel:"esri-widget--panel",widgetIcon:"esri-icon-edit",disabled:"esri-disabled"};let S=g=class extends d{constructor(e,i){super(e,i),this._bgFillId=null,this._backgroundFillColor="#e0e0e0",this._minRampFillWidth=.2,this._rampFillId=null,this._rampNode=null,this._maxRampFillWidth=1,this.messages=null,this.viewModel=new p,this._bgFillId=`${this.id}-bg-fill`,this._rampFillId=`${this.id}-linear-gradient`}get handlesSyncedToPrimary(){return this.viewModel.handlesSyncedToPrimary}set handlesSyncedToPrimary(e){this.viewModel.handlesSyncedToPrimary=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get persistSizeRangeEnabled(){return this.viewModel.persistSizeRangeEnabled}set persistSizeRangeEnabled(e){this.viewModel.persistSizeRangeEnabled=e}get primaryHandleEnabled(){return this.viewModel.primaryHandleEnabled}set primaryHandleEnabled(e){this.viewModel.primaryHandleEnabled=e}get stops(){return this.viewModel.stops}set stops(e){this.viewModel.stops=e}static fromRendererResult(e,r){const{renderer:{authoringInfo:{univariateTheme:s}},color:{visualVariable:{stops:t}},size:{visualVariables:a},statistics:o}=e,{avg:n,stddev:d}=o;if(!t)throw new i("ColorSizeSlider-fromRendererResult:invalid-renderer-result","'result' must include 'color' variable.");const p="above-and-below"===s,m=e.renderer.authoringInfo.visualVariables[0],u=m.minSliderValue,h=m.maxSliderValue,c=a.find((e=>"outline"!==e?.target&&!(e?.axis&&!e?.field&&!e?.valueExpression)&&(e?.field||e?.valueExpression))),b=c.stops,v=t.map(((e,i)=>{const{color:r,label:s,value:a}=e;let o;return o=b&&b.length>0?b[i].size:0===i?c.minSize:i===t.length-1?c.maxSize:null,new l({color:r,label:s,value:a,size:o})}));return new g({max:h,min:u,stops:v,primaryHandleEnabled:p,handlesSyncedToPrimary:p,persistSizeRangeEnabled:p,histogramConfig:{average:n,standardDeviation:d,bins:r?r.bins:[]}})}updateFromRendererResult(e,r){const{renderer:{authoringInfo:{univariateTheme:s}},color:{visualVariable:{stops:t}},size:{visualVariables:a},statistics:o}=e,{avg:n,stddev:d}=o;if(!t)throw new i("ColorSizeSlider-fromRendererResult:invalid-renderer-result","'result' must include 'color' variable.");const p="above-and-below"===s,m=e.renderer.authoringInfo.visualVariables[0],u=m.minSliderValue,h=m.maxSliderValue,c=a.find((e=>"outline"!==e?.target&&!(e?.axis&&!e?.field&&!e?.valueExpression)&&(e?.field||e?.valueExpression))),b=c.stops,g=t.map(((e,i)=>{const{color:r,label:s,value:a}=e;let o;return o=b&&b.length>0?b[i].size:0===i?c.minSize:i===t.length-1?c.maxSize:null,new l({color:r,label:s,value:a,size:o})}));this.set({max:h,min:u,stops:g,primaryHandleEnabled:p,handlesSyncedToPrimary:p,persistSizeRangeEnabled:p,histogramConfig:{average:n,standardDeviation:d,bins:r?r.bins:[]}})}updateRenderer(e){const{stops:i}=this,s=i[0],t=i[i.length-1],a=i[Math.floor(i.length/2)],l=e.clone(),d=l.visualVariables.map((e=>{if("size"===e.type){if("outline"===e?.target||e?.axis&&!e?.field&&!e?.valueExpression)return e;r(e.minSize)&&r(e.maxSize)?e.set({maxDataValue:t.value,minDataValue:s.value,maxSize:t.size,minSize:s.size}):e.stops&&e.set({stops:i.map((e=>{const{label:i,size:r,value:s}=e;return new n({label:i,size:r,value:s})}))})}else"color"===e.type&&e.set({stops:this.stops.map((e=>{const{color:i,label:r,value:s}=e;return new o({color:i,label:r,value:s})}))});return e}));if(l.visualVariables=d,l.classBreakInfos.length>1){const e=a.value;l.classBreakInfos[0].maxValue=e,l.classBreakInfos[1].minValue=e}return l}updateVisualVariables(e){return e.map((e=>{const i=e.clone();if("size"===e.type){if("outline"===e?.target||e?.axis&&!e?.field&&!e?.valueExpression)return i;if(r(e.minSize)&&r(e.maxSize)){const{stops:e}=this,r=e[0],s=e[e.length-1];i.set({maxDataValue:s.value,minDataValue:r.value,maxSize:s.size,minSize:r.size})}else e.stops&&i.set({stops:this.stops.map((e=>{const{label:i,size:r,value:s}=e;return new n({label:i,size:r,value:s})}))})}else"color"===e.type&&i.set({stops:this.stops.map((e=>{const{color:i,label:r,value:s}=e;return new o({color:i,label:r,value:s})}))});return i}))}render(){const{label:e,primaryHandleEnabled:i,state:r,visibleElements:s}=this,t="disabled"===r,a=this.classes(f.base,f.esriWidget,f.esriWidgetPanel,{[f.disabled]:t,[f.primaryHandle]:i,[f.track]:s.interactiveTrack});return b("div",{"aria-label":e,class:a},t?null:this.renderContent(this.renderRamp(),f.sliderContainer,f.histogramContainer))}renderRamp(){const{_bgFillId:e,_rampFillId:i,viewModel:r,zoomOptions:s}=this,t=r.getStopInfo();return b("div",{afterCreate:h,bind:this,class:f.rampElement,"data-node-ref":"_rampNode"},b("svg",{xmlns:"http://www.w3.org/2000/svg"},b("defs",null,this.renderRampFillDefinition(i,t),this.renderBackgroundFillDefinition(e)),b("rect",{x:"0",y:"0",fill:this._backgroundFillColor,height:"100%",width:"100%"}),this.renderPaths()),s?this.renderZoomCaps():null)}renderPaths(){if(!this._rampNode)return;const{offsetHeight:e=0,offsetWidth:i=0}=this._rampNode;if(s(e)||s(i))return;const{primaryHandleEnabled:r,stops:t,values:a,viewModel:{max:l,min:o},_bgFillId:n,_maxRampFillWidth:d,_minRampFillWidth:p,_rampFillId:h}=this,c=[d,p];t[0].size<t[t.length-1].size&&c.reverse();const g=a.slice().sort(((e,i)=>e>i?1:-1)),[v,f]=c,[S,z]=g,y=r?m({max:l,min:o,pathHeight:e,pathWidth:i,stops:t,padding:p}):u({bottomValue:S,bottomWidth:v,max:l,min:o,pathHeight:e,pathWidth:i,topValue:z,topWidth:f});return[b("path",{key:"background",d:y,fill:`url(#${n})`}),b("path",{key:"fill",d:y,fill:`url(#${h})`})]}};e([t()],S.prototype,"label",null),e([t(),c("esri/widgets/smartMapping/ColorSizeSlider/t9n/ColorSizeSlider")],S.prototype,"messages",void 0),e([t()],S.prototype,"persistSizeRangeEnabled",null),e([t()],S.prototype,"primaryHandleEnabled",null),e([t()],S.prototype,"stops",null),e([t()],S.prototype,"viewModel",void 0),S=g=e([a("esri.widgets.smartMapping.ColorSizeSlider")],S);const z=S;export{z as default};