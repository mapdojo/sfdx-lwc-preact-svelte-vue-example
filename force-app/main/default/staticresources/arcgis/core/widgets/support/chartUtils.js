/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{chartColorSets as t}from"@esri/calcite-colors";import"../../intl.js";import"../../core/has.js";import{getLocale as s}from"../../intl/locale.js";const n="en-us",h=new Map([["ar",()=>import("../../chunks/ar.js").then((t=>t.a))],["bg-bg",()=>import("../../chunks/bg_BG.js").then((t=>t.b))],["bs-ba",()=>import("../../chunks/bs_BA.js").then((t=>t.b))],["ca-es",()=>import("../../chunks/ca_ES.js").then((t=>t.c))],["cs-cz",()=>import("../../chunks/cs_CZ.js").then((t=>t.c))],["da-dk",()=>import("../../chunks/da_DK.js").then((t=>t.d))],["de-de",()=>import("../../chunks/de_DE.js").then((t=>t.d))],["de-ch",()=>import("../../chunks/de_CH.js").then((t=>t.d))],["el-gr",()=>import("../../chunks/el_GR.js").then((t=>t.e))],["en-us",()=>import("../../chunks/en_US.js").then((t=>t.e))],["en-ca",()=>import("../../chunks/en_CA.js").then((t=>t.e))],["es-es",()=>import("../../chunks/es_ES.js").then((t=>t.e))],["et-ee",()=>import("../../chunks/et_EE.js").then((t=>t.e))],["fi-fi",()=>import("../../chunks/fi_FI.js").then((t=>t.f))],["fr-fr",()=>import("../../chunks/fr_FR.js").then((t=>t.f))],["he-il",()=>import("../../chunks/he_IL.js").then((t=>t.h))],["hr-hr",()=>import("../../chunks/hr_HR.js").then((t=>t.h))],["hu-hu",()=>import("../../chunks/hu_HU.js").then((t=>t.h))],["id-id",()=>import("../../chunks/id_ID.js").then((t=>t.i))],["it-it",()=>import("../../chunks/it_IT.js").then((t=>t.i))],["ja-jp",()=>import("../../chunks/ja_JP.js").then((t=>t.j))],["ko-kr",()=>import("../../chunks/ko_KR.js").then((t=>t.k))],["lt-lt",()=>import("../../chunks/lt_LT.js").then((t=>t.l))],["lv-lv",()=>import("../../chunks/lv_LV.js").then((t=>t.l))],["nb-no",()=>import("../../chunks/nb_NO.js").then((t=>t.n))],["nl-nl",()=>import("../../chunks/nl_NL.js").then((t=>t.n))],["pl-pl",()=>import("../../chunks/pl_PL.js").then((t=>t.p))],["pt-br",()=>import("../../chunks/pt_BR.js").then((t=>t.p))],["pt-pt",()=>import("../../chunks/pt_PT.js").then((t=>t.p))],["ro-ro",()=>import("../../chunks/ro_RO.js").then((t=>t.r))],["ru-ru",()=>import("../../chunks/ru_RU.js").then((t=>t.r))],["sk-sk",()=>import("../../chunks/sk_SK.js").then((t=>t.s))],["sl-sl",()=>import("../../chunks/sl_SL.js").then((t=>t.s))],["sr-rs",()=>import("../../chunks/sr_RS.js").then((t=>t.s))],["sv-se",()=>import("../../chunks/sv_SE.js").then((t=>t.s))],["th-th",()=>import("../../chunks/th_TH.js").then((t=>t.t))],["tr-tr",()=>import("../../chunks/tr_TR.js").then((t=>t.t))],["uk-ua",()=>import("../../chunks/uk_UA.js").then((t=>t.u))],["vi-vn",()=>import("../../chunks/vi_VN.js").then((t=>t.v))],["zh-cn",()=>import("../../chunks/zh_Hans.js").then((t=>t.z))],["zh-hk",()=>import("../../chunks/zh_Hant.js").then((t=>t.z))],["zh-tw",()=>import("../../chunks/zh_Hant.js").then((t=>t.z))]]);function e(t){const s=t.split("-")[0].toLowerCase();let n=null;for(const e of h.keys())if(e.startsWith(s)){n=e;break}return n}function r(t){return t?h.has(t.toLowerCase())?t.toLowerCase():e(t)||n:n}let o=null,i=null;async function u(t=s()){if(t=r(t),o&&t===i)return o;o=import("../../chunks/index.js").then((t=>t.i)),i=t;try{const[s,n]=await Promise.all([o,h.get(i)()]);i===t&&(s.am4core.options.defaultLocale=n.default),s.am4core.options.suppressWarnings=!0,s.am4core.options.autoDispose=!0}catch{return o=null,i=null,null}return o}function c(s,n="default"){const h=t.find((t=>t.name===n));return h?h.colors.map((t=>s.color(t))):null}export{r as getChartLocale,c as getColorSet,u as loadChartsModule};