/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{doSubstitutions as e}from"./executionError.js";import{IANAZone as t,DateTime as n,Zone as r,FixedOffsetZone as s}from"luxon";class i{}var o;i.instance=new t("Etc/UTC"),function(e){e.TimeZoneNotRecognised="TimeZoneNotRecognised"}(o||(o={}));const a={[o.TimeZoneNotRecognised]:"Timezone identifier has not been recognised."};class d extends Error{constructor(t,n){super(e(a[t],n)),this.declaredRootClass="esri.arcade.arcadedate.dateerror",Error.captureStackTrace&&Error.captureStackTrace(this,d)}}class c{constructor(e){this._date=e,this.declaredRootClass="esri.arcade.arcadedate"}static fromParts(e=0,t=1,r=1,s=0,i=0,o=0,a=0,d){if(isNaN(e)||isNaN(t)||isNaN(r)||isNaN(s)||isNaN(i)||isNaN(o)||isNaN(a))return null;let m=0;const h=n.local(e,t).daysInMonth;r<1&&(m=r-1,r=1),r>h&&(m=r-h,r=h);let l=0;t>12?(l=t-12,t=12):t<1&&(l=t-1,t=1);let f=0;i>59?(f=i-59,i=59):i<0&&(f=i,i=0);let T=0;o>59?(T=o-59,o=59):o<0&&(T=o,o=0);let w=0;a>999?(w=a-999,a=999):a<0&&(w=a,a=0);let y=n.fromObject({day:r,year:e,month:t,hour:s,minute:i,second:o,millisecond:a},{zone:u(d)});return 0!==l&&(y=y.plus({months:l})),0!==m&&(y=y.plus({days:m})),0!==f&&(y=y.plus({minutes:f})),0!==T&&(y=y.plus({seconds:T})),0!==w&&(y=y.plus({milliseconds:w})),new c(y)}static get systemTimeZoneCanonicalName(){return Intl.DateTimeFormat().resolvedOptions().timeZone??"system"}static arcadeDateAndZoneToArcadeDate(e,t){const n=u(t);return e.isUnknownTimeZone||n===i.instance?c.fromParts(e.year,e.monthJS+1,e.day,e.hour,e.minute,e.second,e.millisecond,n):new c(e._date.setZone(t))}static dateJSToArcadeDate(e){return new c(n.fromJSDate(e,{zone:"system"}))}static dateJSAndZoneToArcadeDate(e,t="system"){return new c(n.fromJSDate(e,{zone:t}))}static unknownEpochToArcadeDate(e){return new c(n.fromMillis(e,{zone:i.instance}))}static unknownDateJSToArcadeDate(e){return new c(n.fromMillis(e.getTime(),{zone:i.instance}))}static epochToArcadeDate(e,t="system"){return new c(n.fromMillis(e,{zone:t}))}static dateTimeToArcadeDate(e){return new c(e)}changeTimeZone(e){const t=u(e);return c.dateTimeToArcadeDate(this._date.setZone(t))}static dateTimeAndZoneToArcadeDate(e,t){const n=u(t);return e.zone===i.instance||n===i.instance?c.fromParts(e.year,e.month,e.day,e.hour,e.minute,e.second,e.millisecond,n):new c(e.setZone(n))}static nowToArcadeDate(e){return new c(n.fromJSDate(new Date,{zone:e}))}static nowUTCToArcadeDate(){return new c(n.utc())}get isSystem(){return"system"===this.timeZone||this.timeZone===c.systemTimeZoneCanonicalName}equals(e){return this.isSystem&&e.isSystem?this.toNumber()===e.toNumber():this.isUnknownTimeZone===e.isUnknownTimeZone&&this._date.equals(e._date)}get isUnknownTimeZone(){return this._date.zone===i.instance}get isValid(){return this._date.isValid}get hour(){return this._date.hour}get second(){return this._date.second}get day(){return this._date.day}get dayOfWeekISO(){return this._date.weekday}get dayOfWeekJS(){let e=this._date.weekday;return e>6&&(e=0),e}get millisecond(){return this._date.millisecond}get monthISO(){return this._date.month}get weekISO(){return this._date.weekNumber}get yearISO(){return this._date.weekYear}get monthJS(){return this._date.month-1}get year(){return this._date.year}get minute(){return this._date.minute}get zone(){return this._date.zone}get timeZoneOffset(){return this.isUnknownTimeZone?0:this._date.offset}get timeZone(){if(this.isUnknownTimeZone)return"unknown";if("system"===this._date.zone.type)return"system";const e=this.zone;return"fixed"===e.type?0===e.fixed?"utc":e.formatOffset(0,"short"):e.name}stringify(){return JSON.stringify(this.toJSDate())}plus(e){return new c(this._date.plus(e))}diff(e,t="milliseconds"){return this._date.diff(e._date,t)[t]}toISOString(e){return e?this._date.toISO({suppressMilliseconds:!0,includeOffset:!this.isUnknownTimeZone}):this._date.toISO({includeOffset:!this.isUnknownTimeZone})}toFormat(e,t){return this._date.toFormat(e,t)}toJSDate(){return this._date.toJSDate()}toSQLString(){return"timestamp '"+this._date.toFormat("yyyy-LL-dd HH:mm:ss")+"'"}toDateTime(){return this._date}toNumber(){return this._date.toMillis()}getTime(){return this._date.toMillis()}toUTC(){return new c(this._date.toUTC())}toLocal(){return new c(this._date.toLocal())}toString(){return this.toISOString(!0)}}function u(e){if(e instanceof r)return e;if("system"===e.toLowerCase())return"system";if("utc"===e.toLowerCase())return"utc";if("unknown"===e.toLowerCase())return i.instance;if(/^[\+\-]?[0-9]{1,2}([:][0-9]{2})?$/.test(e)){const t=s.parseSpecifier("UTC"+(e.startsWith("+")||e.startsWith("-")?"":"+")+e);if(t)return t}const n=t.create(e);if(!n.isValid)throw new d(o.TimeZoneNotRecognised);return n}export{c as ArcadeDate,d as ArcadeDateError,o as ArcadeDateErrorCodes,a as ArcadeDateErrorMessages,i as UnknownTimeZone,u as createDateTimeZone};