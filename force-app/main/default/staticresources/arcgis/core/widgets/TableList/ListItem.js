/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import e from"../../core/Accessor.js";import o from"../../core/Collection.js";import{HandleOwnerMixin as s}from"../../core/HandleOwner.js";import{IdentifiableMixin as i}from"../../core/Identifiable.js";import{watch as r,initial as n}from"../../core/reactiveUtils.js";import{property as l}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as a}from"../../core/accessorSupport/decorators/subclass.js";import c from"../../support/actions/ActionBase.js";import p from"../../support/actions/ActionButton.js";import h from"../../support/actions/ActionSlider.js";import u from"../../support/actions/ActionToggle.js";var d;const y=o.ofType({key:"type",defaultKeyValue:"button",base:c,typeMap:{button:p,toggle:u,slider:h}}),m=o.ofType(y),f="layer",b="esri.widgets.TableList.ListItem";let g=d=class extends(i(s(e))){constructor(t){super(t),this.actionsSections=new m,this.actionsOpen=!1,this.checkPublishStatusEnabled=!1,this.hidden=!1,this.layer=null,this.listItemCreatedFunction=null}initialize(){if(this.handles.add(r((()=>this.layer),(t=>this._watchLayerProperties(t)),n)),"function"==typeof this.listItemCreatedFunction){const t={item:this};this.listItemCreatedFunction.call(null,t)}}get error(){return this.layer?.loadError}get publishing(){const{layer:t,checkPublishStatusEnabled:e}=this;return e&&t&&"publishingInfo"in t&&"publishing"===t.publishingInfo.status}get title(){const t=this.get("layer.layer");return((!t||t&&this.get("layer.layer.loaded"))&&this.layer?.title)??""}set title(t){this._overrideIfSome("title",t)}clone(){return new d({actionsSections:this.actionsSections.clone(),actionsOpen:this.actionsOpen,checkPublishStatusEnabled:this.checkPublishStatusEnabled,layer:this.layer,listItemCreatedFunction:this.listItemCreatedFunction,title:this.title})}_watchLayerProperties(t){this.handles&&(this.handles.remove(f),t&&this.handles.add(r((()=>t.listMode),(()=>this._watchLayerProperties(t))),f))}};t([l({type:m})],g.prototype,"actionsSections",void 0),t([l()],g.prototype,"actionsOpen",void 0),t([l()],g.prototype,"checkPublishStatusEnabled",void 0),t([l({readOnly:!0})],g.prototype,"error",null),t([l()],g.prototype,"hidden",void 0),t([l()],g.prototype,"layer",void 0),t([l()],g.prototype,"listItemCreatedFunction",void 0),t([l({readOnly:!0})],g.prototype,"publishing",null),t([l()],g.prototype,"title",null),g=d=t([a(b)],g);const j=g;export{j as default};