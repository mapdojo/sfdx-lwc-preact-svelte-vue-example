/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Seconds as t}from"../../../core/time.js";let e=class{constructor(){this.segments=[]}get time(){return this.segments.reduce(((e,o)=>t(e+o.time)),t(0))}interpolateComponentsAt(t,e){t=Math.min(Math.max(t,0),1),t*=this.time;let o=0,s=0;const n=this.definition;for(let a=0;a<this.segments.length;a++){const m=this.segments[a],i=m.definition;if(t<=m.time||a===this.segments.length-1){if(e=this.segmentInterpolateComponentsAt(m,0===m.time?0:t/m.time,e),n.hasPan&&!isNaN(e.pan)&&isFinite(n.compared.pan)?e.pan=(o+i.compared.pan*e.pan)/n.compared.pan:e.pan=1,n.hasRotate&&!isNaN(e.rotate)&&isFinite(n.compared.rotate)?e.rotate=(s+i.compared.rotate*e.rotate)/n.compared.rotate:e.rotate=1,n.hasZoom&&!isNaN(e.zoom)&&isFinite(i.compared.targetZoom)){const t=e.zoom*(i.compared.targetZoom-i.compared.sourceZoom)+i.compared.sourceZoom,o=this.segments[0].definition.compared.sourceZoom,s=this.segments[this.segments.length-1].definition.compared.targetZoom;e.zoom=(t-o)/(s-o)}else e.zoom=1;return e}t-=m.time,o+=i.compared.pan,s+=i.compared.rotate}}segmentInterpolateComponentsAt(t,e,o){return t.interpolateComponentsAt(e,o)}};export{e as Path};