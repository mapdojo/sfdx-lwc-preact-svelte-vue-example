/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const t="calcite-mode-";function e(){return getComputedStyle(document.body).getPropertyValue("--esri-calcite-mode-name").replace(/\s|'|"/g,"")}function r(){return e().startsWith("dark")}function c(){return`${t}${r()?"dark":"light"}`}function n(t){o(t),t.classList.add(c())}function o(e){Array.from(e.classList).forEach((r=>{r.startsWith(t)&&e.classList.remove(r)}))}export{c as getCalciteThemeClass,r as isDarkTheme,n as setCalciteThemeClass};