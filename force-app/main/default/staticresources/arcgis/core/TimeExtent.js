/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"./chunks/tslib.es6.js";import{JSONSupport as e}from"./core/JSONSupport.js";import{isSome as r,applySome as s,mapOr as n}from"./core/maybe.js";import{truncateDate as i,offsetDate as o}from"./core/timeUtils.js";import{property as l}from"./core/accessorSupport/decorators/property.js";import"./core/accessorSupport/ensureType.js";import"./core/arrayUtils.js";import{reader as a}from"./core/accessorSupport/decorators/reader.js";import{subclass as u}from"./core/accessorSupport/decorators/subclass.js";import{writer as m}from"./core/accessorSupport/decorators/writer.js";var p;let d=p=class extends e{static get allTime(){return c}static get empty(){return h}constructor(t){super(t),this.end=null,this.start=null}readEnd(t,e){return null!=e.end?new Date(e.end):null}writeEnd(t,e){e.end=t?t.getTime():null}get isAllTime(){return this.equals(p.allTime)}get isEmpty(){return this.equals(p.empty)}readStart(t,e){return null!=e.start?new Date(e.start):null}writeStart(t,e){e.start=t?t.getTime():null}clone(){return new p({end:this.end,start:this.start})}equals(t){if(!t)return!1;const e=r(this.start)?this.start.getTime():this.start,s=r(this.end)?this.end.getTime():this.end,n=r(t.start)?t.start.getTime():t.start,i=r(t.end)?t.end.getTime():t.end;return e===n&&s===i}expandTo(t){if(this.isEmpty||this.isAllTime)return this.clone();const e=s(this.start,(e=>i(e,t))),r=s(this.end,(e=>{const r=i(e,t);return e.getTime()===r.getTime()?r:o(r,1,t)}));return new p({start:e,end:r})}intersection(t){if(!t)return this.clone();if(this.isEmpty||t.isEmpty)return p.empty;if(this.isAllTime)return t.clone();if(t.isAllTime)return this.clone();const e=n(this.start,-1/0,(t=>t.getTime())),r=n(this.end,1/0,(t=>t.getTime())),s=n(t.start,-1/0,(t=>t.getTime())),i=n(t.end,1/0,(t=>t.getTime()));let o,l;if(s>=e&&s<=r?o=s:e>=s&&e<=i&&(o=e),r>=s&&r<=i?l=r:i>=e&&i<=r&&(l=i),null!=o&&null!=l&&!isNaN(o)&&!isNaN(l)){const t=new p;return t.start=o===-1/0?null:new Date(o),t.end=l===1/0?null:new Date(l),t}return p.empty}offset(t,e){if(this.isEmpty||this.isAllTime)return this.clone();const s=new p,{start:n,end:i}=this;return r(n)&&(s.start=o(n,t,e)),r(i)&&(s.end=o(i,t,e)),s}union(t){if(!t||t.isEmpty)return this.clone();if(this.isEmpty)return t.clone();if(this.isAllTime||t.isAllTime)return c.clone();const e=r(this.start)&&r(t.start)?new Date(Math.min(this.start.getTime(),t.start.getTime())):null,s=r(this.end)&&r(t.end)?new Date(Math.max(this.end.getTime(),t.end.getTime())):null;return new p({start:e,end:s})}};t([l({type:Date,json:{write:{allowNull:!0}}})],d.prototype,"end",void 0),t([a("end")],d.prototype,"readEnd",null),t([m("end")],d.prototype,"writeEnd",null),t([l({readOnly:!0,json:{read:!1}})],d.prototype,"isAllTime",null),t([l({readOnly:!0,json:{read:!1}})],d.prototype,"isEmpty",null),t([l({type:Date,json:{write:{allowNull:!0}}})],d.prototype,"start",void 0),t([a("start")],d.prototype,"readStart",null),t([m("start")],d.prototype,"writeStart",null),d=p=t([u("esri.TimeExtent")],d);const c=new d,h=new d({start:void 0,end:void 0}),T=d;export{T as default};