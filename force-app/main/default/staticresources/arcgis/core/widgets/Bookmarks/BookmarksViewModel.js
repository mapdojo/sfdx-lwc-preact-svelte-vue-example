/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import e from"../../Viewpoint.js";import o from"../../core/Collection.js";import i from"../../core/Error.js";import r from"../../core/Evented.js";import{isSome as a}from"../../core/maybe.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import{cast as n}from"../../core/accessorSupport/decorators/cast.js";import"../../core/arrayUtils.js";import{subclass as c}from"../../core/accessorSupport/decorators/subclass.js";import{SlideThumbnail as p}from"../../webdoc/support/SlideThumbnail.js";import m from"../../webmap/Bookmark.js";import{GoToMixin as l}from"../support/GoTo.js";const u=o.ofType(m),k={width:128,height:128,format:"png"},w={takeScreenshot:!0,captureViewpoint:!0,captureRotation:!0,captureScale:!0,captureTimeExtent:!0},d={time:!0};let h=class extends(l(r.EventedAccessor)){constructor(t){super(t),this.abilities={...d},this.activeBookmark=null,this.view=null}destroy(){this.view=null,this._set("activeBookmark",null)}castAbilities(t){return{...d,...t}}get bookmarks(){return this.view?.map?.bookmarks??new u}set bookmarks(t){this._overrideIfSome("bookmarks",t)}set defaultCreateOptions(t){this._set("defaultCreateOptions",{...w,...t})}get defaultCreateOptions(){return w}set defaultEditOptions(t){this._set("defaultEditOptions",{...w,...t})}get defaultEditOptions(){return w}get state(){const t=this.get("view");return t&&!t.ready?"loading":"ready"}async createBookmark(t){const{view:e,defaultCreateOptions:o,abilities:r}=this;if(!e)throw new i("create-bookmark:invalid-view","Cannot create a bookmark without a view.");const{takeScreenshot:s,screenshotSettings:n,captureViewpoint:c,captureRotation:p,captureScale:l,captureTimeExtent:u}={...o,...t},k=s?await this._createThumbnail(n):void 0,w=r.time&&u&&a(e.timeExtent)?e.timeExtent.clone():void 0;return new m({...k&&{thumbnail:k},...u&&{timeExtent:w},...c&&{viewpoint:this._createViewpoint({view:e,captureScale:l,captureRotation:p})}})}async editBookmark(t,e){const{view:o,defaultEditOptions:r}=this;if(!o)throw new i("edit-bookmark:invalid-view","Cannot edit a bookmark without a view.");const{takeScreenshot:s,screenshotSettings:n,captureViewpoint:c,captureRotation:p,captureScale:m,captureTimeExtent:l}={...r,...e},u=s?await this._createThumbnail(n):void 0;return u&&(t.thumbnail=u),c&&(t.viewpoint=this._createViewpoint({view:o,captureScale:m,captureRotation:p})),l&&a(o.timeExtent)&&(t.timeExtent=o.timeExtent.clone()),this.emit("bookmark-edit",{bookmark:t}),t}goTo(t){const{abilities:e,view:o}=this;if(!o)throw new i("go-to:invalid-view","Cannot go to a bookmark without a view");const r=t?.viewpoint;if(!r)throw new i("go-to:invalid-bookmark","Cannot go to a bookmark that does not contain a 'viewpoint'.",{bookmark:t});this._set("activeBookmark",t);const a={target:r},s=this.callGoTo(a),n=t?.timeExtent;return e.time&&n&&(o.timeExtent=n),this.emit("bookmark-select",{bookmark:t}),s.catch((()=>{})).then((()=>this._set("activeBookmark",null))),s}async _createThumbnail(t){const e=await this.view.takeScreenshot({...k,...t});return new p({url:e.dataUrl})}_createViewpoint({view:t,captureRotation:o,captureScale:i}){const r=t.viewpoint?.clone();return new e({targetGeometry:t.extent?.clone(),rotation:o&&r?.rotation||0,scale:i&&r?.scale||0})}};t([s()],h.prototype,"abilities",void 0),t([n("abilities")],h.prototype,"castAbilities",null),t([s({readOnly:!0})],h.prototype,"activeBookmark",void 0),t([s({type:u})],h.prototype,"bookmarks",null),t([s()],h.prototype,"defaultCreateOptions",null),t([s()],h.prototype,"defaultEditOptions",null),t([s({readOnly:!0})],h.prototype,"state",null),t([s()],h.prototype,"view",void 0),h=t([c("esri.widgets.Bookmarks.BookmarksViewModel")],h);const v=h;export{v as default};