/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class s{constructor(s,t){this._moduleSingletons=s,this._syntaxModules=t}loadLibrary(s){if(null==this._syntaxModules)return null;const t=this._syntaxModules[s.toLowerCase()];return t?{syntax:t.script,uri:t.uri}:null}}export{s as ArcadeModuleLoader};