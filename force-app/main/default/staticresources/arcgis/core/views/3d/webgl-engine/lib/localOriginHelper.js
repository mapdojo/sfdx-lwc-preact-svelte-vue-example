/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function n(n,o){const t=-n[0],c=-n[1],f=-n[2],i=o[3],s=o[7],u=o[11],e=o[15];o[0]+=i*t,o[1]+=i*c,o[2]+=i*f,o[4]+=s*t,o[5]+=s*c,o[6]+=s*f,o[8]+=u*t,o[9]+=u*c,o[10]+=u*f,o[12]+=e*t,o[13]+=e*c,o[14]+=e*f}function o(n,o){const t=n[0],c=n[1],f=n[2];o[12]+=t*o[0]+c*o[4]+f*o[8],o[13]+=t*o[1]+c*o[5]+f*o[9],o[14]+=t*o[2]+c*o[6]+f*o[10],o[14]+=t*o[3]+c*o[7]+f*o[11]}export{n as applyToModelMatrix,o as applyToViewMatrix};