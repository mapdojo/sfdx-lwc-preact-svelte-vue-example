/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../../chunks/tslib.es6.js";import e from"../../../../Graphic.js";import r from"../../../../request.js";import{HandleOwner as i}from"../../../../core/HandleOwner.js";import{isSome as s,isNone as a,unwrap as o}from"../../../../core/maybe.js";import{watch as n,syncAndInitial as l}from"../../../../core/reactiveUtils.js";import{property as m}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as c}from"../../../../core/accessorSupport/decorators/subclass.js";import p from"../../../../geometry/Extent.js";import{projectExtent as h}from"../../../../layers/support/rasterFunctions/rasterProjectionHelper.js";import{snapImageToSymbolTile as y,convertVectorFieldData as u}from"../../../../layers/support/rasterFunctions/vectorFieldUtils.js";import{RasterVFContainer as d}from"../../engine/imagery/RasterVFContainer.js";import x from"./ImageryVFStrategy.js";let f=class extends i{constructor(){super(...arguments),this.attached=!1,this.container=new d,this.type="imageryVF",this._dataParameters={exportParametersVersion:0,bbox:"",symbolTileSize:0,time:""},this._fetchpixels=async(t,e,r,i)=>{const n=await this._projectFullExtentPromise,{symbolTileSize:l}=this.layer.renderer,{extent:m,width:c,height:p}=y(t,e,r,l,n);if(s(n)&&!n.intersects(t))return{extent:m,pixelBlock:null};const h={bbox:`${m.xmin}, ${m.ymin}, ${m.xmax}, ${m.ymax}`,exportParametersVersion:this.layer.exportImageServiceParameters.version,symbolTileSize:l,time:JSON.stringify(this.timeExtent||"")};if(this._canReuseVectorFieldData(h)){const t=this.getPixelData();if(s(t)){if(`${t.extent.xmin}, ${t.extent.ymin}, ${t.extent.xmax}, ${t.extent.ymax}`===h.bbox)return t}}const{pixelData:d}=await this.layer.fetchImage(m,c,p,{timeExtent:this.timeExtent,requestAsImageElement:!1,signal:i});this._dataParameters=h;const x=d?.pixelBlock;if(a(x))return{extent:m,pixelBlock:null};return{extent:m,pixelBlock:"vector-uv"===this.layer.rasterInfo.dataType?o(u(x,"vector-uv")):x}}}get updating(){return!this.attached||this._strategy.updating}attach(){this._projectFullExtentPromise=this._getProjectedFullExtent(this.view.spatialReference),this._strategy=new x({container:this.container,fetchPixels:this._fetchpixels}),this.handles.add(n((()=>this.layer.renderer),(t=>this._updateSymbolizerParams(t)),l),"attach")}detach(){this._strategy.destroy(),this.container.children.forEach((t=>t.destroy())),this.container.removeAllChildren(),this.handles.remove("attach"),this._strategy=this.container=this._projectFullExtentPromise=null}getPixelData(){const t=this.container.children[0]?.rawPixelData;if(this.updating||!t)return null;const{extent:e,pixelBlock:r}=t;return{extent:e,pixelBlock:r}}hitTest(t){return new e({attributes:{},geometry:t.clone(),layer:this.layer})}update(t){this._strategy.update(t,this._symbolizerParams)}redraw(){const{renderer:t}=this.layer;t&&(this._updateSymbolizerParams(t),this._strategy.redraw(this._symbolizerParams))}_canReuseVectorFieldData(t){const e=this._dataParameters.exportParametersVersion===t.exportParametersVersion,r=this._dataParameters.time===t.time,i=this._dataParameters.symbolTileSize===t.symbolTileSize,s=this._dataParameters.bbox===t.bbox;return e&&r&&i&&s}async _getProjectedFullExtent(t){try{return await h(this.layer.fullExtent,t)}catch(e){try{const e=(await r(this.layer.url,{query:{option:"footprints",outSR:t.wkid||JSON.stringify(t.toJSON()),f:"json"}})).data.featureCollection.layers[0].layerDefinition.extent;return e?p.fromJSON(e):null}catch{return null}}}_updateSymbolizerParams(t){"vector-field"===t.type&&(this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null}))}};t([m()],f.prototype,"attached",void 0),t([m()],f.prototype,"container",void 0),t([m()],f.prototype,"layer",void 0),t([m()],f.prototype,"timeExtent",void 0),t([m()],f.prototype,"type",void 0),t([m()],f.prototype,"view",void 0),t([m()],f.prototype,"updating",null),f=t([c("esri.views.2d.layers.imagery.VectorFieldView2D")],f);const g=f;export{g as default};