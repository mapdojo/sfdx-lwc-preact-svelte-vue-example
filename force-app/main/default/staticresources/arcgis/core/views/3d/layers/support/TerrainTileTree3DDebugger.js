/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../chunks/tslib.es6.js";import"../../../../geometry.js";import{isSome as r}from"../../../../core/maybe.js";import{watch as s,initial as o}from"../../../../core/reactiveUtils.js";import"../../../../core/Logger.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import"../../../../core/Error.js";import"../../../../core/has.js";import{subclass as t}from"../../../../core/accessorSupport/decorators/subclass.js";import{toExtent as i}from"../../../../geometry/support/aaBoundingRect.js";import{TileTreeDebugger as a}from"../../../support/TileTreeDebugger.js";import p from"../../../../geometry/Polygon.js";let m=class extends a{constructor(e){super(e),this.enablePolygons=!1}initialize(){s((()=>this.enabled),(e=>this.view.basemapTerrain.renderPatchBorders=e),o)}getTiles(){const e=r(this.view.basemapTerrain.spatialReference)?this.view.basemapTerrain.spatialReference:null;return this.view.basemapTerrain.test.getRenderedTiles().map((r=>({...r,geometry:p.fromExtent(i(r.extent,e))})))}};m=e([t("esri.views.3d.layers.support.TerrainTileTree3DDebugger")],m);export{m as TerrainTileTree3DDebugger};