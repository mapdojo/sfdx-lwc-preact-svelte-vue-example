/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../geometry.js";import e from"../../core/Error.js";import{convertUnit as t}from"../../core/unitUtils.js";import{toRadians as n,spheroids as i,WKT_SPHEROID_REGEX as s}from"./geodesicConstants.js";import{equals as r,isGeographic as a}from"./spatialReferenceUtils.js";import o from"../Polyline.js";import c from"../Polygon.js";import h from"../Point.js";import l from"../SpatialReference.js";function f(e){if(!e)return null;if(a(e)&&e.wkid){const t=i[e.wkid];if(t)return t}if(e.wkt){const t=p(e.wkt);if(t)return t}return null}function p(e){const t=s.exec(e);if(!t||2!==t.length)return null;const n=t[1].split(",");if(!n||n.length<3)return null;const i=parseFloat(n[1]),r=parseFloat(n[2]);if(isNaN(i)||isNaN(r))return null;return{a:i,f:0===r?0:1/r}}function u(e){const t=f(e??l.WGS84);if(m(t))return t;const n=t.a*(1-t.f);return Object.assign(t,{b:n,eSq:1-(n/t.a)**2,radius:(2*t.a+n)/3,densificationRatio:1e4/((2*t.a+n)/3)})}function m(e){return null!=e&&"b"in e&&"eSq"in e&&"radius"in e}function d(e){return null!=e&&e<0?e+360:e}function g(e,t,i){const{a:s,eSq:r}=u(i),a=Math.sqrt(r),o=Math.sin(t[1]*n),c=s*t[0]*n;let h;if(r>0){h=s*((1-r)*(o/(1-r*(o*o))-1/(2*a)*Math.log((1-a*o)/(1+a*o))))*.5}else h=s*o;return e[0]=c,e[1]=h,e}function M(e){return null!==f(e)}function w(n,i="square-meters"){if(n.some((e=>!M(e.spatialReference))))throw new e("geodesic-areas:invalid-spatial-reference","the input geometries spatial reference is not supported");const s=[];for(let e=0;e<n.length;e++){const t=n[e],i=t.spatialReference,{radius:r,densificationRatio:a}=u(i),o=r*a;s.push(R(t,o))}const r=[],a=[0,0],o=[0,0];for(let e=0;e<s.length;e++){const{rings:n,spatialReference:c}=s[e];let h=0;for(let e=0;e<n.length;e++){const t=n[e];g(a,t[0],c),g(o,t[t.length-1],c);let i=o[0]*a[1]-a[0]*o[1];for(let e=0;e<t.length-1;e++)g(a,t[e+1],c),g(o,t[e],c),i+=o[0]*a[1]-a[0]*o[1];h+=i}h=t(h,"square-meters",i),r.push(h/-2)}return r}function y(n,i="meters"){if(!n)throw new e("geodesic-lengths:invalid-geometries","the input geometries type is not supported");if(n.some((e=>!M(e.spatialReference))))throw new e("geodesic-lengths:invalid-spatial-reference","the input geometries spatial reference is not supported");const s=[];for(let e=0;e<n.length;e++){const r=n[e],{spatialReference:a}=r,o="polyline"===r.type?r.paths:r.rings;let c=0;for(let e=0;e<o.length;e++){const t=o[e];let n=0;for(let e=1;e<t.length;e++){const i=t[e-1][0],s=t[e][0],r=t[e-1][1],o=t[e][1];if(r!==o||i!==s){const e=new v;b(e,[i,r],[s,o],a),n+=e.distance}}c+=n}c=t(c,"meters",i),s.push(c)}return s}function R(t,n){if("polyline"!==t.type&&"polygon"!==t.type)throw new e("geodesic-densify:invalid-geometry","the input geometry is neither polyline nor polygon");const{spatialReference:i}=t;if(!M(i))throw new e("geodesic-densify:invalid-spatial-reference","the input geometry spatial reference is not supported");const s="polyline"===t.type?t.paths:t.rings,r=[],a=[0,0],h=new v;for(const e of s){const t=[];r.push(t),t.push([e[0][0],e[0][1]]);let s,o,c=e[0][0],l=e[0][1];for(let r=0;r<e.length-1;r++){if(s=e[r+1][0],o=e[r+1][1],c===s&&l===o)continue;const f=[c,l];b(h,[c,l],[s,o],i);const{azimuth:p,distance:u}=h,m=u/n;if(m>1){for(let e=1;e<=m-1;e++){z(a,f,p,e*n,i),t.push(a.slice(0))}z(a,f,p,(u+Math.floor(m-1)*n)/2,i),t.push(a.slice(0))}z(a,f,p,u,i),t.push(a.slice(0)),c=a[0],l=a[1]}}return"polyline"===t.type?new o({paths:r,spatialReference:i}):new c({rings:r,spatialReference:i})}class v{constructor(e=0,t,n){this.distance=e,this.azimuth=t,this.reverseAzimuth=n}}function z(e,t,i,s,r){const a=t[0],o=t[1],c=a*n,h=o*n,l=(i??0)*n,{a:f,b:p,f:m}=u(r),d=Math.sin(l),g=Math.cos(l),M=(1-m)*Math.tan(h),w=1/Math.sqrt(1+M*M),y=M*w,R=Math.atan2(M,g),v=w*d,z=v*v,b=1-z,j=b*(f*f-p*p)/(p*p),q=1+j/16384*(4096+j*(j*(320-175*j)-768)),x=j/1024*(256+j*(j*(74-47*j)-128));let A,N,S,k,P=s/(p*q),F=2*Math.PI;for(;Math.abs(P-F)>1e-12;)S=Math.cos(2*R+P),A=Math.sin(P),N=Math.cos(P),k=x*A*(S+x/4*(N*(2*S*S-1)-x/6*S*(4*A*A-3)*(4*S*S-3))),F=P,P=s/(p*q)+k;const U=y*A-w*N*g,C=Math.atan2(y*N+w*A*g,(1-m)*Math.sqrt(z+U*U)),E=Math.atan2(A*d,w*N-y*A*g),G=m/16*b*(4+m*(4-3*b)),I=C/n,O=(c+(E-(1-G)*m*v*(P+G*A*(S+G*N*(2*S*S-1)))))/n;return e[0]=O,e[1]=I,e}function b(e,t,i,s){const r=t[0]*n,a=t[1]*n,o=i[0]*n,c=i[1]*n,{a:h,b:l,f,radius:p}=u(s),m=o-r,d=Math.atan((1-f)*Math.tan(a)),g=Math.atan((1-f)*Math.tan(c)),M=Math.sin(d),w=Math.cos(d),y=Math.sin(g),R=Math.cos(g);let v,z,b,j,q,x,A,N,S,k,P=1e3,F=m;do{if(A=Math.sin(F),N=Math.cos(F),b=Math.sqrt(R*A*(R*A)+(w*y-M*R*N)*(w*y-M*R*N)),0===b)return e.distance=0,e.azimuth=void 0,e.reverseAzimuth=void 0,e;q=M*y+w*R*N,x=Math.atan2(b,q),S=w*R*A/b,z=1-S*S,j=q-2*M*y/z,isNaN(j)&&(j=0),k=f/16*z*(4+f*(4-3*z)),v=F,F=m+(1-k)*f*S*(x+k*b*(j+k*q*(2*j*j-1)))}while(Math.abs(F-v)>1e-12&&--P>0);if(0===P){const t=p,i=Math.acos(Math.sin(a)*Math.sin(c)+Math.cos(a)*Math.cos(c)*Math.cos(o-r))*t,s=o-r,h=Math.sin(s)*Math.cos(c),l=Math.cos(a)*Math.sin(c)-Math.sin(a)*Math.cos(c)*Math.cos(s),f=Math.atan2(h,l);return e.azimuth=f/n,e.distance=i,e.reverseAzimuth=void 0,e}const U=z*(h*h-l*l)/(l*l),C=U/1024*(256+U*(U*(74-47*U)-128)),E=l*(1+U/16384*(4096+U*(U*(320-175*U)-768)))*(x-C*b*(j+C/4*(q*(2*j*j-1)-C/6*j*(4*b*b-3)*(4*j*j-3)))),G=Math.atan2(R*Math.sin(F),w*y-M*R*Math.cos(F)),I=Math.atan2(w*Math.sin(F),w*y*Math.cos(F)-M*R);return e.azimuth=G/n,e.distance=E,e.reverseAzimuth=I/n,e}function j(n,i,s="meters"){if(!n||!i)throw new e("geodesic-distance:missing-parameters","one or both input parameters are missing");if(!n.spatialReference||!i.spatialReference)throw new e("geodesic-distance:invalid-parameters","one or both input points do not have a spatial reference");if(!r(n.spatialReference,i.spatialReference))throw new e("geodesic-distance:invalid-parameters","spatial references of input parameters do not match");const{spatialReference:a}=n;if(!M(a))throw new e("geodesic-distance:not-supported","input geometry spatial reference is not supported");if(n.x===i.x&&n.y===i.y)return new v(0,0,0);const o=new v;return b(o,[n.x,n.y],[i.x,i.y],a),o.distance=t(o.distance,"meters",s),o.azimuth=d(o.azimuth),o.reverseAzimuth=d(o.reverseAzimuth),o}function q(t,n,i){if(!t||null==n||null==i)throw new e("point-from-distance:missing-parameters","one or more input parameters are missing or undefined");if(i<0||i>360)throw new e("point-from-distance:-of-bounds","azimuth is restricted to angles between, and including, 0° to 360° degrees");if(!t.spatialReference)throw new e("point-from-distance:missing-spatial-reference","the input point must have a spatial reference");const{spatialReference:s}=t;if(!M(s))throw new e("geodesic-distance:not-supported","input geometry spatial reference is not supported");const r=[0,0];return z(r,[t.x,t.y],i,n,s),new h({x:r[0],y:r[1],spatialReference:s})}export{v as InverseGeodeticSolverResult,z as directGeodeticSolver,w as geodesicAreas,R as geodesicDensify,j as geodesicDistance,y as geodesicLengths,b as inverseGeodeticSolver,M as isSupported,q as pointFromDistance};