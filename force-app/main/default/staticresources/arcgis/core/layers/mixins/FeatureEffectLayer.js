/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";import t from"../support/FeatureEffect.js";const s={write:{allowNull:!0}},p=p=>{let c=class extends p{constructor(){super(...arguments),this.featureEffect=null}};return r([e({type:t,json:{origins:{"web-map":s,"portal-item":s}}})],c.prototype,"featureEffect",void 0),c=r([o("esri.layers.mixins.FeatureEffectLayer")],c),c};export{p as FeatureEffectLayer};