/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as s}from"../chunks/tslib.es6.js";import e from"./Accessor.js";import{assumeNonNull as i}from"./maybe.js";import{createDeferred as r,createAbortError as t,isAbortError as o}from"./promiseUtils.js";import{subclass as l}from"./accessorSupport/decorators/subclass.js";var h;!function(s){s[s.PENDING=0]="PENDING",s[s.RESOLVED=1]="RESOLVED",s[s.REJECTED=2]="REJECTED"}(h||(h={}));class n{constructor(s){this.instance=s,this._resolver=r(),this._status=h.PENDING,this._resolvingPromises=[],this._resolver.promise.then((()=>{this._status=h.RESOLVED,this._cleanUp()}),(()=>{this._status=h.REJECTED,this._cleanUp()}))}addResolvingPromise(s){this._resolvingPromises.push(s),this._tryResolve()}isResolved(){return this._status===h.RESOLVED}isRejected(){return this._status===h.REJECTED}isFulfilled(){return this._status!==h.PENDING}abort(){this._resolver.reject(t())}when(s,e){return this._resolver.promise.then(s,e)}_cleanUp(){this._allPromise=this._resolvingPromises=this._allPromise=null}_tryResolve(){if(this.isFulfilled())return;const s=r(),e=[...this._resolvingPromises,i(s.promise)],t=this._allPromise=Promise.all(e);t.then((()=>{this.isFulfilled()||this._allPromise!==t||this._resolver.resolve(this.instance)}),(s=>{this.isFulfilled()||this._allPromise!==t||o(s)||this._resolver.reject(s)})),s.resolve()}}const m=e=>{let i=class extends e{constructor(...s){super(...s),this._promiseProps=new n(this),this.addResolvingPromise(Promise.resolve())}isResolved(){return this._promiseProps.isResolved()}isRejected(){return this._promiseProps.isRejected()}isFulfilled(){return this._promiseProps.isFulfilled()}when(s,e){return new Promise(((s,e)=>{this._promiseProps.when(s,e)})).then(s,e)}catch(s){return this.when(null,s)}addResolvingPromise(s){s&&!this._promiseProps.isFulfilled()&&this._promiseProps.addResolvingPromise("_promiseProps"in s?s.when():s)}};return i=s([l("esri.core.Promise")],i),i};let _=class extends(m(e)){};_=s([l("esri.core.Promise")],_);export{_ as EsriPromise,m as EsriPromiseMixin};