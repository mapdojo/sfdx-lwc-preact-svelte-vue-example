/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{setSingleImageTextures as t,setCoordsAndTransforms as a}from"./utils.js";const r={vsPath:"raster/rfx/vs",fsPath:"raster/rfx/mask",attributes:new Map([["a_position",0],["a_texcoord",1]])};function n(t,a){const{painter:n,rasterFunction:e}=t,s=e.parameters.bandCount>1?["multiBand"]:[];return n.materialManager.getProgram(r,s)}function e(r,n,e){t(r,n,e),a(n);const{includedRanges:s,noDataValues:o}=r.rasterFunction.parameters;n.setUniform1fv("u_includedRanges",s),n.setUniform1fv("u_noDataValues",o)}const s={createProgram:n,bindTextureAndUniforms:e};export{s as default};