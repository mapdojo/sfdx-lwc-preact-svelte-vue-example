/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{setTextures as e}from"../../../../webgl/rasterUtils.js";const t=[1,1],n=[2,0,0,0,2,0,-1,-1,0];function a(t,n,a){const{context:r,rasterFunction:s,hasBranches:i}=t,{raster:o}=s.parameters,f=i?o?.id??-1:0,m=a.functionTextures[f]??a.rasterTexture;e(r,n,["u_image"],[m])}function r(t,n,r){const{rasters:s}=t.rasterFunction.parameters;if(!s)return;if(s.length<2)return a(t,n,r);const i=s.filter((e=>"Constant"!==e.name)).map((e=>null!=e.id&&"Identity"!==e.name?r.functionTextures[e.id]:r.rasterTexture));if(e(t.context,n,["u_image","u_image1","u_image2"].slice(0,i.length),i),i.length!==s.length)if(2===s.length){const e=s.findIndex((e=>"Constant"===e.name)),t=0===e?[0,1,0,1,0,0,0,0,0]:[1,0,0,0,1,0,0,0,0],{value:a}=s[e].parameters;n.setUniform1f("u_image1Const",a),n.setUniformMatrix3fv("u_imageSwap",t)}else if(3===s.length){const e=[];if(s.forEach(((t,n)=>"Constant"===t.name&&e.push(n))),1===e.length){const{value:t}=s[e[0]].parameters;n.setUniform1f("u_image1Const",t);const a=0===e[0]?[0,1,0,0,0,1,1,0,0]:1===e[0]?[1,0,0,0,0,1,0,1,0]:[1,0,0,0,1,0,0,0,1];n.setUniformMatrix3fv("u_imageSwap",a)}else if(2===e.length){const{value:t}=s[e[0]].parameters;n.setUniform1f("u_image1Const",t);const{value:a}=s[e[1]].parameters;n.setUniform1f("u_image2Const",a);const r=s.findIndex((e=>"Constant"!==e.name)),i=0===r?[1,0,0,0,1,0,0,0,1]:1===r?[0,1,0,1,0,0,0,0,1]:[0,0,1,1,0,0,0,1,0];n.setUniformMatrix3fv("u_imageSwap",i)}}}function s(e){e.setUniform2fv("u_coordScale",t),e.setUniformMatrix3fv("u_dvsMat3",n)}export{s as setCoordsAndTransforms,r as setMultipleImageTextures,a as setSingleImageTextures};