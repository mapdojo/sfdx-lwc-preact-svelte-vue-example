/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{unwrap as r}from"../../../../core/maybe.js";import{ShaderOutput as e}from"../core/shaderLibrary/ShaderOutput.js";import{ShaderTechniqueConfiguration as t}from"../core/shaderTechnique/ShaderTechniqueConfiguration.js";import o from"../lib/GLMaterial.js";import{RenderOccludedFlag as i}from"../lib/Material.js";import{RenderSlot as s}from"../lib/RenderSlot.js";import{DefaultBufferWriter as n}from"./DefaultBufferWriter.js";import{PositionUVLayout as u}from"./DefaultLayouts.js";import{TriangleMaterial as a}from"./TriangleMaterial.js";import{SlicePlaneMaterialTechnique as c,SlicePlaneMaterialPassParameters as l}from"../shaders/SlicePlaneMaterialTechnique.js";class m extends a{constructor(r){super(r,new h),this._configuration=new t}createBufferWriter(){return new n(u)}requiresSlot(r,t){return t===e.Color&&r===s.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL}createGLMaterial(r){return new f(r)}getConfiguration(){return this._configuration}}class f extends o{constructor(r){super(r),this.ensureTechnique(c,null)}beginSlot(){return r(this.technique)}}class h extends l{constructor(){super(...arguments),this.renderOccluded=i.Occlude}}export{h as Parameters,m as SlicePlaneMaterial};