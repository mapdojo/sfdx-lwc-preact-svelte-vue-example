/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import"../intl.js";import{isNone as t,isSome as i}from"../core/maybe.js";import{property as r}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import a from"./Widget.js";import n from"./Histogram/HistogramViewModel.js";import{onResize as o}from"./support/widgetUtils.js";import{messageBundle as l}from"./support/decorators/messageBundle.js";import{tsx as d}from"./support/jsxFactory.js";import{substitute as h}from"../intl/substitute.js";var u;const c="esri-histogram",g={base:c,horizontalLayout:`${c}--horizontal`,verticalLayout:`${c}--vertical`,content:`${c}__content`,svg:`${c}__svg`,bar:`${c}__bar`,bars:`${c}__bars`,label:`${c}__label`,dataLines:`${c}__data-lines`,dataLinesSubgroup:`${c}__data-lines-subgroup`,dataLine:`${c}__data-line`,averageLabel:`${c}__average-label`,averageDataLine:`${c}__average-data-line`,averageSymbol:`${c}__average-symbol`,esriWidget:"esri-widget",widgetIcon:"esri-icon-edit",disabled:"esri-disabled"};let p=u=class extends a{constructor(e,t){super(e,t),this._bgFillId=`${this.id}-bg-fill`,this._containerNode=null,this._containerDimensions={width:0,height:0},this._defaultBarColor="#d8d8d8",this.barCreatedFunction=null,this.dataLines=null,this.dataLineCreatedFunction=null,this.dataLineUpdatedFunction=null,this.messages=null,this.viewModel=new n}get average(){return this.viewModel.average}set average(e){this.viewModel.average=e}get bins(){return this.viewModel.bins}set bins(e){this.viewModel.bins=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get labelFormatFunction(){return this.viewModel.labelFormatFunction}set labelFormatFunction(e){this.viewModel.labelFormatFunction=e}set layout(e){"vertical"!==e&&(e="horizontal"),this._set("layout",e)}get max(){return this.viewModel.max}set max(e){this.viewModel.max=e}get min(){return this.viewModel.min}set min(e){this.viewModel.min=e}get state(){return this.viewModel.state}static fromHistogramResult(e){const{bins:t,maxValue:i,minValue:r}=e;return new u({bins:t,max:i,min:r})}render(){const{label:e,layout:t,state:i}=this,r=this.classes(g.base,g.esriWidget,"horizontal"===t?g.horizontalLayout:g.verticalLayout,"disabled"===i?g.disabled:null);return d("div",{"aria-label":e,class:r,bind:this,afterCreate:this._afterContainerNodeCreate},"ready"===i?this.renderContent():null)}renderContent(){if(!this._containerNode)return;const e=this._bgFillId,t=`clip-path: url(#${e})`;return d("div",{class:g.content},d("svg",{class:g.svg,xmlns:"http://www.w3.org/2000/svg"},d("defs",null,this.renderFillDefinition(e)),d("g",{style:t},this.renderBarsGroup()),this.renderLinesGroup()))}renderBarsGroup(){return d("g",{class:this.classes(g.bars)},this.renderBars())}renderBars(){const{layout:e,viewModel:{binRange:t,range:i}}=this;if(!t||!i)return;const r=t/i,{width:s,height:a}=this._containerDimensions;if(0===a&&0===s)return;if(0===a&&0!==s)return void this.scheduleRender();const[n,o]="vertical"===e?[a*r,s]:[a,s*r];return this._getBarDimensions(n,o).map((([e,t],i)=>this.renderBar(i,e,t)))}renderBar(e,i,r){const{bins:s,layout:a,max:n,messages:o,viewModel:{range:l}}=this;if(!s||t(n))return;const{width:u,height:c}=this._containerDimensions,p=s.slice()[e],{count:m,maxValue:b,minValue:v}=p,_=n-b,[L,f]="vertical"===a?[0,_*(c/l)]:[u-r-_*(u/l),c-i],y=h(o.barLabel,{count:m,maxValue:b,minValue:v});return d("rect",{"aria-label":y,afterCreate:this._afterBarCreate,bind:this,class:g.bar,"data-index":e,fill:this._defaultBarColor,height:i,role:"img","shape-rendering":"crispEdges","stroke-width":"0",width:r,x:L,y:f})}renderLinesGroup(){return d("g",{class:this.classes(g.dataLines)},this.renderAverageLine(),this.renderCustomLines())}renderAverageLine(){const{average:e}=this;if(t(e))return;const i=[d("tspan",{class:this.classes(g.averageSymbol)},"x̄ "),d("tspan",{class:this.classes(g.averageLabel)},this.labelFormatFunction?this.labelFormatFunction(e,"average"):e)];return d("g",{afterCreate:this._afterLinesSubgroupCreate,afterUpdate:this._afterLinesSubgroupUpdate,bind:this,class:this.classes(g.dataLinesSubgroup)},d("title",{key:"title"},e),this.renderLine(e,this.classes(g.averageDataLine)),this.renderLabel({label:i,value:e}))}renderCustomLines(){if(this.dataLines&&this.dataLines.length)return this.dataLines.map(((e,t)=>this.renderLineSubgroup(e,t)))}renderLineSubgroup(e,t){const{value:i}=e;return d("g",{afterCreate:this._afterLinesSubgroupCreate,afterUpdate:this._afterLinesSubgroupUpdate,bind:this,class:this.classes(g.dataLinesSubgroup),"data-index":t},d("title",{key:"title"},i),this.renderLine(i),this.renderLabel(e))}renderLine(e,t){const[i,r,s,a]=this._getLinePosition(e);return d("line",{class:this.classes(g.dataLine,t),x1:i,x2:r,y1:s,y2:a,"shape-rendering":"crispEdges"})}renderLabel(e,t){const{label:i,value:r}=e,[s,a]=this._getLabelPosition(r),n=2;return d("text",{class:this.classes(g.label,t),"text-anchor":"end",transform:"horizontal"===this.layout?"rotate(270)":null,x:s,y:a-n},i??"")}renderFillDefinition(e){const{width:t,height:i}=this._containerDimensions;return d("clipPath",{id:e},d("rect",{x:"0",y:"0",width:t,height:i}))}_afterContainerNodeCreate(e){this._containerNode=e,this.addHandles(o(e,(e=>{const{width:t,height:i}=e.contentRect;this._containerDimensions={width:t,height:i}})))}_getIndexFromElement(e){const t=e.dataset?.index,r=e.getAttribute("data-index");return i(t)?parseInt(t,10):i(r)?parseInt(r,10):null}_afterBarCreate(e){if(this.barCreatedFunction){const t=this._getIndexFromElement(e);this.barCreatedFunction(t,e)}}_afterLinesSubgroupCreate(e){if(this.dataLineCreatedFunction){const t=this._getIndexFromElement(e),i=e.childNodes[0],r=e.childNodes[1]?e.childNodes[1]:null;this.dataLineCreatedFunction(i,r,t)}}_afterLinesSubgroupUpdate(e){if(this.dataLineUpdatedFunction){const t=this._getIndexFromElement(e),i=e.childNodes[0],r=e.childNodes[1]?e.childNodes[1]:null;this.dataLineUpdatedFunction(i,r,t)}}_getBarDimensions(e,t){const{bins:i,layout:r}=this,s=i?i.map((e=>e.count)):[],a=Math.max.apply(Math,s);return s.map((i=>"vertical"===r?[e/s.length,0!==a?i/a*t:0]:[0!==a?i/a*e:0,t/s.length]))}_getLinePosition(e){const{layout:i,min:r,viewModel:{range:s}}=this;if(t(r))return[0,0,0,0];const a=Math.round((e-r)/s*100)/100,{width:n,height:o}=this._containerDimensions,[l,d]=[a*n||1,o-a*o||1];return"vertical"===i?[0,"100%",d,d]:[l,l,"100%",0]}_getLabelPosition(e){const{layout:i,min:r,viewModel:{range:s}}=this;if(t(r))return[0,0];const a=Math.round((e-r)/s*100)/100,{width:n,height:o}=this._containerDimensions;return"vertical"===i?[n,o-a*o]:[0,a*n]}};e([r()],p.prototype,"_bgFillId",void 0),e([r()],p.prototype,"_containerNode",void 0),e([r()],p.prototype,"_containerDimensions",void 0),e([r()],p.prototype,"_defaultBarColor",void 0),e([r()],p.prototype,"average",null),e([r()],p.prototype,"barCreatedFunction",void 0),e([r()],p.prototype,"dataLines",void 0),e([r()],p.prototype,"dataLineCreatedFunction",void 0),e([r()],p.prototype,"dataLineUpdatedFunction",void 0),e([r()],p.prototype,"label",null),e([r()],p.prototype,"labelFormatFunction",null),e([r({value:"horizontal"})],p.prototype,"layout",null),e([r()],p.prototype,"max",null),e([r(),l("esri/widgets/Histogram/t9n/Histogram")],p.prototype,"messages",void 0),e([r()],p.prototype,"min",null),e([r({readOnly:!0})],p.prototype,"state",null),e([r()],p.prototype,"viewModel",void 0),p=u=e([s("esri.widgets.Histogram")],p);const m=p;export{m as default};