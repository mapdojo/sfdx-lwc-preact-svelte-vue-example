/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../../Color.js";import"../../../../core/has.js";import t from"../../../../core/Logger.js";import{isSome as i,unwrap as o,unwrapOr as r}from"../../../../core/maybe.js";import{O as n}from"../../../../chunks/vec3f64.js";import{f as s}from"../../../../chunks/vec4f64.js";import{SymbolUpdateType as a}from"./elevationAlignmentUtils.js";import{ElevationContext as l}from"./ElevationContext.js";import{zeroContext as p}from"./featureExpressionInfoUtils.js";import{mixinColorAndOpacity as c}from"./graphicUtils.js";import{ApplyRendererDiffResult as d}from"./interfaces.js";import{Loadable as h}from"./Loadable.js";import{defaultSymbolLayerComplexity as u}from"./symbolComplexity.js";const f=t.getLogger("esri.views.3d.layers.graphics.Graphics3DSymbolLayer");class y extends h{constructor(e,t,i,o){super(i.schedule),this.symbol=e,this.symbolLayer=t,this._context=i,this._elevationInfoOverride=null,this._ignoreDrivers=!1,this._drivenProperties={color:!1,opacity:!1,opacityAlwaysOpaque:!0,size:!1},this.complexity=null,this.logger=f,this._elevationOptions={supportsOffsetAdjustment:!1,supportsOnTheGround:!0},this._renderPriority=o.renderPriority,this._renderPriorityStep=o.renderPriorityStep,this._elevationContext=new l,this.complexity=this.computeComplexity(),this._ignoreDrivers=o.ignoreDrivers,this._ignoreDrivers||(this._drivenProperties=g(this._context.renderer)),this._updateElevationContext()}getCachedSize(){return null}get extentPadding(){return 0}_drivenPropertiesChanged(e){if(this._ignoreDrivers)return!1;const t=this._drivenProperties,i=g(e);return i.color!==t.color||i.opacity!==t.opacity||i.opacityAlwaysOpaque!==t.opacityAlwaysOpaque||i.size!==t.size}get needsDrivenTransparentPass(){return this._drivenProperties.opacity&&!this._drivenProperties.opacityAlwaysOpaque}_logGeometryCreationWarnings(e,t,i,o){const r=e.projectionSuccess,n="polygons"in e?e.polygons:null,s=`${o} geometry failed to be created`;let a=null;r?!this._logGeometryValidationWarnings(t,i,o)&&n&&0===n.length&&"rings"===i&&t.length>0&&t[0].length>2&&(a=`${s} (filled rings should use clockwise winding - try reversing the order of vertices)`):a=`${s} (failed to project geometry to view spatial reference)`,a&&f.warnOncePerTick(a)}_logGeometryValidationWarnings(e,t,i){const o=`${i} geometry failed to be created`;return!e.length||1===e.length&&!e[0].length?(f.warnOncePerTick(`${o} (no ${t} were defined)`),!0):(!Array.isArray(e)||!Array.isArray(e[0]))&&(f.warnOncePerTick(`${o} (${t} should be defined as a 2D array)`),!0)}_validateGeometry(e,t=null,o=null){if(i(t)&&!t.includes(e.type))return this.logger.warn("unsupported geometry type for "+o+` symbol: ${e.type}`),!1;if("point"===e.type){const t=e;if(!isFinite(t.x)||!isFinite(t.y))return f.warn("point coordinate is not a valid number, graphic skipped"),!1}return!0}_defaultElevationInfoNoZ(){return m}_defaultElevationInfoZ(){return _}_updateElevationContext(){i(this._elevationInfoOverride)?(this._elevationContext.setFromElevationInfo(this._elevationInfoOverride),this._elevationContext.updateFeatureExpressionInfoContext(null)):this._context.layer.elevationInfo?(this._elevationContext.setFromElevationInfo(this._context.layer.elevationInfo),this._elevationContext.updateFeatureExpressionInfoContext(this._context.featureExpressionInfoContext)):this._elevationContext.reset()}getDefaultElevationInfo(e){return e.hasZ?this._defaultElevationInfoZ():this._defaultElevationInfoNoZ()}getGeometryElevationMode(e,t=this.getDefaultElevationInfo(e)){return this._elevationContext.mode||t.mode}setElevationInfoOverride(e){this._elevationInfoOverride=e,this._updateElevationContext()}setGraphicElevationContext(e,t){const i=o(e.geometry),n=this.getDefaultElevationInfo(i);t.unit=null!=this._elevationContext.unit?this._elevationContext.unit:n.unit,t.mode=this.getGeometryElevationMode(i,n),t.offsetMeters=r(this._elevationContext.meterUnitOffset,r(n.offset,0));const s=!this._elevationOptions.supportsOnTheGround&&"on-the-ground"===t.mode;s&&(t.mode="relative-to-ground",t.offsetMeters=0);const a=s?p:this._elevationContext.featureExpressionInfoContext;return t.updateFeatureExpressionInfoContext(a,e,this._context.layer),t}prepareSymbolLayerPatch(e){}updateGeometry(e,t){return!1}onRemoveGraphic(e){}_getLayerOpacity(){if(this._context.graphicsCoreOwner&&"fullOpacity"in this._context.graphicsCoreOwner)return this._context.graphicsCoreOwner.fullOpacity??0;const e=this._context.layer.opacity;return e??1}_getCombinedOpacity(e,t=x){let o=1;return this.draped||(o*=this._getLayerOpacity()),this._drivenProperties.opacity||(i(e)?o*=e.a:t.hasIntrinsicColor||(o=0)),o}_getCombinedOpacityAndColor(t,o=x){const r=this._getCombinedOpacity(t,o);if(this._drivenProperties.color)return c(null,r);const s=i(t)?e.toUnitRGB(t):n;return c(s,r)}_getVertexOpacityAndColor(e,t=null){const o=this._drivenProperties.color?e.color:null,r=this._drivenProperties.opacity?e.opacity:null,n=c(o,r);return i(t)&&(n[0]*=t,n[1]*=t,n[2]*=t,n[3]*=t),n}isFastUpdatesEnabled(){return this._fastUpdates&&this._fastUpdates.enabled}computeComplexity(){return u(this.symbol,this.symbolLayer)}globalPropertyChanged(e,t,i){switch(e){case"opacity":return this.layerOpacityChanged(t,i),!0;case"elevationInfo":{const e=this._elevationContext.mode;this._updateElevationContext();return this.layerElevationInfoChanged(t,i,e)!==a.RECREATE}case"slicePlaneEnabled":return this.slicePlaneEnabledChanged(t,i);case"physicalBasedRenderingEnabled":return this.physicalBasedRenderingChanged();case"pixelRatio":return this.pixelRatioChanged();case"skipHighSymbolLods":return this.skipHighSymbolLodsChanged();default:return!1}}updateGraphics3DGraphicElevationInfo(e,t,o){let r=a.UPDATE;return e.forEach((e=>{const n=t(e);if(i(n)){const t=e.graphic;this.setGraphicElevationContext(t,n.elevationContext),n.needsElevationUpdates=o(n.elevationContext.mode)}else r=a.RECREATE})),r}applyRendererDiff(e,t){return d.Recreate_Symbol}getFastUpdateAttrValues(e){if(!this._fastUpdates.enabled)return null;const t=this._fastUpdates.visualVariables,i=t.size?v(t.size.field,e):0,o=t.color?v(t.color.field,e):0,r=t.opacity?v(t.opacity.field,e):0;return s(i,o,r,0)}get draped(){return this._draped}ensureDrapedStatus(e){return null==this._draped?(this._draped=e,!0):(e!==this.draped&&f.warnOnce("A symbol can only produce either draped or non-draped visualizations. Use two separate symbol instances for draped and non-draped graphics if necessary."),!1)}test(){const e=()=>({size:this._fastUpdates?.visualVariables?.size?.field??null,color:this._fastUpdates?.visualVariables?.color?.field??null,opacity:this._fastUpdates?.visualVariables?.opacity?.field??null,rotation:this._fastUpdates?.visualVariables?.rotation?.field??null});return{drivenProperties:this._drivenProperties,getVisVarFields:e}}}function v(e,t){const i=null!=e?t.attributes[e]:0;return null!=i&&isFinite(i)?i:0}function g(e){const t={color:!1,opacity:!1,opacityAlwaysOpaque:!0,size:!1};return e&&"visualVariables"in e&&e.visualVariables&&e.visualVariables.forEach((e=>{switch(e.type){case"color":if(t.color=!0,e.stops)for(let i=0;i<e.stops.length;i++){const o=e.stops[i].color;o&&(t.opacity=!0,o.a<1&&(t.opacityAlwaysOpaque=!1))}break;case"opacity":t.opacity=!0,t.opacityAlwaysOpaque=!1;break;case"size":t.size=!0}})),t}const m={mode:"on-the-ground",offset:0,unit:"meters"},_={mode:"absolute-height",offset:0,unit:"meters"},x={hasIntrinsicColor:!1};export{y as Graphics3DSymbolLayer,v as getAttributeValue};