/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as t}from"../../../core/maybe.js";import e from"../PixelBlock.js";import{isValidPixelBlock as i}from"./pixelUtils.js";function n(t){let{altitude:e,azimuth:i}=t;const{hillshadeType:n,pixelSizePower:l=1,pixelSizeFactor:s=1,scalingType:a,isGCS:o,resolution:r}=t,c="multi-directional"===n?2*t.zFactor:t.zFactor,{x:h,y:f}=r;let u=c/(8*h),p=c/(8*f);if(o&&c>.001&&(u/=111e3,p/=111e3),"adjusted"===a)if(o){const t=111e3*h,e=111e3*f;u=(c+t**l*s)/(8*t),p=(c+e**l*s)/(8*e)}else u=(c+h**l*s)/(8*h),p=(c+f**l*s)/(8*f);let d=(90-e)*Math.PI/180,x=Math.cos(d),m=(360-i+90)*Math.PI/180,w=Math.sin(d)*Math.cos(m),y=Math.sin(d)*Math.sin(m);const M=[315,270,225,360,180,0],A=[60,60,60,60,60,90],g=new Float32Array([3,5,3,2,1,4]),k=g.reduce(((t,e)=>t+e)),P=g.map((t=>t/k)),Z="multi-directional"===n?M.length:1,C=new Float32Array(6),F=new Float32Array(6),b=new Float32Array(6);if("multi-directional"===n)for(let z=0;z<Z;z++)e=A[z],i=M[z],d=(90-e)*Math.PI/180,x=Math.cos(d),m=(360-i+90)*Math.PI/180,w=Math.sin(d)*Math.cos(m),y=Math.sin(d)*Math.sin(m),C[z]=x,F[z]=w,b[z]=y;else C.fill(x),F.fill(w),b.fill(y);return{resolution:r,factor:[u,p],sinZcosA:w,sinZsinA:y,cosZ:x,sinZcosAs:F,sinZsinAs:b,cosZs:C,weights:P,hillshadeType:["traditional","multi-directional"].indexOf(n)}}function l(l,s){if(!i(l))return l;const{width:a,height:o,mask:r}=l,c=new Uint8Array(a*o);let h=1;if(t(r)){for(let t=0;t<r.length;t++)if(r[t]){h=r[t];break}c.set(r)}const{factor:f,sinZcosA:u,sinZsinA:p,cosZ:d,sinZcosAs:x,sinZsinAs:m,cosZs:w,weights:y}=n(s),[M,A]=f,{hillshadeType:g}=s,k=l.pixels[0],P=new Uint8Array(a*o);let Z,C,F,b,z,S,T,U;const v=1,j=t(r);for(let t=v;t<o-v;t++){const e=t*a;for(let t=v;t<a-v;t++){if(r&&!r[e+t]){P[e+t]=0;continue}let i=8;if(j&&(i=(r[e-a+t-1]+r[e-a+t]+r[e-a+t+1]+r[e+t-1]+r[e+t+1]+r[e+a+t-1]+r[e+a+t]+r[e+a+t+1])/h,i<7)){P[e+t]=0,c[e+t]=0;continue}r&&7===i?(Z=r[e-a+t-1]?k[e-a+t-1]:k[e+t],C=r[e-a+t]?k[e-a+t]:k[e+t],F=r[e-a+t+1]?k[e-a+t+1]:k[e+t],b=r[e+t-1]?k[e+t-1]:k[e+t],z=r[e+t+1]?k[e+t+1]:k[e+t],S=r[e+a+t-1]?k[e+a+t-1]:k[e+t],T=r[e+a+t]?k[e+a+t]:k[e+t],U=r[e+a+t+1]?k[e+a+t+1]:k[e+t]):(Z=k[e-a+t-1],C=k[e-a+t],F=k[e-a+t+1],b=k[e+t-1],z=k[e+t+1],S=k[e+a+t-1],T=k[e+a+t],U=k[e+a+t+1]);const n=(F+z+z+U-(Z+b+b+S))*M,l=(S+T+T+U-(Z+C+C+F))*A,s=Math.sqrt(1+n*n+l*l);let o=0;if("traditional"===g){let t=255*(d+p*l-u*n)/s;t<0&&(t=0),o=t}else{const t=m.length;for(let e=0;e<t;e++){let t=255*(w[e]+m[e]*l-x[e]*n)/s;t<0&&(t=0),o+=t*y[e]}}P[e+t]=255&o}}for(let t=0;t<o;t++)P[t*a]=P[t*a+1],P[(t+1)*a-1]=P[(t+1)*a-2];for(let t=1;t<a-1;t++)P[t]=P[t+a],P[t+(o-1)*a]=P[t+(o-2)*a];return new e({width:a,height:o,pixels:[P],mask:r?c:null,pixelType:"u8",validPixelCount:l.validPixelCount,statistics:[{minValue:0,maxValue:255}]})}function s(t,e,n,l){if(!i(t)||!i(e))return;const{min:s,max:a}=l,o=t.pixels[0],{pixels:r,mask:c}=e,h=r[0],f=255.00001/(a-s),u=new Uint8ClampedArray(h.length),p=new Uint8ClampedArray(h.length),d=new Uint8ClampedArray(h.length),x=n.length-1;for(let i=0;i<h.length;i++){if(c&&0===c[i])continue;const t=Math.floor((h[i]-s)*f),[e,l]=n[t<0?0:t>x?x:t],a=o[i],r=a*l,m=r*(1-Math.abs(e%2-1)),w=a-r;switch(Math.floor(e)){case 0:u[i]=r+w,p[i]=m+w,d[i]=w;break;case 1:u[i]=m+w,p[i]=r+w,d[i]=w;break;case 2:u[i]=w,p[i]=r+w,d[i]=m+w;break;case 3:u[i]=w,p[i]=m+w,d[i]=r+w;break;case 4:u[i]=m+w,p[i]=w,d[i]=r+w;break;case 5:case 6:u[i]=r+w,p[i]=w,d[i]=m+w}}t.pixels=[u,p,d],t.updateStatistics()}function a(n,l){if(!i(n))return n;const s=l.zFactor,a=l.pixelSizePower??1,o=l.pixelSizeFactor??1,r=l.slopeType,c=l.isGCS,{width:h,height:f,mask:u}=n,p=n.pixels[0],d=new Uint8Array(h*f);let x=1;if(t(u)){for(let t=0;t<u.length;t++)if(u[t]){x=u[t];break}d.set(u)}const m=new Float32Array(h*f),{x:w,y}=l.resolution;let M=s/(8*w),A=s/(8*y);c&&Math.abs(s-1)<1e-4&&(M/=111e3,A/=111e3),"adjusted"===r&&(M=(s+w**a*o)/(8*w),A=(s+y**a*o)/(8*y));const g=1;let k,P,Z,C,F,b,z,S;const T=t(u);for(let t=g;t<f-g;t++){const e=t*h;for(let t=g;t<h-g;t++){if(u&&!u[e+t]){m[e+t]=0;continue}let i=0;if(T&&(i=(u[e-h+t-1]+u[e-h+t]+u[e-h+t+1]+u[e+t-1]+u[e+t+1]+u[e+h+t-1]+u[e+h+t]+u[e+h+t+1])/x,i<7)){m[e+t]=0,d[e+t]=0;continue}u&&7===i?(k=u[e-h+t-1]?p[e-h+t-1]:p[e+t],P=u[e-h+t]?p[e-h+t]:p[e+t],Z=u[e-h+t+1]?p[e-h+t+1]:p[e+t],C=u[e+t-1]?p[e+t-1]:p[e+t],F=u[e+t+1]?p[e+t+1]:p[e+t],b=u[e+h+t-1]?p[e+h+t-1]:p[e+t],z=u[e+h+t]?p[e+h+t]:p[e+t],S=u[e+h+t+1]?p[e+h+t+1]:p[e+t]):(k=p[e-h+t-1],P=p[e-h+t],Z=p[e-h+t+1],C=p[e+t-1],F=p[e+t+1],b=p[e+h+t-1],z=p[e+h+t],S=p[e+h+t+1]);const n=(Z+F+F+S-(k+C+C+b))*M,l=(b+z+z+S-(k+P+P+Z))*A,s=Math.sqrt(n*n+l*l);m[e+t]="percent-rise"===r?100*s:57.2957795*Math.atan(s)}}for(let t=0;t<f;t++)m[t*h]=m[t*h+1],m[(t+1)*h-1]=m[(t+1)*h-2];for(let t=1;t<h-1;t++)m[t]=m[t+h],m[t+(f-1)*h]=m[t+(f-2)*h];const U=new e({width:h,height:f,pixels:[m],mask:u?d:null,pixelType:"f32",validPixelCount:n.validPixelCount});return U.updateStatistics(),U}function o(n,l={}){if(!i(n))return n;const{width:s,height:a,mask:o}=n,r=n.pixels[0],c=new Uint8Array(s*a);t(o)&&c.set(o);const h=new Float32Array(s*a),{resolution:f}=l,u=f?1/f.x:1,p=f?1/f.y:1,d=1;let x,m,w,y,M,A,g,k;const P=t(o);for(let t=d;t<a-d;t++){const e=t*s;for(let t=d;t<s-d;t++){if(o&&!o[e+t]){h[e+t]=0;continue}let i=0;if(P&&(i=o[e-s+t-1]+o[e-s+t]+o[e-s+t+1]+o[e+t-1]+o[e+t+1]+o[e+s+t-1]+o[e+s+t]+o[e+s+t+1],i<7)){h[e+t]=0,c[e+t]=0;continue}o&&7===i?(x=o[e-s+t-1]?r[e-s+t-1]:r[e+t],m=o[e-s+t]?r[e-s+t]:r[e+t],w=o[e-s+t+1]?r[e-s+t+1]:r[e+t],y=o[e+t-1]?r[e+t-1]:r[e+t],M=o[e+t+1]?r[e+t+1]:r[e+t],A=o[e+s+t-1]?r[e+s+t-1]:r[e+t],g=o[e+s+t]?r[e+s+t]:r[e+t],k=o[e+s+t+1]?r[e+s+t+1]:r[e+t]):(x=r[e-s+t-1],m=r[e-s+t],w=r[e-s+t+1],y=r[e+t-1],M=r[e+t+1],A=r[e+s+t-1],g=r[e+s+t],k=r[e+s+t+1]);const n=(w+M+M+k-(x+y+y+A))*u,l=(A+g+g+k-(x+m+m+w))*p;let a=-1;0===n&&0===l||(a=90-57.29578*Math.atan2(l,-n),a<0&&(a+=360),360===a?a=0:a>360&&(a%=360)),h[e+t]=a}}for(let t=0;t<a;t++)h[t*s]=h[t*s+1],h[(t+1)*s-1]=h[(t+1)*s-2];for(let t=1;t<s-1;t++)h[t]=h[t+s],h[t+(a-1)*s]=h[t+(a-2)*s];return new e({width:s,height:a,pixels:[h],mask:o?c:null,pixelType:"f32",validPixelCount:n.validPixelCount,statistics:[{minValue:0,maxValue:360}]})}export{o as aspect,n as calculateHillshadeParams,l as hillshade,a as slope,s as tintHillshade};