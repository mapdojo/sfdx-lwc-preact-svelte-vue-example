/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import o from"../../../../Color.js";import r from"../../../../core/Logger.js";import{get as t,mapOr as e,isSome as i,unwrap as n}from"../../../../core/maybe.js";import{pt2px as l}from"../../../../core/screenUtils.js";import{Z as s}from"../../../../chunks/vec4f64.js";class a{constructor(o){this.definition=o,this.key=JSON.stringify(o),this.haloSize=Math.round(o.halo.size),this.textStyle=this._colorToRGBA(o.color),this.haloStyle=this._colorToRGB(o.halo.color),this.backgroundStyle=0!==o.background.color[3]?this._colorToRGBA(o.background.color):null}fontString(o){const r=this.definition.font;return`${r.style} ${r.weight} ${o}px ${r.family}, sans-serif`}_colorToRGB(o){return`rgb(${o.slice(0,3).map((o=>Math.floor(255*o))).toString()})`}_colorToRGBA(o){return`rgba(${o.slice(0,3).map((o=>Math.floor(255*o))).toString()},${o[3]})`}static async fromSymbol(c,g){const f=t(c,"material","color"),d=e(f,s,o.toUnitRGBA),h=e(c.size,12,l),m=c.lineHeight,u=i(c.background)?n(o.toUnitRGBA(c.background.color)):s,b={family:e(c.font,"sans-serif",(o=>o.family)),decoration:e(c.font,"none",(o=>o.decoration)),weight:e(c.font,"normal",(o=>o.weight)),style:e(c.font,"normal",(o=>o.style))},y=c.halo,p=i(y)&&i(y.color)&&y.size>0?{size:l(y.size),color:o.toUnitRGBA(y.color)}:{size:0,color:s},S=new a({color:d,size:h,background:{color:u,padding:i(c.background)?[.65*h,.5*h]:[0,0],borderRadius:i(c.background)?h*(6/16):0},lineSpacingFactor:m,font:b,halo:p,pixelRatio:g}),R=S.fontString(h);try{await document.fonts.load(R)}catch(k){r.getLogger("esri.views.3d.webgl-engine.lib.TextRenderParameters").warnOnce(`Failed to preload font '${R}'. Some text symbology may be rendered using the default browser font.`)}return S}}export{a as TextRenderParameters};