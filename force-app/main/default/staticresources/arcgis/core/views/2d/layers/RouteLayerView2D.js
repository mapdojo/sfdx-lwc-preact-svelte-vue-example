/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import e from"../../../core/Collection.js";import r from"../../../core/CollectionFlattener.js";import{isSome as i,isNone as s}from"../../../core/maybe.js";import{initial as o,watch as a}from"../../../core/reactiveUtils.js";import{property as h}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{subclass as n}from"../../../core/accessorSupport/decorators/subclass.js";import p from"../../../rest/support/DirectionLine.js";import c from"../../../rest/support/DirectionPoint.js";import l from"../../../rest/support/PointBarrier.js";import g from"../../../rest/support/PolygonBarrier.js";import u from"../../../rest/support/PolylineBarrier.js";import d from"../../../rest/support/RouteInfo.js";import _ from"../../../rest/support/Stop.js";import{LayerView2DMixin as m}from"./LayerView2D.js";import w from"./graphics/GraphicContainer.js";import f from"./graphics/GraphicsView2D.js";import y from"../../layers/LayerView.js";const k=Object.freeze({remove(){},pause(){},resume(){}}),v=["route-info","direction-line","direction-point","polygon-barrier","polyline-barrier","point-barrier","stop"],M={graphic:null,property:null,oldValue:null,newValue:null};function V(t){return t instanceof p||t instanceof c||t instanceof l||t instanceof g||t instanceof u||t instanceof d||t instanceof _}function j(t){return e.isCollection(t)&&t.length&&V(t.getItemAt(0))}function G(t){return Array.isArray(t)&&t.length>0&&V(t[0])}let I=class extends(m(y)){constructor(){super(...arguments),this._graphics=new e,this._highlightIds=new Map,this._networkFeatureMap=new Map,this._networkGraphicMap=new Map}get _routeItems(){return new r({getCollections:()=>i(this.layer)&&!this.destroyed?[i(this.layer.routeInfo)?new e([this.layer.routeInfo]):null,this.layer.directionLines,this.layer.directionPoints,this.layer.polygonBarriers,this.layer.polylineBarriers,this.layer.pointBarriers,this.layer.stops]:[]})}initialize(){this.updatingHandles.addOnCollectionChange((()=>this._routeItems),(t=>this._routeItemsChanged(t)),o)}destroy(){this._networkFeatureMap.clear(),this._networkGraphicMap.clear(),this._graphics.removeAll(),this._get("_routeItems")?.destroy()}attach(){this._createGraphicsView()}detach(){this._destroyGraphicsView()}async fetchPopupFeatures(t){return this._graphicsView.hitTest(t).filter((t=>!!t.popupTemplate))}highlight(t){let e;e=V(t)?[this._getNetworkFeatureUid(t)]:G(t)?t.map((t=>this._getNetworkFeatureUid(t))):j(t)?t.map((t=>this._getNetworkFeatureUid(t))).toArray():[t.uid];const r=e.filter(i);return r.length?(this._addHighlight(r),{remove:()=>this._removeHighlight(r)}):k}async hitTest(t,e){if(this.suspended)return null;const r=this._graphicsView.hitTest(t).filter(i).map((t=>this._networkGraphicMap.get(t)));if(!r.length)return null;const{layer:s}=this;return r.reverse().map((e=>({type:"route",layer:s,mapPoint:t,networkFeature:e})))}isUpdating(){return this._graphicsView.updating}moveStart(){}moveEnd(){}update(t){this._graphicsView.processUpdate(t)}viewChange(){this._graphicsView.viewChange()}_addHighlight(t){for(const e of t)if(this._highlightIds.has(e)){const t=this._highlightIds.get(e);this._highlightIds.set(e,t+1)}else this._highlightIds.set(e,1);this._updateHighlight()}_createGraphic(t){const e=t.toGraphic();return e.layer=this.layer,e.sourceLayer=this.layer,e}_createGraphicsView(){const t=this.view,e=()=>this.requestUpdate(),r=new w(t.featuresTilingScheme);this._graphicsView=new f({container:r,graphics:this._graphics,requestUpdateCallback:e,view:t}),this.container.addChild(r),this._updateHighlight()}_destroyGraphicsView(){this.container.removeChild(this._graphicsView.container),this._graphicsView.destroy()}_getDrawOrder(t){const e=this._networkGraphicMap.get(t);return v.indexOf(e.type)}_getNetworkFeatureUid(t){return this._networkFeatureMap.has(t)?this._networkFeatureMap.get(t).uid:null}_removeHighlight(t){for(const e of t)if(this._highlightIds.has(e)){const t=this._highlightIds.get(e)-1;0===t?this._highlightIds.delete(e):this._highlightIds.set(e,t)}this._updateHighlight()}_routeItemsChanged(t){if(t.removed.length){this._graphics.removeMany(t.removed.map((t=>{const e=this._networkFeatureMap.get(t);return this._networkFeatureMap.delete(t),this._networkGraphicMap.delete(e),e})));for(const e of t.removed)this.removeHandles(e)}if(t.added.length){this._graphics.addMany(t.added.map((t=>{const e=this._createGraphic(t);return s(e.symbol)?null:(this._networkFeatureMap.set(t,e),this._networkGraphicMap.set(e,t),e)})).filter(i));for(const e of t.added)this.addHandles([a((()=>e.geometry),((t,r)=>{this._updateGraphic(e,"geometry",t,r)})),a((()=>e.symbol),((t,r)=>{this._updateGraphic(e,"symbol",t,r)}))],e);this._graphics.sort(((t,e)=>this._getDrawOrder(t)-this._getDrawOrder(e)))}}_updateGraphic(t,e,r,i){if(!this._networkFeatureMap.has(t)){const e=this._createGraphic(t);return this._networkFeatureMap.set(t,e),this._networkGraphicMap.set(e,t),void this._graphics.add(e)}const s=this._networkFeatureMap.get(t);s[e]=r,M.graphic=s,M.property=e,M.oldValue=i,M.newValue=r,this._graphicsView.graphicUpdateHandler(M)}_updateHighlight(){const t=Array.from(this._highlightIds.keys());this._graphicsView.setHighlight(t)}};t([h()],I.prototype,"_graphics",void 0),t([h()],I.prototype,"_routeItems",null),I=t([n("esri.views.2d.layers.RouteLayerView2D")],I);const F=I;export{F as default};