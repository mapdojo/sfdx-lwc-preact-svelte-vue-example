/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import"../../geometry.js";import t from"../../core/Collection.js";import{referenceSetter as s}from"../../core/collectionUtils.js";import r from"../../core/Evented.js";import{HandleOwnerMixin as o}from"../../core/HandleOwner.js";import n from"../../core/Loadable.js";import i from"../../core/Logger.js";import{isSome as a,unwrap as l,isNone as m}from"../../core/maybe.js";import{EsriPromiseMixin as c}from"../../core/Promise.js";import{throwIfAborted as p}from"../../core/promiseUtils.js";import{watch as d}from"../../core/reactiveUtils.js";import{property as h}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as f}from"../../core/accessorSupport/decorators/subclass.js";import u from"../../geometry/Extent.js";import{initializeProjection as g,project as _}from"../../geometry/projection.js";import{fromExtent as y}from"../../geometry/support/aaBoundingRect.js";import{extentIntersectsPolygon as x}from"../../geometry/support/intersectsBase.js";import{equals as j}from"../../geometry/support/spatialReferenceUtils.js";import{BoundsStore as R}from"../graphics/data/BoundsStore.js";import E from"./ImageElement.js";import w from"./MediaElementBase.js";import{MediaElementView as M}from"./MediaElementView.js";import I from"./VideoElement.js";import S from"../../geometry/SpatialReference.js";const V={key:"type",defaultKeyValue:"image",base:w,typeMap:{image:E,video:I}},C=t.ofType(V);let b=class extends(n.LoadableMixin(c(o(r.EventedAccessor)))){constructor(e){super(e),this._index=new R,this._elementViewsMap=new Map,this._elementsIndexes=new Map,this._elementsChangedHandler=e=>{for(const s of e.removed){const e=this._elementViewsMap.get(s);this._elementViewsMap.delete(s),this._index.delete(e),this.handles.remove(e),e.destroy(),this.notifyChange("fullExtent")}const{spatialReference:t}=this;for(const s of e.added){if(this._elementViewsMap.get(s))continue;const e=new M({spatialReference:t,element:s});this._elementViewsMap.set(s,e);const r=d((()=>e.coords),(()=>this._updateIndexForElement(e,!1)));this._updateIndexForElement(e,!0),this.handles.add(r,e)}this._elementsIndexes.clear(),this.elements.forEach(((e,t)=>this._elementsIndexes.set(e,t))),this.emit("refresh")},this.elements=new C}async load(e){if(p(e),!this.spatialReference){const e=this.elements.find((e=>a(e.georeference)&&a(e.georeference.coords)));this._set("spatialReference",e?l(l(e.georeference).coords).spatialReference:S.WGS84)}return this._elementsChangedHandler({added:this.elements.items,removed:[]}),this.handles.add(this.elements.on("change",this._elementsChangedHandler)),this}destroy(){this._index.clear(),this._elementViewsMap.clear(),this._elementsIndexes.clear()}set elements(e){this._set("elements",s(e,this._get("elements"),C))}get fullExtent(){if("not-loaded"===this.loadStatus)return null;const e=this._index.fullBounds;return m(e)?null:new u({xmin:e[0],ymin:e[1],xmax:e[2],ymax:e[3],spatialReference:this.spatialReference})}set spatialReference(e){"not-loaded"===this.loadStatus?this._set("spatialReference",e):i.getLogger(this.declaredClass).error("#spatialReference","spatialReference cannot be changed after the source is loaded.")}async queryElements(e,t){await this.load(),await g(e.spatialReference,this.spatialReference,null,t);const s=j(e.spatialReference,this.spatialReference)?e:_(e,this.spatialReference);if(!s)return[];const r=s.normalize(),o=[];for(const n of r)this._index.forEachInBounds(y(n),(({normalizedCoords:e,element:t})=>{a(e)&&x(n,e)&&o.push(t)}));return o.sort(((e,t)=>this._elementsIndexes.get(e)-this._elementsIndexes.get(t))),o}_updateIndexForElement(e,t){const s=e.normalizedBounds,r=this._index.has(e),o=a(s);this._index.delete(e),o&&this._index.set(e,s),this.notifyChange("fullExtent"),t||(r!==o?this.emit("refresh"):this.emit("change",{element:e.element}))}};e([h()],b.prototype,"elements",null),e([h({readOnly:!0})],b.prototype,"fullExtent",null),e([h()],b.prototype,"spatialReference",null),b=e([f("esri.layers.support.LocalMediaElementSource")],b);const v=b;export{v as default};