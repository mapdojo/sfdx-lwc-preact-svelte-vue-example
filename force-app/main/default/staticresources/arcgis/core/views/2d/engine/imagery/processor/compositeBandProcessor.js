/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{setMultipleImageTextures as t,setCoordsAndTransforms as r}from"./utils.js";const a={vsPath:"raster/rfx/vs",fsPath:"raster/rfx/compositeband",attributes:new Map([["a_position",0],["a_texcoord",1]])};function e(t,r){return t.painter.materialManager.getProgram(a,[])}function o(a,e,o){t(a,e,o),r(e)}const n={createProgram:e,bindTextureAndUniforms:o};export{n as default};