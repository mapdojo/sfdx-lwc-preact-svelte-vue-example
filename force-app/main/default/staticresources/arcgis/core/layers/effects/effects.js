/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{getNamedColor as t}from"../../colorUtils.js";import{px2pt as s}from"../../core/screenUtils.js";import{c as r}from"../../chunks/mat4f32.js";import{sepia as o,saturate as e,invert as i,grayscale as a,contrast as h,brightness as n,rotateHue as u}from"./colorMatrixFunctions.js";class c{constructor(t,s,r){this.strength=t,this.radius=s,this.threshold=r,this.type="bloom"}interpolate(t,s,r){this.strength=M(t.strength,s.strength,r),this.radius=M(t.radius,s.radius,r),this.threshold=M(t.threshold,s.threshold,r)}clone(){return new c(this.strength,this.radius,this.threshold)}toJSON(){return{type:"bloom",radius:y(this.radius),strength:this.strength,threshold:this.threshold}}}class l{constructor(t){this.radius=t,this.type="blur"}interpolate(t,s,r){this.radius=Math.round(M(t.radius,s.radius,r))}clone(){return new l(this.radius)}toJSON(){return{type:"blur",radius:y(this.radius)}}}class p{constructor(t,s){this.type=t,this.amount=s,"invert"!==this.type&&"grayscale"!==this.type&&"sepia"!==this.type||(this.amount=Math.min(this.amount,1))}get colorMatrix(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix}interpolate(t,s,r){this.amount=M(t.amount,s.amount,r),this._updateMatrix()}clone(){return new p(this.type,this.amount)}toJSON(){return{type:this.type,amount:this.amount}}_updateMatrix(){const t=this._colorMatrix||r();switch(this.type){case"brightness":this._colorMatrix=n(t,this.amount);break;case"contrast":this._colorMatrix=h(t,this.amount);break;case"grayscale":this._colorMatrix=a(t,this.amount);break;case"invert":this._colorMatrix=i(t,this.amount);break;case"saturate":this._colorMatrix=e(t,this.amount);break;case"sepia":this._colorMatrix=o(t,this.amount)}}}class d{constructor(t,s,r,o){this.offsetX=t,this.offsetY=s,this.blurRadius=r,this.color=o,this.type="drop-shadow"}interpolate(t,s,r){this.offsetX=M(t.offsetX,s.offsetX,r),this.offsetY=M(t.offsetY,s.offsetY,r),this.blurRadius=M(t.blurRadius,s.blurRadius,r),this.color[0]=Math.round(M(t.color[0],s.color[0],r)),this.color[1]=Math.round(M(t.color[1],s.color[1],r)),this.color[2]=Math.round(M(t.color[2],s.color[2],r)),this.color[3]=M(t.color[3],s.color[3],r)}clone(){return new d(this.offsetX,this.offsetY,this.blurRadius,[...this.color])}toJSON(){const t=[...this.color];return t[3]*=255,{type:"drop-shadow",xoffset:y(this.offsetX),yoffset:y(this.offsetY),blurRadius:y(this.blurRadius),color:t}}}class m{constructor(t){this.angle=t,this.type="hue-rotate"}get colorMatrix(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix}interpolate(t,s,r){this.angle=M(t.angle,s.angle,r),this._updateMatrix()}clone(){return new m(this.angle)}toJSON(){return{type:"hue-rotate",angle:this.angle}}_updateMatrix(){const t=this._colorMatrix||r();this._colorMatrix=u(t,this.angle)}}class f{constructor(t){this.amount=t,this.type="opacity",this.amount=Math.min(this.amount,1)}interpolate(t,s,r){this.amount=M(t.amount,s.amount,r)}clone(){return new f(this.amount)}toJSON(){return{type:"opacity",amount:this.amount}}}function M(t,s,r){return t+(s-t)*r}function y(t){return Math.round(1e3*s(t))/1e3}function x(s){switch(s.type){case"grayscale":case"sepia":case"invert":return new p(s.type,0);case"saturate":case"brightness":case"contrast":return new p(s.type,1);case"opacity":return new f(1);case"hue-rotate":return new m(0);case"blur":return new l(0);case"drop-shadow":return new d(0,0,0,[...t("transparent")]);case"bloom":return new c(0,0,1)}}export{c as BloomEffect,l as BlurEffect,p as ColorMatrixEffect,d as DropShadowEffect,m as HueRotateEffect,f as OpacityEffect,x as createEffectWithInitialValues};