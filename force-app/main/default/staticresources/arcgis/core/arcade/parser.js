/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{findScriptDependencies as n}from"./treeAnalysis.js";import{parse as o}from"./lib/arcade-parser.js";import{ParsingError as e,ParsingErrorCodes as i}from"./lib/types.js";function d(d,l=[]){const r=o(d);if(null===r.body||void 0===r.body)throw new e({index:0,line:0,column:0,data:null,description:"",code:i.InvalidExpression});if(0===r.body.length)throw new e({index:0,line:0,column:0,data:null,description:"",code:i.InvalidExpression});if(0===r.body.length)throw new e({index:0,line:0,column:0,data:null,description:"",code:i.InvalidExpression});return r.loadedModules={},n(r,l),r}export{d as parseScript};