/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{applyDefaultProjectionOptions as e,dom as r}from"./dom.js";let t,n=(e,r)=>{let t=[];for(;e&&e!==r;)t.push(e),e=e.parentNode;return t};t=Array.prototype.find?(e,r)=>e.find(r):(e,r)=>e.filter(r)[0];let o=(e,r)=>{let n=e;return r.forEach((e=>{n=n&&n.children?t(n.children,(r=>r.domNode===e)):void 0})),n},d=(e,r,t)=>{let d=function(d){t("domEvent",d);let i=r(),p=n(d.currentTarget,i.domNode);p.reverse();let l,a=o(i.getLastRender(),p);return e.scheduleRender(),a&&(l=a.properties[`on${d.type}`].apply(a.properties.bind||this,arguments)),t("domEventProcessed",d),l};return(e,r,t,n)=>d},i=t=>{let n,o,i=e(t),p=i.performanceLogger,l=!0,a=!1,s=[],c=[],u=(e,r,t)=>{let o,l=()=>o;i.eventHandlerInterceptor=d(n,l,p),o=e(r,t(),i),s.push(o),c.push(t)},f=()=>{if(o=void 0,l){l=!1,p("renderStart",void 0);for(let e=0;e<s.length;e++){let r=c[e]();p("rendered",void 0),s[e].update(r),p("patched",void 0)}p("renderDone",void 0),l=!0}};return n={renderNow:f,scheduleRender:()=>{o||a||(o=requestAnimationFrame(f))},stop:()=>{o&&(cancelAnimationFrame(o),o=void 0),a=!0},resume:()=>{a=!1,l=!0,n.scheduleRender()},append:(e,t)=>{u(r.append,e,t)},insertBefore:(e,t)=>{u(r.insertBefore,e,t)},merge:(e,t)=>{u(r.merge,e,t)},replace:(e,t)=>{u(r.replace,e,t)},detach:e=>{for(let r=0;r<c.length;r++)if(c[r]===e)return c.splice(r,1),s.splice(r,1)[0];throw new Error("renderFunction was not found")}},n};export{i as createProjector};