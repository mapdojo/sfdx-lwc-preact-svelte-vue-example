/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function e(e){return"function"==typeof e}function t(t,r,n,o){return e(t)?t(r,n,o):t}function r(e){return[e.r,e.g,e.b,e.a]}const n=" /-,\n";function o(e){let t=e.length;for(;t--;)if(!n.includes(e.charAt(t)))return!1;return!0}function i(e,t){const r=[];let n=0,i=-1;do{if(i=e.indexOf("[",n),i>=n){if(i>n){const t=e.substr(n,i-n);r.push([t,null,o(t)])}if(n=i+1,i=e.indexOf("]",n),i>=n){if(i>n){const o=t[e.substr(n,i-n)];o&&r.push([null,o,!1])}n=i+1}}}while(-1!==i);if(n<e.length-1){const t=e.substr(n);r.push([t,null,o(t)])}return r}function l(e,t,r){let n="",o=null;for(const i of t){const[t,r,l]=i;if(t)l?o=t:(o&&(n+=o,o=null),n+=t);else{const t=e.attributes[r];t&&(o&&(n+=o,o=null),n+=t)}}return s(n,r)}function c(e,t,r){const n=i(t,e);return e=>l(e,n,r)}function s(e,t){switch("string"!=typeof e&&(e=String(e)),t){case"LowerCase":return e.toLowerCase();case"Allcaps":return e.toUpperCase();default:return e}}function u(e,t,r,n,o,i,l=!0){const c=t/o,s=r/i,u=Math.ceil(c/2),a=Math.ceil(s/2);for(let f=0;f<i;f++)for(let r=0;r<o;r++){const y=4*(r+(l?i-f-1:f)*o);let M=0,C=0,m=0,b=0,p=0,d=0,I=0;const h=(f+.5)*s;for(let n=Math.floor(f*s);n<(f+1)*s;n++){const o=Math.abs(h-(n+.5))/a,i=(r+.5)*c,l=o*o;for(let s=Math.floor(r*c);s<(r+1)*c;s++){let r=Math.abs(i-(s+.5))/u;const o=Math.sqrt(l+r*r);o>=-1&&o<=1&&(M=2*o*o*o-3*o*o+1,M>0&&(r=4*(s+n*t),I+=M*e[r+3],m+=M,e[r+3]<255&&(M=M*e[r+3]/250),b+=M*e[r],p+=M*e[r+1],d+=M*e[r+2],C+=M))}}n[y]=b/C,n[y+1]=p/C,n[y+2]=d/C,n[y+3]=I/m}}function a(e){return e?{r:e[0],g:e[1],b:e[2],a:e[3]/255}:{r:0,g:0,b:0,a:0}}function f(e){return e.data?.symbol??null}function y(e){return"CIMVectorMarker"===e.type||"CIMPictureMarker"===e.type||"CIMBarChartMarker"===e.type||"CIMCharacterMarker"===e.type||"CIMPieChartMarker"===e.type||"CIMStackedBarChartMarker"===e.type}function M(e){return"CIMGradientStroke"===e.type||"CIMPictureStroke"===e.type||"CIMSolidStroke"===e.type}function C(e){return null!=e&&("CIMGradientFill"===e.type||"CIMHatchFill"===e.type||"CIMPictureFill"===e.type||"CIMSolidFill"===e.type||"CIMWaterFill"===e.type)}function m(e){return null!=e&&("CIMMarkerPlacementAlongLineRandomSize"===e.type||"CIMMarkerPlacementAlongLineSameSize"===e.type||"CIMMarkerPlacementAlongLineVariableSize"===e.type||"CIMMarkerPlacementAtExtremities"===e.type||"CIMMarkerPlacementAtMeasuredUnits"===e.type||"CIMMarkerPlacementAtRatioPositions"===e.type||"CIMMarkerPlacementOnLine"===e.type||"CIMMarkerPlacementOnVertices"===e.type)}const b=(e,t=0)=>null==e||isNaN(e)?t:e,p=e=>e.tintColor?a(e.tintColor):{r:255,g:255,b:255,a:1},d=e=>{if(!e)return!1;for(const t of e)switch(t.type){case"CIMGeometricEffectBuffer":case"CIMGeometricEffectOffset":case"CIMGeometricEffectDonut":return!0}return!1};function I(){return import("../../geometry/geometryEngineJSON.js")}function h(e){if(!e)return"normal";switch(e.toLowerCase()){case"italic":return"italic";case"oblique":return"oblique";default:return"normal"}}function S(e){if(!e)return"normal";switch(e.toLowerCase()){case"bold":return"bold";case"bolder":return"bolder";case"lighter":return"lighter";default:return"normal"}}function g(e){let t="",r="";if(e){const n=e.toLowerCase();n.includes("italic")?t="italic":n.includes("oblique")&&(t="oblique"),n.includes("bold")?r="bold":n.includes("light")&&(r="lighter")}return{style:t,weight:r}}function k(e){return e.underline?"underline":e.strikethrough?"line-through":"none"}function P(e){if(!e)return null;switch(e.type){case"CIMPolygonSymbol":if(e.symbolLayers)for(const t of e.symbolLayers){const e=P(t);if(null!=e)return e}break;case"CIMTextSymbol":return P(e.symbol);case"CIMSolidFill":return e.color}}function w(e){if(e)switch(e.type){case"CIMPolygonSymbol":case"CIMLineSymbol":{const t=e.symbolLayers;if(t)for(const e of t){const t=w(e);if(null!=t)return t}break}case"CIMTextSymbol":return w(e.symbol);case"CIMSolidStroke":case"CIMSolidFill":return e.color}}function L(e){if(e)switch(e.type){case"CIMPolygonSymbol":case"CIMLineSymbol":if(e.symbolLayers)for(const t of e.symbolLayers){const e=L(t);if(void 0!==e)return e}break;case"CIMTextSymbol":return L(e.symbol);case"CIMSolidStroke":case"CIMGradientStroke":case"CIMPictureStroke":return e.width}}function x(e){switch(e){case"Left":default:return"left";case"Right":return"right";case"Center":case"Justify":return"center"}}function F(e){switch(e){case"Top":default:return"top";case"Center":return"middle";case"Baseline":return"baseline";case"Bottom":return"bottom"}}function G(e){return(e?Object.keys(e):[]).map((t=>({name:t,alias:t,type:"string"==typeof e[t]?"esriFieldTypeString":"esriFieldTypeDouble"})))}const A=e=>e.includes("data:image/svg+xml");function O(e){if(!e)return null;switch(e.type){case"CIMPointSymbol":case"CIMTextSymbol":return"esriGeometryPoint";case"CIMLineSymbol":return"esriGeometryPolyline";case"CIMPolygonSymbol":return"esriGeometryPolygon";default:return null}}export{s as adjustTextCase,i as analyzeTextParts,l as assignTextValuesFromFeature,G as attributesToFields,r as colorToArray,c as createLabelOverrideFunction,t as evaluateValueOrFunction,a as fromCIMColor,k as fromCIMFontDecoration,g as fromCIMFontStyle,x as fromCIMHorizontalAlignment,F as fromCIMVerticalAlignment,P as getFillColor,h as getFontStyle,S as getFontWeight,w as getStrokeColor,L as getStrokeWidth,p as getTintColor,b as getValue,I as importGeometryEngine,C as isCIMFill,y as isCIMMarker,m as isCIMMarkerStrokePlacement,M as isCIMStroke,d as isGeometryEngineRequired,A as isSVGImage,O as mapCIMSymbolToGeometryType,u as resampleHermite,f as toCIMSymbolJSON};