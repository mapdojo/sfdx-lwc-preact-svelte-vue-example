/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../chunks/tslib.es6.js";import"../../../geometry.js";import{property as r}from"../../../core/accessorSupport/decorators/property.js";import"../../../core/accessorSupport/ensureType.js";import"../../../core/arrayUtils.js";import{enumeration as o}from"../../../core/accessorSupport/decorators/enumeration.js";import{reader as t}from"../../../core/accessorSupport/decorators/reader.js";import{subclass as s}from"../../../core/accessorSupport/decorators/subclass.js";import{writer as n}from"../../../core/accessorSupport/decorators/writer.js";import i from"./BaseRasterTransform.js";import f from"../../../geometry/Point.js";import p from"../../../geometry/Extent.js";function l(e,r,o){const{x:t,y:s}=r;if(o<2){return{x:e[0]+t*e[2]+s*e[4],y:e[1]+t*e[3]+s*e[5]}}if(2===o){const r=t*t,o=s*s,n=t*s;return{x:e[0]+t*e[2]+s*e[4]+r*e[6]+n*e[8]+o*e[10],y:e[1]+t*e[3]+s*e[5]+r*e[7]+n*e[9]+o*e[11]}}const n=t*t,i=s*s,f=t*s,p=n*t,l=n*s,a=t*i,c=s*i;return{x:e[0]+t*e[2]+s*e[4]+n*e[6]+f*e[8]+i*e[10]+p*e[12]+l*e[14]+a*e[16]+c*e[18],y:e[1]+t*e[3]+s*e[5]+n*e[7]+f*e[9]+i*e[11]+p*e[13]+l*e[15]+a*e[17]+c*e[19]}}function a(e,r,o){const{xmin:t,ymin:s,xmax:n,ymax:i,spatialReference:f}=r;let a=[];if(o<2)a.push({x:t,y:i}),a.push({x:n,y:i}),a.push({x:t,y:s}),a.push({x:n,y:s});else{let e=10;for(let r=0;r<e;r++)a.push({x:t,y:s+(i-s)*r/(e-1)}),a.push({x:n,y:s+(i-s)*r/(e-1)});e=8;for(let r=1;r<=e;r++)a.push({x:t+(n-t)*r/e,y:s}),a.push({x:t+(n-t)*r/e,y:i})}a=a.map((r=>l(e,r,o)));const c=a.map((e=>e.x)),u=a.map((e=>e.y));return new p({xmin:Math.min.apply(null,c),xmax:Math.max.apply(null,c),ymin:Math.min.apply(null,u),ymax:Math.max.apply(null,u),spatialReference:f})}function c(e){const[r,o,t,s,n,i]=e,f=t*i-n*s,p=n*s-t*i;return[(n*o-r*i)/f,(t*o-r*s)/p,i/f,s/p,-n/f,-t/p]}let u=class extends i{constructor(){super(...arguments),this.polynomialOrder=1,this.type="polynomial"}readForwardCoefficients(e,r){const{coeffX:o,coeffY:t}=r;if(!o?.length||!t?.length||o.length!==t.length)return null;const s=[];for(let n=0;n<o.length;n++)s.push(o[n]),s.push(t[n]);return s}writeForwardCoefficients(e,r,o){const t=[],s=[];for(let n=0;n<e?.length;n++)n%2==0?t.push(e[n]):s.push(e[n]);r.coeffX=t,r.coeffY=s}get inverseCoefficients(){let e=this._get("inverseCoefficients");const r=this._get("forwardCoefficients");return!e&&r&&this.polynomialOrder<2&&(e=c(r)),e}set inverseCoefficients(e){this._set("inverseCoefficients",e)}readInverseCoefficients(e,r){const{inverseCoeffX:o,inverseCoeffY:t}=r;if(!o?.length||!t?.length||o.length!==t.length)return null;const s=[];for(let n=0;n<o.length;n++)s.push(o[n]),s.push(t[n]);return s}writeInverseCoefficients(e,r,o){const t=[],s=[];for(let n=0;n<e?.length;n++)n%2==0?t.push(e[n]):s.push(e[n]);r.inverseCoeffX=t,r.inverseCoeffY=s}get affectsPixelSize(){return this.polynomialOrder>0}forwardTransform(e){if("point"===e.type){const r=l(this.forwardCoefficients,e,this.polynomialOrder);return new f({x:r.x,y:r.y,spatialReference:e.spatialReference})}return a(this.forwardCoefficients,e,this.polynomialOrder)}inverseTransform(e){if("point"===e.type){const r=l(this.inverseCoefficients,e,this.polynomialOrder);return new f({x:r.x,y:r.y,spatialReference:e.spatialReference})}return a(this.inverseCoefficients,e,this.polynomialOrder)}};e([r({json:{write:!0}})],u.prototype,"polynomialOrder",void 0),e([r()],u.prototype,"forwardCoefficients",void 0),e([t("forwardCoefficients",["coeffX","coeffY"])],u.prototype,"readForwardCoefficients",null),e([n("forwardCoefficients")],u.prototype,"writeForwardCoefficients",null),e([r({json:{write:!0}})],u.prototype,"inverseCoefficients",null),e([t("inverseCoefficients",["inverseCoeffX","inverseCoeffY"])],u.prototype,"readInverseCoefficients",null),e([n("inverseCoefficients")],u.prototype,"writeInverseCoefficients",null),e([r()],u.prototype,"affectsPixelSize",null),e([o({PolynomialXform:"polynomial"})],u.prototype,"type",void 0),u=e([s("esri.layers.support.rasterTransforms.PolynomialTransform")],u);const m=u;export{m as default};