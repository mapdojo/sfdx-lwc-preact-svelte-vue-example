/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../chunks/tslib.es6.js";import t from"../../../../core/Accessor.js";import r from"../../../../core/Evented.js";import s from"../../../../core/Logger.js";import{isNone as i}from"../../../../core/maybe.js";import{property as o}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as n}from"../../../../core/accessorSupport/decorators/subclass.js";import{F as a}from"../../../../chunks/mat4.js";import{c}from"../../../../chunks/mat4f64.js";import{m as l}from"../../../../chunks/vec3.js";import{c as p}from"../../../../chunks/vec3f64.js";import{empty as h,expand as m}from"../../../../geometry/support/aaBoundingRect.js";import{newIntersector as d}from"../../webgl-engine/lib/Intersector.js";import{StoreResults as f}from"../../webgl-engine/lib/IntersectorInterfaces.js";const u=h(),v=c(),_=p(),g=p(),x=p();let y=class extends(r.EventedMixin(t)){get spatialReference(){return this.view?.elevationProvider?.spatialReference}constructor(e){super(e),this._tmpEvent={spatialReference:null,extent:u,context:"scene"}}initialize(){this.view=this.layerView.view,this._renderCoordsHelper=this.view.renderCoordsHelper,this._intersector=d(this.view.state.viewingMode),this._intersector.options.store=f.MIN;const e=this.layerView.i3slayer.fullExtent;i(e)?s.getLogger(this.declaredClass).error("I3SElevationProvider expected fullExtent on I3SLayer."):(this._zmin=e.zmin,this._zmax=e.zmax),this._tmpEvent.context=this.intersectionHandler.isGround?"ground":"scene"}getElevation(e,t,r,i){if(_[0]=e,_[1]=t,_[2]=r,!this._renderCoordsHelper.toRenderCoords(_,i,_))return s.getLogger(this.declaredClass).error("could not project point to compute elevation"),null;const o=this.layerView.elevationOffset,n=this._zmin+o,a=this._zmax+o;return this._renderCoordsHelper.setAltitude(g,a,_),this._renderCoordsHelper.setAltitude(x,n,_),this._intersector.reset(g,x,null),this.intersectionHandler.intersect(this._intersector,null,g,x),this._intersector.results.min.getIntersectionPoint(_)?this._renderCoordsHelper.getAltitude(_):null}layerChanged(){this.spatialReference&&(this._tmpEvent.extent=this._computeLayerExtent(),this._tmpEvent.spatialReference=this.spatialReference,this.emit("elevation-change",this._tmpEvent))}objectChanged(e){this.spatialReference&&(this._tmpEvent.extent=this._computeObjectExtent(e),this._tmpEvent.spatialReference=this.spatialReference,this.emit("elevation-change",this._tmpEvent))}_computeObjectExtent(e){return h(u),this._expandExtent(e,u),u}_computeLayerExtent(){h(u);for(const e of this.layerView.getVisibleNodes())this._expandExtent(e,u);return u}_expandExtent(e,t){const r=this.spatialReference;if(i(r))return;const s=this.layerView.getNodeComponentObb(e);if(!i(s)){a(v,s.quaternion),v[12]=s.center[0],v[13]=s.center[1],v[14]=s.center[2];for(let e=0;e<8;++e)_[0]=1&e?s.halfSize[0]:-s.halfSize[0],_[1]=2&e?s.halfSize[1]:-s.halfSize[1],_[2]=4&e?s.halfSize[2]:-s.halfSize[2],l(_,_,v),this._renderCoordsHelper.fromRenderCoords(_,_,r),m(t,_,t)}}};e([o({constructOnly:!0})],y.prototype,"layerView",void 0),e([o({constructOnly:!0})],y.prototype,"intersectionHandler",void 0),e([o()],y.prototype,"view",void 0),e([o()],y.prototype,"spatialReference",null),y=e([n("esri.views.3d.layers.i3s.I3SElevationProvider")],y);const E=y;export{E as default};