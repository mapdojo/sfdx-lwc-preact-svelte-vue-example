/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import r from"../core/Logger.js";import{isNone as o}from"../core/maybe.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import"../core/Error.js";import"../core/has.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import{OwningCollection as t}from"../core/support/OwningCollection.js";let i=class extends t{constructor(e){super(e),this.handles.add(this.on("before-add",(e=>{o(e.item)||e.item.parent===this.owner&&(r.getLogger(this.declaredClass).warn("Analysis inside the collection must be unique. Not adding this element again."),e.preventDefault())})))}_own(e){e.parent=this.owner}_release(e){e.parent=null}};i=e([s("esri.support.AnalysesCollection")],i);export{i as AnalysesCollection};