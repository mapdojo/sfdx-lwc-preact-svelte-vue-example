/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{ClonableMixin as o}from"../../core/Clonable.js";import{JSONSupport as e}from"../../core/JSONSupport.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as t}from"../../core/accessorSupport/decorators/subclass.js";let p=class extends(o(e)){constructor(){super(...arguments),this.enabled=!1,this.range=null}};r([s({type:Boolean,json:{default:!1,write:!0}})],p.prototype,"enabled",void 0),r([s({type:[Number],json:{write:!0}})],p.prototype,"range",void 0),p=r([t("esri.layers.voxel.VoxelRangeFilter")],p);const a=p;export{a as default};