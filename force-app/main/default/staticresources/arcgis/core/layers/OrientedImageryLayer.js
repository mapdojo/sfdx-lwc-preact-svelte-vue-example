/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import r from"../core/Error.js";import{property as o}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{subclass as t}from"../core/accessorSupport/decorators/subclass.js";import p from"./FeatureLayer.js";let i=class extends p{constructor(e){super(e),this.geometryType="point",this.type="oriented-imagery",this.operationalLayerType="OrientedImageryLayer"}_verifySource(){if(super._verifySource(),"point"!==this.geometryType)throw new r("feature-layer:invalid-geometry-type","OrientedImageryLayer only supports point geometry type")}};e([o()],i.prototype,"cameraProperties",void 0),e([o()],i.prototype,"coverage",void 0),e([o()],i.prototype,"coveragePercent",void 0),e([o()],i.prototype,"defaultSearchLocation",void 0),e([o()],i.prototype,"depthImage",void 0),e([o()],i.prototype,"digitalElevationModel",void 0),e([o()],i.prototype,"geometryType",void 0),e([o()],i.prototype,"imageProperties",void 0),e([o()],i.prototype,"maximumDistance",void 0),e([o({json:{read:!1},value:"oriented-imagery",readOnly:!0})],i.prototype,"type",void 0),e([o({type:["OrientedImageryLayer"]})],i.prototype,"operationalLayerType",void 0),i=e([t("esri.layers.OrientedImageryLayer")],i);const a=i;export{a as default};