/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{a as e}from"../../../chunks/SimpleAtmosphere.glsl.js";import{SimpleAtmosphereGeometry as r}from"./SimpleAtmosphereTechniqueConfiguration.js";import{ReloadableShaderModule as i}from"../webgl-engine/core/shaderTechnique/ReloadableShaderModule.js";import{ShaderTechnique as o}from"../webgl-engine/core/shaderTechnique/ShaderTechnique.js";import{Default3D as t}from"../webgl-engine/lib/DefaultVertexAttributeLocations.js";import{Program as n}from"../webgl-engine/lib/Program.js";import{BlendFactor as l,CompareFunction as s}from"../../webgl/enums.js";import{makePipelineState as m,separateBlendingParams as g,backFaceCullingParams as a,defaultColorWriteParams as p}from"../../webgl/renderState.js";class h extends o{initializeProgram(e){return new n(e.rctx,h.shader.get().build(this.configuration),t)}initializePipeline(){return this.configuration.geometry===r.Cylinder?m({blending:g(l.SRC_ALPHA,l.ONE,l.ONE_MINUS_SRC_ALPHA,l.ONE_MINUS_SRC_ALPHA),culling:a,depthTest:{func:s.LEQUAL},colorWrite:p}):m({blending:g(l.SRC_ALPHA,l.ONE,l.ONE_MINUS_SRC_ALPHA,l.ONE_MINUS_SRC_ALPHA),depthTest:{func:s.LEQUAL},colorWrite:p})}}h.shader=new i(e,(()=>import("./SimpleAtmosphere.glsl.js")));export{h as SimpleAtmosphereTechnique};