/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import{BlendModeTechniqueConfiguration as o}from"./BlendModeTechniqueConfiguration.js";import{BlendLayersOutput as t,BaseOpacityMode as i,PremultipliedAlphaSource as r}from"../webgl-engine/core/shaderLibrary/terrain/TileBackground.glsl.js";import{parameter as s}from"../webgl-engine/core/shaderTechnique/ShaderTechniqueConfiguration.js";class p extends o{constructor(){super(...arguments),this.output=t.Composite,this.baseOpacityMode=i.NotRequired,this.premultipliedSource=r.Off,this.hasWebGL2Context=!1}}e([s({count:t.COUNT})],p.prototype,"output",void 0),e([s({count:i.COUNT})],p.prototype,"baseOpacityMode",void 0),e([s()],p.prototype,"premultipliedSource",void 0),e([s()],p.prototype,"hasWebGL2Context",void 0);export{p as TileBlendTechniqueConfiguration};