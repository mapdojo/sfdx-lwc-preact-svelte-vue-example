/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import r from"./Analysis.js";import t from"./SlicePlane.js";import o from"../core/Collection.js";import{referenceSetter as s,castForReferenceSetter as l}from"../core/collectionUtils.js";import{applySome as p}from"../core/maybe.js";import{property as i}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as a}from"../core/accessorSupport/decorators/subclass.js";let c=class extends r{constructor(e){super(e),this.type="slice",this.tiltEnabled=!1,this.shape=null,this.excludeGroundSurface=!1}get excludedLayers(){return this._get("excludedLayers")||new o}set excludedLayers(e){this._set("excludedLayers",s(e,this._get("excludedLayers")))}get requiredPropertiesForEditing(){return[p(this.shape,(e=>e.position))]}clear(){this.shape=null}};e([i({type:["slice"]})],c.prototype,"type",void 0),e([i()],c.prototype,"tiltEnabled",void 0),e([i({types:{key:"type",base:null,typeMap:{plane:t},defaultKeyValue:"plane"}})],c.prototype,"shape",void 0),e([i({cast:l,clonable:e=>e.slice()})],c.prototype,"excludedLayers",null),e([i({type:Boolean,nonNullable:!0})],c.prototype,"excludeGroundSurface",void 0),e([i({readOnly:!0})],c.prototype,"requiredPropertiesForEditing",null),c=e([a("esri.analysis.SliceAnalysis")],c);const n=c;export{n as default};