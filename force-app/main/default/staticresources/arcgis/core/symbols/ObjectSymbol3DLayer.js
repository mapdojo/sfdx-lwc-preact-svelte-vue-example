/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as o}from"../chunks/tslib.es6.js";import{isSome as t}from"../core/maybe.js";import{property as e}from"../core/accessorSupport/decorators/property.js";import"../core/accessorSupport/ensureType.js";import"../core/arrayUtils.js";import{enumeration as r}from"../core/accessorSupport/decorators/enumeration.js";import{subclass as i}from"../core/accessorSupport/decorators/subclass.js";import s from"./Symbol3DLayer.js";import{ObjectSymbol3DLayerResource as p}from"./support/ObjectSymbol3DLayerResource.js";import{Symbol3DAnchorPosition3D as a}from"./support/Symbol3DAnchorPosition3D.js";import{Symbol3DMaterial as h}from"./support/Symbol3DMaterial.js";var n;let c=n=class extends s{constructor(o){super(o),this.material=null,this.castShadows=!0,this.resource=null,this.type="object",this.width=void 0,this.height=void 0,this.depth=void 0,this.anchor=void 0,this.anchorPosition=void 0,this.heading=void 0,this.tilt=void 0,this.roll=void 0}clone(){return new n({heading:this.heading,tilt:this.tilt,roll:this.roll,anchor:this.anchor,anchorPosition:this.anchorPosition&&this.anchorPosition.clone(),depth:this.depth,enabled:this.enabled,height:this.height,material:t(this.material)?this.material.clone():null,castShadows:this.castShadows,resource:this.resource&&this.resource.clone(),width:this.width})}get isPrimitive(){return!this.resource||"string"!=typeof this.resource.href}};o([e({type:h,json:{write:!0}})],c.prototype,"material",void 0),o([e({type:Boolean,nonNullable:!0,json:{write:!0,default:!0}})],c.prototype,"castShadows",void 0),o([e({type:p,json:{write:!0}})],c.prototype,"resource",void 0),o([r({Object:"object"},{readOnly:!0})],c.prototype,"type",void 0),o([e({type:Number,json:{write:!0}})],c.prototype,"width",void 0),o([e({type:Number,json:{write:!0}})],c.prototype,"height",void 0),o([e({type:Number,json:{write:!0}})],c.prototype,"depth",void 0),o([r({center:"center",top:"top",bottom:"bottom",origin:"origin",relative:"relative"}),e({json:{default:"origin"}})],c.prototype,"anchor",void 0),o([e({type:a,json:{type:[Number],read:{reader:o=>new a({x:o[0],y:o[1],z:o[2]})},write:{writer:(o,t)=>{t.anchorPosition=[o.x,o.y,o.z]},overridePolicy(){return{enabled:"relative"===this.anchor}}}}})],c.prototype,"anchorPosition",void 0),o([e({type:Number,json:{write:!0}})],c.prototype,"heading",void 0),o([e({type:Number,json:{write:!0}})],c.prototype,"tilt",void 0),o([e({type:Number,json:{write:!0}})],c.prototype,"roll",void 0),o([e({readOnly:!0})],c.prototype,"isPrimitive",null),c=n=o([i("esri.symbols.ObjectSymbol3DLayer")],c);const l=c;export{l as default};