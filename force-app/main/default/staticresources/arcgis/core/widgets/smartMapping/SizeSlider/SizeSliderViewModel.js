/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import{property as s}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as r}from"../../../core/accessorSupport/decorators/subclass.js";import t from"../SmartMappingPrimaryHandleSliderViewModel.js";let a=class extends t{constructor(e){super(e),this.persistSizeRangeEnabled=!1}updateStops(e){const{primaryHandleEnabled:s,persistSizeRangeEnabled:r,stops:t}=this,a=this.getValuesFromStops();if(!a?.length)return;if(e.sort(((e,s)=>e.value>s.value?1:-1)).forEach((e=>{a[e.index]=e.value})),t.forEach(((e,s)=>e.value=a[s])),s&&r){const{stops:e}=this,s=this.getValuesFromStops(),r=e.map((e=>e.size)),t=Math.max(...r),a=Math.min(...r),o=Math.max(...s),i=Math.min(...s),p=e[5===e.length?2:1].value,l=Math.abs(o-p),n=Math.abs(i-p),c=l>n?l:n,m=t-a;if(0===c)return;e.forEach((e=>{e.size=Math.abs(e.value-p)/c*m+a}))}}};e([s()],a.prototype,"persistSizeRangeEnabled",void 0),a=e([r("esri.widgets.smartMapping.SizeSlider.SizeSliderViewModel")],a);const o=a;export{o as default};