/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import{parameter as n}from"../webgl-engine/core/shaderTechnique/ShaderTechniqueConfiguration.js";import{DefaultTechniqueConfiguration as o}from"../webgl-engine/materials/DefaultTechniqueConfiguration.js";var r;!function(e){e[e.Cone=0]="Cone",e[e.Cylinder=1]="Cylinder",e[e.Underground=2]="Underground",e[e.COUNT=3]="COUNT"}(r||(r={}));class i extends o{constructor(){super(...arguments),this.geometry=r.Cone}}e([n({count:r.COUNT})],i.prototype,"geometry",void 0);export{r as SimpleAtmosphereGeometry,i as SimpleAtmosphereTechniqueConfiguration};