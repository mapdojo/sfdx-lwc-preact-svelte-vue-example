/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import{handlesGroup as o}from"../../core/handleUtils.js";import{removeMaybe as t}from"../../core/maybe.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import{cast as l}from"../../core/accessorSupport/decorators/cast.js";import"../../core/arrayUtils.js";import{subclass as i}from"../../core/accessorSupport/decorators/subclass.js";import a from"../Widget.js";import"./widgetUtils.js";import{messageBundle as c}from"./decorators/messageBundle.js";import{tsx as r}from"./jsxFactory.js";import n from"./SelectionToolbar/SelectionToolbarViewModel.js";const d={lassoTool:!0,rectangleTool:!0},p={createTool:"polygon",createOptions:{mode:"freehand"}},m={createTool:"rectangle"},h="esri-selection-toolbar",g={base:h,container:`${h}__container`,toolButton:`${h}__tool-button`,disabled:"esri-disabled",esriWidget:"esri-widget",widgetIcon:"esri-icon-vertex-gps"};let v=class extends a{constructor(e,t){super(e,t),this._viewModelHandlesGroup=null,this.activeToolInfo=null,this.messages=null,this.toolConfigs=[],this.viewModel=new n,this.visibleElements={...d},this._viewModelHandlesGroup=o([this.viewModel.on("selection-change",(e=>this.emit("selection-change",e))),this.viewModel.on("complete",(e=>{this._set("activeToolInfo",null),this.emit("complete",e)}))])}destroy(){this._viewModelHandlesGroup=t(this._viewModelHandlesGroup)}loadDependencies(){return Promise.all([import("@esri/calcite-components/dist/components/calcite-action.js"),import("@esri/calcite-components/dist/components/calcite-icon.js")])}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get layers(){return this.viewModel.layers}set layers(e){this.viewModel.layers=e}get view(){return this.viewModel.view}set view(e){this.viewModel.view=e}castVisibleElements(e){return{...d,...e}}activate(e){switch(this.cancel(),e){case"lasso":this._activateTool("lasso");break;case"rectangle":this._activateTool("rectangle");break;default:this._activateTool(e)}}cancel(){this.viewModel.cancel(),this._set("activeToolInfo",null)}render(){return r("div",{"aria-label":this.label,class:this.classes(g.base,g.esriWidget)},r("div",{class:g.container},this.renderDefaultTools(),this.renderCustomTools()))}renderDefaultTools(){if("2d"===this.view?.type)return[this.renderRectangleTool(),this.renderLassoTool()]}renderCustomTools(){if(this.toolConfigs&&this.toolConfigs.length)return this.toolConfigs.map((e=>r("calcite-action",{active:this.activeToolInfo?.toolName===e.toolName,bind:this,class:g.toolButton,label:e.toolName,onclick:()=>this._onCustomToolClick(e.toolName),scale:"s",text:e.toolName,title:e.toolName},r("calcite-icon",{scale:"s",icon:e.icon||"selection"}))))}renderLassoTool(){const{activeToolInfo:e,messages:o,visibleElements:t}=this;if(t.lassoTool)return r("calcite-action",{active:"lasso"===e?.toolName,bind:this,label:o.selectByLasso,onclick:this._onLassoToolClick,scale:"s",text:o.selectByLasso,title:o.selectByLasso},r("calcite-icon",{scale:"s",icon:"lasso-select"}))}renderRectangleTool(){const{activeToolInfo:e,messages:o,visibleElements:t}=this;if(t.rectangleTool)return r("calcite-action",{active:"rectangle"===e?.toolName,bind:this,label:o.selectByRectangle,onclick:this._onRectangleToolClick,scale:"s",text:o.selectByRectangle,title:o.selectByRectangle},r("calcite-icon",{scale:"s",icon:"cursor-marquee"}))}_onCustomToolClick(e){this._toggleTool(e)}_onLassoToolClick(){this._toggleTool("lasso")}_onRectangleToolClick(){this._toggleTool("rectangle")}_activateTool(e){const o=this._getToolOptions(e);if(!o)return;const t=this.viewModel.activate(o);t&&this._set("activeToolInfo",{toolName:e,operation:t})}_toggleTool(e){if(this.activeToolInfo){const o=this.activeToolInfo.toolName;if(this.cancel(),o===e)return}this._activateTool(e)}_getToolOptions(e){if("lasso"===e)return p;if("rectangle"===e)return m;const o=this.toolConfigs.find((o=>o.toolName===e));if(!o)return;const{createTool:t,createOptions:s,selectionOptions:l}=o;return{createTool:t,createOptions:s,selectionOptions:l}}};e([s({readOnly:!0})],v.prototype,"activeToolInfo",void 0),e([s()],v.prototype,"label",null),e([s()],v.prototype,"layers",null),e([s(),c("esri/widgets/support/SelectionToolbar/t9n/SelectionToolbar")],v.prototype,"messages",void 0),e([s()],v.prototype,"toolConfigs",void 0),e([s()],v.prototype,"view",null),e([s()],v.prototype,"viewModel",void 0),e([s()],v.prototype,"visibleElements",void 0),e([l("visibleElements")],v.prototype,"castVisibleElements",null),v=e([i("esri.widgets.support.SelectionToolbar")],v);const u=v;export{u as default};