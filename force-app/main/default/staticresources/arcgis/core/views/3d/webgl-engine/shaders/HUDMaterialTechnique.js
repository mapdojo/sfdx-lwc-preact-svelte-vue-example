/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ViewingMode as e}from"../../../ViewingMode.js";import{ShaderOutput as t}from"../core/shaderLibrary/ShaderOutput.js";import{ReloadableShaderModule as i}from"../core/shaderTechnique/ReloadableShaderModule.js";import{ShaderTechnique as r}from"../core/shaderTechnique/ShaderTechnique.js";import{Default3D as o}from"../lib/DefaultVertexAttributeLocations.js";import{oitBlending as n}from"../lib/OrderIndependentTransparency.js";import{Program as s}from"../lib/Program.js";import{TransparencyPassType as a}from"../lib/TransparencyPassType.js";import{H as l}from"../../../../chunks/HUDMaterial.glsl.js";import{ContextType as p}from"../../../webgl/context-util.js";import{BlendFactor as u,CompareFunction as c,PrimitiveType as h}from"../../../webgl/enums.js";import{simpleBlendingParams as m,defaultDepthWriteParams as f,makePipelineState as g,defaultColorWriteParams as d}from"../../../webgl/renderState.js";class b extends r{initializeConfiguration(t,i){i.hasWebGL2Context=t.rctx.type===p.WEBGL2,i.spherical=t.viewingMode===e.Global}initializeProgram(e){return new s(e.rctx,b.shader.get().build(this.configuration),o)}_setPipelineState(e){const i=this.configuration,r=e===a.NONE,o=e===a.FrontFace,s=this.configuration.hasPolygonOffset?j:null,l=(r||o)&&i.output!==t.Highlight&&(i.depthEnabled||i.occlusionPass)?f:null;return g({blending:i.output===t.Color||i.output===t.Alpha||i.output===t.Highlight?r?P:n(e):null,depthTest:{func:c.LEQUAL},depthWrite:l,colorWrite:d,polygonOffset:s})}initializePipeline(){return this._setPipelineState(this.configuration.transparencyPassType)}get primitiveType(){return this.configuration.occlusionPass?h.POINTS:h.TRIANGLES}}b.shader=new i(l,(()=>import("./HUDMaterial.glsl.js")));const j={factor:0,units:-4},P=m(u.ONE,u.ONE_MINUS_SRC_ALPHA);export{b as HUDMaterialTechnique};