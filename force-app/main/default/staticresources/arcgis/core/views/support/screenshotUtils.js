/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../core/has.js";import{clamp as t}from"../../core/mathUtils.js";import{isNone as h}from"../../core/maybe.js";export{createEmptyImageData}from"../../core/imageUtils.js";const i=2048,e=1.5,o=8;function n(h,i){const{format:e,quality:o,rotation:n,disableDecorations:a}=h||{},r=j(h,i.padding),l=y(h,{width:i.width-r.left-r.right,height:i.height-r.top-r.bottom}),{width:g,height:f}=p(h,l),d=D(e),u=k[d];return{format:d,quality:t(null!=o?o:u,0,100),area:l,width:g,height:f,rotation:n,disableDecorations:!!a,ignoreBackground:!(!h||!h.ignoreBackground),ignorePadding:!(!h||!h.ignorePadding)}}function a(t,h){const i=n(t,h),e=i.area,o=i.width/e.width,a=j(i,h.padding),r=a.left+a.right,l=a.top+a.bottom,g=h.width-r,f=h.height-l,d=Math.floor(g*o+r),u=Math.floor(f*o+l),c=t&&t.layers?t.layers:[],s=i.ignoreBackground,w=i.ignorePadding;return{framebufferWidth:d,framebufferHeight:u,region:{x:Math.floor(e.x*o)+a.left,y:Math.floor(e.y*o)+a.top,width:i.width,height:i.height},format:i.format,quality:i.quality,rotation:i.rotation,pixelRatio:o,layers:c,disableDecorations:i.disableDecorations,ignoreBackground:s,ignorePadding:w,objectAndLayerIdColor:!1}}function r(t,h,i){const{ctx:e,canvas:o}=g(t,i),n=e.getImageData(0,0,t.width,t.height),a=c(o,h);return f(o),{dataUrl:a,data:n}}function l(t,h){const{ctx:i,canvas:e}=g(t,h),o=i.getImageData(0,0,t.width,t.height);return f(e),o}function g(t,h){const i=d();h.premultipliedAlpha&&v(t),i.width=t.width,i.height=t.height;const e=i.getContext("2d",{willReadFrequently:!0});return e.putImageData(t,0,0),h.flipY&&q(e),{ctx:e,canvas:i}}function f(t){t.width=0,t.height=0}function d(){return h(u)&&(u=document.createElement("canvas")),u}let u=null;function c(t,h){const i=I[h.format],e=h.quality/100;return t.toDataURL(i,e)}function s(h,i){const e=D(h),o=k[e];return{format:e,quality:t(null!=i?i:o,0,100)}}function w(t,h){return h/Math.max(t[0],t[1])}function m(t,h,i,e=0,o=0,n=t.width-e,a=t.height-o,r=!1){const{data:l}=t,{width:g,height:f,data:d}=h,u=n/g,c=a/f,s=Math.ceil(u/2),w=Math.ceil(c/2),m=t.width;for(let M=0;M<f;M++)for(let t=0;t<g;t++){const h=4*(t+(r?f-M-1:M)*g);let n=0,a=0,p=0,y=0,x=0,b=0;const j=(M+.5)*c;for(let r=Math.floor(M*c);r<(M+1)*c;r++){const h=Math.abs(j-(r+.5))/w,g=(t+.5)*u,f=h*h;for(let d=Math.floor(t*u);d<(t+1)*u;d++){const t=Math.abs(g-(d+.5))/s,h=Math.sqrt(f+t*t);if(h>=1)continue;let u=2*h*h*h-3*h*h+1;const c=4*(e+d+(o+r)*m);b+=u*l[c+3],a+=u,!i&&l[c+3]<255&&(u=u*l[c+3]/255),p+=u*l[c],y+=u*l[c+1],x+=u*l[c+2],n+=u}}d[h]=p/n,d[h+1]=y/n,d[h+2]=x/n,d[h+3]=b/a}return h}function M(t,h,n){if(!h)return t;const{framebufferWidth:a,framebufferHeight:r,pixelRatio:l,region:g}=t,f=j(t,n),d=f.left+f.right,u=f.top+f.bottom,c=a-d,s=r-u,w=Math.min(o,Math.min((i-d)/c,(i-u)/s));return w<e?t:{...t,framebufferWidth:Math.round(c*w)+d,framebufferHeight:Math.round(s*w)+u,pixelRatio:l*w,resample:{region:{x:Math.round((g.x-f.left)*w)+f.left,y:Math.round((g.y-f.top)*w)+f.top,width:Math.round(g.width*w),height:Math.round(g.height*w)},width:a,height:r}}}function p(t,h){if(!t)return h;const i=t.width,e=t.height;if(null!=i&&null!=e)return{width:Math.floor(i),height:Math.floor(e)};if(null==i&&null==e)return h;const o=h.width/h.height;return null==e?{width:Math.floor(i),height:Math.floor(i/o)}:{width:Math.floor(e*o),height:Math.floor(e)}}function y(t,h){const i={x:0,y:0,width:h.width,height:h.height};if(t&&t.area){null!=t.area.x&&(i.x=Math.floor(t.area.x)),null!=t.area.y&&(i.y=Math.floor(t.area.y));const e=null!=t.area.width?Math.floor(t.area.width):null,o=null!=t.area.height?Math.floor(t.area.height):null;if(i.width=h.width-i.x,i.height=h.height-i.y,null!=e&&null!=o)i.width=Math.min(i.width,e),i.height=Math.min(i.height,o);else if(null==e&&null!=o){const t=Math.min(i.width,e);i.height=t/i.width*i.height,i.width=t}else if(null!=e&&null==o){const t=Math.min(i.height,o);i.width=t/i.height*i.width,i.height=t}}return x(b(i,t),h)}function x(t,h){const i=Math.floor(Math.max(t.x,0)),e=Math.floor(Math.max(t.y,0)),o={x:i,y:e,width:Math.floor(Math.min(t.width,h.width-i)),height:Math.floor(Math.min(t.height,h.height-e))},n=o.width/o.height,a=t.width/t.height;if(a===n)return o;if(a>n){const t=Math.floor(o.width/a),h=o.height-t;return{x:o.x,y:Math.floor(o.y+h/2),width:o.width,height:t}}const r=Math.floor(o.height*a),l=o.width-r;return{x:Math.floor(o.x+l/2),y:o.y,width:r,height:o.height}}function b(t,h){if(!h||null==h.width||null==h.height)return t;const i=h.width/h.height,e=t.width/t.height;if(e===i)return t;if(e<i){const h=Math.floor(t.height*i);return t.x-=(h-t.width)/2,t.width=h,t}const o=Math.floor(t.width/i);return t.y-=(o-t.height)/2,t.height=o,t}function j(t,h){return!h||t&&t.ignorePadding?B:h}function D(t){switch(t){case"png":case"jpg":case"jpeg":return t;default:return R}}function q(t){t.save(),t.globalCompositeOperation="copy",t.scale(1,-1),t.translate(0,-t.canvas.height),t.drawImage(t.canvas,0,0),t.restore()}function v(t){const h=t.data,i=h.length;for(let e=0;e<i;e+=4){const t=h[e+3];if(255!==t&&t>0){const i=255/t;h[e+0]=h[e+0]*i,h[e+1]=h[e+1]*i,h[e+2]=h[e+2]*i}}}const I={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg"},P=98,R="png",k={png:100,jpg:P,jpeg:P},B={top:0,right:0,bottom:0,left:0};export{n as completeUserSettings,r as encode,l as encodeData,s as getFormatAndQuality,w as getMaximumResolutionScale,m as resampleHermite,M as screenshotSuperSampleSettings,c as toDataUrl,a as toRenderSettings};