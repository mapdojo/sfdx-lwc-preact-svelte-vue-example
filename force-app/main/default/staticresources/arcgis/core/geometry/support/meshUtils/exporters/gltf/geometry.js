/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as t,isSome as n}from"../../../../../core/maybe.js";import{s as e,b as o,f as r,n as s}from"../../../../../chunks/vec3.js";import{c as a}from"../../../../../chunks/vec3f64.js";import i from"../../../../Point.js";function f(t,n){if(t.components)for(const e of t.components)e.faces&&"smooth"===e.shading&&c(e,n)}function c(n,a){t(a.normal)&&(a.normal=new Float32Array(a.position.length));const i=n.faces,{position:f,normal:c}=a,m=i.length/3;for(let t=0;t<m;++t){const n=3*i[3*t+0],s=3*i[3*t+1],a=3*i[3*t+2],m=e(l,f[n+0],f[n+1],f[n+2]),h=e(p,f[s+0],f[s+1],f[s+2]),g=e(x,f[a+0],f[a+1],f[a+2]),u=o(h,h,m),j=o(g,g,m),y=r(u,u,j);c[n+0]+=y[0],c[n+1]+=y[1],c[n+2]+=y[2],c[s+0]+=y[0],c[s+1]+=y[1],c[s+2]+=y[2],c[a+0]+=y[0],c[a+1]+=y[1],c[a+2]+=y[2]}for(let t=0;t<c.length;t+=3)e(h,c[t],c[t+1],c[t+2]),s(h,h),c[t+0]=h[0],c[t+1]=h[1],c[t+2]=h[2]}function m(t){if(n(t.transform))return t.transform.getOriginPoint(t.spatialReference);const e=t.extent.xmax-t.extent.width/2,o=t.extent.ymax-t.extent.height/2,r=t.extent.zmin;return new i({x:e,y:o,z:r,spatialReference:t.extent.spatialReference})}const l=a(),p=a(),x=a(),h=a();export{m as computeOrigin,f as smoothNormals};