/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../../../../chunks/tslib.es6.js";import{parameter as e,ShaderTechniqueConfiguration as t}from"../core/shaderTechnique/ShaderTechniqueConfiguration.js";var a;!function(o){o[o.None=0]="None",o[o.Alpha=1]="Alpha",o[o.PremultipliedAlpha=2]="PremultipliedAlpha",o[o.COUNT=3]="COUNT"}(a||(a={}));class r extends t{constructor(){super(...arguments),this.alphaMode=a.None,this.hasOpacityFactor=!1}}o([e({count:a.COUNT})],r.prototype,"alphaMode",void 0),o([e()],r.prototype,"hasOpacityFactor",void 0);export{a as AlphaMode,r as CompositingTechniqueConfiguration};