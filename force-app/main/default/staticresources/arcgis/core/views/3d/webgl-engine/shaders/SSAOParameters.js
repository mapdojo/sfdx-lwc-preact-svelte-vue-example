/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{a as s}from"../../../../chunks/vec2f64.js";import{NoParameters as e}from"../core/shaderModules/interfaces.js";class r extends e{constructor(){super(...arguments),this.projScale=1}}class t extends r{constructor(){super(...arguments),this.intensity=1}}class c extends e{}class o extends c{constructor(){super(...arguments),this.blurSize=s()}}export{o as BlurDrawParameters,r as BlurPassParameters,c as SSAODrawParameters,t as SSAOPassParameters};