/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"../PixelBlock.js";import{convolutionKernel as e}from"../rasterFunctionConstants.js";const n=new Map;function o(t){const e=Math.sqrt(t.length),n=t.slice(0,e),o=[1];for(let l=1;l<e;l++){let n=null;for(let o=0;o<e;o++){const r=t[o+l*e],s=t[o];if(null==n)if(0===s){if(r)return{separable:!1,row:null,col:null}}else n=r/s;else if(r/s!==n)return{separable:!1,row:null,col:null}}if(null==n)return{separable:!1,row:null,col:null};o.push(n)}return{separable:!0,row:n,col:o}}function l(t,e,n,o,l,r,s){const i=new Float32Array(e*n),a=r.length,c=s?0:o,h=s?o:0,f=s?1:e;for(let p=c;p<n-c;p++){const n=p*e;for(let s=h;s<e-h;s++){if(l&&!l[n+s])continue;let e=0;for(let l=0;l<a;l++)e+=t[n+s+(l-o)*f]*r[l];i[n+s]=e}}return i}function r(t,e,n,o,l,r,s){const i=new Float32Array(e*n),a=Math.floor(o/2),c=Math.floor(l/2);for(let h=a;h<n-a;h++){const n=h*e;for(let h=c;h<e-c;h++){if(r&&!r[n+h])continue;let f=0;for(let r=0;r<o;r++)for(let o=0;o<l;o++)f+=t[n+h+(r-a)*e+o-c]*s[r*l+o];i[n+h]=f}}return i}function s(e,n,o=!0){const{pixels:l,width:s,height:a,pixelType:c,mask:h}=e,f=l.length,p=[],{kernel:u,rows:g,cols:x}=n;for(let t=0;t<f;t++){const e=r(l[t],s,a,g,x,h,u);o&&i(e,s,a,g,x),p.push(e)}return new t({width:s,height:a,pixelType:c,pixels:p,mask:h})}function i(t,e,n,o,l){const r=Math.floor(o/2);for(let i=0;i<r;i++)for(let o=0;o<e;o++)t[i*e+o]=t[(l-1-i)*e+o],t[(n-1-i)*e+o]=t[(n-l+i)*e+o];const s=Math.floor(l/2);for(let i=0;i<n;i++){const n=i*e;for(let o=0;o<s;o++)t[n+o]=t[n+l-1-o],t[n+e-o-1]=t[n+e+o-l]}}function a(e,n,o,r=!0){const{pixels:s,width:a,height:c,pixelType:h,mask:f}=e,p=s.length,u=[],g=n.length,x=o.length,w=Math.floor(g/2),m=Math.floor(x/2);for(let t=0;t<p;t++){let e=l(s[t],a,c,w,f,n,!0);e=l(e,a,c,m,f,o,!1),r&&i(e,a,c,g,x),u.push(e)}return new t({width:a,height:c,pixelType:h,pixels:u,mask:f})}function c(t,e){const n=o(e.kernel),l=!1!==e.mirrorEdges,r=n.separable?a(t,n.row,n.col,l):s(t,e,l),{outputPixelType:i}=e;return i&&r.clamp(i),r}n.set(e.none,[0,0,0,0,1,0,0,0,0]),n.set(e.lineDetectionHorizontal,[-1,-1,-1,2,2,2,-1,-1,-1]),n.set(e.lineDetectionVertical,[-1,2,-1,-1,2,-1,-1,2,-1]),n.set(e.lineDetectionLeftDiagonal,[2,-1,-1,-1,2,-1,-1,-1,2]),n.set(e.lineDetectionRightDiagonal,[-1,-1,2,-1,2,-1,2,-1,-1]),n.set(e.gradientNorth,[-1,-2,-1,0,0,0,1,2,1]),n.set(e.gradientWest,[-1,0,1,-2,0,2,-1,0,1]),n.set(e.gradientEast,[1,0,-1,2,0,-2,1,0,-1]),n.set(e.gradientSouth,[1,2,1,0,0,0,-1,-2,-1]),n.set(e.gradientNorthEast,[0,-1,-2,1,0,-1,2,1,0]),n.set(e.gradientNorthWest,[-2,-1,0,-1,0,1,0,1,2]),n.set(e.smoothArithmeticMean,[.111111111111,.111111111111,.111111111111,.111111111111,.111111111111,.111111111111,.111111111111,.111111111111,.111111111111]),n.set(e.smoothing3x3,[.0625,.125,.0625,.125,.25,.125,.0625,.125,.0625]),n.set(e.smoothing5x5,[1,1,1,1,1,1,4,4,4,1,1,4,12,4,1,1,4,4,4,1,1,1,1,1,1]),n.set(e.sharpening3x3,[-1,-1,-1,-1,9,-1,-1,-1,-1]),n.set(e.sharpening5x5,[-1,-3,-4,-3,-1,-3,0,6,0,-3,-4,6,21,6,-4,-3,0,6,0,-3,-1,-3,-4,-3,-1]),n.set(e.laplacian3x3,[0,-1,0,-1,4,-1,0,-1,0]),n.set(e.laplacian5x5,[0,0,-1,0,0,0,-1,-2,-1,0,-1,-2,17,-2,-1,0,-1,-2,-1,0,0,0,-1,0,0]),n.set(e.sobelHorizontal,[-1,-2,-1,0,0,0,1,2,1]),n.set(e.sobelVertical,[-1,0,1,-2,0,2,-1,0,1]),n.set(e.sharpen,[0,-.25,0,-.25,2,-.25,0,-.25,0]),n.set(e.sharpen2,[-.25,-.25,-.25,-.25,3,-.25,-.25,-.25,-.25]),n.set(e.pointSpread,[-.627,.352,-.627,.352,2.923,.352,-.627,.352,-.627]);export{c as convolute,a as convoluteSeparable,n as convolutionKernels,o as separateKernels};