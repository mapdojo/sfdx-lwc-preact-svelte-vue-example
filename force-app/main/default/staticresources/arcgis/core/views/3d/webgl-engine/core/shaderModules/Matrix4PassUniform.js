/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Uniform as r}from"./Uniform.js";import{BindType as s}from"../shaderTechnique/BindType.js";class e extends r{constructor(r,e){super(r,"mat4",s.Pass,((s,o,t)=>s.setUniformMatrix4fv(r,e(o,t))))}}export{e as Matrix4PassUniform};