/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import"../../../core/Logger.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import"../../../core/Error.js";import"../../../core/has.js";import{subclass as o}from"../../../core/accessorSupport/decorators/subclass.js";import e from"../SizeSlider/SizeSliderViewModel.js";let s=class extends e{constructor(r){super(r)}getStopInfo(){const{min:r,max:o,stops:e}=this;return e&&e.length?e.map((e=>({color:e.color,offset:(o-e.value)/(o-r)}))):[]}};s=r([o("esri.widgets.smartMapping.ColorSizeSlider.ColorSizeSliderViewModel")],s);const t=s;export{t as default};