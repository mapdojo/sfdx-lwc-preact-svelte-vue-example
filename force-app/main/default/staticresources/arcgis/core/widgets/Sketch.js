/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import"../intl.js";import{handlesGroup as t}from"../core/handleUtils.js";import{removeMaybe as o,destroyMaybe as i,isSome as s}from"../core/maybe.js";import{watch as n,syncAndInitial as l,when as a}from"../core/reactiveUtils.js";import{property as r}from"../core/accessorSupport/decorators/property.js";import{cast as c}from"../core/accessorSupport/decorators/cast.js";import"../core/arrayUtils.js";import{subclass as p}from"../core/accessorSupport/decorators/subclass.js";import d from"./Widget.js";import u from"./Sketch/SketchViewModel.js";import h from"./support/SelectionToolbar.js";import g from"./support/SnappingControls.js";import{isRTL as v}from"./support/widgetUtils.js";import{messageBundle as m}from"./support/decorators/messageBundle.js";import{vmEvent as _}from"./support/decorators/vmEvent.js";import{tsx as b}from"./support/jsxFactory.js";import{substitute as w}from"../intl/substitute.js";const f="esri-sketch",y={base:f,verticalLayout:`${f}--vertical`,panel:`${f}__panel`,infoPanel:`${f}__info-panel`,section:`${f}__section`,toolSection:`${f}__tool-section`,infoSection:`${f}__info-section`,infoCountSection:`${f}__info-count-section`,menuContainer:`${f}__menu-container`,menuHeader:`${f}__menu-header`,menuTitle:`${f}__menu-title`,featureCountBadge:`${f}__feature-count-badge`,featureCountText:`${f}__feature-count-text`,featureCountNumber:`${f}__feature-count-number`,actionToggle:`${f}__action-toggle`,actionToggleOn:`${f}__action-toggle--on`,actionTitle:`${f}__item-action-title`,actionIcon:`${f}__item-action-icon`,disabled:"esri-disabled",esriWidget:"esri-widget",rotating:"esri-rotating",widgetIcon:"esri-icon-edit"},C={createTools:{point:!0,polyline:!0,polygon:!0,rectangle:!0,circle:!0},selectionTools:{"rectangle-selection":!0,"lasso-selection":!0},undoRedoMenu:!0,settingsMenu:!0,snappingControls:!0,snappingControlsElements:{header:!1,enabledToggle:!0,selfEnabledToggle:!0,featureEnabledToggle:!0,layerList:!0}};let T=class extends d{constructor(e,t){super(e,t),this._activeCreateOptions=null,this._menuOpen=!1,this._selectionToolbar=null,this._snappingControls=null,this._viewModelHandlesGroup=null,this.availableCreateTools=["point","polyline","polygon","rectangle","circle"],this.creationMode="continuous",this.iconClass=y.widgetIcon,this.layout="horizontal",this.messages=null,this.visibleElements={...C},this._activateCreateTool=this._activateCreateTool.bind(this),this.viewModel=e?.viewModel||new u}initialize(){const{layer:e,view:i}=this,s=new h({view:"2d"===i?.type?i:null,layers:e?[e]:null});this.addHandles([n((()=>this.viewModel),(e=>{this._viewModelHandlesGroup=o(this._viewModelHandlesGroup),e&&(this._viewModelHandlesGroup=t([e.on("create",(e=>{this.scheduleRender(),this._onCreateOperation(e)})),e.on("update",(()=>this.scheduleRender())),e.on("delete",(e=>this.emit("delete",e))),e.on("undo",(()=>this.scheduleRender())),e.on("redo",(()=>this.scheduleRender())),n((()=>e.layer),(e=>{this._selectionToolbar.layers=e?[e]:null})),n((()=>e.view),(e=>{this._selectionToolbar.view="2d"===e?.type?e:null,this._setUpSnappingControls()})),n((()=>e.state),(()=>this.notifyChange("state")))]))}),l),a((()=>s.activeToolInfo),(()=>this.viewModel.cancel())),s.on("complete",(e=>this._onSelectionOperationComplete(e)))]),this._selectionToolbar=s,this._setUpSnappingControls()}loadDependencies(){return Promise.all([import("@esri/calcite-components/dist/components/calcite-action.js"),import("@esri/calcite-components/dist/components/calcite-icon.js")])}destroy(){this._selectionToolbar.destroy(),this._viewModelHandlesGroup=o(this._viewModelHandlesGroup),this._snappingControls=i(this._snappingControls)}get activeTool(){const e=this._selectionToolbar.activeToolInfo;if(e)switch(e.toolName){case"lasso":return"lasso-selection";case"rectangle":return"rectangle-selection";case"default":return"custom-selection"}return this.viewModel.activeTool}get createGraphic(){return this.viewModel.createGraphic}get defaultCreateOptions(){return this.viewModel.defaultCreateOptions}set defaultCreateOptions(e){this.viewModel.defaultCreateOptions=e}get defaultUpdateOptions(){return this.viewModel.defaultUpdateOptions}set defaultUpdateOptions(e){this.viewModel.defaultUpdateOptions=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get labelOptions(){return this.viewModel.labelOptions}set labelOptions(e){this.viewModel.labelOptions=e}get layer(){return this.viewModel.layer}set layer(e){this.viewModel.layer=e}get snappingOptions(){return this.viewModel.snappingOptions}set snappingOptions(e){this.viewModel.snappingOptions=e}get state(){return this._selectionToolbar.activeToolInfo?"active":this.viewModel.state}get tooltipOptions(){return this.viewModel.tooltipOptions}set tooltipOptions(e){this.viewModel.tooltipOptions=e}get updateGraphics(){return this.viewModel.updateGraphics}get view(){return this.viewModel.view}set view(e){this.viewModel.view=e}set viewModel(e){const t=this._get("viewModel");e!==t&&(t&&i(t),this._set("viewModel",e))}castVisibleElements(e){const t={...C,...e,createTools:{...C.createTools,...e?.createTools},selectionTools:{...C.selectionTools,...e?.selectionTools},snappingControlsElements:{...C.snappingControlsElements,...e?.snappingControlsElements}};return s(this._snappingControls)&&(this._snappingControls.visibleElements=t.snappingControlsElements),t}create(e,t){this._activeCreateOptions=t||null,this.viewModel.create(e,t)}update(e,t){return this.viewModel.update(e,t)}complete(){this.viewModel.complete()}cancel(){this._selectionToolbar.cancel(),this.viewModel.cancel()}undo(){this.viewModel.undo(),this.view?.focus()}redo(){this.viewModel.redo(),this.view?.focus()}delete(){this.viewModel.delete()}duplicate(){return this.viewModel.duplicate()}render(){const{label:e,layout:t,viewModel:{state:o}}=this;return b("div",{"aria-label":e,class:this.classes(y.base,y.esriWidget,{[y.disabled]:"disabled"===o,[y.verticalLayout]:"vertical"===t})},b("div",{role:"toolbar",class:y.panel},this.renderTopPanelContents()),b("div",{class:this.classes(y.panel,y.infoPanel)},this.renderInfoPanelContents()))}renderTopPanelContents(){const e=this.classes(y.section,y.toolSection),{availableCreateTools:t,visibleElements:o}=this;return[b("div",{role:"menu",key:"selection-button-container",class:e},this.renderDefaultSelectionButton(),this.renderSelectionToolbar()),t&&t.length?b("div",{role:"menu",class:e},this.renderDrawButtons()):null,o.undoRedoMenu?b("div",{role:"menu",key:"undo-redo-menu-button-container",class:e},this.renderUndoRedoMenuButtons()):null,o.settingsMenu?b("div",{key:"settings-menu-button-container",class:y.section},this.renderSettingsMenuButton()):null]}renderInfoPanelContents(){return this._menuOpen?this.renderSettingsMenu():this.updateGraphics.length?[b("div",{class:this.classes(y.section,y.infoSection,y.infoCountSection),key:"feature-count-container"},this.renderFeatureCount()),b("div",{class:this.classes(y.section,y.infoSection),key:"delete-button-container"},this.renderDuplicateButton(),this.renderDeleteButton())]:void 0}renderSettingsMenu(){const{settings:e}=this.messages;return[b("div",{role:"menu",class:y.menuContainer,key:"settings-menu-container"},b("header",{class:y.menuHeader,key:"settings-menu-header"},b("span",{class:y.menuTitle},e)),this.renderSnappingControls())]}renderSnappingControls(){const{snappingControls:e}=this.visibleElements;if(s(this._snappingControls)&&e)return this._snappingControls.render()}renderFeatureCount(){const{layout:e,messages:t,updateGraphics:{length:o}}=this,i=w(1===o?t.featureCount:t.featuresCount,{count:o});return b("div",{class:y.featureCountBadge,"aria-label":i},b("span",{class:y.featureCountNumber},"vertical"===e?o:i))}renderDuplicateButton(){const e=this.messages,t=this.updateGraphics.length>1?e.duplicateFeatures:e.duplicateFeature;return b("calcite-action",{bind:this,label:t,onclick:this._onDuplicateSelect,scale:"s",text:t,title:t},b("calcite-icon",{scale:"s",icon:"copy"}))}renderDeleteButton(){const e=this.messages,t=this.updateGraphics.length>1?e.deleteFeatures:e.deleteFeature;return b("calcite-action",{bind:this,label:t,onclick:this.delete,scale:"s",text:t,title:t},b("calcite-icon",{scale:"s",icon:"trash"}))}renderDefaultSelectionButton(){if(!this.viewModel.updateOnGraphicClick)return;const e=this.messages.selectFeature;return b("calcite-action",{active:"ready"===this.state,bind:this,label:e,onclick:this._activateDefaultSelectTool,scale:"s",text:e,title:e},b("calcite-icon",{scale:"s",icon:"cursor"}))}renderSelectionToolbar(){if("2d"!==this.view?.type)return;const e=this.visibleElements.selectionTools;return this._selectionToolbar.visibleElements={lassoTool:!!e["lasso-selection"],rectangleTool:!!e["rectangle-selection"]},this._selectionToolbar.render()}renderDrawButtons(){const e=this.visibleElements.createTools;return this.availableCreateTools.map((t=>"point"===t&&e.point?this.renderPointButton():"polyline"===t&&e.polyline?this.renderPolylineButton():"polygon"===t&&e.polygon?this.renderPolygonButton():"rectangle"===t&&e.rectangle?this.renderRectangleButton():"circle"===t&&e.circle?this.renderCircleButton():void 0))}renderPointButton(){const e="point",t=this.messages.drawPoint;return b("calcite-action",{active:this.activeTool===e,bind:this,label:t,onclick:()=>this._activateCreateTool(e),scale:"s",text:t,title:t},b("calcite-icon",{scale:"s",icon:"pin"}))}renderPolygonButton(){const e="polygon",t=this.messages.drawPolygon;return b("calcite-action",{active:this.activeTool===e,bind:this,label:t,onclick:()=>this._activateCreateTool(e),scale:"s",text:t,title:t},b("calcite-icon",{scale:"s",icon:"polygon"}))}renderPolylineButton(){const e="polyline",t=this.messages.drawPolyline;return b("calcite-action",{active:this.activeTool===e,bind:this,label:t,onclick:()=>this._activateCreateTool(e),scale:"s",text:t,title:t},b("calcite-icon",{scale:"s",icon:"line"}))}renderCircleButton(){const e="circle",t=this.messages.drawCircle;return b("calcite-action",{active:this.activeTool===e,bind:this,label:t,onclick:()=>this._activateCreateTool(e),scale:"s",text:t,title:t},b("calcite-icon",{scale:"s",icon:"circle"}))}renderRectangleButton(){const e="rectangle",t=this.messages.drawRectangle;return b("calcite-action",{active:this.activeTool===e,bind:this,label:t,onclick:()=>this._activateCreateTool(e),scale:"s",text:t,title:t},b("calcite-icon",{scale:"s",icon:"rectangle"}))}renderUndoRedoMenuButtons(){return[this.renderUndoButton(),this.renderRedoButton()]}renderUndoButton(){const e=this.messages.undo;return b("calcite-action",{disabled:!this.viewModel.canUndo(),bind:this,label:e,onclick:this.undo,scale:"s",text:e,title:e},b("calcite-icon",{scale:"s",icon:v(this.container)?"redo":"undo"}))}renderRedoButton(){const e=this.messages.redo;return b("calcite-action",{disabled:!this.viewModel.canRedo(),bind:this,label:e,onclick:this.redo,scale:"s",text:e,title:e},b("calcite-icon",{scale:"s",icon:v(this.container)?"undo":"redo"}))}renderSettingsMenuButton(){const e=this.messages.settings;return b("calcite-action",{active:this._menuOpen,bind:this,label:e,onclick:this._toggleMenu,scale:"s",text:e,title:e},b("calcite-icon",{scale:"s",icon:"gear"}))}_activateCreateTool(e){this.activeTool!==e?(this._selectionToolbar.cancel(),this.create(e)):this.cancel()}_onCreateOperation(e){if("complete"!==e.state)return;const{creationMode:t}=this,{type:o}=e;if("create"===o){const{tool:o,graphic:i}=e,s=this._activeCreateOptions;this._activeCreateOptions=null,"continuous"===t?this.create(o,s):"update"===t&&this.update([i])}}_toggleMenu(){this._menuOpen=!this._menuOpen,this.scheduleRender()}_onDuplicateSelect(){const e=this.duplicate(),t=this.viewModel.activeTool;"transform"!==t&&"reshape"!==t||this.update(e,{tool:t})}_onSelectionOperationComplete(e){const{viewModel:{defaultUpdateOptions:t}}=this,{selection:o}=e;if(!e.aborted&&o.length){const e=t.tool,i=o.length>1&&"reshape"===e?"transform":e;this.update(o,{...t,tool:i})}this.notifyChange("state")}_activateDefaultSelectTool(){this.cancel(),this.view?.focus()}_setUpSnappingControls(){const{snappingOptions:e,view:t}=this;if(this._snappingControls=i(this._snappingControls),!e||!t)return;const o=new g({snappingOptions:e,view:t,visibleElements:this.visibleElements.snappingControlsElements});this._snappingControls=o}};e([r()],T.prototype,"activeTool",null),e([r({cast:e=>{if(!e||!e.length)return null;const t=new Set(["point","polyline","polygon","rectangle","circle"]);return e.filter((e=>t.has(e)))}})],T.prototype,"availableCreateTools",void 0),e([r({readOnly:!0})],T.prototype,"createGraphic",null),e([r()],T.prototype,"creationMode",void 0),e([r()],T.prototype,"defaultCreateOptions",null),e([r()],T.prototype,"defaultUpdateOptions",null),e([r()],T.prototype,"iconClass",void 0),e([r()],T.prototype,"label",null),e([r()],T.prototype,"labelOptions",null),e([r()],T.prototype,"layer",null),e([r({type:["horizontal","vertical"]})],T.prototype,"layout",void 0),e([r(),m("esri/widgets/Sketch/t9n/Sketch")],T.prototype,"messages",void 0),e([r()],T.prototype,"snappingOptions",null),e([r()],T.prototype,"state",null),e([r()],T.prototype,"tooltipOptions",null),e([r({readOnly:!0})],T.prototype,"updateGraphics",null),e([r()],T.prototype,"view",null),e([r(),_(["create","update","undo","redo"])],T.prototype,"viewModel",null),e([r()],T.prototype,"visibleElements",void 0),e([c("visibleElements")],T.prototype,"castVisibleElements",null),T=e([p("esri.widgets.Sketch")],T);const M=T;export{M as default};