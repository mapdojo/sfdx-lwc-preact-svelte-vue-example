/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
export{convertDateFormatToIntlOptions,formatDate}from"./intl/date.js";export{convertNumberFormatToIntlOptions,formatNumber}from"./intl/number.js";export{substitute}from"./intl/substitute.js";export{getLocale,onLocaleChange,prefersRTL,setLocale}from"./intl/locale.js";import{registerMessageBundleLoader as t}from"./intl/messages.js";export{fetchMessageBundle,normalizeMessageBundleLocale}from"./intl/messages.js";import{createJSONLoader as e}from"./intl/t9n.js";import{getAssetUrl as o}from"./assets.js";t(e({pattern:"esri/",location:o}));export{e as createJSONLoader,t as registerMessageBundleLoader};