/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{setSingleImageTextures as a,setCoordsAndTransforms as t}from"./utils.js";const r={vsPath:"raster/rfx/vs",fsPath:"raster/rfx/remap",attributes:new Map([["a_position",0],["a_texcoord",1]])};function e(a,t){return a.painter.materialManager.getProgram(r,[])}function n(r,e,n){a(r,e,n),t(e);const{noDataRanges:s,rangeMaps:o,allowUnmatched:f,clampRange:i}=r.rasterFunction.parameters;e.setUniform1fv("u_noDataRanges",s),e.setUniform1fv("u_rangeMaps",o),e.setUniform1f("u_unmatchMask",f?1:0),e.setUniform2fv("u_clampRange",i)}const s={createProgram:e,bindTextureAndUniforms:n};export{s as default};