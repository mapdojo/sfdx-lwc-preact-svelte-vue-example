/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../geometry.js";import n from"../Polygon.js";import e from"../Polyline.js";import t from"../Point.js";import s from"../Multipoint.js";function r(n){let e=0,t=0;const s=n.length;let r,i=n[t];for(t=0;t<s-1;t++)r=n[t+1],e+=(r[0]-i[0])*(r[1]+i[1]),i=r;return e>=0}function i(n,e,t,s){const r=[];for(const i of n){const n=i.slice(0);r.push(n);const o=e*(i[0]-s.x)-t*(i[1]-s.y)+s.x,a=t*(i[0]-s.x)+e*(i[1]-s.y)+s.y;n[0]=o,n[1]=a}return r}function o(o,a,c){const{hasM:f,hasZ:m,spatialReference:x}=o,p=a*Math.PI/180,l=Math.cos(p),h=Math.sin(p);if("xmin"in o&&(c=c??o.center,o=new n({spatialReference:x,rings:[[[o.xmin,o.ymin],[o.xmin,o.ymax],[o.xmax,o.ymax],[o.xmax,o.ymin],[o.xmin,o.ymin]]]})),"paths"in o){c=c??o.extent.center;const n=[];for(const e of o.paths)n.push(i(e,l,h,c));return new e({hasM:f,hasZ:m,spatialReference:x,paths:n})}if("rings"in o){c=c??o.extent.center;const e=[];for(const n of o.rings){const t=r(n),s=i(n,l,h,c);r(s)!==t&&s.reverse(),e.push(s)}return new n({hasM:f,hasZ:m,spatialReference:x,rings:e})}if("x"in o){c=c??o;const n=new t({x:l*(o.x-c.x)-h*(o.y-c.y)+c.x,y:h*(o.x-c.x)+l*(o.y-c.y)+c.y,spatialReference:x});return null!=o.z&&(n.z=o.z),null!=o.m&&(n.m=o.m),n}return"points"in o?(c=c??o.extent.center,new s({hasM:f,hasZ:m,points:i(o.points,l,h,c),spatialReference:x})):null}export{o as default};