/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import{isSome as t}from"../core/maybe.js";import{ignoreAbortErrors as i}from"../core/promiseUtils.js";import{property as s}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as l}from"../core/accessorSupport/decorators/subclass.js";import r from"./Widget.js";import o from"./Slice/SliceViewModel.js";import{Heading as n}from"./support/Heading.js";import"./support/widgetUtils.js";import{messageBundle as c}from"./support/decorators/messageBundle.js";import{tsx as a}from"./support/jsxFactory.js";const d="esri-slice",u={buttonDisabled:"esri-button--disabled",layerIncludeButton:`${d}__cross`,widgetIcon:"esri-icon-slice",base:`${d} esri-widget esri-widget--panel`,layerList:`${d}__settings`,layerListHeading:`${d}__settings-title`,layerItem:`${d}__layer-item`,layerItemTitle:`${d}__layer-item__title`,container:`${d}__container`,actionSection:`${d}__actions`,hint:`${d}__hint`,hintText:`${d}__hint-text`,panelError:`${d}__panel--error`,newSliceButton:`${d}__clear-button esri-button esri-button--primary`,excludeButton:`${d}__exclude-button esri-button esri-button--secondary`,cancelButton:`${d}__cancel-button esri-button esri-button--secondary`};let p=class extends r{constructor(e,t){super(e,t),this.headingLevel=3,this.iconClass=u.widgetIcon,this.messages=null,this.viewModel=new o}loadDependencies(){return import("@esri/calcite-components/dist/components/calcite-button.js")}get active(){return this.viewModel.active}get analysis(){return this.viewModel.analysis}set analysis(e){this.viewModel.analysis=e}get excludedLayers(){return this.viewModel.excludedLayers}set excludedLayers(e){this.viewModel.excludedLayers=e}get excludeGroundSurface(){return this.viewModel.excludeGroundSurface}set excludeGroundSurface(e){this.viewModel.excludeGroundSurface=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get view(){return this.viewModel.view}set view(e){this.viewModel.view=e}get visible(){return this.viewModel.visible}set visible(e){this.viewModel.visible=e}render(){const e=this.viewModel.supported,i=this.viewModel.active,s="disabled"===this.viewModel.state,l="ready"===this.viewModel.state,r="slicing"===this.viewModel.state||"sliced"===this.viewModel.state,o="exclude"===this.viewModel.layersMode,{messages:c}=this,d=s&&u.buttonDisabled,p=!!t(this.viewModel.view)&&this.viewModel.view.allLayerViews.some((e=>"voxel-3d"===e.type)),y=i&&!r||o?null:a("button",{disabled:s,class:this.classes(u.newSliceButton,d),bind:this,onclick:this._onNewSliceClick,key:"esri-slice__clear",type:"button"},c.newSlice),h=r&&!o?a("button",{class:this.classes(u.excludeButton,d),bind:this,onclick:()=>{this.viewModel.enterExcludeLayerMode()},key:"esri-slice__exclude",type:"button"},c.excludeLayer):null,v=i&&o?a("button",{class:this.classes(u.cancelButton,d),bind:this,onclick:()=>{this.viewModel.exitExcludeLayerMode()},key:"esri-slice__cancel-exclude",type:"button"},c.cancel):null;let m=null;i&&(o?m=c.excludeHint:l&&(m=p?c.voxelHint:c.hint));const w=m?a("div",{class:u.hint,key:"esri-slice__hint"},a("p",{class:u.hintText},m),a("p",{class:u.hintText},c.verticalHint)):null,_=this.excludedLayers?this.excludedLayers.toArray().map((e=>this._renderLayerItem({uid:e.uid,title:e.title,onClick:()=>(this.excludedLayers.remove(e),!1)}))):[];this.excludeGroundSurface&&_.push(this._renderLayerItem({uid:"ground",title:c.ground,onClick:()=>(this.excludeGroundSurface=!1,!1)}));const b=!o&&r&&_.length>0?a("div",{class:u.layerList,key:"esri-slice__settings"},a(n,{class:u.layerListHeading,level:this.headingLevel},c.excludedLayers),a("ul",null,_)):null,x=a("div",{class:u.panelError,key:"esri-slice__unsupported"},a("p",null,c.unsupported)),g=a("div",{class:u.actionSection},h,v,y),M=this.visible?a("div",{class:u.container},e?[w,b,g]:x):null;return a("div",{class:u.base,role:"presentation"},M)}_renderLayerItem(e){return a("li",{class:u.layerItem,key:e.uid},a("calcite-button",{appearance:"transparent",class:u.layerIncludeButton,iconStart:"x",scale:"s",title:this.messages.includeLayer,bind:this,onclick:e.onClick}),a("div",{class:u.layerItemTitle},e.title))}_onNewSliceClick(){i(this.viewModel.start())}};e([s()],p.prototype,"active",null),e([s({constructOnly:!0,nonNullable:!0})],p.prototype,"analysis",null),e([s()],p.prototype,"excludedLayers",null),e([s()],p.prototype,"excludeGroundSurface",null),e([s()],p.prototype,"headingLevel",void 0),e([s()],p.prototype,"iconClass",void 0),e([s()],p.prototype,"label",null),e([s(),c("esri/widgets/Slice/t9n/Slice")],p.prototype,"messages",void 0),e([s()],p.prototype,"view",null),e([s({type:o})],p.prototype,"viewModel",void 0),e([s()],p.prototype,"visible",null),p=e([l("esri.widgets.Slice")],p);const y=p;export{y as default};