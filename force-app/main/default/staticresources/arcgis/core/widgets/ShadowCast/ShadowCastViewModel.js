/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../Color.js";import i from"../../core/Accessor.js";import{createTask as r}from"../../core/asyncUtils.js";import"../../core/has.js";import s from"../../core/Handles.js";import{abortMaybe as o,destroyMaybe as n,isSome as a,unwrapOr as l,isNone as p,mapOr as d,applySome as u}from"../../core/maybe.js";import{after as c,throwIfAborted as h}from"../../core/promiseUtils.js";import{watch as m,syncAndInitial as f}from"../../core/reactiveUtils.js";import{createScreenPointArray as _,createRenderScreenPointArray as v}from"../../core/screenUtils.js";import{convertTime as y,offsetDateUTC as w}from"../../core/timeUtils.js";import{property as g}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as T}from"../../core/accessorSupport/decorators/subclass.js";import{c as D}from"../../chunks/vec3f64.js";import{longitudeToTimezone as P}from"../../views/3d/support/earthUtils.js";import{computeDirectionsOverTime as b}from"../../views/3d/support/sunUtils.js";import{ShadowCastVisualization as O}from"../../views/3d/webgl-engine/shaders/ShadowCastVisualizeTechniqueConfiguration.js";import j from"./DiscreteOptions.js";import{DurationMode as z}from"./DurationMode.js";import U from"./DurationOptions.js";import{ShadowCastState as C}from"./ShadowCastState.js";import{ShadowTooltipViewModel as V}from"./ShadowTooltipViewModel.js";import{ShadowVisualizationType as E}from"./ShadowVisualizationType.js";import S from"./ThresholdOptions.js";import{breadthFirstBinaryPartitioning as A}from"../support/traversalUtils.js";const R=[],N=D(),x=[],M=255,k=y(1,"hours","milliseconds"),F=500;let G=class extends i{constructor(e){super(e),this.view=null,this.tooltip=new V({getDuration:(e,t)=>this.getDuration(e,t)}),this.startTimeOfDay=y(10,"hours","milliseconds"),this.endTimeOfDay=y(16,"hours","milliseconds"),this.visualizationType=E.Threshold,this.thresholdOptions=new S,this.durationOptions=new U,this.discreteOptions=new j,this._running=!0,this._handles=new s,this._stopPreviewingTask=null,this._forcePreview=!1,this._autoRestoreForcePreviewEnabled=!0,this._utcOffset=null,this.date=new Date}initialize(){this._handles.add([m((()=>({view:this.view,tooltipEnabled:this._tooltipEnabled})),(({view:e,tooltipEnabled:t})=>{this.tooltip.view=e,this.tooltip.enabled=t}),f),m((()=>this._forcePreviewDependencies),(()=>{o(this._stopPreviewingTask),this._forcePreview=!0,this._autoRestoreForcePreviewEnabled&&(this._stopPreviewingTask=r((async e=>{await c(F,e),h(e),this._forcePreview=!1})))}),f),m((()=>({renderer:this.renderer,parameters:this._visualizationParameters})),(e=>B(e.renderer,e.parameters)),f),m((()=>({renderer:this.renderer,parameters:{lightDirections:this._lightDirections}})),(e=>B(e.renderer,e.parameters)),f),m((()=>({renderer:this.renderer,parameters:{enabled:this._running}})),(e=>B(e.renderer,e.parameters)),f),m((()=>({renderer:this.renderer,parameters:{previewing:this._previewing}})),(e=>B(e.renderer,e.parameters)),f)])}destroy(){this.stop(),this._handles=n(this._handles),n(this.tooltip)}get state(){return a(this.view)&&this.view.ready&&a(this._referencePosition)?C.Ready:C.Disabled}set date(e){const t=new Date(e);t.setHours(0,0,0,0),this._set("date",t)}get utcOffset(){return l(this._utcOffset,this._utcOffsetAuto)}set utcOffset(e){this._utcOffset=e}get testData(){return{setAutoRestoreForcedPreviewEnabled:e=>{this._autoRestoreForcePreviewEnabled=e},setForcedPreview:e=>{this._forcePreview=e},isPreviewing:()=>this._previewing}}get _previewing(){const{view:e}=this;return!(!p(e)&&!p(e.allLayerViews))||(this._forcePreview||!e.stationary||e.allLayerViews.some((e=>H(e)&&e.updating)))}get _utcOffsetAuto(){const e=this._referencePosition;return d(e,0,(e=>P(e[0],!1)))}get _dateUTCOffset(){let e=this.date;return e=w(e,-e.getTimezoneOffset(),"minutes"),e=w(e,-this.utcOffset,"hours"),e}get _startDateTimeUTC(){return w(this._dateUTCOffset,this.startTimeOfDay)}get _endDateTimeUTC(){return w(this._dateUTCOffset,this.endTimeOfDay)}get _referencePosition(){return u(this.view,(e=>u(e.environmentManager,(e=>e.referencePositionWGS84Comparable))))}get _interval(){const e=this._duration>0?Math.floor(this._duration/M):M,t=this.discreteOptions.interval;switch(this.visualizationType){case E.Threshold:case E.Duration:return e;case E.Discrete:return t>0?t:e}}get _sampleCount(){return this._lightDirections.length}get _duration(){return this.endTimeOfDay-this.startTimeOfDay}get _lightDirections(){const{view:e}=this;if(p(e))return R;const t="global"===e.viewingMode?N:this._referencePosition;if(p(t))return R;const i=this._interval,r=b(this._startDateTimeUTC,this._endDateTimeUTC,i,t,e.state.viewingMode),s=r.length;x.length=0;const o=A(0,s,x),n=new Array(s);for(let a=0;a<s;++a)n[a]=r[o[a]];return n}get _tooltipEnabled(){return this.state===C.Ready&&this.visualizationType!==E.Discrete&&this._running&&!this._previewing}get _visualizationParameters(){if(!this._running)return null;switch(this.visualizationType){case E.Threshold:return this._thresholdVisualizationParameters;case E.Duration:return this._durationVisualizationParameters;case E.Discrete:return this._discreteVisualizationParameters}}get _thresholdVisualizationParameters(){const{value:e,color:i}=this.thresholdOptions,r=this._duration;return{visualization:O.Threshold,color:t.toUnitRGBA(i),threshold:r>0?e/this._duration:0}}get _durationVisualizationParameters(){const{color:e,mode:i}=this.durationOptions,r=this._duration,s=r>0&&i===z.Hourly?k/r:0;return{color:t.toUnitRGBA(e),visualization:O.Gradient,bandsEnabled:s>0,bandSize:s}}get _discreteVisualizationParameters(){return{color:t.toUnitRGBA(this.discreteOptions.color),visualization:O.Gradient,bandsEnabled:!1,bandSize:0}}get _forcePreviewDependencies(){const{view:e}=this;if(p(e))return null;const t=e.slicePlane,i=e.allLayerViews.toArray().filter(H),r=i.map((e=>e.layer)).filter(a),s=i.map((e=>e.visible)),o=r.map((e=>e.visible)),n=r.map((e=>e.opacity)),l=r.filter((e=>"definitionExpression"in e)).map((e=>e.definitionExpression)),d=i.filter((e=>"filter"in e)).map((e=>e.filter));return{slicePlane:t,startDateUTC:this._startDateTimeUTC,endDateUTC:this._endDateTimeUTC,layerViewVisibilities:s,layerVisibilities:o,layerOpacities:n,filters:d,definitionExpressions:l}}get renderer(){const{view:e}=this;if(p(e))return null;const t=e._stage;return p(t)?null:t.renderer}start(){this._running=!0}stop(){this._running=!1}setRunning(e){this._running=e}async getDuration(e,t){const{view:i,renderer:r}=this;if(p(i)||p(r))return 0;const s=i.state.camera.screenToRender(_(e.x,e.y),v()),o=r.readAccumulatedShadow(s),n=this._sampleCount;if(0===n)return 0;return o*n*(this._duration/n)}};function B(e,t){a(e)&&a(t)&&e.setParameters({shadowCastOptions:t})}function H(e){if(e.suspended)return!1;switch(e.type){case"building-scene-3d":case"csv-3d":case"elevation-3d":case"feature-3d":case"geojson-3d":case"graphics-3d":case"integrated-mesh-3d":case"ogc-feature-3d":case"route-3d":case"scene-layer-3d":case"scene-layer-graphics-3d":case"stream-3d":case"wms-3d":return!0;case"base-dynamic-3d":case"dimension-3d":case"imagery-3d":case"imagery-tile-3d":case"line-of-sight-3d":case"map-image-3d":case"point-cloud-3d":case"tile-3d":case"vector-tile-3d":case"voxel-3d":case"wfs-3d":case"wmts-3d":case"media-3d":default:return!1;case"group":return e.layerViews.toArray().some((e=>H(e)))}}e([g()],G.prototype,"state",null),e([g()],G.prototype,"view",void 0),e([g()],G.prototype,"tooltip",void 0),e([g({nonNullable:!0})],G.prototype,"date",null),e([g({nonNullable:!0})],G.prototype,"utcOffset",null),e([g({nonNullable:!0})],G.prototype,"startTimeOfDay",void 0),e([g({nonNullable:!0})],G.prototype,"endTimeOfDay",void 0),e([g({nonNullable:!0})],G.prototype,"visualizationType",void 0),e([g({type:S,nonNullable:!0})],G.prototype,"thresholdOptions",void 0),e([g({type:U,nonNullable:!0})],G.prototype,"durationOptions",void 0),e([g({type:j,nonNullable:!0})],G.prototype,"discreteOptions",void 0),e([g()],G.prototype,"_running",void 0),e([g()],G.prototype,"_handles",void 0),e([g()],G.prototype,"_stopPreviewingTask",void 0),e([g()],G.prototype,"_forcePreview",void 0),e([g()],G.prototype,"_autoRestoreForcePreviewEnabled",void 0),e([g()],G.prototype,"_previewing",null),e([g()],G.prototype,"_utcOffset",void 0),e([g()],G.prototype,"_utcOffsetAuto",null),e([g()],G.prototype,"_dateUTCOffset",null),e([g()],G.prototype,"_startDateTimeUTC",null),e([g()],G.prototype,"_endDateTimeUTC",null),e([g()],G.prototype,"_referencePosition",null),e([g()],G.prototype,"_interval",null),e([g()],G.prototype,"_sampleCount",null),e([g()],G.prototype,"_duration",null),e([g()],G.prototype,"_lightDirections",null),e([g()],G.prototype,"_tooltipEnabled",null),e([g()],G.prototype,"_visualizationParameters",null),e([g()],G.prototype,"_thresholdVisualizationParameters",null),e([g()],G.prototype,"_durationVisualizationParameters",null),e([g()],G.prototype,"_discreteVisualizationParameters",null),e([g()],G.prototype,"_forcePreviewDependencies",null),e([g()],G.prototype,"renderer",null),G=e([T("esri.widgets.ShadowCast.ShadowCastViewModel")],G);const L=G;export{L as default};