/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import"../../../core/Logger.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import"../../../core/Error.js";import"../../../core/has.js";import{subclass as o}from"../../../core/accessorSupport/decorators/subclass.js";import s from"../SmartMappingPrimaryHandleSliderViewModel.js";let e=class extends s{constructor(r){super(r)}getStopInfo(){const{min:r,max:o,stops:s}=this;return s&&s.length?s.map((s=>({color:s.color,offset:(o-s.value)/(o-r)}))):[]}};e=r([o("esri.widgets.smartMapping.ColorSlider.ColorSliderViewModel")],e);const t=e;export{t as default};