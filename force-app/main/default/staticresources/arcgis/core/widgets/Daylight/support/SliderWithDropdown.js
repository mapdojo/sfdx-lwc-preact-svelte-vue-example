/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../../chunks/tslib.es6.js";import{eventKey as e}from"../../../core/events.js";import{unwrap as t,isSome as r}from"../../../core/maybe.js";import{watch as n,initial as i}from"../../../core/reactiveUtils.js";import{property as s}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as d}from"../../../core/accessorSupport/decorators/subclass.js";import p from"../../Slider.js";import{SliderWithDropdownViewModel as l}from"./SliderWithDropdownViewModel.js";import c from"../../support/Popover.js";import"../../support/widgetUtils.js";import{tsx as a}from"../../support/jsxFactory.js";const h="esri-slider-with-dropdown",w={interactive:"esri-interactive",label:"esri-slider__label",box:`${h}__box`,dropdownRoot:`${h}__dropdown-root`,anchor:" esri-widget__anchor esri-slider-with-dropdown__anchor",anchorOpen:`${h}__anchor--open`,anchorClosed:`${h}__anchor--closed`,dropdownList:`${h}__list`,dropdownListItem:`${h}__list-item`,dropdownListItemSelected:`${h}__list-item--selected`,boxDropDownOn:`${h}__box--drop-down-on`,boxDropDownOff:`${h}__box--drop-down-off`},m={selectItem:"Enter",closeDropdown:"Escape",moveSelectionUp:"ArrowUp",moveSelectionDown:"ArrowDown"};let u=class extends p{constructor(o,e){super(o,e),this.viewModel=new l,this.buttonTooltip="",this.showDropDown=!0,this._dropdownAnchor=null,this._dropdownElement=null,this._popover=new c({owner:this,placement:"bottom-start",anchorElement:()=>t(this._dropdownAnchor),renderContentFunction:()=>this._renderPopover()})}initialize(){this.addHandles(n((()=>this.viewModel.isDropdownOpen),(o=>{this._popover.open=o}),i))}destroy(){this._popover.destroy()}get items(){return this.viewModel.items}set items(o){this.viewModel.items=o}get currentIndex(){return this.viewModel.currentIndex}set currentIndex(o){this.viewModel.currentIndex=o}get currentItem(){return this.viewModel.currentItem}get isDropdownOpen(){return this.viewModel.isDropdownOpen}renderThumbLabel(o){const e={[w.boxDropDownOn]:this.showDropDown,[w.boxDropDownOff]:!this.showDropDown};return a("div",{class:this.classes(w.box,w.label,e)},super.renderThumbLabel(o),this.showDropDown&&a("div",{bind:this,afterCreate:this._onDropdownAnchorAfterCreate,class:w.dropdownRoot},a("button",{class:this.classes(w.interactive,w.anchor,this.isDropdownOpen?w.anchorOpen:w.anchorClosed),bind:this,disabled:this.disabled,onclick:this._onAnchorClick,onpointerdown:this._killEvent,"aria-label":this.buttonTooltip,title:this.buttonTooltip,"aria-expanded":this.isDropdownOpen.toString(),"aria-haspopup":"listbox",type:"button"},this.currentItem?this.currentItem.name+" ":"")))}_onDropdownAnchorAfterCreate(o){this._dropdownAnchor=o}_renderPopover(){return a("ol",{role:"listbox",afterCreate:this._onDropdownAfterCreate,"aria-label":this.buttonTooltip,bind:this,class:this.classes(w.dropdownList),tabindex:"-1",onkeydown:this._onDropdownKeyDown,onfocusout:this._onDropdownFocusOut,onpointerdown:this._killEvent},this.items.map(((o,e)=>a("li",{class:e===this.currentIndex?this.classes(w.interactive,w.dropdownListItem,w.dropdownListItemSelected):this.classes(w.interactive,w.dropdownListItem),bind:this,onclick:this._onDropdownItemClick,"data-result":e,"aria-label":o.label.join(" "),role:"option","aria-selected":(e===this.currentIndex).toString(),onkeydown:this._onLiKeyDown,tabindex:"0"},o.label.map((o=>a("span",{bind:this},o)))))))}_onDropdownAfterCreate(o){this._dropdownElement=o;const e=o.querySelector(`.${w.dropdownListItemSelected}`)??o.firstChild;r(e)&&e instanceof HTMLElement&&(e.scrollIntoView(),e.focus())}_onAnchorClick(){return!this.disabled&&(this.viewModel.toggle(),!0)}_onDropdownItemClick(o){const e=o.currentTarget;this.viewModel.selectItem(e["data-result"])}_onDropdownFocusOut(o){let e=o.relatedTarget;null===e&&(e=document.activeElement),r(this._dropdownElement)&&!this._dropdownElement.contains(e)&&r(this._dropdownAnchor)&&!this._dropdownAnchor.contains(e)&&(this.viewModel.isDropdownOpen=!1)}_killEvent(o){return o.stopPropagation(),!0}_onDropdownKeyDown(o){o.stopPropagation(),e(o)===m.closeDropdown&&(this.viewModel.isDropdownOpen=!1)}_onLiKeyDown(o){const t=o.target;switch(e(o)){case m.moveSelectionUp:if(t.previousElementSibling){t.previousElementSibling.focus()}break;case m.moveSelectionDown:if(t.nextElementSibling){t.nextElementSibling.focus()}break;case m.selectItem:t.click()}}};o([s()],u.prototype,"viewModel",void 0),o([s()],u.prototype,"buttonTooltip",void 0),o([s()],u.prototype,"showDropDown",void 0),o([s()],u.prototype,"items",null),o([s()],u.prototype,"currentIndex",null),o([s()],u.prototype,"currentItem",null),o([s()],u.prototype,"isDropdownOpen",null),u=o([d("esri.widgets.Daylight.SliderWithDropdown")],u);const _=u;export{_ as default};