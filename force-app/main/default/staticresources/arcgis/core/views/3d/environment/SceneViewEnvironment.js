/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../chunks/tslib.es6.js";import{neverReached as i}from"../../../core/compilerUtils.js";import{clone as e}from"../../../core/lang.js";import{property as n}from"../../../core/accessorSupport/decorators/property.js";import{cast as r}from"../../../core/accessorSupport/decorators/cast.js";import{subclass as s}from"../../../core/accessorSupport/decorators/subclass.js";import{ensureOneOfType as o}from"../../../core/accessorSupport/ensureType.js";import{lightingTypes as g}from"./lightingUtils.js";import{SceneViewAtmosphere as h}from"./SceneViewAtmosphere.js";import l from"./SunLighting.js";import c from"./VirtualLighting.js";import a from"../../../webscene/Environment.js";import p from"../../../webscene/SunLighting.js";import m from"../../../webscene/VirtualLighting.js";var u;let b=u=class extends a{constructor(t){super(t),this.atmosphere=new h,this.lighting=new l,this.cachedCameraTrackingEnabled=null}static fromWebsceneEnvironment(t){const i=t.cloneConstructProperties();return new u({...i,lighting:i.lighting?"virtual"===i.lighting.type?c.fromWebsceneLighting(i.lighting):l.fromWebsceneLighting(i.lighting):void 0})}castLighting(t){return this._convertLighting(t)}applyLighting(t){this.lighting=this._convertLighting(t)}_convertLighting(t){return t?t instanceof l||t instanceof c?t:t instanceof p?this.lighting&&"virtual"!==this.lighting.type?this.lighting.cloneWithWebsceneLighting(t):new l({...t.cloneConstructProperties(),...this.lighting?.cloneNonPersistentConstructProperties()}):t instanceof m?this.lighting&&"virtual"===this.lighting.type?this.lighting.cloneWithWebsceneLighting(t):new c({...t.cloneConstructProperties(),...this.lighting?.cloneNonPersistentConstructProperties()}):o(g,t):new l}clone(){return new u({lighting:this.lighting.clone(),atmosphere:this.atmosphere.clone(),weather:this.weather.clone(),atmosphereEnabled:this.atmosphereEnabled,starsEnabled:this.starsEnabled,background:e(this.background)})}cloneWithWebsceneEnvironment(t){return new u({atmosphere:this.atmosphere.clone(),weather:this.weather.clone(),atmosphereEnabled:this.atmosphereEnabled,starsEnabled:this.starsEnabled,background:e(this.background),...t.cloneConstructProperties(),lighting:this._getLighting(t)})}_getLighting(t){switch(t.lighting.type){case"sun":return this.lighting&&"sun"===this.lighting.type?this.lighting.cloneWithWebsceneLighting(t.lighting):l.fromWebsceneLighting(t.lighting);case"virtual":return this.lighting&&"virtual"===this.lighting.type?this.lighting.cloneWithWebsceneLighting(t.lighting):c.fromWebsceneLighting(t.lighting);default:return i(t.lighting),l.fromWebsceneLighting(t.lighting)}}};t([n({type:h,json:{read:!1},nonNullable:!0})],b.prototype,"atmosphere",void 0),t([n({nonNullable:!0})],b.prototype,"lighting",void 0),t([r("lighting")],b.prototype,"castLighting",null),b=u=t([s("esri.views.3d.environment.SceneViewEnvironment")],b);const f=b;export{f as default};