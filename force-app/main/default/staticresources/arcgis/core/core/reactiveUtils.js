/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isEventTarget as n,on as t}from"./events.js";import{handlesGroup as r,makeHandle as e}from"./handleUtils.js";import{removeMaybe as o}from"./maybe.js";import{isAborted as i,createAbortError as u,onAbort as s}from"./promiseUtils.js";import{watchTracked as c}from"./accessorSupport/watch.js";export{autorun}from"./accessorSupport/trackingUtils.js";function l(n,t,r={}){return m(n,t,r,y)}function f(n,t,r={}){return m(n,t,r,d)}function m(n,t,r={},e){let i=null;const u=r.once?(n,r)=>{e(n)&&(o(i),t(n,r))}:(n,r)=>{e(n)&&t(n,r)};if(i=c(n,u,r.sync,r.equals),r.initial){const t=n();u(t,t)}return i}function a(r,i,u,s={}){let c=null,f=null,m=null;function a(){c&&f&&(f.remove(),s.onListenerRemove?.(c),c=null,f=null)}function p(n){s.once&&s.once&&o(m),u(n)}const j=l(r,((r,e)=>{a(),n(r)&&(c=r,f=t(r,i,p),s.onListenerAdd?.(r))}),{sync:s.sync,initial:!0});return m=e((()=>{j.remove(),a()})),m}function p(n,t){return v(n,null,t)}function j(n,t){return v(n,d,t)}function v(n,t,e){if(i(e))return Promise.reject(u());const c=n();if(t?.(c))return Promise.resolve(c);let l=null;function f(){l=o(l)}return new Promise(((o,i)=>{l=r([s(e,(()=>{f(),i(u())})),m(n,(n=>{f(),o(n)}),{sync:!1,once:!0},t??y)])}))}function y(n){return!0}function d(n){return!!n}function P(n,t,r={}){let e=!1;const o=l(n,((n,r)=>{e||t(n,r)}),r);return{remove(){o.remove()},pause(){e=!0},resume(){e=!1}}}const U={sync:!0},h={initial:!0},w={sync:!0,initial:!0};export{h as initial,a as on,p as once,P as pausable,U as sync,w as syncAndInitial,l as watch,f as when,j as whenOnce};