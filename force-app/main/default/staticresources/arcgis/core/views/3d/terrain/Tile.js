/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clamp as e}from"../../../core/mathUtils.js";import{isSome as t,abortMaybe as i,isNone as s}from"../../../core/maybe.js";import n from"../../../core/ObjectPool.js";import{c as r,s as a}from"../../../chunks/vec2.js";import{a as o}from"../../../chunks/vec2f64.js";import{b as l,p as h,e as d,g as u,a as c,l as g,c as f}from"../../../chunks/vec3.js";import{c as p,u as m}from"../../../chunks/vec3f64.js";import{g as _}from"../../../chunks/common.js";import{getReferenceEllipsoid as y}from"../../../geometry/ellipsoidUtils.js";import{create as A,equals as T}from"../../../geometry/support/aaBoundingRect.js";import{c as E}from"../../../chunks/sphere.js";import{isGroupLayer as v}from"../../../layers/support/layerUtils.js";import{VectorTile as I}from"../../2d/engine/vectorTiles/VectorTile.js";import{ImageWithType as M}from"../support/StreamDataLoader.js";import{ElevationBounds as D}from"./ElevationBounds.js";import{ElevationTileAgent as L}from"./ElevationTileAgent.js";import{TileFrustumVisibility as x,TextureUpdate as S,NeighborIndex as O}from"./interfaces.js";import{LayerClasses as N,LayerClass as j}from"./LayerClass.js";import{MapTileAgent as b}from"./MapTileAgent.js";import{RasterTile as U}from"./RasterTile.js";import{MAX_PATCH_TESSELATION as C,getElevationDesiredResolutionLevel as P}from"./TerrainConst.js";import{weakAssert as B,getLayerWithExtentRange as R,isBlendableLayerView as V,oppositeCorner as G,neighborCornerIndices as w,neighborEdgeIndices as W,oppositeEdge as q,internalAssert as F,ENABLE_TERRAIN_INTERNAL_CHECKS as H,isNorth as k,isSouth as X,isWest as Y,isEast as z,ENABLE_WATERPROOFNESS_TESTS as $,almostEquals as J,isWestCorner as Q,isNorthCorner as K}from"./terrainUtils.js";import{TILE_AGENT_DONE as Z}from"./TileAgent.js";import{TilePerLayerInfo as ee}from"./TilePerLayerInfo.js";import te from"./TileTexture.js";import{TileUpdate as ie}from"./TileUpdate.js";import{fallsWithinLayer as se}from"./tileUtils.js";import{getGpuMemoryUsage as ne}from"../../webgl/Util.js";const re=p(),ae=p(),oe=p(),le=.1;class he{constructor(){this.lij=[0,0,0],this._children=[null,null,null,null],this._pendingUpdates=0,this.renderData=null,this._dirty=!0,this._previouslyRendered=!1,this.extent=A(),this._elevationBounds=o(),this.layerInfo=[[],[]],this.extentInRadians=A(),this.centerAtSeaLevel=p(),this._center=[p(),E(),p()],this.up=m(),this._isWithinClippingArea=!0,this._intersectsClippingArea=!0,this._maxTesselation=0,this._usedMemory=null,this._mapTileMemoryInternal=0,this._mapDataRefCount=0,this.screenDepth=0,this.renderOrder=0,this._edgeLen=0,this._edgeLen2=0,this._curvatureHeight=0,this.extentMidX=0,this.extentMidY=0,this.distanceToPOI=-1,this._lastPOI=p()}static prune(){ce.prune(0),ge.prune(0),ee.prune()}get _isCached(){return!this.shouldLoad&&this._mapDataRefCount<=0}get maxTesselation(){return this._maxTesselation}get isWithinClippingArea(){return this._isWithinClippingArea}get intersectsClippingArea(){return this._intersectsClippingArea}get clippingArea(){return this._clippingArea}get parent(){return this._parent}get children(){return this._children}get surface(){return this._surface}get elevationBounds(){return this._elevationBounds}get level(){return this.lij[0]}get key(){return`${this.lij[0]}/${this.lij[1]}/${this.lij[2]}`}get edgeLen(){return this._edgeLen}get radius(){return this._center[pe.MIDDLE][3]}get visible(){return this._dirty&&this.computeVisibility(),this._visible}get frustumVisibility(){return this._dirty&&this.computeVisibility(),this._frustumVisibility}computeVisibility(){this._dirty=!1;const e=this.parent?.frustumVisibility??x.INTERSECTS;this._frustumVisibility=e===x.INSIDE?x.INSIDE:e===x.OUTSIDE?x.OUTSIDE:this._calculateFrustumVisibilityStatus(this.surface.frustum);const t=this._frustumVisibility!==x.OUTSIDE&&this._intersectsClippingArea;t!==this._visible&&(this._visible=t,this._surface.emit("tiles-visibility-changed"),this._surface.renderer.setDirty(),this.updateAgentSuspension())}get loadable(){return this.visible||this._surface.view.state.fixedContentCamera}get rendered(){const e=!!this.renderData;return e!==this._previouslyRendered&&(this._surface.emit("tiles-visibility-changed"),this._previouslyRendered=e,this._surface.renderer.setDirty()),e}get shouldLoad(){const e=this._surface.snapLevel;if(t(e)){const t=this.level-e;if(0===t)return!0;if(1===t)return!1}return this.isLeaf}init(e,t,i){this.lij[0]=e[0],this.lij[1]=e[1],this.lij[2]=e[2],this.ellipsoid=y(i.tilingScheme.spatialReference),i.tilingScheme.getExtent(e[0],e[1],e[2],this.extent),i.tilingScheme.convertExtentToRadians(this.extent,this.extentInRadians),this.extentMidX=.5*(this.extent[0]+this.extent[2]),this.extentMidY=.5*(this.extent[1]+this.extent[3]),this._isWithinClippingArea=!0,this._intersectsClippingArea=!0,this._clippingArea=null,this._mapDataRefCount=0,i.upsampleMapCache.pop(this.key),this._edgeLen=0,this._edgeLen2=0,this._center[pe.MIDDLE][3]=0,this.vlevel=e?e[0]:0,t&&t.elevationBounds?r(this._elevationBounds,t.elevationBounds):a(this._elevationBounds,0,0),this._pendingUpdates=0,this.renderData=null,this.screenDepth=0,this._visible=!1,this._previouslyRendered=!1,this._parent=t,this.unsetChildren(),this._surface=i,this.updateVisibility();for(const s of N){const e=i.numLayers(s),t=this.layerInfo[s];for(const i of t)i.release();t.length=e;for(let i=0;i<e;i++)t[i]=ee.acquire(this._surface.upsampleInfoPool),s===j.ELEVATION&&this.findElevationBoundsForLayer(i,-1)}this.computeElevationBounds(),this._maxTesselation=Math.min(i.tilingScheme.pixelSize,C)}release(){B(!this.renderData,"tile.renderData was not unloaded"),this._surface.upsampleMapCache.pop(this.key);for(const e of N){for(const t of this.layerInfo[e])t.release();this.layerInfo[e].length=0}this._parent=null;for(let e=0;e<4;++e)this._children[e]=null;this._surface=null,this.setMemoryDirty()}refMapData(){++this._mapDataRefCount,this._isCached||this._surface.upsampleMapCache.pop(this.key)}unrefMapData(){if(--this._mapDataRefCount,this._isCached){this.setMemoryDirty();const e=this._cachedMemory;e>0&&this._surface.upsampleMapCache.put(this.key,this,e)}}setMemoryDirty(){this._usedMemory=null}get usedMemory(){return this._ensureUsedMemory()+(this._isCached?0:this._mapTileMemoryInternal)}get _cachedMemory(){return this._isCached?this._mapTileMemory:0}get _mapTileMemory(){return this._ensureUsedMemory(),this.layerInfo[j.MAP].reduce(((e,t)=>e+(t instanceof I?t.memoryUsage:0)),this._mapTileMemoryInternal)}get _cpuImageMemorySize(){const e=4,t=this._surface.tilingScheme.pixelSize;return t*t*e}_ensureUsedMemory(){if(t(this._usedMemory))return this._usedMemory;this._usedMemory=0,this._mapTileMemoryInternal=0;let e=0;for(const{data:t}of this.layerInfo[j.MAP])t instanceof I?e+=this._getTerrainDataMemory(t):this._mapTileMemoryInternal+=this._getTerrainDataMemory(t);const i=this._cpuImageMemorySize;for(const t of this.layerInfo[j.ELEVATION])this._usedMemory+=t.data?i:0;return this.renderData&&(this._usedMemory+=this.renderData.estimatedGeometryMemoryUsage,this._mapTileMemoryInternal+=ne(this.renderData.textureDescriptor)),this._isCached&&this._surface.upsampleMapCache.updateSize(this.key,this,this._mapTileMemoryInternal+e),this._usedMemory}getUsedMemoryForLayer(e,t){const i=this.layerInfo[e][t];return i?.data?e===j.MAP?this._isCached?0:this._getTerrainDataMemory(i.data):e===j.ELEVATION?this._cpuImageMemorySize:0:0}_getTerrainDataMemory(e){return e instanceof te?ne(e.texture):e instanceof HTMLImageElement||e instanceof M?this._cpuImageMemorySize:e instanceof I||e instanceof U?e.memoryUsage:0}updateScreenDepth(e){const t=this._center[pe.MIDDLE],i=e,s=t[0],n=t[1],r=t[2],a=i[2]*s+i[6]*n+i[10]*r+i[14];this.screenDepth=a<0?0:a/(i[3]*s+i[7]*n+i[11]*r+i[15])}shouldSplit(e,i,s){if(!this.visible)return ie.NONE;if(t(e.frustum)&&(!this._intersectsClippingArea||this._calculateFrustumVisibilityStatus(e.frustum)===x.OUTSIDE))return ie.NONE;const n=this.level;l(re,this._center[pe.MIDDLE],i);let r=h(re),a=pe.MIDDLE;l(ae,this._center[pe.TOP],i);const o=h(ae);o<r&&(r=o,a=pe.TOP),l(ae,this._center[pe.BOTTOM],i);const f=h(ae);if(f<r&&(r=f,a=pe.BOTTOM),this._edgeLen2>r&&n<e.maxLod)return ie.SPLIT;const p=Math.sqrt(r),m=e.fovX*p*2,_=this._edgeLen/m,y=()=>{const t=n+Math.ceil(-Math.log2(e.relativeWidthLimit/_));return t!==this.vlevel?(this.vlevel=t,ie.VSPLITMERGE):ie.NONE_HIT_MAXLOD};if(t(s)){if(1===s-n)return n>=e.maxLod?y():ie.SPLIT}const A=d(this.up,re),T=this._elevationBounds[1]-this._elevationBounds[0],E=T/this.edgeLen;if(e.aboveGround&&A>0&&E<.001){if(A/p-Math.sin(this._curvatureHeight/(this.edgeLen*Math.SQRT1_2)*Math.PI)-E>0)return ie.NONE}if(_<e.relativeWidthLimit)return this.vlevel!==this.level?(this.vlevel=this.level,ie.VSPLITMERGE):ie.NONE;if(n>=e.maxLod)return y();if(n>6){l(ae,this._center[a],i),u(oe,this.up,A),l(oe,oe,ae);const t=h(oe);if(t>this.radius*this.radius){u(oe,oe,this.radius/Math.sqrt(t)),c(oe,oe,this._center[a]),l(oe,i,oe);const s=Math.min(1,(Math.abs(d(oe,this.up))+.5*T+this._curvatureHeight)/g(oe)),n=le/e.angledSplitBias,r=e.fovY*p*2;if(s*(this._edgeLen/r)<n*e.relativeHeightLimit)return ie.NONE}}return ie.SPLIT}setChildren(e,t,i,s){B(!!(e&&t&&i&&s),"Null child passed"),this._children[0]=e,this._children[1]=t,this._children[2]=i,this._children[3]=s}unsetChildren(){this._children[0]=null,this._children[1]=null,this._children[2]=null,this._children[3]=null}get isLoaded(){return this.renderData?.hasGeometry??!1}load(){this.refMapData();for(const e of N)this._createOrUpdateAgents(0,e);this.surface.renderer.loadTile(this)}unload(e){e.unloadTile(this);for(const t of N){const e=this.layerInfo[t];for(const t of e)t.loadingAgent&&t.loadingAgent!==Z&&(ue(t.loadingAgent),t.loadingAgent=null),t.pendingUpdates=0}this.resetPendingUpdate(ie.GEOMETRY),this.resetPendingUpdate(ie.TEXTURE_NOFADING),this.resetPendingUpdate(ie.TEXTURE_FADING),this.unrefMapData()}unloadMapData(){const e=this.layerInfo[j.MAP];for(const t of e)t.loadingAgent&&t.loadingAgent!==Z&&(ue(t.loadingAgent),t.loadingAgent=null),t.pendingUpdates=0;this.renderData&&this.renderData.releaseTexture(),this.setMemoryDirty()}updateClippingStatus(e){if(T(e,this._clippingArea))return!1;const i=this._intersectsClippingArea,s=this._isWithinClippingArea;t(e)?(this._intersectsClippingArea=this.intersectsExtent(e),this._isWithinClippingArea=this._isWithinExtent(e)):(this._intersectsClippingArea=!0,this._isWithinClippingArea=!0),this._clippingArea=e,this.updateVisibility();const n=s&&this._isWithinClippingArea,r=!(s||i||this._isWithinClippingArea||this._intersectsClippingArea);return!this.renderData||n||r||this.setPendingUpdate(ie.GEOMETRY),!0}updateVisibility(){this._dirty=!0,this._surface.setTileTreeDirty()}getLayerInfo(e,t){return this.layerInfo[t][e]}hasLayerData(e,t){const i=this.layerInfo[t][e];return!(!i||!i.data||i.dataInvalidated)}get updating(){if(this.hasPendingUpdates)return!0;for(const e of N){const t=this.layerInfo[e];for(const e of t)if(e.loadingAgent&&e.loadingAgent!==Z&&e.loadingAgent.updating)return!0}return!1}_isSuspended(e){return!!this.hasPendingUpdate(ie.SPLIT)||e!==j.ELEVATION&&!this.loadable}get hasPendingUpdates(){return 0!==this._pendingUpdates}hasPendingUpdate(e){return(this._pendingUpdates&e)===e}setPendingUpdate(e){this._pendingUpdates|=e,e===ie.SPLIT||e===ie.MERGE?this._surface.setTileTreeDirty():this._surface.requestUpdate()}resetPendingUpdate(e){return!!this.hasPendingUpdate(e)&&(this._pendingUpdates&=~e,!0)}requestLayerData(e,t,s){const n=this.layerInfo[t][e];if(n.waitingAgents.has(s))return console.warn("agent already requested this piece of map data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),s.tile.lij.toString(),t,e),!0;if(n.waitingAgents.push(s),n.data&&!n.dataInvalidated)return console.warn("agent requested existing data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),s.tile.lij.toString(),t,e),s.dataArrived(this),!0;if(n.requestPromise)return!0;i(n.requestAbort),n.requestAbort=new AbortController;const r=this._surface.requestTileData(this,e,t,n.requestAbort);if(!r)return n.requestAbort=null,!1;const a=()=>{n.requestPromise===r&&(n.requestPromise=null,n.requestAbort=null)};return n.requestPromise=r,r.then(a,a),!0}get isLeaf(){return null==this._children[0]}hasLij(e){return this.lij[0]===e[0]&&this.lij[1]===e[1]&&this.lij[2]===e[2]}findByLij(e){if(this.hasLij(e))return this;const t=this._children;if(!t[0])return null;return t[0].findByLij(e)||t[1].findByLij(e)||t[2].findByLij(e)||t[3].findByLij(e)}distanceToSquared(e){return h(l(oe,this._center[pe.MIDDLE],e))}containsPoint(e){const t=this.extent;return e[0]>=t[0]&&e[1]>=t[1]&&e[0]<=t[2]&&e[1]<=t[3]}containsPointXY(e,t){const i=this.extent;return e>=i[0]&&t>=i[1]&&e<=i[2]&&t<=i[3]}unrequestLayerData(e,t,i){const s=this.layerInfo[t][e],n=s.waitingAgents,r=null!=n.removeUnordered(i);B(r,"agent has not requested this piece of map data"),n.length<1&&(s.abortRequest(),this.setMemoryDirty())}dataArrived(e,t,i){const s=this.layerInfo[t][e];s.data=i,s.dataInvalidated=!1,s.waitingAgents.forAll((e=>e.dataArrived(this))),s.waitingAgents.clear(),this.setMemoryDirty()}dataMissing(e,t,i){i.notInTilemap||console.error(`Tile ${this.lij.toString()} layer ${t}/${e} error ${i}`);const s=this.layerInfo[t][e];s.dataMissing=!0,s.waitingAgents.forAll((e=>e.dataMissing())),s.waitingAgents.clear(),this.setMemoryDirty()}updateRenderData(e,t){switch(e){case j.MAP:return this._updateTexture(t);case j.ELEVATION:return this._updateGeometry()}}_updateTexture(e){this.renderData&&(this.resetPendingUpdate(e===S.FADING?ie.TEXTURE_NOFADING:ie.TEXTURE_FADING),this.setPendingUpdate(e===S.FADING?ie.TEXTURE_FADING:ie.TEXTURE_NOFADING))}_updateGeometry(){this.setPendingUpdate(ie.GEOMETRY);for(const e of this.layerInfo[j.ELEVATION])e.pendingUpdates|=ie.GEOMETRY}invalidateLayerData(e,t){this.layerInfo[t][e].invalidateSourceData(),this.restartAgents(t)}computeElevationBounds(){const e=this._elevationBounds,i=e[0],s=e[1];a(e,1/0,-1/0);const n=this.layerInfo[j.ELEVATION];let r=!0;for(const a of n)t(a.elevationBounds)&&(e[0]=Math.min(e[0],a.elevationBounds.min),e[1]=Math.max(e[1],a.elevationBounds.max),a.elevationBounds.hasNoDataValues||(r=!1));r&&(e[0]=Math.min(e[0],0),e[1]=Math.max(e[1],0)),i===e[0]&&s===e[1]||(this.updateRadiusAndCenter(),this._surface.setTileTreeDirty())}_updateCenter(){const e=this._elevationBounds,t=.5*(e[0]+e[1]),i=this._center;u(oe,this.up,t),c(i[pe.MIDDLE],this.centerAtSeaLevel,oe),u(oe,this.up,e[0]),c(i[pe.TOP],this.centerAtSeaLevel,oe),u(oe,this.up,e[1]),c(i[pe.BOTTOM],this.centerAtSeaLevel,oe)}findElevationBoundsForLayer(e,i){const n=this.layerInfo[j.ELEVATION][e],r=P(this.level),a=Math.max(this.vlevel-r,0),o=n.elevationBounds;if(t(o)&&o.level>=i&&o.level<=a)return;const l=this._surface.layerViewByIndex(e,j.ELEVATION),h=R(l);if(!se(this,h,!1))return;const d=fe;let u=!1;const c=n.data;if(c&&c.level<=a){const e=n.data;d.min=e.samplerData.data.minValue,d.max=e.samplerData.data.maxValue,d.hasNoDataValues=e.samplerData.data.hasNoDataValues,d.level=this.level,u=!0}else{let t,i,s=0;for(let n=this._parent;n&&(!i||s<r)&&(s=this.vlevel-n.level,t=i||t,i=n.layerInfo[j.ELEVATION][e].data,!(!i&&t&&n.level<=a));n=n.parent);i=i||t,i&&(i.computeMinMaxValue(this.lij[0],this.lij[1],this.lij[2],d),d.min!==1/0&&(d.level=i.level,u=!0))}u&&(s(n.elevationBounds)&&(n.elevationBounds=new D),n.elevationBounds.copyFrom(d))}modifyLayers(e,t,i){const s=this.layerInfo[i];for(const a of s)a.loadingAgent&&a.loadingAgent!==Z&&(ue(a.loadingAgent),a.loadingAgent=null),a.waitingAgents.clear();for(let a=0;a<s.length;++a)void 0===e[a]&&s[a].release();const n=new Array(...s),r=t.length;s.length=r;for(let a=0;a<r;a++){const e=t[a];s[a]=e>-1?n[e]:ee.acquire(this._surface.upsampleInfoPool)}this.setMemoryDirty()}restartAgents(e){this.renderData&&(this._createOrUpdateAgents(0,e),this.updateRenderData(e,S.FADING))}updateAgents(e){if(this.renderData){const t=this.layerInfo[e];for(const e of t)e.loadingAgent===Z&&(e.loadingAgent=null);this._createOrUpdateAgents(0,e)}}updateAgentSuspension(){for(const e of N){const t=this._isSuspended(e);for(const i of this.layerInfo[e])i.loadingAgent&&i.loadingAgent!==Z&&(i.loadingAgent.setSuspension(t),i.loadingAgent===Z&&this.updateRenderData(e,S.FADING))}}removeLayerAgent(e,t){const i=this.layerInfo[t][e];i.loadingAgent&&i.loadingAgent!==Z&&i.loadingAgent.dispose(),i.loadingAgent=null}agentDone(e,t){const i=this.layerInfo[t][e];i.loadingAgent=Z,!i.data&&s(i.upsampleInfo)&&this._createOrUpdateAgents(e+1,t)}_hasBlendableAncestor(e){return"normal"!==e.blendMode||v(e.parent)&&this._hasBlendableAncestor(e.parent)}_hasBlendModes(e,t,i){for(let s=e;s<t;++s){const e=this._surface.layerViewByIndex(s,i);if(V(e)&&"normal"!==e?.layer?.blendMode||v(e?.layer?.parent)&&this._hasBlendableAncestor(e?.layer?.parent))return!0}return!1}_createOrUpdateAgents(e,t){const i=this.layerInfo[t];if(0===i.length)return;const s=this._isSuspended(t);for(let n=e;n<i.length;++n){const r=i[n];let a=!1;const o=this._surface.layerViewByIndex(n,t),l=R(o);if(r.loadingAgent?se(this,l,!1)?(r.loadingAgent!==Z&&r.loadingAgent.setSuspension(s),r.loadingAgent!==Z&&(a=r.loadingAgent.update())):r.dispose():se(this,l,!1)&&(r.loadingAgent=de(this,n,t,s),a=r.loadingAgent.startLoading(),a?r.loadingAgent===Z&&this.setPendingUpdate(ie.GEOMETRY):(ue(r.loadingAgent),r.loadingAgent=Z)),r.loadingAgent===Z&&this.updateRenderData(t,S.FADING),!this._hasBlendModes(e,i.length,t)&&a&&o.isOpaque)return}}_isWithinExtent(e){const t=this.extent;return t[0]>=e[0]&&e[2]>=t[2]&&t[1]>=e[1]&&e[3]>=t[3]}intersectsExtent(e){const t=this.extent;return t[2]>=e[0]&&e[2]>=t[0]&&t[3]>=e[1]&&e[3]>=t[1]}getElevationVerticesPerSide(t){const i=this.vlevel-this.level,s=Math.max(this.level-t,P(this.level)-i),n=e(1+(this.maxTesselation>>s),2,this.maxTesselation+1),r=this.getDefaultVerticesPerSide();return Math.max(n,r)}get test(){return{cachedMemory:this._cachedMemory}}_findLIJ(e,i){if(!e)return null;const s=this.surface.rootTiles;if(t(s))for(const t of s)if(me(t,e)){let s=t,n=e[0]-s.level-1;for(;n>=0&&!s.isLeaf&&!i(s);){const t=e[1]>>n&1,i=e[2]>>n&1;s=s.children[2*t+i],n--}return i(s)?s:null}return null}findNeighborTile(e,t){const i=this.lij,s=this.getNeighborLIJ(i,e);return s?_e(i,s)?t(this)?this:null:this._findLIJ(s,t):null}findCorner(e,t){const i=e===O.NORTH_EAST?1:e===O.NORTH_WEST?0:e===O.SOUTH_WEST?2:3;let s=this;for(;s.children[0]&&(!t||!t(s));)s=s.children[i];return s}findNeighborCornerTileExact(e,t){return this.findNeighborTile(e,(e=>t(e)||e.level===this.level))?.findCorner(G(e),t)||null}forAllSubtreeOnSide(e,t){const i=e===O.NORTH?[0,1]:e===O.NORTH_EAST?[1]:e===O.EAST?[1,3]:e===O.SOUTH_EAST?[3]:e===O.SOUTH?[2,3]:e===O.SOUTH_WEST?[2]:e===O.WEST?[0,2]:[0],s=e=>{const n=e.children;!t(e)&&n[0]&&i.forEach((e=>s(n[e])))};s(this)}forallNeighbors(e){w.forEach((t=>this.findNeighborCornerTileExact(t,e))),W.forEach((t=>this.findNeighborTile(t,(t=>t.level===this.level||e(t)))?.forAllSubtreeOnSide(q(t),e)))}getNeighborEdgeStartVertexIndex(e,t){if(!t)return 0;const i=this.level-t.level;if(F(!H||i>=0),0===i)return 0;const s=2**i,n=1==(1&e),r=n?0:1,a=t.lij[r+1]*s,o=this.lij[r+1],l=o-a,h=n?s-1-l:l;return H&&(F(a<=o&&o<a+s),F(0<=h&&h<s)),h}forEachLoadedNeighbor(e){const t=this.level,i=e=>e.level===t||e.isLoaded;W.forEach((t=>{const s=this.findNeighborTile(t,i);null!=s&&s!==this&&s.forAllSubtreeOnSide(q(t),(i=>!!i.isLoaded&&(e(i,t),!0)))})),w.forEach((t=>{const s=this.findNeighborTile(t,i)?.findCorner(G(t),(e=>e.isLoaded));F(!s||Ae(this,s,t)),s?.isLoaded&&e(s,t)}))}getNeighborLIJ(e,t){const i=k(t)?-1:X(t)?1:0,s=Y(t)?-1:z(t)?1:0,n=[e[0],e[1]+i,e[2]+s];return n[1]<0?null:this.surface.isGlobal?this.wrapLIJ(n):n[2]<0?null:n}wrapLIJ(e){return!e||e[1]<0||e[1]>=2**e[0]?null:this.surface.wrapEastWest(e)}get westNeighborWestExtent(){return this.extent[0]*(this.isWestEnd?-1:1)}get eastNeighborEastExtent(){return this.extent[2]*(this.isEastEnd?-1:1)}get isEastEnd(){return this.lij[2]===this.surface.lijEastEnd(this.level)-1}get isWestEnd(){return 0===this.lij[2]}get isNorthEnd(){return 0===this.lij[1]}get isSouthEnd(){return this.extent[1]+_()>=this.surface.extent[1]}checkGeometryWaterproofness(){$&&(F(this.isLoaded),this.renderData?.checkGeometryWaterproofness())}shouldHaveNeighbor(e){const t=this.extent,i=this.surface.rootTilesExtent,s=.25*(t[2]-t[0]);if(k(e)&&t[3]+s>=i[3])return!1;if(X(e)&&t[1]-s<=i[1])return!1;const n=this.surface.isGlobal;return!(!n&&Y(e)&&t[0]-s<=i[0])&&!(!n&&z(e)&&t[2]+s>=i[2])}updateDistanceToPOI(e){const t=this._lastPOI;if(this.distanceToPOI>=0&&t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2])return;f(this._lastPOI,e);const i=this._center[pe.MIDDLE],s=e[0]-i[0],n=e[1]-i[1],r=e[2]-i[2];this.distanceToPOI=s*s+n*n+r*r}}function de(e,t,i,s){const n=i===j.ELEVATION?ge.acquire():ce.acquire();return n.init(e,t,i,s),n}function ue(e){e.dispose(),e instanceof L?ge.release(e):e instanceof b&&ce.release(e)}const ce=new n(b),ge=new n(L),fe=new D;var pe;function me(e,t){const i=e.level,s=t[0];if(i>s)return!1;const n=s-i,r=Math.floor(t[1]/2**n),a=Math.floor(t[2]/2**n);return r===e.lij[1]&&a===e.lij[2]}function _e(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function ye(e,t,i){if(s(e)||s(t))return!1;if(0===e.level&&0===t.level){if(e.isEastEnd&&t.isWestEnd&&i===O.EAST)return!0;if(e.isWestEnd&&t.isEastEnd&&i===O.WEST)return!0}const n=Math.max(1e-6*(e.extent[2]-e.extent[0]),1);switch(i){case O.NORTH:return J(e.extent[3],t.extent[1],n);case O.SOUTH:return J(e.extent[1],t.extent[3],n);case O.EAST:return J(e.extent[2],t.extent[0],n)||J(e.extent[2],-t.extent[0],n);case O.WEST:return J(e.extent[0],t.extent[2],n)||J(e.extent[0],-t.extent[2],n)}}function Ae(e,t,i){return!s(e)&&!s(t)&&t!==e&&(e.level>=t.level?Te(e,t,i):Te(t,e,G(i)))}function Te(e,t,i){F(e.level>=t.level);const s=Q(i),n=K(i),r=e.extent,a=t.extent,o=[s?r[0]:r[2],n?r[3]:r[1]],l=[s?a[2]:a[0],n?a[1]:a[3]],h=1e-5*(r[2]-r[0]),d=J(o[0],l[0],h)||e.surface.isGlobal&&J(o[0],-l[0],h),u=J(o[1],l[1],h);if(d&&u)return!0;if(e.level===t.level)return F(!1),!1;if(!d&&!u)return F(!1),!1;const c=d?Ee(a[1],a[3],r[1],r[3],h):Ee(a[0],a[2],r[0],r[2],h);return F(c),c}function Ee(e,t,i,s,n=_()){return e-n<=i&&i<=s&&s<=t+n}!function(e){e[e.TOP=0]="TOP",e[e.MIDDLE=1]="MIDDLE",e[e.BOTTOM=2]="BOTTOM"}(pe||(pe={}));export{pe as CenterPosition,he as Tile,Ae as isCornerNeighbor,ye as isEdgeNeighbor};