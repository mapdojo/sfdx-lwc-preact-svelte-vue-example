/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import e from"../../core/Collection.js";import{JSONSupport as s}from"../../core/JSONSupport.js";import{property as r}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{reader as i}from"../../core/accessorSupport/decorators/reader.js";import{subclass as l}from"../../core/accessorSupport/decorators/subclass.js";import o from"../../geometry/Extent.js";import a from"./TileMatrixSet.js";import n from"./WMTSStyle.js";var p;let m=p=class extends s{constructor(t){super(t),this.fullExtent=null,this.fullExtents=null,this.imageFormats=null,this.id=null,this.layer=null,this.styles=null,this.tileMatrixSetId=null,this.tileMatrixSets=null}get description(){return this._get("description")}set description(t){this._set("description",t)}readFullExtent(t,e){return(t=e.fullExtent)?o.fromJSON(t):null}readFullExtents(t,e){return e.fullExtents?.length?e.fullExtents.map((t=>o.fromJSON(t))):e.tileMatrixSets?.map((t=>o.fromJSON(t.fullExtent))).filter((t=>t))??[]}get imageFormat(){let t=this._get("imageFormat");return t||(t=this.imageFormats&&this.imageFormats.length?this.imageFormats[0]:""),t}set imageFormat(t){const e=this.imageFormats;t&&(t.includes("image/")||e&&!e.includes(t))&&(t.includes("image/")||(t="image/"+t),e&&!e.includes(t))?console.error("The layer doesn't support the format of "+t):this._set("imageFormat",t)}get styleId(){let t=this._get("styleId");return t||(t=this.styles?.length?this.styles.getItemAt(0).id:""),t}set styleId(t){this._set("styleId",t)}get title(){return this._get("title")}set title(t){this._set("title",t)}get tileMatrixSet(){return this.tileMatrixSets?this.tileMatrixSets.find((t=>t.id===this.tileMatrixSetId)):null}clone(){const t=new p;return this.hasOwnProperty("description")&&(t.description=this.description),this.hasOwnProperty("imageFormats")&&(t.imageFormats=this.imageFormats&&this.imageFormats.slice()),this.hasOwnProperty("imageFormat")&&(t.imageFormat=this.imageFormat),this.hasOwnProperty("fullExtent")&&(t.fullExtent=this.fullExtent&&this.fullExtent.clone()),this.hasOwnProperty("id")&&(t.id=this.id),this.hasOwnProperty("layer")&&(t.layer=this.layer),this.hasOwnProperty("styleId")&&(t.styleId=this.styleId),this.hasOwnProperty("styles")&&(t.styles=this.styles&&this.styles.clone()),this.hasOwnProperty("tileMatrixSetId")&&(t.tileMatrixSetId=this.tileMatrixSetId),this.hasOwnProperty("tileMatrixSets")&&(t.tileMatrixSets=this.tileMatrixSets?.clone()),this.hasOwnProperty("title")&&(t.title=this.title),t}};t([r()],m.prototype,"description",null),t([r()],m.prototype,"fullExtent",void 0),t([i("fullExtent",["fullExtent"])],m.prototype,"readFullExtent",null),t([r({readOnly:!0})],m.prototype,"fullExtents",void 0),t([i("fullExtents",["fullExtents","tileMatrixSets"])],m.prototype,"readFullExtents",null),t([r()],m.prototype,"imageFormat",null),t([r({json:{read:{source:"formats"}}})],m.prototype,"imageFormats",void 0),t([r()],m.prototype,"id",void 0),t([r()],m.prototype,"layer",void 0),t([r()],m.prototype,"styleId",null),t([r({type:e.ofType(n),json:{read:{source:"styles"}}})],m.prototype,"styles",void 0),t([r({value:null,json:{write:{ignoreOrigin:!0}}})],m.prototype,"title",null),t([r()],m.prototype,"tileMatrixSetId",void 0),t([r({readOnly:!0})],m.prototype,"tileMatrixSet",null),t([r({type:e.ofType(a),json:{read:{source:"tileMatrixSets"}}})],m.prototype,"tileMatrixSets",void 0),m=p=t([l("esri.layers.support.WMTSSublayer")],m);const u=m;export{u as default};