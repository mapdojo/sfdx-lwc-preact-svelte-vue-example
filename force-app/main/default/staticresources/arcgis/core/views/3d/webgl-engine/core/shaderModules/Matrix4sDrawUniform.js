/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Uniform as r}from"./Uniform.js";import{BindType as e}from"../shaderTechnique/BindType.js";class o extends r{constructor(r,o,s){super(r,"mat4",e.Draw,((e,s,t)=>e.setUniformMatrix4fv(r,o(s,t))),s)}}export{o as Matrix4sDrawUniform};