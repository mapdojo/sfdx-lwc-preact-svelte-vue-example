/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../core/Error.js";import{isSome as i}from"../../core/maybe.js";import o from"../../renderers/support/AuthoringInfo.js";import s from"../../renderers/support/ClassBreakInfo.js";import a from"../../renderers/visualVariables/support/SizeStop.js";import{getSize as n}from"../../renderers/visualVariables/support/visualVariableUtils.js";import{createVisualVariable as l}from"./color.js";import{createVisualVariables as t,createContinuousRenderer as r}from"./size.js";import{verifyBasicFieldValidity as u,createStopValuesForAboveBelow as m,clampAboveAndBelowStopValues as p,createDefaultStopValues as c}from"./support/utils.js";import{verifyBinningParams as d}from"../support/binningUtils.js";import{getFieldsList as v}from"../support/utils.js";import{binningCapableLayerTypes as b,featureCapableLayerTypes as f,createLayerAdapter as y,getLayerTypeLabels as w}from"../support/adapters/support/layerUtils.js";import{getAboveAndBelowSymbols as h}from"../symbology/support/aboveAndBelowUtils.js";import{applyCIMSymbolColor as z}from"../../symbols/support/cimSymbolUtils.js";import{Symbol3DMaterial as g}from"../../symbols/support/Symbol3DMaterial.js";const V=2**53-1;async function O(o){if(!(o&&o.layer&&(o.field||o.valueExpression||o.sqlExpression)))throw new e("univariate-colorsize-visual-variables:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required");if(o.valueExpression&&!o.sqlExpression&&!o.view)throw new e("univariate-colorsize-visual-variables:missing-parameters","View is required when 'valueExpression' is specified");if("above-and-below"===o.theme&&o.sizeOptions?.sizeOptimizationEnabled)throw new e("univariate-colorsize-visual-variables:invalid-parameters","sizeOptimizationEnabled cannot be true for 'above-and-below' theme");o.forBinning&&d(o,"univariate-colorsize-visual-variables");const s={...o},a=o.forBinning?b:f,n=y(s.layer,a,o.forBinning);if(s.layer=n,s.theme=s.theme||s.colorOptions?.theme?s.theme:"high-to-low","90-10"===s.theme)throw new e("univariate-colorsize-visual-variables:not-supported","Only 'high-to-low', 'above-and-below', 'above', 'below' themes are supported.");if(!n)throw new e("univariate-colorsize-visual-variables:invalid-parameters","'layer' must be one of these types: "+w(a).join(", "));const l=i(s.signal)?{signal:s.signal}:null;await n.load(l);const t=await v({field:s.field,normalizationField:s.normalizationField,valueExpression:s.valueExpression}),r=u(n,t,"univariate-colorsize-visual-variables:invalid-parameters");if(r)throw r;return s}function x(e,i){const o={...e},{sizeOptions:s,theme:a}=o,n=o.legendOptions||o.sizeOptions?.legendOptions;return delete o.sizeOptions,delete o.colorOptions,{...o,...s,statistics:i||o.statistics,theme:"above-and-below"===a?null:a,legendOptions:n}}function E(e,i){const o={...e},s=o.colorOptions,a=o.theme||s?.theme,n=o.legendOptions||o.colorOptions?.legendOptions;return delete o.sizeOptions,delete o.colorOptions,{...o,...s,statistics:i||o.statistics,theme:a,legendOptions:n}}async function S(o){if(!(o&&o.layer&&(o.field||o.valueExpression||o.sqlExpression)))throw new e("univariate-colorsize-continuous-renderer:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required");if(o.valueExpression&&!o.sqlExpression&&!o.view)throw new e("univariate-colorsize-continuous-renderer:missing-parameters","View is required when 'valueExpression' is specified");o.forBinning&&d(o,"univariate-colorsize-continuous-renderer");const s={...o};s.symbolType=s.symbolType||"2d",s.colorOptions||(s.colorOptions={}),s.colorOptions.isContinuous=s.colorOptions.isContinuous??!1;const a=o.forBinning?b:f,n=y(s.layer,a,o.forBinning);if(s.layer=n,!n)throw new e("univariate-colorsize-continuous-renderer:invalid-parameters","'layer' must be one of these types: "+w(a).join(", "));const l=i(s.signal)?{signal:s.signal}:null;if(await n.load(l),"above-and-below"===s.theme&&s.symbolOptions){if(s.symbolType.includes("3d-volumetric"))throw new e("univariate-colorsize-continuous-renderer:invalid-parameters","'symbolOptions' is applicable for '2d' and '3d-flat' 'symbolType' only");if("point"!==n.geometryType&&"polygon"!==n.geometryType)throw new e("univariate-colorsize-continuous-renderer:invalid-parameters","'symbolOptions' only apply to layers with 'point' or 'polygon' geometryType")}const t=await v({field:s.field,normalizationField:s.normalizationField,valueExpression:s.valueExpression}),r=u(n,t,"univariate-colorsize-continuous-renderer:invalid-parameters");if(r)throw r;return s}function j(e){const i={...e},o={...i.sizeOptions};return delete i.sizeOptions,delete i.colorOptions,delete o.sizeOptimizationEnabled,{...i,...o}}function T(e,i){if("type"in e&&"cim"===e.type)z(e,i);else if("type"in e&&e.type.includes("3d")){e.symbolLayers.forEach((e=>{"material"in e&&"color"in e.material&&(e.material?e.material.color=i:e.material=new g({color:i}))}))}else"color"in e&&(e.color=i)}function I(e,i,o){if((i?.symbolStyle||i?.symbols)&&("point"===o||"polygon"===o))return i.symbols||h(i.symbolStyle);const s=e.classBreakInfos[0].symbol;return{above:s.clone(),below:s.clone()}}function q(e,i,o){const a=o.symbolOptions,n=o.layer,l=a?.symbols?"custom":a?.symbolStyle,t=o.colorOptions?.isContinuous;if(B(e,i,t),l||!t){const{stops:o}=i.size.visualVariables[0],{above:r,below:u}=I(e,a,n.geometryType);if(!t){const e=i.color.colorScheme.colors,o=e[0];T(r,e[e.length-1]),T(u,o)}e.classBreakInfos=[new s({minValue:-V,maxValue:o[2].value,symbol:u}),new s({minValue:o[2].value,maxValue:V,symbol:r})],l&&(e.authoringInfo.univariateSymbolStyle=l)}}function B(e,i,o=!0){const s=i?.authoringInfo?.clone(),a=i.size.visualVariables.map((e=>e.clone()));o?a.push(i.color.visualVariable.clone()):s.visualVariables=s.visualVariables.filter((e=>"size"===e.type)),a.push(...e.visualVariables.filter((e=>"target"in e&&"outline"===e.target)).map((e=>e.clone()))),e.authoringInfo=s,e.visualVariables=a}function D(e){const i={...e},o=i.symbolType,s=o.includes("3d-volumetric");delete i.symbolType,delete i.defaultSymbolEnabled;const a=i;return a.worldScale=s,s&&(a.sizeOptions={...a.sizeOptions},a.sizeOptions.axis="3d-volumetric-uniform"===o?"all":"height"),a}async function U(e,i,o,s){const l=i[0],t=i[1],r=Math.round((t-l)/2)+l,u=e.clone();u.stops=[new a({value:o[0],size:t}),new a({value:o[1],size:r}),new a({value:o[2],size:l}),new a({value:o[3],size:r}),new a({value:o[4],size:t})],e.stops=[new a({value:s[0],size:n(u,s[0])}),new a({value:s[1],size:n(u,s[1])}),new a({value:s[2],size:n(u,s[2])}),new a({value:s[3],size:n(u,s[3])}),new a({value:s[4],size:n(u,s[4])})]}async function C(e,i,o,s){const a=e.find((e=>"width-and-depth"!==e.axis&&!e.target)),n="number"==typeof a?.minSize?a?.minSize:null,l="number"==typeof a?.maxSize?a?.maxSize:null;if(null!=a?.minDataValue&&null!=n&&null!=l)if(s)if("above-and-below"===s){a.minDataValue=null,a.maxDataValue=null,a.minSize=null,a.maxSize=null;const e=m(o),s=p(e,o);await U(a,[n,l],e,s),i.stops.forEach(((e,i)=>e.value=s[i]))}else{const{minDataValue:e,maxDataValue:o}=a,s=c(e,o,5);i.stops.forEach(((e,i)=>e.value=s[i])),a.minDataValue=s[0],a.maxDataValue=s[s.length-1]}else a.minDataValue=i.stops[0].value,a.maxDataValue=i.stops[i.stops.length-1].value}function F(e,i,s){const{theme:a,minValue:n,maxValue:l}=e,t=i.authoringInfo.visualVariables[0].clone(),r=s.authoringInfo.visualVariables[0].clone();if("above-and-below"===a){const e=i.visualVariable.stops;t.minSliderValue=r.minSliderValue=n??e[0].value,t.maxSliderValue=r.maxSliderValue=l??e[e.length-1].value,r.theme="above-and-below"}return new o({type:"univariate-color-size",univariateTheme:a,visualVariables:[t,r]})}async function k(e){const i=await O(e),o=await l(E(i)),{visualVariable:s,statistics:a}=o,n=await t(x(i,a)),r=n.visualVariables;return await C(r,s,a,i.theme),{basemapId:n.basemapId,basemapTheme:n.basemapTheme,statistics:a,defaultValuesUsed:o.defaultValuesUsed,color:{visualVariable:s,colorScheme:o.colorScheme},size:{visualVariables:r,sizeScheme:n.sizeScheme},authoringInfo:F(i,o,n)}}async function A(e){return M(e)}async function M(e){const i=await S(e),{renderer:o,statistics:s,defaultValuesUsed:a}=await r(j(i)),n=D(i);n.statistics=s;const l=await k(n);return"above-and-below"===i.theme?q(o,l,i):B(o,l),{renderer:o,statistics:s,defaultValuesUsed:a,color:i.colorOptions?.isContinuous||"above-and-below"!==i.theme?l.color:null,size:l.size,basemapId:l.basemapId,basemapTheme:l.basemapTheme}}export{A as createContinuousRenderer,M as createRenderer,k as createVisualVariables};