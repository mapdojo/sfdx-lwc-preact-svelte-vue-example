/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import{HandleOwnerMixin as t}from"../core/HandleOwner.js";import{when as s,watch as i}from"../core/reactiveUtils.js";import{property as r}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as l}from"../core/accessorSupport/decorators/subclass.js";import o from"./Widget.js";import{storeNode as a}from"./support/widgetUtils.js";import{messageBundle as n}from"./support/decorators/messageBundle.js";import{vmEvent as c}from"./support/decorators/vmEvent.js";import{tsx as d}from"./support/jsxFactory.js";import h from"./UtilityNetworkTrace/UtilityNetworkTraceViewModel.js";import{GraphicHandler as u,HIGHLIGHT_COLOR as p}from"./UtilityNetworkTrace/support/GraphicHandler.js";const g="esri-utility-trace-network",m={base:g,loaderContainer:`${g}__loader-container`,loader:`${g}__loader`,fadeIn:`${g}--fade-in`,addButtonContainer:`${g}__add-button-container`,noticeContainer:`${g}__notice-container`,listContainer:`${g}__list-container`,resultsContainer:`${g}__results-container`,flow:`${g}__flow`,esriWidget:"esri-widget",esriWidgetPanel:"esri-widget--panel",esriWidgetDisabled:"esri-widget--disabled",esriButton:"esri-button",esriButtonTertiary:"esri-button--tertiary",esriInput:"esri-input",esriMatchHeight:"esri-match-height",iconHandle:"esri-icon-handle-vertical",iconPlus:"esri-icon-plus",iconEdit:"esri-icon-edit",iconHandleHorizontal:"esri-icon-handle-horizontal",iconRefresh:"esri-icon-refresh",iconLink:"esri-icon-link",iconRemove:"esri-icon-erase",widgetIcon:"esri-icon-UtilityNetworkTrace",header:"esri-widget__heading",loading:"esri-icon-loading-indicator",rotating:"esri-rotating"},w="esri.widgets.UtilityNetworkTrace";function _(e){return{height:e+"px"}}function b(e){return{width:e+"px"}}function v(){return{width:"75%"}}function y(){return{textAlign:"center",padding:"1rem"}}function T(){return{width:"100%"}}function S(){return{height:"100%"}}const f={NOEXTENTION:-2147208474};let R=class extends(t(o)){constructor(e,t){super(e,t),this._tracesExists=!0,this._graphicHandler=null,this._selectToolActive=!1,this._activeTrace=null,this._activeSwatch="",this._traceHeaderForFlow="",this._assetGroupHeader="",this._assetTypeHeader="",this._traceResultsFunctions=[],this._traceResultsAssetGroup=[],this._traceResultsAssetType=[],this._traceResultsIndividual=[],this._showTraceResultFunctions=!1,this._showTraceResultAssetGroup=!1,this._showTraceResultAssetType=!1,this._showIndividualRecords=!1,this._activeTab="input",this._flagViewType="starting-point",this._alertRemoveModal=!1,this._warningNoFlag=!1,this._warningNoTraceSelected=!1,this._warningNoStartAssetFound=!1,this._warningNoBarrierAssetFound=!1,this._warningNoTerminal=!1,this._confirmReset=!1,this._showResultOptions=!1,this._resultObjectIdField="objectid",this._resultDisplayField="objectid",this._resultSortField="objectid",this._resultSortOrder="desc",this._swatchNode=null,this._individualResultNode=null,this._symbolStartFlag=null,this._symbolBarrier=null,this._watchHandler=null,this._loadUNError=!0,this._errorMessage="",this.disabled=!0,this.iconClass=m.widgetIcon,this.inputSettings=[],this.messages=null,this.viewModel=new h}initialize(){this._utilityNetworkTraceInitialized(),this._graphicHandler=new u}get defaultGraphicColor(){return this.viewModel.defaultGraphicColor}set defaultGraphicColor(e){this.viewModel.defaultGraphicColor=e}get flags(){return this.viewModel.flags}set flags(e){this.viewModel.flags=e}get gdbVersion(){return this.viewModel.gdbVersion}set gdbVersion(e){this.viewModel.gdbVersion=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get selectedTraces(){return this.viewModel.selectedTraces}set selectedTraces(e){this.viewModel.selectedTraces=e}get selectOnComplete(){return this.viewModel.selectOnComplete}set selectOnComplete(e){this.viewModel.selectOnComplete=e}get showGraphicsOnComplete(){return this.viewModel.showGraphicsOnComplete}set showGraphicsOnComplete(e){this.viewModel.showGraphicsOnComplete=e}get showSelectionAttributes(){return this.viewModel.showSelectionAttributes}set showSelectionAttributes(e){this.viewModel.showSelectionAttributes=e}get view(){return this.viewModel.view}set view(e){this.viewModel.view=e}async checkCanTrace(){this._confirmReset=!1;const e=this.viewModel.checkCanTrace();e.status?(this._warningNoFlag=!1,this._warningNoTraceSelected=!1,this._warningNoTraceSelected=!1,this._warningNoTerminal=!1,this._showTraceResultFunctions=!1,this._showTraceResultAssetGroup=!1,this._showTraceResultAssetType=!1,this._showIndividualRecords=!1,this.switchTab("result"),this.viewModel._activeProgress=!0,await this.viewModel.callTrace(),this.viewModel._activeProgress=!1):e.issues.forEach((e=>{switch(e){case"noStart":this._warningNoFlag=!0;break;case"noTerminalSelected":this._warningNoTerminal=!0;break;default:this._warningNoTraceSelected=!0}}))}confirmReset(){this._confirmReset=!0}render(){const{state:e}=this.viewModel;this._mixCustomStrings(),this._overrideFlagSymbol();const t="loading"===e?this.renderLoading():this.renderUtilityNetworkTrace();return d("div",{class:this.classes(m.base,m.esriWidget,m.esriWidgetPanel,{[m.esriWidgetDisabled]:this.disabled}),styles:S()},t)}loadDependencies(){return Promise.all([import("@esri/calcite-components/dist/components/calcite-action.js"),import("@esri/calcite-components/dist/components/calcite-action-group.js"),import("@esri/calcite-components/dist/components/calcite-action-pad.js"),import("@esri/calcite-components/dist/components/calcite-block.js"),import("@esri/calcite-components/dist/components/calcite-block-section.js"),import("@esri/calcite-components/dist/components/calcite-button.js"),import("@esri/calcite-components/dist/components/calcite-checkbox.js"),import("@esri/calcite-components/dist/components/calcite-color-picker-swatch.js"),import("@esri/calcite-components/dist/components/calcite-combobox.js"),import("@esri/calcite-components/dist/components/calcite-combobox-item.js"),import("@esri/calcite-components/dist/components/calcite-flow.js"),import("@esri/calcite-components/dist/components/calcite-flow-item.js"),import("@esri/calcite-components/dist/components/calcite-icon.js"),import("@esri/calcite-components/dist/components/calcite-label.js"),import("@esri/calcite-components/dist/components/calcite-list.js"),import("@esri/calcite-components/dist/components/calcite-list-item.js"),import("@esri/calcite-components/dist/components/calcite-loader.js"),import("@esri/calcite-components/dist/components/calcite-modal.js"),import("@esri/calcite-components/dist/components/calcite-notice.js"),import("@esri/calcite-components/dist/components/calcite-option.js"),import("@esri/calcite-components/dist/components/calcite-panel.js"),import("@esri/calcite-components/dist/components/calcite-popover.js"),import("@esri/calcite-components/dist/components/calcite-select.js"),import("@esri/calcite-components/dist/components/calcite-tab.js"),import("@esri/calcite-components/dist/components/calcite-tab-nav.js"),import("@esri/calcite-components/dist/components/calcite-tab-title.js"),import("@esri/calcite-components/dist/components/calcite-tabs.js")])}switchTab(e){this._activeTab=e}switchToFunctions(e,t){this._traceResultsFunctions=e,this._showTraceResultFunctions=t}switchToAssetGroup(e,t,s){this._traceHeaderForFlow=t,this._traceResultsAssetGroup=e,this._showTraceResultAssetGroup=s}switchToAssetType(e,t,s){this._assetGroupHeader=t,this._traceResultsAssetType=e,this._showTraceResultAssetType=s}switchToIndividualRecords(e,t,s){this._assetTypeHeader=t,this._traceResultsIndividual=e,this._showIndividualRecords=s}renderLoading(){return d("div",{class:m.loaderContainer,key:"loader"},d("div",{class:m.loader}))}renderUtilityNetworkTrace(){const{messages:e}=this;let t=d("calcite-tabs",{position:"top",layout:"center",styles:T()},d("calcite-tab-nav",{slot:"title-group"},d("calcite-tab-title",{selected:"input"===this._activeTab,onclick:()=>{this.switchTab("input")}},e.inputsStrings.headerTabInputs),d("calcite-tab-title",{selected:"result"===this._activeTab,onclick:()=>{this.switchTab("result")}},e.resultsStrings.headerTabResults)),d("calcite-tab",{selected:"input"===this._activeTab},this.renderInputPanel()),d("calcite-tab",{selected:"result"===this._activeTab},this.viewModel._activeProgress?d("calcite-loader",{label:e.alertsStrings.traceExecuting,text:e.alertsStrings.traceExecuting,type:"indeterminate"}):this.viewModel._traceResults.length>0?this.renderResultPanel():this.renderWarningMessage("noTraceExecuted",!1),d("calcite-modal",{open:this._confirmReset,kind:"brand",scale:"m",width:"s",onCalciteModalClose:()=>{this._confirmReset=!1}},d("h3",{slot:"header"},e.resultsStrings.startOverButton),d("div",{slot:"content"},e.resultsStrings.startOverValidation),d("calcite-button",{slot:"secondary",width:"full",appearance:"outline",onclick:()=>{this._confirmReset=!1}},e.globalStrings.cancel),d("calcite-button",{slot:"primary",width:"full",onclick:()=>{this._confirmReset=!1,this.viewModel.reset(),this.switchTab("input")}},e.globalStrings.ok))));return this._tracesExists||(t=d("calcite-panel",null,this.renderWarningMessage("noTraceConfig",!1))),this._loadUNError||(t=d("calcite-panel",null,this.renderWarningMessage("loadUNError",!1,this._errorMessage))),t}renderInputPanel(){const{messages:e}=this;return d("calcite-flow",{class:m.flow},d("calcite-flow-item",null,this._warningNoFlag?this.renderWarningMessage("flag",!0):null,this._warningNoTerminal?this.renderWarningMessage("noTerminal",!0):null,this._warningNoTraceSelected?this.renderWarningMessage("trace",!0):null,this.renderTraceSelectorContainer(),this.renderStartFlagsContainer(),this.renderBarriersFlagsContainer(),this._warningNoFlag&&this._warningNoTraceSelected?d("div",{styles:_(10)}):null,d("calcite-button",{slot:"footer",scale:"m",kind:"brand",width:"full",onclick:()=>{this.checkCanTrace()}},e.tracingStrings.runTrace)),this._selectToolActive?this.renderActiveTool():null)}renderResultPanel(){return d("calcite-flow",{styles:S()},this.renderTraceResults(),this._showTraceResultFunctions?this.renderTraceResultFunctions():null,this._showTraceResultAssetGroup?this.renderTraceResultByAssetGroup():null,this._showTraceResultAssetType?this.renderTraceResultByAssetType():null,this._showIndividualRecords?this.renderTraceResultIndividual():null,this._showIndividualRecords?this.renderTraceResultIndividualPopover():null)}renderStartFlagsContainer(){const{messages:e}=this,t=[];let s=[];s=this.viewModel._flags.filter((e=>"starting-point"===e.type)),s.forEach((e=>{e.displayValue&&t.push(this.renderFlagRow(e,"start"))}));let i=null;return this._symbolStartFlag&&(i=this._getSymbolIcon(this._symbolStartFlag)),d("calcite-block",{heading:e.inputsStrings.headerStartingPoint+" ("+s.length+")",open:!0,collapsible:!0},d("div",{slot:"icon"},i||d("calcite-icon",{icon:"pin",scale:"s"})),d("div",null,e.inputsStrings.startingPointHint),d("div",{class:m.listContainer},t),this._warningNoStartAssetFound?this.renderWarningMessage("noStartAsset",!0):null,d("div",{class:m.addButtonContainer},d("calcite-button",{alignment:"center",appearance:"outline",iconStart:"plus",scale:"m",href:"",label:e.inputsStrings.addPointOption,onclick:()=>{this._flagViewType="starting-point",this._selectToolActive=!0,this._warningNoStartAssetFound=!1,this.viewModel.addFlagByHit("starting-point",this._symbolStartFlag).then((e=>{e?this._warningNoFlag=!1:this._warningNoStartAssetFound=!0,this._selectToolActive=!1}))},round:!0})))}renderBarriersFlagsContainer(){const{messages:e}=this,t=[];let s=[];s=this.viewModel._flags.filter((e=>"barrier"===e.type)),s.forEach((e=>{e.displayValue&&t.push(this.renderFlagRow(e,"barrier"))}));let i=null;return this._symbolBarrier&&(i=this._getSymbolIcon(this._symbolBarrier)),d("calcite-block",{heading:e.inputsStrings.headerBarrier+" ("+s.length+")",open:!1,collapsible:!0},d("div",{slot:"icon"},i||d("calcite-icon",{icon:"x-circle-f",scale:"s"})),d("div",null,e.inputsStrings.barrierPointHint),d("div",{class:m.listContainer},t),this._warningNoBarrierAssetFound?this.renderWarningMessage("noBarrierAsset",!0):null,d("div",{class:m.addButtonContainer},d("calcite-button",{alignment:"center",appearance:"outline",kind:"brand",iconStart:"plus",scale:"m",href:"",round:!0,label:e.inputsStrings.addPointOption,onclick:()=>{this._flagViewType="barrier",this._selectToolActive=!0,this._warningNoBarrierAssetFound=!1,this.viewModel.addFlagByHit("barrier",this._symbolBarrier).then((e=>{e||(this._warningNoBarrierAssetFound=!0),this._selectToolActive=!1}))}})))}renderFlagRow(e,t){const{messages:s}=this,i=[];let r=!1;return null!==e.allTerminals&&void 0!==e.allTerminals&&e.allTerminals.terminals.length>0&&(r=!0,e.allTerminals.terminals.forEach((t=>{let s=!1;e?.selectedTerminals?.includes(t.id)&&(s=!0),i.push(d("calcite-combobox-item",{key:t.name,selected:s,value:t.id,textLabel:t.name}))}))),d("calcite-block",{key:"pop"+e.globalId+e.type+e.id+t,heading:e.displayValue.value,collapsible:null!==e.allTerminals||"barrier"===e.type},d("calcite-action",{textEnabled:!0,slot:"header-menu-actions",text:s.globalStrings.remove,label:s.globalStrings.remove,onclick:()=>{this.viewModel.removeFlag(e)},scale:"s",icon:"trash"}),d("calcite-action",{textEnabled:!0,slot:"header-menu-actions",text:s.globalStrings.zoomToFeature,label:s.globalStrings.zoomToFeature,onclick:()=>{this.viewModel.zoomToAsset(e.details.geometry)},scale:"s",icon:"zoom-to-object"}),"barrier"===e.type?d("calcite-label",{scale:"s",layout:"inline"},d("calcite-checkbox",{checked:e.isFilterBarrier,scale:"s",onclick:()=>{this.viewModel.manageFilterBarrier(!e.isFilterBarrier,e)}}),s.inputsStrings.barrierFilter):null,r?d("calcite-combobox",{label:s.globalStrings.selectTerminalPlaceholder,placeholder:s.globalStrings.selectTerminalPlaceholder,selectionMode:"multiple",scale:"s",maxItems:0,onCalciteComboboxChange:t=>{t.target.selectedItems.length>0?(e.selectedTerminals=[],t.target.selectedItems.forEach((t=>{this.viewModel.addTerminal(t.value,e)}))):e.selectedTerminals=[]},onCalciteComboboxChipClose:t=>{t.preventDefault(),this.viewModel.removeTerminal(t.target.value,e)}},i):null)}renderActiveTool(){const{messages:e}=this;let t=null;return"starting-point"===this._flagViewType?this._symbolStartFlag&&(t=this._getSymbolIcon(this._symbolStartFlag)):this._symbolBarrier&&(t=this._getSymbolIcon(this._symbolBarrier)),d("calcite-flow-item",{onCalciteFlowItemBack:()=>{this.viewModel._clickHandler&&(this.viewModel._clickHandler.remove(),this.view.popup.autoOpenEnabled=!0),this._selectToolActive=!1},heading:e.inputsStrings.addPointOption},d("calcite-block",{open:!0,collapsible:!1,heading:""},d("div",{styles:y()},t||d("calcite-icon",{icon:"starting-point"===this._flagViewType?"pin-plus":"x-circle-f",scale:"m"})),d("div",{styles:y()},e.inputsStrings.addPointHint)))}renderTraceSelectorContainer(){const{messages:e}=this,t=[];return this.viewModel._traces.length>0&&this.viewModel._traces.forEach((e=>{t.push(d("calcite-combobox-item",{key:e.globalId,selected:e.selected,value:e.globalId,textLabel:e.title,onCalciteComboboxItemChange:t=>{const s=t.target;this.viewModel.selectTraces(s.selected,e.globalId),this.viewModel._traces.length>0&&(this._warningNoTraceSelected=!1)}}))})),d("calcite-block",{heading:e.tracingStrings.traceOperation,open:!0,collapsible:!0},d("calcite-combobox",{label:e.inputsStrings.selectTraces,placeholder:e.inputsStrings.selectTraces,selectionMode:"multiple",overlayPositioning:"fixed",scale:"s",maxItems:0,onCalciteComboboxChipClose:e=>{this.viewModel.selectTraces(!1,e.target.value),this.viewModel._traces.length>0&&(this._warningNoTraceSelected=!1)}},t))}renderStartOverContainer(){const{messages:e}=this;return d("calcite-button",{slot:"footer",scale:"m",kind:"brand",width:"full",onclick:()=>{this.confirmReset()}},e.resultsStrings.startOverButton)}renderWarningMessage(e,t,s){const{messages:i}=this;let r=i.alertsStrings.NoRunAlertHeader,l=i.alertsStrings.noResultsInfo;switch(e){case"flag":r=i.alertsStrings.startingPointAlertHeader,l=i.alertsStrings.startingPointAlert;break;case"noTerminal":r=i.alertsStrings.noTerminalDefinedHeader,l=i.alertsStrings.noTerminalDefined;break;case"trace":r=i.alertsStrings.selectTraceAlertHeader,l=i.alertsStrings.selectTraceAlert;break;case"noTraceExecuted":r=i.alertsStrings.NoRunAlertHeader,l=i.alertsStrings.noResultsInfo;break;case"noBarrierAsset":case"noStartAsset":r=i.alertsStrings.noAssetsFoundHeader,l=i.alertsStrings.noAssetFound;break;case"noTraceConfig":r="",l=i.alertsStrings.noTraceSupported;break;default:r=i.alertsStrings.genericErrorHeader,l=s||""}return d("div",{class:m.noticeContainer,key:e},d("calcite-notice",{key:e,open:!0,closable:t,icon:!0,scale:"s",width:"auto",kind:"danger",onCalciteNoticeClose:()=>{switch(e){case"flag":this._warningNoFlag=!1;break;case"noTerminal":this._warningNoTerminal=!1;break;case"trace":this._warningNoTraceSelected=!1;break;case"noStartAsset":this._warningNoStartAssetFound=!1;break;case"noBarrierAsset":this._warningNoBarrierAssetFound=!1}}},d("div",{slot:"title"},r),d("div",{slot:"message"},l)))}renderRemoveTraceContainer(e){const{messages:t}=this;return d("calcite-action",{textEnabled:!0,slot:"header-menu-actions",text:t.globalStrings.clearResults,label:t.globalStrings.clearResults,onclick:()=>{this._alertRemoveModal=!0,this._activeTrace=e.trace},scale:"s",icon:"trash"})}renderHighlightColorPicker(e,t){const{messages:s}=this,i=[];for(let r=0;r<p.length;r++)i.push(d("calcite-action",{key:r,text:s.resultsStrings.graphicColor,label:s.resultsStrings.graphicColor,scale:"s",onclick:()=>{this.viewModel.changeResultGraphicColor(this._graphicHandler.getHighlightColor(r),t)}},d("calcite-color-picker-swatch",{scale:"s",color:this._graphicHandler.getHighlightColor(r).hex,active:e.color===this._graphicHandler.getHighlightColor(r).color})));return d("calcite-action-pad",{position:"start",layout:"grid",expandDisabled:!0},d("calcite-action-group",{layout:"grid",columns:4},i))}renderTraceResults(){const{messages:e}=this,t=this.viewModel._traceResults,s=[];return t.forEach(((t,i)=>{let r=[],l=[],o=!1,a=!1,n=!1;null!==t.results&&t.results.hasOwnProperty("elements")?(null!==t.results.aggregatedGeometry&&(a=!0),null!==t.results.globalFunctionResults&&t.results.globalFunctionResults.length>0&&(l=t.results.globalFunctionResults,l.length>0&&(n=!0)),t.results.elements.length>0&&(r=t.results.elements,r.length>0&&(o=!0)),s.push(d("calcite-block",{key:t.trace.title,heading:t.trace.title,description:t.trace.description,collapsible:!1,open:!0},this.renderRemoveTraceContainer(t),d("calcite-list",null,n?d("calcite-list-item",{label:e.resultsStrings.functionHeader+" ("+l.length+")",onCalciteListItemSelect:()=>{this.switchToFunctions(l,!0)}},d("calcite-icon",{icon:"chevron-right",scale:"s",slot:"content-end"})):null,o&&this.viewModel.showSelectionAttributes?d("calcite-list-item",{key:this.id,label:e.resultsStrings.viewFeatures+" ("+r.length+")",onCalciteListItemSelect:()=>{this.switchToAssetGroup(this._groupResultsByAssetGroup(t),t.trace.title+" ("+r.length+")",!0)}},d("calcite-icon",{icon:"chevron-right",scale:"s",slot:"content-end"})):this.viewModel.showSelectionAttributes?d("calcite-label",{layout:"inline",scale:"s"},e.resultsStrings.noSelectionResults):null),d("div",{styles:_(10)}),o?d("calcite-label",{layout:"inline",scale:"s",onclick:e=>{e.preventDefault(),e.stopPropagation(),this.viewModel.mergeSelection(!t.selectionEnabled,t.trace)}},d("calcite-checkbox",{checked:t.selectionEnabled,scale:"m",onclick:e=>{e.preventDefault(),e.stopPropagation(),this.viewModel.mergeSelection(!t.selectionEnabled,t.trace)}}),this.viewModel.showSelectionAttributes?e.resultsStrings.selectFeatures:e.resultsStrings.selectFeatures+" ("+r.length+")"):null,a?d("calcite-block-section",{toggleDisplay:"switch",text:e.resultsStrings.highlightTrace,open:t.graphicEnabled,onCalciteBlockSectionToggle:e=>{e.target.open?this.viewModel.changeResultGraphicColor(t.graphicColor,t):this.viewModel.removeResultGraphicFromView(t)}},d("calcite-action",{text:e.resultsStrings.graphicColor,label:e.resultsStrings.graphicColor,scale:"s",onclick:e=>{const t=e.target;this._swatchNode=t,this._activeSwatch="aggGeom_"+i}},d("calcite-color-picker-swatch",{scale:"s",color:t.graphicColor.hex})),d("calcite-popover",{autoClose:!0,label:e.resultsStrings.graphicColor,referenceElement:this._swatchNode,placement:"auto-start",offsetDistance:0,offsetSkidding:0,open:this._activeSwatch==="aggGeom_"+i,onCalcitePopoverClose:()=>{this._swatchNode=null,this._activeSwatch=null}},this.renderHighlightColorPicker(t.graphicColor,t))):null))):s.push(d("calcite-block",{key:"error-"+i,heading:t.trace.title,collapsible:!1,open:!0},this.renderRemoveTraceContainer(t),this.renderWarningMessage("noController",!1,t.status)))})),d("calcite-flow-item",{key:"traceResults",styles:S()},s,this.renderStartOverContainer(),d("calcite-modal",{open:this._alertRemoveModal,kind:"brand",scale:"m",width:"s",onCalciteModalClose:()=>{this._alertRemoveModal=!1}},d("h3",{slot:"header"},e.globalStrings.clearResults),d("div",{slot:"content"},e.alertsStrings.clearResultsAlert),d("calcite-button",{slot:"secondary",width:"full",appearance:"outline",onclick:()=>{this._alertRemoveModal=!1}},e.globalStrings.cancel),d("calcite-button",{slot:"primary",width:"full",onclick:()=>{this.viewModel.clearResult(this._activeTrace),this._alertRemoveModal=!1,0===this.viewModel._traceResults.length?this.switchTab("input"):(this._activeTrace=this.viewModel._traceResults[0].trace,this._showTraceResultFunctions=!1,this._showTraceResultAssetGroup=!1,this._showTraceResultAssetType=!1,this._showIndividualRecords=!1)}},e.globalStrings.ok)))}renderTraceResultFunctions(){const{messages:e}=this,t=this._traceResultsFunctions,s=[];return t.forEach((e=>{s.push(this.renderResultRowFunctions(e))})),d("calcite-flow-item",{key:"functionResultMultiple",onCalciteFlowItemBack:()=>{this.switchToFunctions([],!1)},heading:e.resultsStrings.functionHeader},s,this.renderStartOverContainer())}renderTraceResultByAssetGroup(){const e=this._traceResultsAssetGroup,t=[];for(const s in e){const i=e[s];for(const e in i)t.push(this.renderResultRowAssetGroup(i[e]))}return d("calcite-flow-item",{key:"assetGroupResultMultiple",onCalciteFlowItemBack:()=>{this.switchToAssetGroup([],"",!1)},heading:this._traceHeaderForFlow},d("calcite-list",null,t),this.renderStartOverContainer())}renderTraceResultByAssetType(){const e=this._traceResultsAssetType,t=[];for(const s in e)e[s].length>0&&t.push(this.renderResultRowAssetType(e[s]));return d("calcite-flow-item",{key:"assetTypeResult",onCalciteFlowItemBack:()=>{this.switchToAssetType([],"",!1)},heading:this._assetGroupHeader},d("calcite-list",{selectionMode:"none"},t),this.renderStartOverContainer())}renderTraceResultIndividual(){const{messages:e}=this,t=this._traceResultsIndividual;t.sort(this._compare(this._resultSortField,this._resultSortOrder));const s=[];if(t.length>0){t[0].details.fields.some((e=>e.name.toLowerCase()===this._resultDisplayField.toLocaleLowerCase()))||(this._resultDisplayField=this._resultObjectIdField,this._resultSortField=this._resultObjectIdField),t.forEach((e=>{s.push(this.renderResultRowIndividual(e))}))}return d("calcite-flow-item",{key:"individualResult",onCalciteFlowItemBack:()=>{this._showResultOptions=!1,this.switchToIndividualRecords([],"",!1)},heading:this._assetTypeHeader},d("calcite-action",{slot:"header-actions-end",text:e.resultsStrings.displayAttribute,onclick:()=>{this._showResultOptions=!0},scale:"m",icon:"gear",label:e.resultsStrings.displayAttribute,id:"field_options"+this.id,afterCreate:a,bind:this,"data-node-ref":"_individualResultNode"}),d("calcite-list",{selectionMode:"none"},s),this.renderStartOverContainer())}renderTraceResultIndividualPopover(){const{messages:e}=this,t=this._traceResultsIndividual,s=[],i=[];return t.length>0&&t[0].details.fields.forEach((e=>{s.push(d("calcite-option",{key:"display"+e.name,label:e.alias,value:e.name,selected:e.name===this._resultDisplayField})),i.push(d("calcite-option",{key:"sort"+e.name,label:e.alias,value:e.name,selected:e.name===this._resultSortField}))})),d("calcite-popover",{autoClose:!0,label:e.resultsStrings.displayAttribute,referenceElement:this._individualResultNode,placement:"left-start",overlayPositioning:"fixed",offsetDistance:0,offsetSkidding:0,open:this._showResultOptions,styles:null!==this.domNode?b(.75*this.domNode.clientWidth):v()},d("calcite-block",{heading:"",open:!0},d("calcite-label",{scale:"s"},e.resultsStrings.displayAttribute,d("calcite-select",{scale:"s",label:e.resultsStrings.displayAttribute,onCalciteSelectChange:e=>{const t=e.target;this._resultDisplayField=t.selectedOption.value,this._showResultOptions=!1}},s)),d("calcite-label",{scale:"s"},e.resultsStrings.sortBy,d("calcite-select",{scale:"s",label:e.resultsStrings.sortBy,onCalciteSelectChange:e=>{const s=e.target;this._resultSortField=s.selectedOption.value,t.sort(this._compare(this._resultSortField,this._resultSortOrder)),this._traceResultsIndividual=t,this._showResultOptions=!1}},i))))}renderResultRow(e){let t=e[0].assetGroupCode;const s=this.viewModel.getValidSources().filter((t=>t.sourceId===e[0].networkSourceId));if(s.length>0){const i=s[0].assetGroups.filter((t=>t.assetGroupCode===e[0].assetGroupCode));i.length>0&&(t=i[0].assetGroupName)}return d("calcite-list-item",{label:t+" ("+e.length+")",onCalciteListItemSelect:()=>{this.switchToAssetType(this._groupResultsByAssetType(e),t+" ("+e.length+")",!0)}},d("calcite-icon",{icon:"chevron-right",scale:"s",slot:"content-end"}))}renderResultRowFunctions(e){return d("calcite-block",{heading:e.networkAttributeName+" "+e.functionType+" = "+e.result,collapsible:!1})}renderResultRowAssetGroup(e){const t=this._getAssetGroupName(e[0]);return d("calcite-list-item",{label:t+" ("+e.length+")",onCalciteListItemSelect:()=>{this.switchToAssetType(this._groupResultsByAssetType(e),t+" ("+e.length+")",!0)}},d("calcite-icon",{slot:"content-end",icon:"chevron-right",scale:"s"}))}renderResultRowAssetType(e){const t=this._getAssetTypeName(e[0]);return d("calcite-list-item",{label:t+" ("+e.length+")",onCalciteListItemSelect:()=>{this.viewModel.queryFeaturesById(e).then((s=>{if(s?.length){this._resultObjectIdField=s[0].layer.objectIdField,"objectid"===this._resultDisplayField&&(this._resultDisplayField=s[0].layer.objectIdField),"objectid"===this._resultSortField&&(this._resultSortField=s[0].layer.objectIdField);const i=this._appendAttributes(e,s,"objectId");this.switchToIndividualRecords(i,t+" ("+e.length+")",!0)}else this.switchToIndividualRecords(e,t+" ("+e.length+")",!0)}))}},d("calcite-icon",{slot:"content-end",icon:"chevron-right",scale:"s"}))}renderResultRowIndividual(e){const{messages:t}=this;let s="",i=null;for(let r=0;r<e.details.fields.length;r++)e.details.fields[r].name===this._resultDisplayField&&(i=e.details.fields[r]);if("date"===i.type){s=new Date(e.details.attributes[this._resultDisplayField]).toDateString()}else if(null!==i.domain){const t=i.domain.codedValues;let r="";for(let s=0;s<t.length;s++)t[s].code===e.details.attributes[this._resultDisplayField]&&(r=t[s].name);s=r}else s="assetgroup"===this._resultDisplayField.toLocaleLowerCase()?this._getAssetGroupName(e):"assettype"===this._resultDisplayField.toLocaleLowerCase()?this._getAssetTypeName(e):e.details.attributes[this._resultDisplayField];return s&&""!==s&&null!==s||(s=t.resultsStrings.noValue),d("calcite-list-item",{label:s,onCalciteListItemSelect:()=>{this.viewModel.zoomToAsset(e.details.geometry)}},d("calcite-icon",{icon:"zoom-to-object",textLabel:t.globalStrings.zoomToFeature,scale:"s",slot:"content-end"}))}_mixCustomStrings(){const{messages:e}=this;this.inputSettings.length>0&&this.inputSettings.forEach((t=>{"starting-point"===t.type&&(e.inputsStrings.headerStartingPoint=t.label,e.inputsStrings.startingPointHint=t.description),"barrier"===t.type&&(e.inputsStrings.headerBarrier=t.label,e.inputsStrings.barrierPointHint=t.description)}))}_overrideFlagSymbol(){this.inputSettings.length>0&&this.inputSettings.forEach((e=>{"starting-point"===e.type?this._symbolStartFlag=e.symbol:this._symbolBarrier=e.symbol,this.viewModel.changeFlagSymbol(e.type,e.symbol)}))}_utilityNetworkTraceInitialized(){return this.viewModel.loadUtilityNetwork().then((e=>e?(this.viewModel.selectTracesOnLoad(),this._registerWatchers(),this.viewModel._traces.length<=0&&(this._tracesExists=!1),this.viewModel.flags.length>0?this.view.when().then((()=>{this._watchHandler=s((()=>!this.view?.updating),(async()=>{this._warningNoFlag=!1,this._warningNoBarrierAssetFound=!1,this._warningNoStartAssetFound=!1;const e=await this.viewModel.addFlagsOnLoad();this.viewModel.removeFlagsOnLoadWatcher(),e.includes("barrier")&&(this._warningNoBarrierAssetFound=!0),e.includes("starting-point")&&(this._warningNoStartAssetFound=!0),this.disabled=!1,null!==this._watchHandler&&this._watchHandler.remove()}))})):this.view.when().then((()=>{this._watchHandler=s((()=>!this.view?.updating),(()=>{this.disabled=!1,null!==this._watchHandler&&this._watchHandler.remove()}),{initial:!0})}))):(this._tracesExists=!1,this.view.when().then((()=>{this._watchHandler=s((()=>!this.view?.updating),(()=>{this.disabled=!1,null!==this._watchHandler&&this._watchHandler.remove()}),{initial:!0})}))))).catch((e=>{const{messages:t}=this;this._loadUNError=!1,e.details.raw.extendedCode===f.NOEXTENTION?this._errorMessage=t?.alertsStrings?.noUserExtension||e.message:this._errorMessage=e.message,this.disabled=!1}))}_registerWatchers(){this.addHandles([i((()=>this.selectedTraces),(()=>{this.viewModel.selectTracesOnLoad(),this.scheduleRender()})),i((()=>this.defaultGraphicColor),(()=>{this.viewModel._traceResults.length>0&&this.viewModel._traceResults.forEach((e=>{this.viewModel.changeResultGraphicColor(this.viewModel.defaultGraphicColor,e)})),this.scheduleRender()}))])}_groupResultsByAssetGroup(e){const t=[],s=e.results.elements,i=this._groupBy(s,"networkSourceId");for(const r in i)t.push(this._groupBy(i[r],"assetGroupCode"));return t}_groupResultsByAssetType(e){return this._groupBy(e,"assetTypeCode")}_appendAttributes(e,t,s){const i=[];return e.forEach((e=>{t.forEach((t=>{t.featureSet.features.forEach((r=>{e[s]===r.attributes[this._resultObjectIdField]&&(e.details=r,e.details.fields=t.featureSet.fields,i.push(e))}))}))})),i}_getAssetGroupName(e){let t=e.assetGroupCode.toString();const s=e.assetGroupCode,i=this.viewModel.getValidSources().find((t=>t.sourceId===e.networkSourceId));if(i){const e=i.assetGroups.find((e=>e.assetGroupCode===s));e&&(t=e.assetGroupName)}return t}_getAssetTypeName(e){let t=e.assetTypeCode.toString();const s=e.assetGroupCode,i=this.viewModel.getValidSources().find((t=>t.sourceId===e.networkSourceId));if(i){const r=i.assetGroups.find((e=>e.assetGroupCode===s));if(r){const s=r.assetTypes.find((t=>t.assetTypeCode===e.assetTypeCode));s&&(t=s.assetTypeName)}}return t}_compare(e,t){return(s,i)=>{let r=0,l=s.details.attributes[e],o=i.details.attributes[e];return isNaN(l)&&(l=l.toLowerCase()),isNaN(o)&&(o=o.toLowerCase()),"desc"===t?l>o?r=1:l<o&&(r=-1):l<o?r=1:l>o&&(r=-1),r}}_groupBy(e,t){return e.reduce(((e,s)=>((e[s[t]]=e[s[t]]||[]).push(s),e)),{})}_getSymbolIcon(e){return"picture-marker"===e.type?d("img",{src:e.url,width:e.width,height:e.height}):null}};e([r()],R.prototype,"_tracesExists",void 0),e([r()],R.prototype,"_selectToolActive",void 0),e([r()],R.prototype,"_activeTrace",void 0),e([r()],R.prototype,"_activeSwatch",void 0),e([r()],R.prototype,"_traceHeaderForFlow",void 0),e([r()],R.prototype,"_assetGroupHeader",void 0),e([r()],R.prototype,"_assetTypeHeader",void 0),e([r()],R.prototype,"_traceResultsFunctions",void 0),e([r()],R.prototype,"_traceResultsAssetGroup",void 0),e([r()],R.prototype,"_traceResultsAssetType",void 0),e([r()],R.prototype,"_traceResultsIndividual",void 0),e([r()],R.prototype,"_showTraceResultFunctions",void 0),e([r()],R.prototype,"_showTraceResultAssetGroup",void 0),e([r()],R.prototype,"_showTraceResultAssetType",void 0),e([r()],R.prototype,"_showIndividualRecords",void 0),e([r()],R.prototype,"_activeTab",void 0),e([r()],R.prototype,"_alertRemoveModal",void 0),e([r()],R.prototype,"_warningNoFlag",void 0),e([r()],R.prototype,"_warningNoTraceSelected",void 0),e([r()],R.prototype,"_confirmReset",void 0),e([r()],R.prototype,"_swatchNode",void 0),e([r()],R.prototype,"_errorMessage",void 0),e([r()],R.prototype,"defaultGraphicColor",null),e([r()],R.prototype,"disabled",void 0),e([r()],R.prototype,"flags",null),e([r()],R.prototype,"gdbVersion",null),e([r()],R.prototype,"iconClass",void 0),e([r()],R.prototype,"inputSettings",void 0),e([r()],R.prototype,"label",null),e([r(),n("esri/widgets/UtilityNetworkTrace/t9n/UtilityNetworkTrace")],R.prototype,"messages",void 0),e([r()],R.prototype,"selectedTraces",null),e([r()],R.prototype,"selectOnComplete",null),e([r()],R.prototype,"showGraphicsOnComplete",null),e([r()],R.prototype,"showSelectionAttributes",null),e([r()],R.prototype,"view",null),e([c(["add-flag","add-flag-complete","add-flag-error","select-features","clear-selection"]),r({type:h})],R.prototype,"viewModel",void 0),R=e([l(w)],R);const C=R;export{C as default};