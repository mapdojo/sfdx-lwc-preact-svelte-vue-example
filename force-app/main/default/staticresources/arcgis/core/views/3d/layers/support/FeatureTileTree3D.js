/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../chunks/tslib.es6.js";import t from"../../../../core/Accessor.js";import i from"../../../../core/Collection.js";import s from"../../../../core/Handles.js";import r from"../../../../core/Logger.js";import{isSome as n,isNone as o,removeMaybe as l,destroyMaybe as h}from"../../../../core/maybe.js";import a from"../../../../core/PooledArray.js";import{watch as c,sync as d,syncAndInitial as u}from"../../../../core/reactiveUtils.js";import{property as p}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as _}from"../../../../core/accessorSupport/decorators/subclass.js";import{create as m,empty as f,expand as g,height as T,intersects as y}from"../../../../geometry/support/aaBoundingRect.js";import{FeatureTileDescriptor3D as S,Visibility as E}from"./FeatureTileDescriptor3D.js";import{FeatureTileMeasurements3D as v}from"./FeatureTileMeasurements3D.js";import{toBoundingRect as w}from"../../support/extentUtils.js";import{TaskPriority as R,noBudget as x}from"../../../support/Scheduler.js";let C=class extends t{get tilingScheme(){const e=this.tilingSchemeOwner.tilingScheme;if(!e)return null;return e.clone()}set filterExtent(e){if(n(e)&&!e.spatialReference.equals(this.viewState.spatialReference))return void r.getLogger(this.declaredClass).error("#extent","extent spatial reference needs to be in the same spatial reference as the view");const t=this._get("filterExtent");if(t===e||n(t)&&e&&t.equals(e))return;const i=n(e)?e.clone():null;this._set("filterExtent",i),this._setDirty()}get _filterExtentRect(){if(o(this.filterExtent))return null;const e=m();return w(this.filterExtent,e,this.tilingScheme.spatialReference),e}get _rootTileIds(){const{tilingScheme:e}=this;return this._filterExtentRect&&e?e.rootTilesInExtent(this._filterExtentRect):[[0,0,0]]}set suspended(e){e!==this._get("suspended")&&(this._set("suspended",e),this._setDirty())}get updating(){return this._dirty||!!this._pendingTiles}constructor(e){super(e),this.tiles=new i,this.tileSize=512,this._idToTile=new Map,this._handles=new s,this._clients=new Set,this._dirty=!1,this._pendingTiles=null,this._newTiles=new a}initialize(){this._handles.add([c((()=>[this.tilingScheme,this.tileSize]),(()=>this._reset()),d),c((()=>[this.tileSize,this.cameraOnSurface?.location,this.tilingScheme,this.viewState?.contentCamera,this.focus?.location]),(()=>this._setDirty()),u)]),this.scheduler&&(this._frameWorker=this.scheduler.registerTask(R.FEATURE_TILE_TREE,this))}destroy(){this._frameWorker=l(this._frameWorker),this._handles=h(this._handles)}addClient(){const e=O();return this._clients.add(e),1===this._clients.size&&this._setDirty(),{remove:()=>this._removeClient(e)}}_removeClient(e){this._clients.delete(e),this._hasClients||this._clear()}get _hasClients(){return this._clients.size>0}_setDirty(){!this._hasClients||this.suspended||this._dirty||(this._frameWorker?(this._dirty=!0,this.notifyChange("updating")):this.runTask(x))}_clear(){this.tiles.removeAll(),this._idToTile.clear(),this._reset(),this._dirty=!1,this.notifyChange("updating")}get running(){return this.updating}runTask(e){this._dirty=!1,this._pendingTiles||(this._startUpdate(),n(this._frameWorker)&&(this._frameWorker.priority=R.FEATURE_TILE_TREE_ACTIVE)),this._subdivideTilesForView(e),!this._pendingTiles&&n(this._frameWorker)&&(this._frameWorker.priority=R.FEATURE_TILE_TREE),this.notifyChange("updating")}_startUpdate(){if(this.suspended)return;if(!this.tilingScheme)return void this._clear();this._tileMeasurements||(this._tileMeasurements=new v({renderCoordsHelper:this.renderCoordsHelper,tilingScheme:this.tilingScheme,tileSize:this.tileSize}));const e=this.viewState.contentCamera;this._tileMeasurements.begin(e,this.focus.location,this.cameraOnSurface.location.z??0),this._pendingTiles=this._getRootTiles()}_reset(){this._newTiles.clear(),this._tileMeasurements=null,this._pendingTiles=null,this._setDirty()}_getRootTiles(){const{tilingScheme:e}=this;return this._rootTileIds.map((t=>new S(t[0],t[1],t[2],e)))}_purgeHorizonTiles(e){e.sort(((e,t)=>{const i=e.measures.screenRect,s=t.measures.screenRect;return i[1]+i[3]-(s[1]+s[3])})),f(I);for(let t=0;t<e.length;t++)if(g(I,e.data[t].measures.screenRect,I),T(I)>k)return e.data.slice(t,e.length);return[]}_subdivideTilesForView(e){if(!this._pendingTiles)return;const{tilingScheme:t}=this;for(;this._pendingTiles.length>0&&!e.done;){const i=this._pendingTiles.pop();e.madeProgress(),this._filterExtentRect&&!y(this._filterExtentRect,i.extent)||(this._tileMeasurements.updateTile(i),i.measures.visibility!==E.INVISIBLE&&(i.measures.shouldSplit?(t.ensureMaxLod(i.lij[0]+1),this._pendingTiles.push(...i.getChildren())):this._newTiles.push(i)))}0===this._pendingTiles.length&&(this._updateTiles(this._purgeHorizonTiles(this._newTiles)),this._newTiles.clear(),this._tileMeasurements.end(),this._pendingTiles=null)}_updateTiles(e){for(const s of this.tiles.items)s.used=!1;const t=e.filter((e=>{const t=this._idToTile.get(e.id);return t?(t.copyMeasurementsFrom(e),t.used=!0):this._idToTile.set(e.id,e),!t})),i=this.tiles.items.filter((e=>!e.used&&(this._idToTile.delete(e.id),!0)));this.tiles.removeMany(i),this.tiles.addMany(t),this._sortTiles()}_sortTiles(){this.viewState.fixedContentCamera||this.tiles.sort(((e,t)=>e.measures.visibility!==t.measures.visibility?e.measures.visibility===E.VISIBLE_ON_SURFACE?-1:1:e.measures.distance-t.measures.distance)),this.tiles.forEach(((e,t)=>e.loadPriority=t))}};e([p({constructOnly:!0})],C.prototype,"scheduler",void 0),e([p({constructOnly:!0})],C.prototype,"renderCoordsHelper",void 0),e([p({constructOnly:!0})],C.prototype,"tilingSchemeOwner",void 0),e([p({constructOnly:!0})],C.prototype,"cameraOnSurface",void 0),e([p({constructOnly:!0})],C.prototype,"focus",void 0),e([p({constructOnly:!0})],C.prototype,"viewState",void 0),e([p({constructOnly:!0})],C.prototype,"terrain",void 0),e([p()],C.prototype,"tiles",void 0),e([p()],C.prototype,"tileSize",void 0),e([p({readOnly:!0})],C.prototype,"tilingScheme",null),e([p()],C.prototype,"filterExtent",null),e([p({readOnly:!0})],C.prototype,"_filterExtentRect",null),e([p({readOnly:!0})],C.prototype,"_rootTileIds",null),e([p({value:!1})],C.prototype,"suspended",null),e([p({readOnly:!0})],C.prototype,"updating",null),C=e([_("esri.views.3d.layers.support.FeatureTileTree3D")],C);let j=0;function O(){return j++}const I=m(),k=10;export{C as FeatureTileTree3D};