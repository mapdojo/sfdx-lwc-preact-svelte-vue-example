/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{pt2px as t}from"../../../../../../core/screenUtils.js";import{b as s,m as e,t as i,r as n}from"../../../../../../chunks/mat2d.js";import{c as o,t as h}from"../../../../../../chunks/mat2df32.js";import{s as r,t as a}from"../../../../../../chunks/vec2.js";import{c}from"../../../../../../chunks/vec2f32.js";import{VAlign as d}from"../../alignmentUtils.js";import{i1616to32 as f}from"../../number.js";import m from"../../Rect.js";import u from"../../collisions/BoundingBox.js";const l=26,g=4,_=l+g,p=l-6,x=3,w=8,y=Math.PI/180,M=8,b=1.5;class B{constructor(t,s,e,i){this._rotationT=o(),this._xBounds=0,this._yBounds=0,this.minZoom=0,this.maxZoom=255,this._bounds=null;const n=e.rect,h=new Float32Array(8);t*=i,s*=i;const r=e.code?n.width*i:e.metrics.width,a=e.code?n.height*i:e.metrics.height;this.width=r,this.height=a,h[0]=t,h[1]=s,h[2]=t+r,h[3]=s,h[4]=t,h[5]=s+a,h[6]=t+r,h[7]=s+a,this._data=h,this._setTextureCoords(n),this._scale=i,this._mosaic=e,this.x=t,this.y=s,this.maxOffset=Math.max(t+r,s+a)}get mosaic(){return this._mosaic}set angle(t){this._angle=t,s(this._rotationT,-t),this._setOffsets(this._data)}get angle(){return this._angle}get xTopLeft(){return this._data[0]}get yTopLeft(){return this._data[1]}get xBottomRight(){return this._data[6]}get yBottomRight(){return this._data[7]}get texcoords(){return this._texcoords}get textureBinding(){return this._mosaic.textureBinding}get offsets(){return this._offsets||this._setOffsets(this._data),this._offsets}get char(){return String.fromCharCode(this._mosaic.code)}get code(){return this._mosaic.code}get bounds(){if(!this._bounds){const{height:t,width:s}=this._mosaic.metrics,i=s*this._scale,n=Math.abs(t)*this._scale,r=new Float32Array(8);r[0]=this.x,r[1]=this.y,r[2]=this.x+i,r[3]=this.y,r[4]=this.x,r[5]=this.y+n,r[6]=this.x+i,r[7]=this.y+n;const a=e(o(),this._rotationT,this._transform);h(r,r,a);let c=1/0,d=1/0,f=0,m=0;for(let e=0;e<4;e++){const t=r[2*e],s=r[2*e+1];c=Math.min(c,t),d=Math.min(d,s),f=Math.max(f,t),m=Math.max(m,s)}const l=f-c,g=m-d,_=c+l/2,p=d+g/2;this._bounds=new u(_,p,l,g)}return this._bounds}setTransform(t){this._transform=t,this._offsets=null}_setOffsets(t){this._offsets||(this._offsets={upperLeft:0,upperRight:0,lowerLeft:0,lowerRight:0});const s=this._offsets,i=new Float32Array(8),n=e(o(),this._rotationT,this._transform);h(i,t,n),s.upperLeft=f(i[0]*w,i[1]*w),s.upperRight=f(i[2]*w,i[3]*w),s.lowerLeft=f(i[4]*w,i[5]*w),s.lowerRight=f(i[6]*w,i[7]*w)}_setTextureCoords({x:t,y:s,width:e,height:i}){this._texcoords={upperLeft:f(t,s),upperRight:f(t+e,s),lowerLeft:f(t,s+i),lowerRight:f(t+e,s+i)}}}const L=(t,s)=>({code:0,page:0,sdf:!0,rect:new m(0,0,11,8),textureBinding:s,metrics:{advance:0,height:4,width:t,left:0,top:0}});function R(t,s){return t.forEach((t=>a(t,t,s))),{upperLeft:f(w*t[0][0],w*t[0][1]),upperRight:f(w*t[1][0],w*t[1][1]),lowerLeft:f(w*t[2][0],w*t[2][1]),lowerRight:f(w*t[3][0],w*t[3][1])}}class T{constructor(t,s,e){this._rotation=0,this._decorate(t,s,e),this.glyphs=t,this.bounds=this._createBounds(t),this.isMultiline=s.length>1,this._hasRotation=0!==e.angle,this._transform=this._createGlyphTransform(this.bounds,e),this._borderLineSize=e.borderLineSize,(e.borderLineSize||e.hasBackground)&&([this.bounds,this.background]=this.shapeBackground(this._transform));for(const i of t)i.setTransform(this._transform)}setRotation(t){if(0===t&&0===this._rotation)return;this._rotation=t;const i=this._transform,n=s(o(),t);e(i,n,i);for(const s of this.glyphs)s.setTransform(this._transform)}_decorate(t,s,e){if(!e.decoration||"none"===e.decoration||!t.length)return;const i=e.scale,n="underline"===e.decoration?_:p,o=t[0].textureBinding;for(const h of s){const s=h.startX*i,e=h.startY*i,r=(h.width+h.glyphWidthEnd)*i;t.push(new B(s,e+n*i,L(r,o),1))}}shapeBackground(s){const e=t(this._borderLineSize||0),i=(b+e)/2,n=this._borderLineSize?i:0,{xmin:o,ymin:h,xmax:r,ymax:a,x:c,y:d,width:f,height:m}=this.bounds,l=[o-M,h-M],g=[r+M,h-M],_=[o-M,a+M],p=[r+M,a+M],x=R([[l[0]-i,l[1]-i],[g[0]+i,g[1]-i],[l[0]+n,l[1]+n],[g[0]-n,g[1]+n]],s),w=R([[_[0]+n,_[1]-n],[p[0]-n,p[1]-n],[_[0]-i,_[1]+i],[p[0]+i,p[1]+i]],s),y=R([[l[0]-i,l[1]-i],[l[0]+n,l[1]+n],[_[0]-i,_[1]+i],[_[0]+n,_[1]-n]],s),B=R([[g[0]-n,g[1]+n],[g[0]+i,g[1]-i],[p[0]-n,p[1]-n],[p[0]+i,p[1]+i]],s),L={main:R([l,g,_,p],s),top:x,bot:w,left:y,right:B};return[new u(c,d,f+2*i,m+2*i),L]}get boundsT(){const t=this.bounds,s=r(c(),t.x,t.y);if(a(s,s,this._transform),this._hasRotation){const e=Math.max(t.width,t.height);return new u(s[0],s[1],e,e)}return new u(s[0],s[1],t.width,t.height)}_createBounds(t){let s=1/0,e=1/0,i=0,n=0;for(const r of t)s=Math.min(s,r.xTopLeft),e=Math.min(e,r.yTopLeft),i=Math.max(i,r.xBottomRight),n=Math.max(n,r.yBottomRight);const o=i-s,h=n-e;return new u(s+o/2,e+h/2,o,h)}_createGlyphTransform(t,s){const e=y*s.angle,h=o(),a=c();return i(h,h,r(a,s.xOffset,-s.yOffset)),s.isCIM?n(h,h,e):(i(h,h,r(a,t.x,t.y)),n(h,h,e),i(h,h,r(a,-t.x,-t.y))),h}}class v{constructor(t,s,e,i,n,o){this.glyphWidthEnd=0,this.startX=0,this.startY=0,this.start=Math.max(0,Math.min(s,e)),this.end=Math.max(0,Math.max(s,e)),this.end<t.length&&(this.glyphWidthEnd=t[this.end].metrics.width),this.width=i,this.yMin=n,this.yMax=o}}const j=t=>10===t,k=t=>32===t;function A(t,s,e){const i=new Array,n=1/e.scale,o=e.maxLineWidth*n,h=s?t.length-1:0,r=s?-1:t.length,a=s?-1:1;let c=h,d=0,f=0,m=c,u=m,l=0,g=1/0,_=0;for(;c!==r;){const{code:s,metrics:e}=t[c],n=Math.abs(e.top);if(j(s)||k(s)||(g=Math.min(g,n),_=Math.max(_,n+e.height)),j(s))c!==h&&(i.push(new v(t,m,c-a,d,g,_)),g=1/0,_=0),d=0,m=c+a,u=c+a,f=0;else if(k(s))u=c+a,f=0,l=e.advance,d+=e.advance;else if(d>o){if(u!==m){const s=u-2*a;d-=l,i.push(new v(t,m,s,d-f,g,_)),g=1/0,_=0,m=u,d=f}else i.push(new v(t,m,c-a,d,g,_)),g=1/0,_=0,m=c,u=c,d=0;d+=e.advance,f+=e.advance}else d+=e.advance,f+=e.advance;c+=a}const p=new v(t,m,c-a,d,g,_);return p.start>=0&&p.end<t.length&&i.push(p),i}function O(t,s){let e=0;for(let o=0;o<t.length;o++){const{width:s}=t[o];e=Math.max(s,e)}const i="underline"===s.decoration?g:0,n=t[0].yMin;return{x:0,y:n,height:t[t.length-1].yMax+s.lineHeight*(t.length-1)+i-n,width:e}}function S(t,s,e){const i=e.scale,n=new Array,o=A(t,s,e),h=O(o,e),{vAlign:r,hAlign:a}=e,c=r===d.Baseline?1:0,f=c?0:r-1,m=(1-c)*-h.y+f*(h.height/2)+(c?1:0)*-l;for(let d=0;d<o.length;d++){const{start:s,end:h,width:r}=o[d];let c=-1*(a+1)*(r/2)-x;const f=d*e.lineHeight+m-x;o[d].startX=c,o[d].startY=f;for(let e=s;e<=h;e++){const s=t[e];if(j(s.code))continue;const o=new B(c+s.metrics.left,f-s.metrics.top,s,i);c+=s.metrics.advance,n.push(o)}}return new T(n,o,e)}export{B as ShapedGlyph,T as ShapingInfo,S as shapeGlyphs};