/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{J as t}from"../../../chunks/Jpg.js";import{Z as e}from"../../../chunks/Zlib.js";class r{static decode(r,n=!1){const s=new Uint8Array(r),o=new t;o.parse(s);const{width:a,height:i,numComponents:f,eof:h}=o,l=o.getData(a,i,!0),c=a*i;let u,g=null,p=0,w=0,m=0;if(!n&&h<s.length-1)try{const t=new e(s.subarray(h)).getBytes();g=new Uint8Array(c);let r=0;for(p=0;p<t.length;p++)for(m=7;m>=0;m--)g[r++]=t[p]>>m&1}catch{}if(1===f&&l.length===a*i){const t=new Uint8Array(l.buffer);u=[t,t,t]}else{for(u=[],p=0;p<3;p++)u.push(new Uint8Array(c));for(m=0,w=0;w<c;w++)for(p=0;p<3;p++)u[p][w]=l[m++]}return{width:a,height:i,pixels:u,mask:g}}}export{r as default};