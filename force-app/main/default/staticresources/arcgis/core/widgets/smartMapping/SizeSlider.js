/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../Color.js";import{isNone as s}from"../../core/maybe.js";import{property as i}from"../../core/accessorSupport/decorators/property.js";import{cast as a}from"../../core/accessorSupport/decorators/cast.js";import"../../core/arrayUtils.js";import{subclass as r}from"../../core/accessorSupport/decorators/subclass.js";import o from"../../renderers/visualVariables/SizeVariable.js";import l from"../../renderers/visualVariables/support/SizeStop.js";import{SmartMappingSliderBase as n}from"./SmartMappingSliderBase.js";import d from"./SizeSlider/SizeSliderViewModel.js";import{getSizesFromVariable as p,getFillFromColor as m,getDynamicPathForSizeStops as u,getPathForSizeStops as c}from"./support/utils.js";import{storeNode as h}from"../support/widgetUtils.js";import{messageBundle as g}from"../support/decorators/messageBundle.js";import{tsx as v}from"../support/jsxFactory.js";var b;const z="esri-size-slider",y={base:z,rampElement:`${z}__ramp`,sliderContainer:`${z}__slider-container`,histogramContainer:`${z}__histogram-container`,zoomCapTop:`${z}__zoom-cap-top`,zoomCapBottom:`${z}__zoom-cap-bottom`,zoomCapLine:`${z}__zoom-cap-line`,zoomCapMask:`${z}__zoom-cap-mask`,zoomCapUnderline:`${z}__zoom-cap-underline`,primaryHandle:`${z}--primary-handle`,track:`${z}--interactive-track`,esriWidget:"esri-widget",esriWidgetPanel:"esri-widget--panel",widgetIcon:"esri-icon-edit",disabled:"esri-disabled"},f={trackFillColor:new t([149,149,149]),trackBackgroundColor:new t([224,224,224])};let S=b=class extends n{constructor(e,t){super(e,t),this._maxRampFillWidth=1,this._minRampFillWidth=.2,this._rampNode=null,this.messages=null,this.style={...f},this.viewModel=new d}get handlesSyncedToPrimary(){return this.viewModel.handlesSyncedToPrimary}set handlesSyncedToPrimary(e){this.viewModel.handlesSyncedToPrimary=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get persistSizeRangeEnabled(){return this.viewModel.persistSizeRangeEnabled}set persistSizeRangeEnabled(e){this.viewModel.persistSizeRangeEnabled=e}get primaryHandleEnabled(){return this.viewModel.primaryHandleEnabled}set primaryHandleEnabled(e){this.viewModel.primaryHandleEnabled=e}get stops(){return this.viewModel.stops}set stops(e){this.viewModel.stops=e}castStyle(e){return{...f,...e}}static fromRendererResult(e,t){const{visualVariables:s,statistics:i}=e,{avg:a,stddev:r}=i,o=s[0],[l,n]=p(o),d=e.renderer.authoringInfo.visualVariables[0],m=d.minSliderValue,u=d.maxSliderValue;return new b({max:u,min:m,stops:[{value:o.minDataValue,size:n},{value:o.maxDataValue,size:l}],histogramConfig:{average:a,standardDeviation:r,bins:t?t.bins:[]}})}updateFromRendererResult(e,t){const{visualVariables:s,statistics:i}=e,{avg:a,stddev:r}=i,o=s[0],[l,n]=p(o),d=e.renderer.authoringInfo.visualVariables[0],m=d.minSliderValue,u=d.maxSliderValue;this.set({max:u,min:m,stops:[{value:o.minDataValue,size:n},{value:o.maxDataValue,size:l}],histogramConfig:{average:a,standardDeviation:r,bins:t?t.bins:[]}})}updateVisualVariable(e){const t=e.clone(),{stops:s}=this;if(!e||!s)return null;if(t.stops)return t.stops=s,t;const i=s[0],a=s[s.length-1];let r=t.maxSize,l=t.minSize;if(r instanceof o){const e=r.stops,t=a.size/e[0].size,s=e.map((e=>(e.size*=t,e)));r.stops=s}else r=a.size;if(l instanceof o){const e=l.stops,t=i.size/e[0].size,s=e.map((e=>(e.size*=t,e)));l.stops=s}else l=i.size;return t.set({maxDataValue:a.value,minDataValue:i.value,maxSize:r,minSize:l}),t}updateFromVisualVariable(e){if(!e)return;const{maxDataValue:t,minDataValue:s,stops:i}=e;if(i)this.stops=i;else{const[i,a]=p(e);this.stops=[new l({value:s,size:a}),new l({value:t,size:i})]}}render(){const{label:e,primaryHandleEnabled:t,state:s,visibleElements:i}=this,a="disabled"===s,r=this.classes(y.base,y.esriWidget,y.esriWidgetPanel,{[y.disabled]:a,[y.primaryHandle]:t,[y.track]:i.interactiveTrack});return v("div",{"aria-label":e,class:r},a?null:this.renderContent(this.renderRamp(),y.sliderContainer,y.histogramContainer))}renderRamp(){const{style:{trackBackgroundColor:e},zoomOptions:t}=this;return v("div",{afterCreate:h,bind:this,class:y.rampElement,"data-node-ref":"_rampNode"},v("svg",{key:"ramp-svg",xmlns:"http://www.w3.org/2000/svg"},v("rect",{x:"0",y:"0",fill:m(e),height:"100%",width:"100%"}),this.renderPath()),t?this.renderZoomCaps():null)}renderPath(){if(!this._rampNode)return;const{offsetHeight:e=0,offsetWidth:t=0}=this._rampNode;if(s(e)||s(t))return;const{primaryHandleEnabled:i,stops:a,style:{trackFillColor:r},values:o,viewModel:{max:l,min:n},_maxRampFillWidth:d,_minRampFillWidth:p}=this,h=[d,p];a[0].size<a[a.length-1].size&&h.reverse();const g=o.slice().sort(((e,t)=>e>t?1:-1)),[b,z]=h,[y,f]=g,S=i?u({max:l,min:n,pathHeight:e,pathWidth:t,stops:a,padding:z}):c({bottomValue:y,bottomWidth:b,max:l,min:n,pathHeight:e,pathWidth:t,topValue:f,topWidth:z});return v("path",{d:S,fill:m(r)})}};e([i()],S.prototype,"handlesSyncedToPrimary",null),e([i()],S.prototype,"label",null),e([i(),g("esri/widgets/smartMapping/SizeSlider/t9n/SizeSlider")],S.prototype,"messages",void 0),e([i()],S.prototype,"persistSizeRangeEnabled",null),e([i()],S.prototype,"primaryHandleEnabled",null),e([i()],S.prototype,"stops",null),e([i()],S.prototype,"style",void 0),e([a("style")],S.prototype,"castStyle",null),e([i()],S.prototype,"viewModel",void 0),S=b=e([r("esri.widgets.smartMapping.SizeSlider")],S);const w=S;export{w as default};