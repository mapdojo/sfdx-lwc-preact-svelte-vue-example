/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import t from"../analysis/LineOfSightAnalysis.js";import s from"../analysis/LineOfSightAnalysisObserver.js";import r from"../analysis/LineOfSightAnalysisTarget.js";import i from"../core/Collection.js";import{referenceSetter as o}from"../core/collectionUtils.js";import{isSome as a,applySome as n,unwrap as l}from"../core/maybe.js";import{MultiOriginJSONMixin as p}from"../core/MultiOriginJSONSupport.js";import{watch as y,syncAndInitial as c}from"../core/reactiveUtils.js";import{property as m}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as h}from"../core/accessorSupport/decorators/subclass.js";import d from"./Layer.js";import{OperationalLayer as u}from"./mixins/OperationalLayer.js";const f=i.ofType(r);let g=class extends(u(p(d))){constructor(e){super(e),this.type="line-of-sight",this.operationalLayerType="LineOfSightLayer",this.analysis=new t,this.opacity=1}initialize(){this.addHandles(y((()=>this.analysis),((e,t)=>{a(t)&&t.parent===this&&(t.parent=null),a(e)&&(e.parent=this)}),c))}async load(){return a(this.analysis)&&this.addResolvingPromise(this.analysis.waitComputeExtent()),this}get observer(){return n(this.analysis,(e=>e.observer))}set observer(e){n(this.analysis,(t=>t.observer=e))}get targets(){return a(this.analysis)?this.analysis.targets:new i}set targets(e){o(e,this.analysis?.targets)}get fullExtent(){return a(this.analysis)?this.analysis.extent:null}get spatialReference(){return a(this.analysis)?l(this.analysis.spatialReference):null}releaseAnalysis(e){this.analysis===e&&(this.analysis=new t)}};e([m({json:{read:!1},readOnly:!0})],g.prototype,"type",void 0),e([m({type:["LineOfSightLayer"]})],g.prototype,"operationalLayerType",void 0),e([m({type:s,json:{read:!0,write:{ignoreOrigin:!0}}})],g.prototype,"observer",null),e([m({type:f,json:{read:!0,write:{ignoreOrigin:!0}}})],g.prototype,"targets",null),e([m({nonNullable:!0,json:{read:!1,write:!1}})],g.prototype,"analysis",void 0),e([m({readOnly:!0})],g.prototype,"fullExtent",null),e([m({readOnly:!0})],g.prototype,"spatialReference",null),e([m({readOnly:!0,json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],g.prototype,"opacity",void 0),e([m({type:["show","hide"]})],g.prototype,"listMode",void 0),g=e([h("esri.layers.LineOfSightLayer")],g);const j=g;export{j as default};