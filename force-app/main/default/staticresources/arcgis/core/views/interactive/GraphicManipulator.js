/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import e from"../../core/Accessor.js";import o from"../../core/Evented.js";import{isNone as i,isSome as s}from"../../core/maybe.js";import{watch as r,sync as l}from"../../core/reactiveUtils.js";import{screenPointObjectToArray as n,pt2px as a,createScreenPointArray as c}from"../../core/screenUtils.js";import{property as h}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as p}from"../../core/accessorSupport/decorators/subclass.js";import{k as m}from"../../chunks/vec2.js";import{i as u}from"../../chunks/vec3.js";import{c as y}from"../../chunks/vec3f64.js";import{canProjectWithoutEngine as b,project as g,projectPointToVector as d}from"../../geometry/projection.js";import{getGraphicEffectiveElevationMode as f}from"../../support/elevationInfoUtils.js";import{getDefaultSymbol2D as _}from"../../symbols/support/defaults.js";import v from"../../symbols/support/ElevationInfo.js";import{getSymbolInfo as S}from"./support/utils.js";import{intersectsDrapedGeometry as C}from"../support/drapedUtils.js";let j=class extends e{set graphic(t){this._circleCollisionCache=null,this._originalSymbol=t.symbol,this._set("graphic",t),this.attachSymbolChanged()}get elevationInfo(){const{layer:t}=this.graphic,e=t&&"elevationInfo"in t?t.elevationInfo:null,o=f(this.graphic),i=e?e.offset:0;return new v({mode:o,offset:i})}set focusedSymbol(t){t!==this._get("focusedSymbol")&&(this._set("focusedSymbol",t),this._updateGraphicSymbol(),this._circleCollisionCache=null)}grabbableForEvent(){return!0}set grabbing(t){t!==this._get("grabbing")&&(this._set("grabbing",t),this._updateGraphicSymbol())}set hovering(t){t!==this._get("hovering")&&(this._set("hovering",t),this._updateGraphicSymbol())}set selected(t){t!==this._get("selected")&&(this._set("selected",t),this._updateGraphicSymbol(),this.events.emit("select-changed",{action:t?"select":"deselect"}))}get _focused(){return this._get("hovering")||this._get("grabbing")}constructor(t){super(t),this.layer=null,this.interactive=!0,this.selectable=!1,this.grabbable=!0,this.dragging=!1,this.cursor=null,this.events=new o.EventEmitter,this._circleCollisionCache=null,this._graphicSymbolChangedHandle=null,this._originalSymbol=null}destroy(){this.detachSymbolChanged(),this._resetGraphicSymbol(),this._set("view",null)}intersectionDistance(t){const e=this.graphic;if(!1===e.visible)return null;const o=e.geometry;if(i(o))return null;const r=this._get("focusedSymbol"),l=s(r)?r:e.symbol;return"2d"===this.view.type?this._intersectDistance2D(this.view,t,o,l):this._intersectDistance3D(this.view,t,e)}attach(){this.attachSymbolChanged(),s(this.layer)&&this.layer.add(this.graphic)}detach(){this.detachSymbolChanged(),this._resetGraphicSymbol(),s(this.layer)&&this.layer.remove(this.graphic)}attachSymbolChanged(){this.detachSymbolChanged(),this._graphicSymbolChangedHandle=r((()=>this.graphic?.symbol),(t=>{s(t)&&t!==this.focusedSymbol&&t!==this._originalSymbol&&(this._originalSymbol=t,this._focused&&s(this.focusedSymbol)&&(this.graphic.symbol=this.focusedSymbol))}),l)}detachSymbolChanged(){s(this._graphicSymbolChangedHandle)&&(this._graphicSymbolChangedHandle.remove(),this._graphicSymbolChangedHandle=null)}onElevationChange(){}onViewChange(){}_updateGraphicSymbol(){this.graphic.symbol=this._focused&&s(this.focusedSymbol)?this.focusedSymbol:this._originalSymbol}_resetGraphicSymbol(){this.graphic.symbol=this._originalSymbol}_intersectDistance2D(t,e,o,r){if(r=r||_(o),i(r))return null;const l=1;let c=this._circleCollisionCache;if("point"===o.type&&"cim"===r.type&&"CIMPointSymbol"===r.data.symbol?.type&&r.data.symbol.symbolLayers){const{offsetX:i,offsetY:s,size:a}=S(r),c=n(e,D),h=a/2,p=t.toScreen(o),u=p.x+i,y=p.y+s;return m(c,[u,y])<h*h?l:null}if("point"!==o.type||"simple-marker"!==r.type)return C(e,o,t)?l:null;if(i(c)||!c.originalPoint.equals(o)){const e=o,i=t.spatialReference;if(b(e.spatialReference,i)){const t=g(e,i);c={originalPoint:e.clone(),mapPoint:t,radiusPx:a(r.size)},this._circleCollisionCache=c}}if(s(c)){const o=n(e,D),i=t.toScreen?.(c.mapPoint);if(!i)return null;const s=c.radiusPx,h=i.x+a(r.xoffset),p=i.y-a(r.yoffset);return m(o,[h,p])<s*s?l:null}return null}_intersectDistance3D(t,e,o){const i=t.toMap(e,{include:[o]});return i&&d(i,w,t.renderSpatialReference)?u(w,t.state.camera.eye):null}};t([h({constructOnly:!0,nonNullable:!0})],j.prototype,"graphic",null),t([h()],j.prototype,"elevationInfo",null),t([h({constructOnly:!0,nonNullable:!0})],j.prototype,"view",void 0),t([h({value:null})],j.prototype,"focusedSymbol",null),t([h({constructOnly:!0})],j.prototype,"layer",void 0),t([h()],j.prototype,"interactive",void 0),t([h()],j.prototype,"selectable",void 0),t([h()],j.prototype,"grabbable",void 0),t([h({value:!1})],j.prototype,"grabbing",null),t([h()],j.prototype,"dragging",void 0),t([h()],j.prototype,"hovering",null),t([h({value:!1})],j.prototype,"selected",null),t([h()],j.prototype,"cursor",void 0),j=t([p("esri.views.interactive.GraphicManipulator")],j);const w=y(),D=c();export{j as GraphicManipulator};