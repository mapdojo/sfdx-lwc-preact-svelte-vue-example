/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import{applySome as e,isSome as s}from"../../../core/maybe.js";import{throttle as i}from"../../../core/throttle.js";import{formatDecimal as r,formatAngleDegrees as o}from"../../../core/unitFormatUtils.js";import{property as a}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as n}from"../../../core/accessorSupport/decorators/subclass.js";import c from"../../Widget.js";import{STATISTICS_CSS as l}from"../css.js";import{getConfig as p,NOT_AVAILABLE as d}from"../support/constants.js";import"../../support/widgetUtils.js";import{messageBundle as m}from"../../support/decorators/messageBundle.js";import{tsx as h}from"../../support/jsxFactory.js";const u=100;let v=class extends c{constructor(t,e){super(t,e),this._updateLayout=t=>{const e=t.parentElement,s=t.style.display;e?.removeChild(t),document.body.appendChild(t),t.style.display="block";let i=80;for(const r of t.childNodes)r instanceof HTMLElement&&(i=Math.max(i,r.offsetWidth));document.body.removeChild(t),e?.appendChild(t),t.style.display=s,t.style.setProperty("--max-width",`${i}px`)},this._updateLayoutThrottled=i(this._updateLayout,u)}initialize(){this.addHandles(this._updateLayoutThrottled)}render(){return h("div",{bind:this,class:l.base,afterCreate:this._updateLayout,afterUpdate:this._updateLayoutThrottled},this._renderStatistics())}_renderStatistics(){const t=this._messages?.statistics;return t?[this._renderDistanceStatistic("maxDistance",t.maxDistance),this._renderElevationStatistic("elevationGain",t.gain),this._renderElevationStatistic("elevationLoss",t.loss),this._renderElevationStatistic("minElevation",t.minElevation),this._renderElevationStatistic("maxElevation",t.maxElevation),this._renderElevationStatistic("avgElevation",t.avgElevation),this._renderSlopeStatistic("maxPositiveSlope","maxNegativeSlope",t.maxSlope),this._renderSlopeStatistic("avgPositiveSlope","avgNegativeSlope",t.avgSlope)]:[]}_renderDistanceStatistic(t,e){const s=p().formatPrecision,i=this._renderValue(t,(t=>{const e=this.effectiveUnits.distance;return r(this._messagesUnits,t,e,s)}));return this._renderStatistic(e,i)}_renderElevationStatistic(t,e){const s=p().formatPrecision,i=this._renderValue(t,(t=>{const e=this.effectiveUnits.elevation;return r(this._messagesUnits,t,e,s)}));return this._renderStatistic(e,i)}_renderSlopeStatistic(t,e,s){const i=p().formatPrecision,r=h("div",{key:"slope-up",class:l.slopeValue},h("div",{class:l.slopeUpIcon}),this._renderValue(t,(t=>o(t,"degrees","geographic","geographic",i))),h("div",{class:l.slopeDownIcon}),this._renderValue(e,(t=>o(t,"degrees","geographic","geographic",i))));return this._renderStatistic(s,r)}_renderStatistic(t,e){return h("div",{class:l.statistic},h("label",{class:l.statisticLabel},t),h("div",{class:l.statisticValue},e))}_renderValue(t,i){const r=this.line,o=1===r.progress?r.statistics:null,a=e(o,(e=>e[t]));return s(a)?i(a):d}};t([a()],v.prototype,"effectiveUnits",void 0),t([a()],v.prototype,"line",void 0),t([a(),m("esri/widgets/ElevationProfile/t9n/ElevationProfile")],v.prototype,"_messages",void 0),t([a(),m("esri/core/t9n/Units")],v.prototype,"_messagesUnits",void 0),v=t([n("esri.widgets.ElevationProfile.Statistics")],v);export{v as Statistics};