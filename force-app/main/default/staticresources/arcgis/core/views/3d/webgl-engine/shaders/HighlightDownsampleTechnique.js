/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ReloadableShaderModule as e}from"../core/shaderTechnique/ReloadableShaderModule.js";import{ShaderTechnique as r}from"../core/shaderTechnique/ShaderTechnique.js";import{Default3D as i}from"../lib/DefaultVertexAttributeLocations.js";import{Program as o}from"../lib/Program.js";import{a as t}from"../../../../chunks/HighlightDownsample.glsl.js";import{makePipelineState as l,defaultColorWriteParams as s}from"../../../webgl/renderState.js";class a extends r{initializeProgram(e){return new o(e.rctx,a.shader.get().build(),i)}initializePipeline(){return l({colorWrite:s})}}a.shader=new e(t,(()=>import("./HighlightDownsample.glsl.js")));export{a as HighlightDownsampleTechnique};