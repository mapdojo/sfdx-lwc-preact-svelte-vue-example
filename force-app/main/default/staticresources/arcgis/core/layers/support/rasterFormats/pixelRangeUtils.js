/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const t=9999999e31,e=2e-7,n={u1:[0,1],u2:[0,3],u4:[0,15],u8:[0,255],s8:[-128,127],u16:[0,65535],s16:[-32768,32767],u32:[0,4294967295],s32:[-2147483648,2147483647],f32:[-34028234663852886e22,34028234663852886e22],f64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function s(t){return n[t]??[-34028234663852886e22,34028234663852886e22]}function u(n,u,a){if(n.depthCount&&n.depthCount>1)return;const{pixels:i,statistics:l,pixelType:o}=n,r=i[0].length,f=n.bandMasks??[],c=n.mask??new Uint8Array(r).fill(255),b="f32"===o||"f64"===o,m=s(o);let h=!1;for(let s=0;s<i.length;s++){const n="number"==typeof u?u:u[s];if(null==n)continue;const p=l?.[s].minValue??m[0],N=l?.[s].maxValue??m[1];if(p>n+Number.EPSILON||N<n-Number.EPSILON)continue;const M=f[s]||new Uint8Array(r).fill(255),d=i[s],A=a?.customFloatTolerance;if(b&&0!==A){let s=A;s||(s=Math.abs(n)>=t?e*Math.abs(n):"f32"===o?2**-23:Number.EPSILON);for(let t=0;t<d.length;t++)M[t]&&Math.abs(d[t]-n)<s&&(d[t]=0,M[t]=0,c[t]=0,h=!0)}else for(let t=0;t<d.length;t++)M[t]&&d[t]===n&&(d[t]=0,M[t]=0,c[t]=0,h=!0);f[s]=M}h&&(n.bandMasks=f,n.mask=c),h&&"updateStatistics"in n&&n.updateStatistics()}export{u as convertNoDataToMask,s as getPixelValueRange};