/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{setSingleImageTextures as t,setCoordsAndTransforms as r}from"./utils.js";const e={vsPath:"raster/rfx/vs",fsPath:"raster/rfx/aspect",attributes:new Map([["a_position",0],["a_texcoord",1]])};function a(t,r){return t.painter.materialManager.getProgram(e,[])}function o(e,a,o){t(e,a,o),r(a);const{width:s,height:i,resolution:n}=o;a.setUniform2fv("u_srcImageSize",[s,i]),a.setUniform2fv("u_cellSize",[n,n])}const s={createProgram:a,bindTextureAndUniforms:o};export{s as default};