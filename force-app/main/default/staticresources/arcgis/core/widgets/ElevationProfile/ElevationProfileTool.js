/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../core/Accessor.js";import{property as o}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as r}from"../../core/accessorSupport/decorators/subclass.js";import{ElevationProfileInteraction as i,State as s}from"./ElevationProfileInteraction.js";import{ElevationProfileState as a}from"./support/constants.js";import{ElevationProfileView as n}from"./support/ElevationProfileView.js";let c=class extends t{constructor(e){super(e),this.editable=!0,this.visible=!0,this.highlightEnabled=!0}initialize(){this.view=new n({tool:this}),this.interaction=new i({tool:this})}destroy(){this.interaction.destroy(),this.view.destroy()}get state(){const e=this.interaction?.state;switch(e){case s.Ready:return a.Ready;case s.Creating:return a.Creating;case s.Selecting:return a.Selecting;case s.Selected:return a.Selected;case s.Reshaping:case s.ReshapingDisabled:return a.Created}}};e([o({nonNullable:!0})],c.prototype,"viewModel",void 0),e([o()],c.prototype,"view",void 0),e([o()],c.prototype,"interaction",void 0),e([o()],c.prototype,"editable",void 0),e([o()],c.prototype,"visible",void 0),e([o()],c.prototype,"highlightEnabled",void 0),c=e([r("esri.widgets.ElevationProfile.ElevationProfileTool")],c);export{c as ElevationProfileTool};