/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../Color.js";import"../../rasterRenderers.js";import{isSome as t,unwrap as n,isNone as a}from"../../core/maybe.js";import{getMetersPerUnitForSR as r}from"../../core/unitUtils.js";import s from"../../layers/support/Field.js";import o from"../../layers/support/RasterInfo.js";import i from"../FlowRenderer.js";import l from"./AuthoringInfo.js";import u from"./ClassBreakInfo.js";import{PREDEFINED_JSON_COLOR_RAMPS as m,convertColorRampToColormap as c}from"./colorRampUtils.js";import f from"./UniqueValueInfo.js";import p from"../../rest/support/ClassBreaksDefinition.js";import{createGenerateRendererClassBreaks as d}from"../../rest/support/generateRendererUtils.js";import b from"../../rest/support/MultipartColorRamp.js";import h from"../RasterStretchRenderer.js";import y from"../UniqueValueRenderer.js";import g from"../RasterColormapRenderer.js";import v from"../RasterShadedReliefRenderer.js";import C from"../ClassBreaksRenderer.js";import M from"../VectorFieldRenderer.js";const w=.25,x=b.fromJSON({type:"multipart",colorRamps:[{fromColor:[0,0,255],toColor:[0,255,255]},{fromColor:[0,255,255],toColor:[255,255,0]},{fromColor:[255,255,0],toColor:[255,0,0]}]}),T=b.fromJSON(m[0]),R=new Set(["scientific","standard-time","vector-uv","vector-magdir","vector-u","vector-v","vector-magnitude","vector-direction"]);function j(e,n){const{attributeTable:a,colormap:r}=e;if(K(e)){const n=Y(e);if(t(n))return n}if(t(r)){const n=U(e);if(t(n))return n}if(t(a)){const n=F(e);if(t(n))return n}return I(e,n)}function k(e,t=!1){const n=["raster-stretch"];return O(e)&&n.push("raster-colormap"),W(e)&&n.push("unique-value"),J(e,t)&&n.push("class-breaks"),A(e)&&n.push("raster-shaded-relief"),K(e)&&n.push("vector-field"),Q(e)&&n.push("flow"),n}function V(e,t,n){const a=["nearest","bilinear","cubic","majority"].find((e=>e===n?.toLowerCase()));if("Map"===t)return a??"bilinear";if("standard-time"===e.dataType)return a??"nearest";return"thematic"===e.dataType||e.attributeTable||e.colormap?"nearest"===a||"majority"===a?a:"nearest":a??"bilinear"}function I(e,a){e=S(e,a?.variableName);const{bandCount:r}=e;let{bandIds:s,stretchType:o}=a||{};s?.some((e=>e>=r))&&(s=null);let i=n(e.statistics),l=n(e.histograms);r>1?(s=s?.length?s:L(e),i=null==i?null:s?.map((e=>i[e])),l=null==l?null:s?.map((e=>l[e]))):s=[0],null==o&&(o=q(e));let u=!1;switch(o){case"none":u=!1;break;case"percent-clip":u=!l?.length;break;default:u=!i?.length}const{dataType:m}=e,c=1===s?.length&&R.has(m)?x:null,f=new h({stretchType:o,dynamicRangeAdjustment:u,colorRamp:c,outputMin:0,outputMax:255,gamma:1===s?.length?[1]:[1,1,1],useGamma:!1});return"percent-clip"===o?f.maxPercent=f.minPercent=w:"standard-deviation"===o&&(f.numberOfStandardDeviations=2),u||!t(e.multidimensionalInfo)&&!a?.includeStatisticsInStretch||("percent-clip"===o?f.histograms=l:"min-max"!==o&&"standard-deviation"!==o||(f.statistics=i)),f}function S(e,a){if(!a)return e;let r=n(e.statistics),s=n(e.histograms);const{multidimensionalInfo:i}=e;if(a&&t(i)){const e=i.variables.find((e=>e.name===a));if(e){const{statistics:t,histograms:n}=e;t?.length&&(r=t),n?.length&&(s=n)}}return o.fromJSON({...e.toJSON(),statistics:r,histograms:s})}function L(e){const t=e.bandCount;if(1===t)return null;if(2===t)return[0];const n=e.keyProperties&&e.keyProperties.BandProperties;let a;if(n&&n.length===t){const{red:e,green:t,blue:r,nir:s}=E(n);null!=e&&null!=t&&null!=r?a=[e,t,r]:null!=s&&null!=e&&null!=t&&(a=[s,e,t])}return!a&&t>=3&&(a=[0,1,2]),a}function B(e,t){const n=e.keyProperties&&e.keyProperties.BandProperties;return(t=t?.length?t:Array.from(Array(e.bandCount).keys())).map((t=>n&&n.length===e.bandCount&&n[t]&&n[t].BandName||"band_"+(t+1)))}function E(e){const t={};for(let n=0;n<e.length;n++){const a=e[n],r=a.BandName?.toLowerCase();if("red"===r)t.red=n;else if("green"===r)t.green=n;else if("blue"===r)t.blue=n;else if("nearinfrared"===r||"nearinfrared_1"===r||"nir"===r)t.nir=n;else if(a.WavelengthMax&&a.WavelengthMin){const e=a.WavelengthMin,r=a.WavelengthMax;null==t.blue&&e>=410&&e<=480&&r>=480&&r<=540?t.blue=n:null==t.green&&e>=490&&e<=560&&r>=560&&r<=610?t.green=n:null==t.red&&e>=595&&e<=670&&r>=660&&r<=730?t.red=n:null==t.nir&&e>=700&&e<=860&&r>=800&&r<=950&&(t.nir=n)}}return t}function q(e){let n="percent-clip";const{pixelType:a,dataType:r,histograms:s,statistics:o,multidimensionalInfo:i}=e,l=R.has(r)||"generic"===r&&t(i);return"u8"!==a||"processed"!==r&&t(s)&&t(o)?"u8"===a||"elevation"===r||l?n="min-max":t(s)?n="percent-clip":t(o)&&(n="min-max"):n="none",n}function F(n,a,r,s){if(!W(n,a))return null;const{attributeTable:o,statistics:i}=n,u=N(o,a),m=z(o,"red"),p=z(o,"green"),d=z(o,"blue"),b=new l,h=[],g=new Set,v=!!(m&&p&&d);if(t(o))o.features.forEach((t=>{const n=t.attributes[u.name];if(!g.has(t.attributes[u.name])&&null!=n){g.add(n);const a=v&&("single"===m.type||"double"===m.type)&&("single"===p.type||"double"===p.type)&&("single"===d.type||"double"===d.type)&&!o.features.some((e=>e.attributes[m.name]>1||e.attributes[p.name]>1||e.attributes[d.name]>1)),r=a?255:1;h.push(new f({value:t.attributes[u.name],label:t.attributes[u.name]+"",symbol:{type:"simple-fill",style:"solid",outline:null,color:new e(v?[t.attributes[m.name]*r,t.attributes[p.name]*r,t.attributes[d.name]*r,1]:[0,0,0,0])}}))}}));else if(i?.[0])for(let t=i[0].min;t<=i[0].max;t++)h.push(new f({value:t,label:t.toString(),symbol:{type:"simple-fill",style:"solid",outline:null,color:new e([0,0,0,0])}}));if(h.sort(((e,t)=>e.value&&"string"==typeof e.value.valueOf()?0:e.value>t.value?1:-1)),!v){const t=c(T,{numColors:h.length});h.forEach(((n,a)=>n.symbol.color=new e(t[a].slice(1,4)))),b.colorRamp=T}if(r||s){const t=r||c(s,{numColors:h.length}).map((e=>e.slice(1)));h.forEach(((n,a)=>n.symbol.color=new e(t[a]))),b.colorRamp=s}return new y({field:u.name,uniqueValueInfos:h,authoringInfo:b})}function N(e,n,a){let r;return t(e)?(r=n?e.fields.find((e=>n.toLowerCase()===e.name.toLowerCase())):P(e.fields),r||(a||(r=e.fields.find((e=>"string"===e.type))),r||(r=z(e,"value")))):r=new s({name:"value"}),r}function P(e){let t;for(let n=0;n<e.length;n++){const a=e[n].name.toLowerCase();if("string"===e[n].type){if(a.startsWith("class")){t=e[n];break}null==t&&(a.endsWith("name")||a.endsWith("type"))&&(t=e[n])}}return t}function z(e,t){return a(e)?null:e.fields.find((e=>e.name.toLowerCase()===t))}function W(e,t){const{attributeTable:n,bandCount:r}=e;if(a(n)&&H(e))return!0;if(a(n)||r>1)return!1;if(t){if(null==n.fields.find((e=>e.name.toLowerCase()===t.toLowerCase())))return!1}return!0}function O(e){const{bandCount:n,colormap:a}=e;return t(a)&&a.length>0&&1===n}function U(e){if(!O(e))return null;let a;const{attributeTable:r,colormap:s}=e;if(t(r)){const e=z(r,"value"),t=N(r,null,!0);"string"===t.type&&(a={},r.features.forEach((n=>{const r=n.attributes;a[r[e.name]]=t?r[t.name]:r[e.name]})))}return g.createFromColormap(n(s),a)}function A(e){const{bandCount:t,dataType:n,pixelType:a}=e;return"elevation"===n||"generic"===n&&1===t&&("s16"===a||"s32"===a||"f32"===a||"f64"===a)}function D(e,t="traditional"){if(!A(e))return null;const{extent:n}=e,a=n.width*r(n.spatialReference);return new v({hillshadeType:t,scalingType:a>5e6?"adjusted":"none"})}function J(e,n=!1){const{attributeTable:a,bandCount:r}=e;return 1===r&&(!n||t(a)||t(e.histograms))}function _(e,n){e=S(e,n?.variableName);const{attributeTable:a}=e;if(!J(e))return null;const r=t(e.histograms)?e.histograms[0]:null,s=null!=n?.numClasses&&isFinite(n?.numClasses)?n.numClasses:5,o=new l({classificationMethod:n?.classificationMethod,colorRamp:n?.colorRamp});let i=n?.field||"value";const m=[],f=[],b=1e3,h=t(a),y=h&&a.fields.find((e=>"count"===e.name.toLowerCase())),g=h?a.fields.find((e=>e.name.toLowerCase()===i.toLowerCase())):void 0;if(g&&h){i=g.name;const e=a.features.length;let t=0;a.features.forEach((n=>t+=(y?n.attributes[y.name]:50)/e)),a.features.forEach((n=>{const a=n.attributes[g.name],r=y?n.attributes[y.name]:50;if(r>0){f.push(r);const n=Math.max(1,Math.round(r/e/t*b));for(let e=0;e<n;e++)m.push(a)}}))}else{const{pixelType:t}=e,n=(r.max-r.min)/r.size,s=t.includes("s")||t.includes("u"),o=s&&1===n?Math.floor(r.min+.5):r.min,i=s&&1===n?Math.floor(r.max-.5):r.max,l=r.size;let u,c=0;r.counts.forEach((e=>c+=e/l)),r.counts.forEach(((e,t)=>{if(e>0){f.push(e);const s=Math.max(1,Math.round(e/l/c*b));u=h?a.features[t].attributes[g.name]:0===t?o:t===l-1?i:r.min+n*(t+.5);for(let e=0;e<s;e++)m.push(u)}}))}const v=n?.classificationMethod||"natural-breaks";let M=n?.definedInterval;"defined-interval"!==v||M||(M=G(e,g,s));const w=d({values:m,valueFrequency:f,normalizationTotal:null,definition:new p({classificationMethod:v,breakCount:s,definedInterval:M})});let T=n?.colors;if(!T){const e=n?.colorRamp||x;o.colorRamp=e;const t=c(e,{numColors:w.classBreaks.length,interpolateAlpha:!0});T=t.map((e=>e.slice(1)))}const R=w.classBreaks.map(((e,t)=>new u({minValue:e.minValue,maxValue:e.maxValue,label:e.label,symbol:{type:"simple-fill",color:T[t]}})));return new C({field:i,classBreakInfos:R,authoringInfo:o})}function G(e,n,a){let r=0,s=0;if(t(e.attributeTable)){const t=e.attributeTable;r=s=t.features[0].attributes[n.name],t.features.forEach((e=>{const t=e.attributes[n.name];t<r&&(r=t),t>s&&(s=t)}))}else if(t(e.histograms)){const t=e.histograms;r=t[0].min,s=t[0].max}return(s-r)/a}function H(e){return["u8","s8"].includes(e.pixelType)&&null!=e.statistics?.[0]?.min&&null!=e.statistics[0]?.max&&1===e.bandCount}function K(e){const{dataType:t}=e;return"vector-uv"===t||"vector-magdir"===t}function Q(e){const{dataType:t}=e;return"vector-uv"===t||"vector-magdir"===t}const X=new Map([["m/s","meter-per-second"],["km/h","kilometer-per-hour"],["knots","knots"],["ft/s","feet-per-second"],["mph","mile-per-hour"]]);function Y(e){if(!K(e))return null;let n;if(t(e.statistics)&&e.statistics.length&&("vector-magdir"===e.dataType||"vector-uv"===e.dataType)){const{minMagnitude:t,maxMagnitude:a}=te(e.dataType,e.statistics);n=[{type:"size",field:"Magnitude",minSize:10,maxSize:40,minDataValue:t,maxDataValue:a}]}const a=t(e.multidimensionalInfo)?X.get(e.multidimensionalInfo.variables[0].unit):null,r=new M({visualVariables:n,inputUnit:a,rotationType:"geographic"});return r.visualVariables=[...r.sizeVariables,...r.rotationVariables],r}function Z(e){return{color:e.symbolLayers[0].material?.color,type:"esriSFS",style:"esriSFSSolid"}}function $(e){if("uniqueValue"===e.type){const t=e.uniqueValueInfos,n=t?.[0].symbol;return n?.symbolLayers?.length&&(e.uniqueValueInfos=t?.map((e=>({value:e.value,label:e.label,symbol:e.symbol?Z(e.symbol):null})))),e}if("classBreaks"===e.type){const t=e.classBreakInfos;return t[0].symbol?.symbolLayers?.length&&(e.classBreakInfos=t.map((e=>({classMinValue:e.classMinValue,classMaxValue:e.classMaxValue,label:e.label,symbol:e.symbol?Z(e.symbol):null})))),e}return e}function ee(e){if(!Q(e))return null;let n;if(t(e.statistics)&&e.statistics.length>0&&("vector-magdir"===e.dataType||"vector-uv"===e.dataType)){const{minMagnitude:t,maxMagnitude:a}=te(e.dataType,e.statistics);n=[{type:"color",field:"Magnitude",stops:[{value:t,color:"#1020C0"},{value:a,color:"#C02010"}]}]}return new i({visualVariables:n})}function te(e,t){let n,a;if("vector-magdir"===e)n=t[0].min,a=t[0].max;else{const e=t[0].min,r=t[0].max,s=t[1].min,o=t[1].max;n=0,a=Math.max(Math.abs(e),Math.abs(s),Math.abs(r),Math.abs(o))}return{minMagnitude:n,maxMagnitude:a}}export{_ as createClassBreaksRenderer,U as createColormapRenderer,j as createDefaultRenderer,ee as createFlowRenderer,D as createShadedReliefRenderer,I as createStretchRenderer,F as createUVRenderer,Y as createVectorFieldRenderer,te as estimateMagnitudeRange,B as getBandNames,N as getClassField,L as getDefaultBandCombination,V as getDefaultInterpolation,G as getDefinedInterval,z as getField,k as getSupportedRendererTypes,S as getVariableRasterInfo,E as getWellKnownBandIndexes,J as isClassBreaksSupported,O as isColormapRendererSupported,Q as isFlowRendererSupported,A as isShadedReliefRendererSupported,H as isSingleBand8BitRasterWithStats,W as isUVRendererSupported,K as isVectorFieldRendererSupported,$ as normalizeRendererJSON};