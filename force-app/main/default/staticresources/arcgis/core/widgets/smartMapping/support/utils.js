/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"../../../Color.js";import{isNone as n}from"../../../core/maybe.js";import{formatDate as i}from"../../../intl/date.js";import{formatNumber as o}from"../../../intl/number.js";import{timelineDateFormatOptions as e}from"../../../renderers/support/utils.js";import r from"../../../renderers/visualVariables/SizeVariable.js";function a(t){return i(new Date(t),e)}function s(t){const n=2,i=Math.floor(Math.log10(Math.abs(t)))+1,e=i<4||i>6?4:i,r=1e6,a=Math.abs(t)>=r?"compact":"standard";return o(t,{notation:a,minimumSignificantDigits:n,maximumSignificantDigits:e})}function u(t,i,o){if(n(i)||n(t))return[];const e=[];for(let n=-1*o;n<=o;n++)0!==n&&e.push(i+n*t);return e}function m(t){const{max:n,min:i,padding:o,pathHeight:e,pathWidth:r,stops:a}=t,s=n-i;let u,m=`M0 0 L${r} 0 `;const h=3===a.length?[a[0],a[1],a[2]]:[a[0],a[2],a[4]],f=Math.min.apply(Math,h.map((t=>t.size))),p=Math.max(Math.abs(h[0].size-h[1].size),Math.abs(h[2].size-h[1].size));return h.reverse(),h.forEach((({size:t,value:n},a)=>{const h=Math.round((t-f)/p*100)/100,c=Math.round(e-(n-i)/s*e);u=h*r,0===u&&(u=o*r),0===a&&(m+=`L${u} 0 `),m+=`L${u} ${c} `})),m+=`L${u} ${e} L0 ${e} L0 0 Z`,m}function h(t){const{bottomValue:n,bottomWidth:i,max:o,min:e,pathHeight:r,pathWidth:a,topValue:s,topWidth:u}=t,m=u*a,h=i*a,f=o-e,p=Math.round(r-(n-e)/f*r);return`M${m} 0 L${m} ${Math.round(r-(s-e)/f*r)} L${h} ${p} L${h} ${r} L0 ${r} L0 0 Z`}function f(t){let n=t.maxSize,i=t.minSize;return n instanceof r&&(n=n.stops[0].size),i instanceof r&&(i=i.stops[0].size),[n,i]}function p(t,n,i){const o=i.length-1,e=i[0],r=i[o]-e,a=n-t,s=[];for(let u=1;u<o;u++){const n=(i[u]-e)/r*a+t;s.push({index:u,value:n})}return s.unshift({index:0,value:t}),s.push({index:o,value:n}),s}function c(n){return n instanceof t?n.toCss(!0):t.fromString(n).toCss(!0)}export{a as formatDateLabel,s as formatNumberLabel,u as getDeviationValues,m as getDynamicPathForSizeStops,c as getFillFromColor,h as getPathForSizeStops,f as getSizesFromVariable,p as getStopChanges};