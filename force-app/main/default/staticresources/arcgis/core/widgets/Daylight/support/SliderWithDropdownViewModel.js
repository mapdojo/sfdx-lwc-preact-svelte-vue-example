/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../../chunks/tslib.es6.js";import{property as t}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as e}from"../../../core/accessorSupport/decorators/subclass.js";import s from"../../Slider/SliderViewModel.js";let o=class extends s{constructor(r){super(r),this.items=[],this.currentIndex=0,this.isDropdownOpen=!1}get currentItem(){return null!==this.items&&null!==this.currentIndex&&this.currentIndex<this.items.length?this.items[this.currentIndex]:null}selectItem(r){this.currentIndex=r,this.isDropdownOpen=!1}toggle(){this.isDropdownOpen=!this.isDropdownOpen}};r([t()],o.prototype,"items",void 0),r([t()],o.prototype,"currentIndex",void 0),r([t()],o.prototype,"currentItem",null),r([t()],o.prototype,"isDropdownOpen",void 0),o=r([e("esri.widgets.Daylight.SliderWithDropdown")],o);export{o as SliderWithDropdownViewModel};