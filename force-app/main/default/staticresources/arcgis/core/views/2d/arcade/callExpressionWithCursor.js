/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../core/Logger.js";import{isNone as r}from"../../../core/maybe.js";function a(a,t,o){if(r(a))return null;const u=t.readArcadeFeature();try{return a.evaluate({...o,$feature:u})}catch(n){return e.getLogger("esri.views.2d.support.arcadeOnDemand").warn("Feature arcade evaluation failed:",n),null}}export{a as default};