/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../chunks/tslib.es6.js";import t from"../../../../core/Accessor.js";import r from"../../../../core/Evented.js";import{unwrap as s}from"../../../../core/maybe.js";import{property as o}from"../../../../core/accessorSupport/decorators/property.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import{subclass as n}from"../../../../core/accessorSupport/decorators/subclass.js";import{c as i}from"../../../../chunks/vec3f64.js";import{empty as c,expand as a,intersects as p}from"../../../../geometry/support/aaBoundingRect.js";import{TaskPriority as d,Task as u}from"../../../support/Scheduler.js";let l=class extends t{constructor(e){super(e),this._tileGeometryUpdateExtent=c(),this._tileGeometryUpdateSpatialReference=null,this.events=new r,this.updating=!1}initialize(){this.addHandles([this.surface.on("elevation-change",(e=>this._tileGeometryChanged(e))),this.scheduler.registerTask(d.SURFACE_GEOMETRY_UPDATES,this)])}get running(){return this.updating}runTask(){return this.updating?(this._tileGeometryUpdateSpatialReference&&this._centerIntersectsExtent(this._tileGeometryUpdateExtent,this._tileGeometryUpdateSpatialReference)&&this.events.emit("request-update",h),c(this._tileGeometryUpdateExtent),this._set("updating",!1),u.YIELD):u.YIELD}_tileGeometryChanged(e){this._tileGeometryUpdateSpatialReference=s(e.spatialReference),a(this._tileGeometryUpdateExtent,e.extent,this._tileGeometryUpdateExtent),this._set("updating",!0)}_furthestCenterOnSurface(){let e=this.centerOnSurfaces[0];for(let t=1;t<this.centerOnSurfaces.length;t++){const r=this.centerOnSurfaces[t];r.distance>e.distance&&(e=r)}return e}_centerIntersectsExtent(e,t){const r=this.state.contentCamera.eye,s=f,o=this._furthestCenterOnSurface();return this.renderCoordsHelper.fromRenderCoords(r,m,t),this.renderCoordsHelper.fromRenderCoords(o.renderLocation,y,t),m[0]<y[0]?(s[0]=m[0],s[2]=y[0]):(s[0]=y[0],s[2]=m[0]),m[1]<y[1]?(s[1]=m[1],s[3]=y[1]):(s[1]=y[1],s[3]=m[1]),p(s,e)}};e([o({constructOnly:!0})],l.prototype,"state",void 0),e([o({constructOnly:!0})],l.prototype,"centerOnSurfaces",void 0),e([o({constructOnly:!0})],l.prototype,"renderCoordsHelper",void 0),e([o({constructOnly:!0})],l.prototype,"scheduler",void 0),e([o({constructOnly:!0})],l.prototype,"surface",void 0),e([o({readOnly:!0})],l.prototype,"updating",void 0),l=e([n("esri.views.3d.support.SurfaceGeometryUpdates")],l);const h={},m=i(),y=i(),f=c();export{l as SurfaceGeometryUpdates};