/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../analysis/LineOfSightAnalysis.js";import s from"../../analysis/LineOfSightAnalysisObserver.js";import o from"../../analysis/LineOfSightAnalysisTarget.js";import i from"../../core/Collection.js";import{referenceSetter as n,castForReferenceSetter as r}from"../../core/collectionUtils.js";import a from"../../core/Handles.js";import{handlesGroup as l}from"../../core/handleUtils.js";import{destroyMaybe as h,isNone as c,applySome as d,isSome as g,unwrap as p}from"../../core/maybe.js";import{watch as y,syncAndInitial as m,sync as T}from"../../core/reactiveUtils.js";import{property as v}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as u}from"../../core/accessorSupport/decorators/subclass.js";import{getEffectiveElevationInfo as _,getConvertedElevation as f,absoluteHeightElevationInfo as w}from"../../support/elevationInfoUtils.js";import A from"./LineOfSightTarget.js";import{AnalysisViewModel as M}from"../support/AnalysisViewModel.js";const b=i.ofType(A);let j=class extends M{constructor(e){super(e),this.analysis=null,this.supportedViewType="3d",this.unsupportedErrorMessage="LineOfSightViewModel is only supported in 3D views.",this._handles=new a,this._vmTargetsToConnection=new Map,this._analysisTargetsToConnection=new Map}initialize(){this._handles.add([this.targets.on("after-add",(e=>this._onViewModelTargetAdded(e.item))),this.targets.on("after-remove",(e=>this._onViewModelTargetRemoved(e.item))),y((()=>this.analysis),(e=>this._onAnalysisChange(e)),m)])}destroy(){this._analysisTargetsToConnection.forEach((e=>e.remove())),this._handles=h(this._handles)}get state(){return this.disabled||!this.ready?"disabled":c(this.tool)?"ready":this.tool.state}get observer(){const{observer:e}=this.analysis;return c(e)||c(e.position)?null:this._convertAnalysisPointToAbsoluteHeight(e.position,e.elevationInfo)}set observer(e){const t=d(e,(e=>{const t=e.clone();return t.hasZ||(t.z=0),t}));this.analysis.observer=new s({position:t})}get targets(){return this._get("targets")||new b}set targets(e){this._set("targets",n(e,this.targets,b))}continue(){g(this.tool)&&this.tool.continue()}stop(){g(this.tool)&&this.tool.stop()}get testInfo(){return{analysisView:this.analysisView,getAnalysisTargetFromViewModelTarget:e=>d(this._vmTargetsToConnection.get(e),(e=>e.analysisTarget))}}constructAnalysis(){return new t}async onConnectToAnalysisView(e){this._handles.add([e.on("result-changed",(e=>{const t=this._analysisTargetsToConnection.get(e.target);t&&(g(e.result)?(t.viewModelTarget.intersectedGraphic=e.result.intersectedGraphic,t.viewModelTarget.intersectedLocation=p(e.result.intersectedLocation),t.viewModelTarget.visible=e.result.visible):(t.viewModelTarget.intersectedGraphic=null,t.viewModelTarget.intersectedLocation=null,t.viewModelTarget.visible=void 0))}))],"view")}onDisconnectFromAnalysisView(){null!=this._handles&&this._handles.remove("view")}_onViewModelTargetAdded(e){if(this._vmTargetsToConnection.get(e))return;const t=new o({position:e.location});this._connectViewModelWithAnalysisTarget(e,t),this.analysis.targets.add(t)}_onViewModelTargetRemoved(e){const t=this._vmTargetsToConnection.get(e);t&&(t.remove(),this.analysis.targets.remove(t.analysisTarget))}_onAnalysisTargetAdded(e){if(this._analysisTargetsToConnection.get(e))return;const t=new A({location:d(e.position,(t=>this._convertAnalysisPointToAbsoluteHeight(t,e.elevationInfo)))});this._connectViewModelWithAnalysisTarget(t,e),this.targets.add(t)}_onAnalysisTargetRemoved(e){const t=this._analysisTargetsToConnection.get(e);t&&(t.remove(),this.targets.remove(t.viewModelTarget))}_connectViewModelWithAnalysisTarget(e,t){let s=!1;const o=l([y((()=>({position:t.position,elevationInfo:t.elevationInfo})),(({position:t,elevationInfo:o})=>{s||(s=!0,e.location=d(t,(e=>this._convertAnalysisPointToAbsoluteHeight(e,o))),s=!1)}),T),y((()=>e.location),(e=>{s||(s=!0,t.position=d(e,(e=>{const t=e.clone();return t.hasZ||(t.z=0),t})),t.elevationInfo=null,s=!1)}),T)]),i={analysisTarget:t,viewModelTarget:e,remove:()=>{o.remove(),this._vmTargetsToConnection.delete(e),this._analysisTargetsToConnection.delete(t)}};this._vmTargetsToConnection.set(e,i),this._analysisTargetsToConnection.set(t,i)}_onAnalysisChange(e){const t="analysis";this._handles.remove(t),this._handles.add([this.analysis.targets.on("after-add",(e=>this._onAnalysisTargetAdded(e.item))),this.analysis.targets.on("after-remove",(e=>this._onAnalysisTargetRemoved(e.item)))],t),this.targets.removeAll(),e.targets.forEach((e=>{this._onAnalysisTargetAdded(e)}))}_convertAnalysisPointToAbsoluteHeight(e,t){const s=e.clone();if(g(this.view)){const o=_(e.hasZ,t);s.z=f(this.view,e,o,w)}return s}};e([v({type:t})],j.prototype,"analysis",void 0),e([v({readOnly:!0})],j.prototype,"state",null),e([v()],j.prototype,"observer",null),e([v({type:b,cast:r,nonNullable:!0})],j.prototype,"targets",null),j=e([u("esri.widgets.lineOfSight.LineOfSightViewModel")],j);const C=j;export{C as default};