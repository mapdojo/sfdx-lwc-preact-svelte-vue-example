/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{loadArcade as e}from"../../../support/arcadeOnDemand.js";function t(e,t=!0,n=!0){return isFinite(e)&&(t||0!==e)&&(n||e>=0)}async function n(n){const{features:i,attributes:s,includeZeros:o,includeNegatives:c,view:l}=n;let a=0,r=0,f=1/0,u=-1/0,d=null;const p=new Map;for(let t=0;t<s.length;t++){const{valueExpression:n}=s[t];if(n){if(!d){const{arcadeUtils:t}=await e();d=t}p.set(t,d.createFunction(n))}}const g=l&&d&&d.getViewInfo({viewingMode:"2d"===l.type?"map":l.viewingMode,scale:l.scale,spatialReference:l.spatialReference});for(const e of i){const n=e.geometry,i=e.attributes;if(n){const l=n.extent;if(l){const n=l.width*l.height;if(n>0){let l=0;const x=d&&d.createExecContext(e,g);for(let e=0;e<s.length;e++){const{field:n,valueExpression:a}=s[e];let r=null;if(n)r=i[n];else if(a){const t=p.get(e);r=d.executeFunction(t,x)}t(r,o,c)&&(l+=r||0)}if(t(l,o,c)){const e=l/n;++a,r+=e,e<f&&(f=e),e>u&&(u=e)}}}}}return{minDensity:f!==1/0?f:null,maxDensity:u!==-1/0?u:null,avgDensity:a?r/a:null}}export{n as default};