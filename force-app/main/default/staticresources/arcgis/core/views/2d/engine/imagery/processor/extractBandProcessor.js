/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{setSingleImageTextures as t,setCoordsAndTransforms as r}from"./utils.js";const a={vsPath:"raster/rfx/vs",fsPath:"raster/rfx/extractband",attributes:new Map([["a_position",0],["a_texcoord",1]])};function e(t,r){return t.painter.materialManager.getProgram(a,[])}function n(a,e,n){t(a,e,n),r(e);const{bandIndexMat3:o}=a.rasterFunction.parameters;e.setUniformMatrix3fv("u_bandIndexMat3",o)}const o={createProgram:e,bindTextureAndUniforms:n};export{o as default};