/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{lerp as e,clamp as t}from"../../../core/mathUtils.js";import{disposeMaybe as s}from"../../../core/maybe.js";import{watch as r,syncAndInitial as i}from"../../../core/reactiveUtils.js";import{u as a}from"../../../chunks/mat4.js";import{c as o}from"../../../chunks/mat4f64.js";import{s as n}from"../../../chunks/vec2.js";import{l as h,g as m,a as p,i as u,f as c,p as _}from"../../../chunks/vec3.js";import{c as l}from"../../../chunks/vec3f64.js";import{getReferenceEllipsoid as d}from"../../../geometry/ellipsoidUtils.js";import{isMars as f}from"../../../geometry/support/spatialReferenceUtils.js";import{AtmosphereType as g}from"./AtmosphereType.js";import{computeInnerAltitudeFade as R,innerAtmosphereDepth as b}from"./atmosphereUtils.js";import{S as j}from"../../../chunks/SimpleAtmosphere.glsl.js";import{SimpleAtmosphereTechnique as x}from"./SimpleAtmosphereTechnique.js";import{SimpleAtmosphereTechniqueConfiguration as y,SimpleAtmosphereGeometry as A}from"./SimpleAtmosphereTechniqueConfiguration.js";import{marsAtmosphereTextureSimple as V}from"./resources/MarsAtmosphereTexture.js";import{earthAtmosphereTextureSimple as T}from"./resources/SimpleAtmosphereTexture.js";import{makePiecewiseLinearFunction as w}from"../support/mathUtils.js";import{glLayout as P}from"../support/buffer/glUtil.js";import{newLayout as q}from"../support/buffer/InterleavedLayout.js";import{Default3D as v}from"../webgl-engine/lib/DefaultVertexAttributeLocations.js";import{newFloatArray as S}from"../webgl-engine/lib/FloatArray.js";import{createQuadVAO as F}from"../webgl-engine/lib/glUtil3D.js";import{project as M}from"../webgl-engine/lib/Util.js";import{VertexArrayObject as U}from"../webgl-engine/lib/VertexArrayObject.js";import{VertexAttribute as C}from"../webgl-engine/lib/VertexAttribute.js";import{BufferObject as I}from"../../webgl/BufferObject.js";import{PixelFormat as W,PixelType as E,TextureWrapMode as O,TextureSamplingMode as k,PrimitiveType as L,Usage as N}from"../../webgl/enums.js";import{Texture as D}from"../../webgl/Texture.js";import{vertexCount as G}from"../../webgl/Util.js";const B=128,H=-b,z=0,Y=50,J=()=>1-511/512,K=w([[50,.1015625],[500,.21875],[5e3,1-250/512],[5e4,.4140625]]);class Q{constructor(e,t){this.view=e,this.type=g.Simple,this._passParameters=new j,this._vaoCount=0,this._texV1=1,this._isMars=f(e.spatialReference);const s=d(e.spatialReference);this._planetRadius=s.radius,this._outerRimWidth=s.outerAtmosphereRimWidth,this._innerRimFactor=(this._planetRadius+H)/this._planetRadius,this._middleRimFactor=(this._planetRadius+z)/this._planetRadius,this._outerRimFactor=(this._planetRadius+this._outerRimWidth)/this._planetRadius,this._texV0=z/this._outerRimWidth,this._texVScale=this._texV1-this._texV0,this._techniqueRepository=t.techniqueRepository;const a=t.renderContext.rctx;this._cameraChangeHandle=r((()=>this.view.state?.camera),(()=>t.requestRender()),i),this._vao=this._createRibbon(a),this._vaoCount=G(this._vao,"geometry"),this._fadeVao=F(a),this._fadeVaoCount=G(this._fadeVao,"geometry");const o=this._isMars?V:T;this._passParameters.texture=new D(a,{pixelFormat:W.RGBA,dataType:E.UNSIGNED_BYTE,wrapMode:O.CLAMP_TO_EDGE,samplingMode:k.LINEAR,flipped:!0,width:1,height:512},o);const n=new y;n.geometry=A.Cone,this._coneTechnique=this._techniqueRepository.acquire(x,n),n.geometry=A.Underground,this._undergroundTechnique=this._techniqueRepository.acquire(x,n)}destroy(){this._coneTechnique.release(),this._undergroundTechnique.release(),this._cameraChangeHandle.remove(),this._passParameters.texture=s(this._passParameters.texture),this._fadeVao.dispose(),this._vao.dispose()}render(e){const t=e.bindParameters.camera;this._update(t);const s=e.rctx;this._passParameters.undergroundFadeAlpha<1&&(s.bindTechnique(this._coneTechnique,this._passParameters,e.bindParameters),s.bindVAO(this._vao),s.drawArrays(L.TRIANGLES,0,this._vaoCount)),this._passParameters.undergroundFadeAlpha>0&&(s.bindTechnique(this._undergroundTechnique,this._passParameters,e.bindParameters),s.bindVAO(this._fadeVao),s.drawArrays(L.TRIANGLE_STRIP,0,this._fadeVaoCount))}renderHaze(){}_update(s){const r=l(),i=this._planetRadius,a=h(s.eye),o=a-i;if(o<0){const e=Math.min(-o/5e3,1);this._passParameters.undergroundFadeAlpha=e}else this._passParameters.undergroundFadeAlpha=0;const p=Math.max(Y,o),u=i+H;this._passParameters.innerScale=te(i+p,i,u)-1,this._passParameters.altitudeFade=R(o),m(r,s.eye,(i+Y)/a),X(r,s.center,s.up,i,this._passParameters.silhouette);const c=this._computeScreenRimWidth(s,r,s.up,this._passParameters.silhouette),_=J(),d=K(o);let f=this._texV0+_*this._texVScale,g=this._texV0+c*d*this._texVScale;if(o>Y){X(s.eye,s.center,s.up,i,this._passParameters.silhouette);const r=this._computeScreenRimWidth(s,s.eye,s.up,this._passParameters.silhouette),a=t((r-1.5)/(c-1.5),0,1);f=this._texV0+a*_*this._texVScale,g=this._texV0+e(this._texV1,c*d,a)*this._texVScale}n(this._passParameters.texV,f,g)}_createRibbon(e){const t=S(3+3*B*3),s=new Uint32Array(3*B*5);t[0]=0,t[1]=0,t[2]=-1;for(let a=0;a<B;a++){const e=9*a+3;t[e+0]=a,t[e+1]=this._innerRimFactor,t[e+2]=-1,t[e+3]=a,t[e+4]=this._middleRimFactor,t[e+5]=0,t[e+6]=a,t[e+7]=this._outerRimFactor,t[e+8]=1;const r=3*a+1,i=a===B-1?1:r+3,o=15*a;s[o+0]=r,s[o+1]=r+1,s[o+2]=i+1,s[o+3]=i+1,s[o+4]=i,s[o+5]=r,s[o+6]=r+1,s[o+7]=r+2,s[o+8]=i+2,s[o+9]=i+2,s[o+10]=i+1,s[o+11]=r+1,s[o+12]=r,s[o+13]=i,s[o+14]=0}const r=se.createBuffer(s.length),i=r.position;for(let a=0;a<s.length;++a){const e=3*s[a];i.set(a,0,t[e]),i.set(a,1,t[e+1]),i.set(a,2,t[e+2])}return new U(e,v,{geometry:P(se)},{geometry:I.createVertex(e,N.STATIC_DRAW,r.buffer)})}_computeScreenRimWidth(e,t,s,r){return p($,r.center,r.v2),m(ee,$,this._outerRimFactor),a(Z,t,$,s),M($,Z,e.projectionMatrix,e.viewport,$),M(ee,Z,e.projectionMatrix,e.viewport,ee),u($,ee)/e.height}}function X(e,t,s,r,i){const a=h(e),o=r*Math.sqrt(a*a-r*r)/a,n=Math.sqrt(r*r-o*o),p=i.v1,u=i.v2;return m(i.center,e,n/a),c(p,e,t),_(p)<1&&c(p,e,s),m(p,p,o/h(p)),c(u,p,e),m(u,u,o/h(u)),o}const Z=o(),$=l(),ee=l();function te(e,t,s){return e*e/(Math.sqrt(e*e-t*t)*Math.sqrt(e*e-s*s)+t*s)}const se=q().vec3f(C.POSITION);export{Q as default};