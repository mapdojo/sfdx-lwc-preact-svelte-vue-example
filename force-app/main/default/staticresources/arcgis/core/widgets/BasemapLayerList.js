/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import t from"../core/Collection.js";import{eventKey as i}from"../core/events.js";import{HandleOwnerMixin as s}from"../core/HandleOwner.js";import has from"../core/has.js";import{isSome as n}from"../core/maybe.js";import{watch as r,on as o,initial as a}from"../core/reactiveUtils.js";import{property as l}from"../core/accessorSupport/decorators/property.js";import{cast as c}from"../core/accessorSupport/decorators/cast.js";import"../core/arrayUtils.js";import{subclass as d}from"../core/accessorSupport/decorators/subclass.js";import h from"./Widget.js";import u from"./BasemapLayerList/BasemapLayerListViewModel.js";import m from"./LayerList/ListItem.js";import{findSelectedItem as g}from"./LayerList/support/layerListUtils.js";import{Heading as p,incrementHeadingLevel as b}from"./support/Heading.js";import{accessibleHandler as _}from"./support/decorators/accessibleHandler.js";import{messageBundle as y}from"./support/decorators/messageBundle.js";import{vmEvent as f}from"./support/decorators/vmEvent.js";import{tsx as I}from"./support/jsxFactory.js";import"./support/widgetUtils.js";import v from"sortablejs";const L=t.ofType(m);function C(e,t,i){e.splice(i,0,e.splice(t,1)[0])}const T=".*\\S+.*",w="esri-basemaplayerlist-new-ui",A="root-layers",S="data-layer-uid",$="layerUid",E="esri-basemap-layer-list",k=`${E}__item`,R=`${E}__list`,M={base:`${E} esri-widget esri-widget--panel`,newUI:`${E}--new-ui`,titleContainer:`${E}__title-container`,mainHeading:`${E}__main-heading`,editingCard:`${E}__editing-card`,editingInput:`${E}__editing-input`,editingActions:`${E}__editing-actions`,editButton:`${E}__edit-button`,editButtonIcon:`${E}__edit-button-icon`,submitButton:`${E}__submit-button`,cancelButton:`${E}__cancel-button`,noItems:`${E}__no-items`,horizontalRule:`${E}__hr`,list:R,listHeading:`${R}-heading`,listRoot:`${R}--root`,listExclusive:`${R}--exclusive`,listInherited:`${R}--inherited`,listIndependent:`${R}--independent`,item:k,itemOnlyChild:`${k}--only-child`,itemContent:`${k}-content`,itemMessage:`${k}--has-message`,itemInvisible:`${k}--invisible`,itemInvisibleAtScale:`${k}--invisible-at-scale`,itemChildren:`${k}--has-children`,itemSelectable:`${k}--selectable`,itemContainer:`${k}-container`,actionsMenu:`${k}-actions-menu`,actionsMenuItem:`${k}-actions-menu-item`,actionsMenuItemActive:`${k}-actions-menu-item--active`,actions:`${k}-actions`,actionsList:`${k}-actions-list`,action:`${k}-action`,actionIcon:`${k}-action-icon`,actionImage:`${k}-action-image`,actionTitle:`${k}-action-title`,actionToggle:`${E}__action-toggle`,actionToggleOn:`${E}__action-toggle--on`,label:`${k}-label`,message:`${k}-message`,title:`${k}-title`,statusIndicator:`${E}__status-indicator`,publishing:`${E}__publishing`,updating:`${E}__updating`,connectionStatus:`${E}__connection-status`,connectionStatusConnected:`${E}__connection-status--connected`,toggleVisible:`${k}-toggle`,toggleVisibleIcon:`${k}-toggle-icon`,toggleIcon:`${k}-toggle-icon`,radioIcon:`${k}-radio-icon`,childToggle:`${E}__child-toggle`,childToggleOpen:`${E}__child-toggle--open`,childOpened:`${E}__child-toggle-icon--opened`,childClosed:`${E}__child-toggle-icon--closed`,childClosed_RTL:`${E}__child-toggle-icon--closed-rtl`,sortableChosen:`${E}--chosen`,button:"esri-button",buttonTertiary:"esri-button--tertiary",input:"esri-input",disabled:"esri-disabled",disabledElement:"esri-disabled-element",hidden:"esri-hidden",rotating:"esri-rotating",heading:"esri-widget__heading",iconEdit:"esri-icon-edit",iconCheckMark:"esri-icon-check-mark",iconClose:"esri-icon-close",iconEllipses:"esri-icon-handle-horizontal",iconVisible:"esri-icon-visible",iconInvisible:"esri-icon-non-visible",iconRadioSelected:"esri-icon-radio-checked",iconRadioUnselected:"esri-icon-radio-unchecked",iconNoticeTriangle:"esri-icon-notice-triangle",iconChildrenOpen:"esri-icon-down-arrow",iconDownArrow:"esri-icon-down-arrow",iconRightArrow:"esri-icon-right-triangle-arrow",iconLeftArrow:"esri-icon-left-triangle-arrow",iconLoading:"esri-icon-loading-indicator",iconDefaultAction:"esri-icon-default-action",widgetIcon:"esri-icon-layers"},B={actions:"actions",actionSection:"action-section",baseItems:"base-items",referenceItems:"reference-items"},O={exclusive:"exclusive",inherited:"inherited",independent:"independent"};function x(e){const{actionsOpen:t,children:i}=e;t&&(e.actionsOpen=!1),i.forEach((e=>x(e)))}const U={baseLayers:!0,referenceLayers:!0,statusIndicators:!0,errors:!1};let N=class extends(s(h)){constructor(e,t){super(e,t),this._tooltipReferenceMap=new Map,this._editingTitle=!1,this._editTitleInput=null,this._editTitleButton=null,this._focusOnElement=null,this._sortableBaseLayers=null,this._sortableReferenceLayers=null,this._sortableBaseLayersNode=null,this._sortableReferenceLayersNode=null,this._focusSortUid=null,this._newUI=has(w),this.visibleItems=null,this.editingEnabled=!1,this.headingLevel=2,this.iconClass=M.widgetIcon,this.messages=null,this.messagesCommon=null,this.multipleSelectionEnabled=!1,this.selectedItems=new L,this.viewModel=new u,this.visibleElements={...U}}initialize(){const{baseItems:e,referenceItems:t}=this;this._setVisibleItems(),this.addHandles([r((()=>this.visibleElements),(()=>{this._itemsChanged(e,B.baseItems),this._itemsChanged(t,B.referenceItems)})),o((()=>this.baseItems),"change",(()=>{this._itemsChanged(e,B.baseItems)})),o((()=>this.referenceItems),"change",(()=>this._itemsChanged(t,B.referenceItems))),r((()=>this.editingEnabled),(()=>this._toggleSorting()),a)])}loadDependencies(){return Promise.all([import("@esri/calcite-components/dist/components/calcite-icon.js"),import("@esri/calcite-components/dist/components/calcite-tooltip.js")])}destroy(){this._destroyBaseSortable(),this._destroyReferenceSortable(),this._tooltipReferenceMap.clear()}get basemapTitle(){return this.viewModel.basemapTitle}set basemapTitle(e){this.viewModel.basemapTitle=e}get baseListItemCreatedFunction(){return this.viewModel.baseListItemCreatedFunction}set baseListItemCreatedFunction(e){this.viewModel.baseListItemCreatedFunction=e}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get referenceListItemCreatedFunction(){return this.viewModel.referenceListItemCreatedFunction}set referenceListItemCreatedFunction(e){this.viewModel.referenceListItemCreatedFunction=e}get baseItems(){return this.viewModel.baseItems}get referenceItems(){return this.viewModel.referenceItems}get view(){return this.viewModel.view}set view(e){this.viewModel.view=e}castVisibleElements(e){return{...U,...e}}triggerAction(e,t){return this.viewModel.triggerAction(e,t)}render(){const{state:e}=this.viewModel,t={[M.newUI]:this._newUI,[M.hidden]:"loading"===e,[M.disabled]:"disabled"===e},i=this.renderItemTooltips(),s=this.renderReferenceSection(),n=this.renderBaseSection(),r=s&&n?I("hr",{class:M.horizontalRule}):null,o=[this.renderTitleContainer(),s,r,n];return I("div",{class:this.classes(M.base,t)},[i,o])}renderItemTooltip(e){const{_tooltipReferenceMap:t,messages:i}=this;return e?I("calcite-tooltip",{label:i.layerIncompatible,referenceElement:t.get(e.uid)},i.layerIncompatibleTooltip):null}renderItemTooltipNodes(e){const{incompatible:t,children:i}=e;return[t?this.renderItemTooltip(e):null,...t?[]:i?.toArray().map((e=>this.renderItemTooltipNodes(e)))]}renderItemTooltips(){return this.visibleItems.toArray().map((e=>this.renderItemTooltipNodes(e)))}renderEditingInput(){const{messages:e}=this,{basemapTitle:t}=this.viewModel;return I("label",{class:M.editingInput},e.basemapTitle,I("input",{bind:this,class:M.input,title:e.basemapTitle,"aria-label":e.basemapTitle,placeholder:e.basemapTitle,type:"text",role:"textbox",required:!0,pattern:T,value:t,afterCreate:this._storeEditTitleInput,afterUpdate:this._focusEditElement}))}renderCancelButton(){const{messagesCommon:e}=this;return I("button",{title:e.cancel,"aria-label":e.cancel,type:"button",bind:this,class:this.classes(M.button,M.buttonTertiary),onclick:this._toggleEditingTitle},e.cancel)}renderSubmitButton(){const{messagesCommon:e}=this;return I("button",{title:e.form.submit,"aria-label":e.form.submit,type:"submit",bind:this,class:M.button},e.form.ok)}renderEditingForm(){return I("div",{class:M.editingCard},I("form",{bind:this,onsubmit:this._formSubmit},this.renderEditingInput(),I("div",{class:M.editingActions},this.renderCancelButton(),this.renderSubmitButton())))}renderBasemapTitle(){const{basemapTitle:e}=this.viewModel;return I(p,{level:this.headingLevel,class:this.classes(M.heading,M.mainHeading)},e)}renderEditTitleButton(){const{_editingTitle:e,editingEnabled:t,messagesCommon:i}=this;return t&&!e?I("button",{bind:this,class:M.editButton,title:i.edit,"aria-label":i.edit,onclick:this._toggleEditingTitle,afterCreate:this._storeEditTitleButton,afterUpdate:this._focusEditElement,"data-node-ref":"_editButtonNode",type:"button"},I("span",{"aria-hidden":"true",class:this.classes(M.iconEdit,M.editButtonIcon)})):null}renderTitleContainer(){return I("div",{class:M.titleContainer},this._editingTitle?this.renderEditingForm():this.renderBasemapTitle(),this.renderEditTitleButton())}renderNoLayersInfo(e,t){return I("div",{key:t,class:M.noItems},e)}renderList(e,t){const{messages:i}=this,s="reference"===t?this._destroyReferenceSortable:this._destroyBaseSortable;return I("ul",{key:t,"aria-label":i.widgetLabel,role:this.editingEnabled&&e.length?"listbox":void 0,afterCreate:this._sortNodeCreated,afterRemoved:s,"data-node-ref":t,bind:this,class:this.classes(M.list,M.listRoot,M.listIndependent)},e.map((i=>this.renderItem({item:i,parent:null,itemType:t,isOnlyChild:1===e.length}))))}renderBaseHeader(){return I(p,{key:"base-heading",level:b(this.headingLevel),class:this.classes(M.heading,M.listHeading)},this.messages.baseHeading)}renderBaseSection(){const{baseItems:e,messages:t,visibleElements:i}=this;if(!i.baseLayers)return null;const s=this._getItems(e),n="base";return[this.renderBaseHeader(),[0===s.length?this.renderNoLayersInfo(t.noBaseLayers,n):null,this.renderList(s,n)]]}renderReferenceHeader(){return I(p,{key:"reference-heading",level:b(this.headingLevel),class:this.classes(M.heading,M.listHeading)},this.messages.referenceHeading)}renderReferenceSection(){const{referenceItems:e,messages:t,visibleElements:i}=this;if(!i.referenceLayers)return null;const s=this._getItems(e),n="reference";return[this.renderReferenceHeader(),[0===s.length?this.renderNoLayersInfo(t.noReferenceLayers,n):null,this.renderList(s,n)]]}renderChildrenToggle(e,t){const{messagesCommon:i}=this,{children:s}=e,n=!!e.error,r=!!s.length&&!n,o={[M.childToggleOpen]:e.open},a=e.open?i.collapse:i.expand;return r?I("span",{onclick:this._toggleChildrenClick,onkeydown:this._toggleChildrenClick,"data-item":e,key:"toggle-children",class:this.classes(M.childToggle,o),tabindex:"0",role:"button","aria-controls":t,"aria-label":a,title:a},I("span",{"aria-hidden":"true",class:this.classes(M.childClosed,M.iconRightArrow)}),I("span",{"aria-hidden":"true",class:this.classes(M.childOpened,M.iconDownArrow)}),I("span",{"aria-hidden":"true",class:this.classes(M.childClosed_RTL,M.iconLeftArrow)})):null}renderItemMessage(e){return e.error?I("div",{key:"esri-basemap-layer-list__error",class:M.message,role:"alert"},I("span",{"aria-hidden":"true",class:M.iconNoticeTriangle}),this.messages.layerError):e.incompatible?I("div",{key:"esri-basemap-layer-list__incompatible",class:M.message,role:"alert"},I("span",{bind:this,tabIndex:0,"aria-hidden":"true",class:M.iconNoticeTriangle,afterCreate:t=>this._setTooltipReference(t,e)}),this.messages.layerIncompatible):null}renderActionsMenuIcon(e,t){const{messagesCommon:i}=this,s={[M.actionsMenuItemActive]:e.actionsOpen};return I("div",{key:"actions-menu-toggle","data-item":e,bind:this,onclick:this._toggleActionsOpen,onkeydown:this._toggleActionsOpen,class:this.classes(M.actionsMenuItem,s),tabindex:"0",role:"button","aria-controls":t,"aria-label":i.options,title:i.options},I("span",{"aria-hidden":"true",class:M.iconEllipses}))}renderActionsMenu(e,t,i,s){const{panel:n}=e,r=n&&n.visible?this.renderPanelButton(n):null,o=1===i&&this._getSingleActionButton(t),a=o?this.renderAction({item:e,action:o,singleAction:!0}):null,l=!o&&i?this.renderActionsMenuIcon(e,s):null;return l||r||o?I("div",{key:"actions-menu",class:M.actionsMenu},r,a,l):null}renderChildList(e,t){const{editingEnabled:i}=this,{visibilityMode:s,children:n}=e,r=this._hasChildren(e),o=!r&&i&&"group"===e.layer?.type,{exclusive:a,inherited:l}=O,c={[M.listExclusive]:s===a,[M.listInherited]:s===l,[M.listIndependent]:s!==l&&s!==a};return r||o?I("ul",{bind:this,key:"list-items",id:t,"data-group":e.uid,"data-item":e,afterCreate:this._sortNodeCreated,afterUpdate:this._sortNodeCreated,class:this.classes(M.list,c),"aria-expanded":e.open?"true":"false",role:i?"listbox":s===a?"radiogroup":"group",hidden:!e.open||null},n?.map((t=>this.renderItem({item:t,parent:e}))).toArray()):null}renderItemContent(e,t,i){const{id:s}=this,n=`${s}_${e.uid}`,r=`${n}_actions`,o=`${n}__list`,{panel:a}=e,l=this._filterActions(e.actionsSections),c=this._countActions(l);return[I("div",{key:"list-item-container",class:M.itemContainer},this.renderChildrenToggle(e,o),this.renderLabel(e,t,i),this.renderActionsMenu(e,l,c,r)),this.renderItemMessage(e),c?this.renderActionsSections(e,l,r):null,a&&a.open&&!a.disabled?a.render():null,this.renderChildList(e,o)]}renderItem({item:e,parent:t,itemType:i,isOnlyChild:s}){const{_newUI:n,id:r,editingEnabled:o,selectedItems:a}=this,l=`${`${r}_${e.uid}`}__title`,c=this._hasMessage(e),d=this._hasChildren(e),h={[M.itemChildren]:d,[M.itemMessage]:!!c,[M.itemInvisible]:n&&!e.visible,[M.itemInvisibleAtScale]:!e.visibleAtCurrentScale,[M.itemSelectable]:o};if(o){const n={[S]:e.layer?.uid};return I("li",{key:`item-with-selection-${e.uid}`,bind:this,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(M.item,h,{[M.itemOnlyChild]:s}),"aria-labelledby":l,onclick:this._toggleSelection,onkeydown:this._selectionKeydown,"data-item-type":i,"data-item":e,tabIndex:0,"aria-selected":g(e,a)?"true":"false",role:"option",...n},this.renderItemContent(e,t,l))}return I("li",{key:`item-no-selection-${e.uid}`,bind:this,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(M.item,h),"aria-labelledby":l},this.renderItemContent(e,t,l))}renderConnectionIcon(e){const{connectionStatus:t}=e;return n(t)?I("calcite-icon",{icon:"connected"===t?"check-circle":"offline",scale:"s"}):null}renderItemStatus(e,t){const{visibleElements:i}=this;if(!i.statusIndicators)return null;const{connectionStatus:s,publishing:n,updating:r}=e,o=r&&!t,a=!!s;return I("span",{class:this.classes({[M.statusIndicator]:!0,[M.publishing]:n,[M.updating]:o,[M.connectionStatus]:a,[M.connectionStatusConnected]:a&&"connected"===s}),key:"layer-item-status"},this.renderConnectionIcon(e))}renderItemTitle(e,t){const{messages:i}=this,s=e.title||i.untitledLayer,n=e.visibleAtCurrentScale?s:`${s} (${i.layerInvisibleAtScale})`;return I("span",{key:"layer-title-container",id:t,title:n,"aria-label":n,class:M.title},s)}renderItemToggleIcon(e,t){const{_newUI:i}=this,{exclusive:s}=O,n=t&&t.visibilityMode,r={[M.toggleVisibleIcon]:i,[M.toggleIcon]:i&&n!==s,[M.radioIcon]:i&&n===s,[M.iconRadioSelected]:n===s&&e.visible,[M.iconRadioUnselected]:n===s&&!e.visible,[M.iconVisible]:n!==s&&e.visible,[M.iconInvisible]:n!==s&&!e.visible};return I("span",{key:"item-toggle-icon",class:this.classes(r),"aria-hidden":"true"})}renderItemToggle(e,t,i){const{editingEnabled:s,messages:n}=this,{exclusive:r}=O,o=t&&t.visibilityMode,a=o===r?"radio":"switch";return I("span",s?{key:"item-toggle-selection-enabled",class:M.toggleVisible,bind:this,onclick:this._toggleVisibility,onkeydown:this._toggleVisibility,"data-item":e,"data-parent-visibility":o,tabIndex:0,"aria-checked":e.visible?"true":"false",title:e.visible?n.hideLayer:n.showLayer,role:a,"aria-labelledby":i}:{key:"item-toggle",class:M.toggleVisible},this.renderItemToggleIcon(e,t))}renderLabel(e,t,i){const{editingEnabled:s,_newUI:n,messages:r}=this,{inherited:o,exclusive:a}=O,l=t?.visibilityMode,c=l===a?"radio":"switch",d=n?[this.renderItemTitle(e,i),this.renderItemStatus(e,t),this.renderItemToggle(e,t,i)]:[this.renderItemToggle(e,t,i),this.renderItemTitle(e,i),this.renderItemStatus(e,t)],h=I("div",s?{key:`item-label-no-selection-${e.uid}`,class:M.label}:{key:`item-label-with-selection-${e.uid}`,class:M.label,bind:this,onclick:this._toggleVisibility,onkeydown:this._toggleVisibility,"data-item":e,"data-parent-visibility":l,tabIndex:0,title:e.visible?r.hideLayer:r.showLayer,"aria-checked":e.visible?"true":"false",role:c,"aria-labelledby":i},d);return l===o||e.error?I("div",{key:`item-label-container-${e.uid}`,class:M.label},this.renderItemTitle(e,i),this.renderItemStatus(e,t)):h}renderPanelButton(e){const{className:t,open:i,title:s,image:n}=e,r=n||t?t:M.iconDefaultAction,o=this._getIconImageStyles(e),a={[M.actionsMenuItemActive]:i},l={[M.actionImage]:!!o["background-image"],[M.disabledElement]:e.disabled};return r&&(l[r]=!!r),I("div",{"aria-disabled":e.disabled.toString(),key:`panel-${e.uid}`,bind:this,"data-panel":e,onclick:this._triggerPanel,onkeydown:this._triggerPanel,class:this.classes(M.actionsMenuItem,a),role:"button",tabindex:e.disabled?null:0,title:s,"aria-label":s},I("span",{class:this.classes(l),styles:o}))}renderActionsSections(e,t,i){const s=t.toArray().map(((t,i)=>I("ul",{key:`${e}-action-section-${i}`,class:M.actionsList},this.renderActionSection(e,t))));return I("div",{role:"group","aria-expanded":e.actionsOpen?"true":"false",key:"actions-section",id:i,class:M.actions,hidden:!e.actionsOpen||null},s)}renderActionSection(e,t){return(t&&t.toArray()).map((t=>this.renderAction({item:e,action:t})))}renderActionIcon(e){const{active:t,className:i}=e,s=this._getIconImageStyles(e),n="button"!==e.type||e.image||i?i:M.iconDefaultAction,r={[M.actionImage]:!t&&!!s["background-image"],[M.iconLoading]:t,[M.rotating]:t};return n&&!t&&(r[n]=!0),I("span",{key:"action-icon","aria-hidden":"true",class:this.classes(M.actionIcon,r),styles:s})}renderActionTitle(e,t){return t?null:I("span",{key:"action-title",class:M.actionTitle},e)}renderAction(e){const{item:t,action:i,singleAction:s}=e,{active:n,disabled:r,title:o}=i,a={[M.actionsMenuItem]:s&&"button"===i.type,[M.action]:n||!s&&"toggle"!==i.type,[M.actionToggle]:!n&&"toggle"===i.type,[M.actionToggleOn]:!n&&"toggle"===i.type&&i.value,[M.disabledElement]:r},l=[this.renderActionIcon(i),this.renderActionTitle(o,s)];return s?I("div",{bind:this,"data-item":t,"data-action":i,role:"button",key:`single-action-${i.uid}`,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:a,tabindex:"0",title:o,"aria-label":o},l):I("li",{bind:this,"data-item":t,"data-action":i,key:`action-${i.uid}`,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:a,tabindex:"0",role:"button",title:o,"aria-label":o},l)}_setVisibleItems(){const{referenceItems:e,baseItems:t,visibleElements:i}=this,s=e.concat(t);this.visibleItems=s?.filter((e=>!e.hidden&&(i.errors||!e.error)))}_setTooltipReference(e,t){this._tooltipReferenceMap.set(t.uid,e),this.scheduleRender()}_hasMessage(e){return!!e.error||e.incompatible}_hasChildren(e){return!!e.children.length&&!this._hasMessage(e)}_filterActions(e){return e.map((e=>e.filter((e=>e.visible))))}_destroyReferenceSortable(){const{_sortableReferenceLayers:e}=this;e?.el&&e.destroy(),this._sortableReferenceLayersNode=null}_destroyBaseSortable(){const{_sortableBaseLayers:e}=this;e?.el&&e.destroy(),this._sortableBaseLayersNode=null}_toggleEditingTitle(){const{_editingTitle:e}=this,t=!e;this._editingTitle=t,this._focusOnElement=t?"edit-input":"edit-button",this.scheduleRender()}_storeEditTitleInput(e){this._editTitleInput=e,this._focusEditElement()}_focusEditElement(){this._editTitleInput&&"edit-input"===this._focusOnElement&&(this._focusOnElement=null,this._editTitleInput.focus()),this._editTitleButton&&"edit-button"===this._focusOnElement&&(this._focusOnElement=null,this._editTitleButton.focus())}_storeEditTitleButton(e){this._editTitleButton=e,this._focusEditElement()}_formSubmit(e){e.preventDefault();const t=this._editTitleInput?.value;t?.trim()&&(this.basemapTitle=t),this._toggleEditingTitle()}_itemMovedList(e){const t=e.item["data-item"],i=e.to.dataset.nodeRef,s=e.from.dataset.nodeRef,{newIndex:n}=e;this.viewModel.transferListItem({listItem:t,from:s,to:i,newIndex:n})}_toggleSortingBaseLayers(){const{_sortableBaseLayers:e,_sortableBaseLayersNode:t,editingEnabled:i}=this;if(!t)return;const s=!i;if(e)e.option("disabled",s);else{const e=v.create(t,{dataIdAttr:S,group:A,filter:`.${M.itemOnlyChild}`,fallbackTolerance:4,disabled:s,onSort:()=>this._sortLayersToItems({type:"base",itemIds:e.toArray()}),onAdd:e=>this._itemMovedList(e),chosenClass:M.sortableChosen});this._sortableBaseLayers=e}}_toggleSortingReferenceLayers(){const{_sortableReferenceLayers:e,_sortableReferenceLayersNode:t,editingEnabled:i}=this;if(!t)return;const s=!i;if(e)e.option("disabled",s);else{const e=v.create(t,{dataIdAttr:S,group:A,disabled:s,fallbackTolerance:4,onSort:()=>this._sortLayersToItems({type:"reference",itemIds:e.toArray()}),onAdd:e=>this._itemMovedList(e),chosenClass:M.sortableChosen});this._sortableReferenceLayers=e}}_toggleSorting(){this._toggleSortingBaseLayers(),this._toggleSortingReferenceLayers()}_sortNodeCreated(e){const t=e.getAttribute("data-node-ref");"base"===t&&(this._sortableBaseLayersNode=e),"reference"===t&&(this._sortableReferenceLayersNode=e),this._toggleSorting()}_getItems(e){return e.toArray().filter((e=>!e.hidden&&(this.visibleElements.errors||!e.error)))}_getSingleActionButton(e){return e.reduce((e=>e)).filter((e=>e&&"button"===e.type)).getItemAt(0)}_sortLayersToItems({type:e,itemIds:t}){const i="base"===e?this.get("view.map.basemap.baseLayers"):"reference"===e?this.get("view.map.basemap.referenceLayers"):null;i&&i.sort(((e,i)=>{const s=t.indexOf(e.uid),n=t.indexOf(i.uid);return s>n?-1:s<n?1:0}))}_focusListItem(e){const{_focusSortUid:t}=this;if(!e||!t)return;e["data-item"].layer?.uid===t&&(e.focus(),this._focusSortUid=null)}_selectionKeydown(e){const t=["ArrowDown","ArrowUp"],s=i(e);if(!t.includes(s))return void this._toggleSelection(e);e.stopPropagation();const n=e.currentTarget,r=n["data-item"],o=n.dataset.itemType,{_sortableBaseLayers:a,_sortableReferenceLayers:l,selectedItems:c}=this,d="base"===o?a:"reference"===o?l:null;if(!d)return;const h=g(r,c),u=d.toArray(),m=e.target,p=u.indexOf(m.dataset[$]),{baseItems:b,referenceItems:_}=this.viewModel;if(-1!==p){if("ArrowDown"===s){const e=p+1,t=e>=u.length;if(t&&"reference"===o&&h){const e=b.length;return this.viewModel.transferListItem({listItem:r,from:"reference",to:"base",newIndex:e}),this._focusSortUid=r.layer?.uid,void this.scheduleRender()}if(t&&"reference"===o){const e=b.getItemAt(0);return this._focusSortUid=e?.layer?.uid,void this.scheduleRender()}if(t)return;return h&&(C(u,p,e),d.sort(u),this._sortLayersToItems({type:o,itemIds:d.toArray()})),this._focusSortUid=r.layer?.uid,void this.scheduleRender()}if("ArrowUp"===s){const e=p-1,t=e<0;if(t&&"base"===o&&h){if(1===b.length)return;const e=0;return this.viewModel.transferListItem({listItem:r,from:"base",to:"reference",newIndex:e}),this._focusSortUid=r.layer?.uid,void this.scheduleRender()}if(t&&"base"===o){const e=_.getItemAt(_.length-1);return this._focusSortUid=e?.layer?.uid,void this.scheduleRender()}if(t)return;h&&(C(u,p,e),d.sort(u),this._sortLayersToItems({type:o,itemIds:d.toArray()})),this._focusSortUid=r.layer?.uid,this.scheduleRender()}}}_watchActionSectionChanges(e,t){this.handles.add(e.on("change",(()=>this.scheduleRender())),t),e.forEach((e=>this._renderOnActionChanges(e,t)))}_renderOnActionChanges(e,t){"toggle"!==e.type?"slider"!==e.type?this.handles.add([r((()=>[e.className,e.image,e.id,e.title,e.visible]),(()=>this.scheduleRender()),a)],t):this.handles.add([r((()=>[e.className,e.id,e.title,e.visible,e.value,e.displayValueEnabled,e.max,e.min,e.step]),(()=>this.scheduleRender()),a)],t):this.handles.add([r((()=>[e.className,e.image,e.id,e.title,e.visible,e.value]),(()=>this.scheduleRender()),a)],t)}_renderOnItemChanges(e,t){this.handles.add([r((()=>[e.actionsOpen,e.visible,e.open,e.updating,e.connectionStatus,e.publishing,e.title,e.visibleAtCurrentScale,e.error,e.visibilityMode,e.panel,e.panel?.title,e.panel?.content,e.panel?.className]),(()=>this.scheduleRender()),a),r((()=>[e.hidden,e.error]),(()=>this._setVisibleItems())),e.actionsSections.on("change",(()=>this.scheduleRender())),e.children.on("change",(()=>this.scheduleRender()))],t),e.children.forEach((e=>this._renderOnItemChanges(e,t))),e.actionsSections.forEach((e=>this._watchActionSectionChanges(e,t)))}_itemsChanged(e,t){this.handles.remove(t),this._tooltipReferenceMap.clear(),this._setVisibleItems(),e.forEach((e=>this._renderOnItemChanges(e,t))),this.scheduleRender()}_countActions(e){return e.reduce(((e,t)=>e+t.length),0)}_getIconImageStyles(e){const t="esri.widgets.LayerList.ListItemPanel"===e.declaredClass||"esri.support.Action.ActionButton"===e.declaredClass||"esri.support.Action.ActionToggle"===e.declaredClass?e.image:null;return{"background-image":t?`url("${t}")`:null}}_toggleActionsOpen(e){e.stopPropagation();const t=e.currentTarget["data-item"],{actionsOpen:i}=t,s=!i,{baseItems:n,referenceItems:r}=this;s&&(n.forEach((e=>x(e))),r.forEach((e=>x(e)))),t.actionsOpen=s}_triggerPanel(e){e.stopPropagation();const t=e.currentTarget["data-panel"];t&&!t.disabled&&(t.open=!t.open)}_triggerAction(e){e.stopPropagation();const t=e.currentTarget,i=t["data-action"],s=t["data-item"];"toggle"===i.type&&(i.value=!i.value),this.triggerAction(i,s)}_toggleVisibility(e){e.stopPropagation();const t=e.currentTarget,i=t.getAttribute("data-parent-visibility"),s=t["data-item"];i===O.exclusive&&s.visible||(s.visible=!s.visible)}_toggleChildrenClick(e){e.stopPropagation();const t=e.currentTarget["data-item"];t.open=!t.open}_toggleSelection(e){e.stopPropagation();const{multipleSelectionEnabled:t,selectedItems:i}=this,s=t&&(e.metaKey||e.ctrlKey),n=e.currentTarget["data-item"],r=g(n,i),{length:o}=i;if(!s)return o&&!(r&&1===o)?(i.removeAll(),void i.add(n)):void(r?i.remove(r):i.add(n));r?i.remove(r):i.add(n)}};e([l()],N.prototype,"visibleItems",void 0),e([l()],N.prototype,"basemapTitle",null),e([l()],N.prototype,"baseListItemCreatedFunction",null),e([l()],N.prototype,"editingEnabled",void 0),e([l()],N.prototype,"headingLevel",void 0),e([l()],N.prototype,"iconClass",void 0),e([l()],N.prototype,"label",null),e([l(),y("esri/widgets/BasemapLayerList/t9n/BasemapLayerList")],N.prototype,"messages",void 0),e([l(),y("esri/t9n/common")],N.prototype,"messagesCommon",void 0),e([l()],N.prototype,"multipleSelectionEnabled",void 0),e([l()],N.prototype,"referenceListItemCreatedFunction",null),e([l({readOnly:!0})],N.prototype,"baseItems",null),e([l({readOnly:!0})],N.prototype,"referenceItems",null),e([l()],N.prototype,"selectedItems",void 0),e([l()],N.prototype,"view",null),e([f("trigger-action"),l({type:u})],N.prototype,"viewModel",void 0),e([l()],N.prototype,"visibleElements",void 0),e([c("visibleElements")],N.prototype,"castVisibleElements",null),e([_()],N.prototype,"_toggleActionsOpen",null),e([_()],N.prototype,"_triggerPanel",null),e([_()],N.prototype,"_triggerAction",null),e([_()],N.prototype,"_toggleVisibility",null),e([_()],N.prototype,"_toggleChildrenClick",null),e([_()],N.prototype,"_toggleSelection",null),N=e([d("esri.widgets.BasemapLayerList")],N);const j=N;export{j as default};