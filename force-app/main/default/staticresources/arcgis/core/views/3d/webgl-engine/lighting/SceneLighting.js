/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{lerp as i}from"../../../../core/mathUtils.js";import{c as t,g as s,a as h,h as r}from"../../../../chunks/vec3.js";import{c as n,f as a,a as o}from"../../../../chunks/vec3f64.js";import{SphericalHarmonicsAmbientLight as e,MainLight as c}from"./Lightsources.js";import{combineLights as g}from"./SphericalHarmonics.js";class m{constructor(){this.color=n(),this.intensity=1}}class l{constructor(){this.direction=n(),this.ambient=new m,this.diffuse=new m}}const _=.4;class L{constructor(){this._shOrder=2,this._legacy=new l,this.globalFactor=.5,this.noonFactor=.5,this._sphericalHarmonics=new e,this._mainLight=new c(n(),a(1,0,0),!1)}get legacy(){return this._legacy}get sh(){return this._sphericalHarmonics}get mainLight(){return this._mainLight}set(i){g(i,this._shOrder,this._mainLight,this._sphericalHarmonics),t(this._legacy.direction,this._mainLight.direction);const r=1/Math.PI;this._legacy.ambient.color[0]=.282095*this._sphericalHarmonics.r[0]*r,this._legacy.ambient.color[1]=.282095*this._sphericalHarmonics.g[0]*r,this._legacy.ambient.color[2]=.282095*this._sphericalHarmonics.b[0]*r,s(this._legacy.diffuse.color,this._mainLight.intensity,r),t(p,this._legacy.diffuse.color),s(p,p,_*this.globalFactor),h(this._legacy.ambient.color,this._legacy.ambient.color,p)}copyFrom(i){this._sphericalHarmonics.r=Array.from(i.sh.r),this._sphericalHarmonics.g=Array.from(i.sh.g),this._sphericalHarmonics.b=Array.from(i.sh.b),this._mainLight.direction=o(i.mainLight.direction),this._mainLight.intensity=o(i.mainLight.intensity),this._mainLight.castShadows=i.mainLight.castShadows,this._mainLight.specularStrength=i.mainLight.specularStrength,this._mainLight.environmentStrength=i.mainLight.environmentStrength,this.globalFactor=i.globalFactor,this.noonFactor=i.noonFactor}lerpLighting(s,h,n){if(r(this._mainLight.intensity,s.mainLight.intensity,h.mainLight.intensity,n),this._mainLight.environmentStrength=i(s.mainLight.environmentStrength,h.mainLight.environmentStrength,n),this._mainLight.specularStrength=i(s.mainLight.specularStrength,h.mainLight.specularStrength,n),t(this._mainLight.direction,h.mainLight.direction),this._mainLight.castShadows=h.mainLight.castShadows,this.globalFactor=i(s.globalFactor,h.globalFactor,n),this.noonFactor=i(s.noonFactor,h.noonFactor,n),s.sh.r.length===h.sh.r.length)for(let t=0;t<h.sh.r.length;t++)this._sphericalHarmonics.r[t]=i(s.sh.r[t],h.sh.r[t],n),this._sphericalHarmonics.g[t]=i(s.sh.g[t],h.sh.g[t],n),this._sphericalHarmonics.b[t]=i(s.sh.b[t],h.sh.b[t],n);else for(let i=0;i<h.sh.r.length;i++)this._sphericalHarmonics.r[i]=h.sh.r[i],this._sphericalHarmonics.g[i]=h.sh.g[i],this._sphericalHarmonics.b[i]=h.sh.b[i]}}const p=n();export{L as SceneLighting,_ as ambientBoost};