/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ReloadableShaderModule as r}from"../core/shaderTechnique/ReloadableShaderModule.js";import{ShaderTechnique as e}from"../core/shaderTechnique/ShaderTechnique.js";import{Default3D as i}from"./DefaultVertexAttributeLocations.js";import{Program as o}from"./Program.js";import{B as t}from"../../../../chunks/Blur.glsl.js";import{makePipelineState as s,defaultColorWriteParams as a}from"../../../webgl/renderState.js";class l extends e{initializeProgram(r){return new o(r.rctx,l.shader.get().build(),i)}initializePipeline(){return s({colorWrite:a})}}l.shader=new r(t,(()=>import("../shaders/Blur.glsl.js")));export{l as BlurTechnique};