/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../../chunks/tslib.es6.js";import"../../../../core/Logger.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import"../../../../core/Error.js";import"../../../../core/has.js";import{subclass as e}from"../../../../core/accessorSupport/decorators/subclass.js";import{CONTENT as s}from"../css.js";import{TooltipContent as o}from"./TooltipContent.js";import{TooltipContentWithHelpMessage as r}from"../support/TooltipContentWithHelpMessage.js";import{TooltipField as i}from"../support/TooltipField.js";import{ValueByValue as p}from"../support/ValueByValue.js";import"../../../../widgets/support/widgetUtils.js";import{tsx as l}from"../../../../widgets/support/jsxFactory.js";const a={base:`${s} ${`${s}--extent-scale`}`};let c=class extends o{render(){const t=this.info,{visibleElements:e}=t.tooltipOptions,s=this._messagesTooltip.sketch;return l(r,{className:a.base,helpMessage:this._getHelpMessage()},e.size&&l(i,{title:s.size,value:l(p,{left:this._formatLength(t.xSize),right:this._formatLength(t.ySize)})}),e.scale&&l(i,{title:s.scale,value:l(p,{left:this._formatScale(t.xScale),right:this._formatScale(t.yScale)})}))}};c=t([e("esri.views.interactive.tooltip.content.TooltipContentExtentScale")],c);export{c as TooltipContentExtentScale};