/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../../chunks/tslib.es6.js";import"../../../../core/Logger.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import"../../../../core/Error.js";import"../../../../core/has.js";import{subclass as o}from"../../../../core/accessorSupport/decorators/subclass.js";import{CONTENT as s}from"../css.js";import{TooltipContent as e}from"./TooltipContent.js";import{TooltipContentWithHelpMessage as r}from"../support/TooltipContentWithHelpMessage.js";import{TooltipField as i}from"../support/TooltipField.js";import"../../../../widgets/support/widgetUtils.js";import{tsx as p}from"../../../../widgets/support/jsxFactory.js";const a={base:`${s} ${`${s}--extent-rotate`}`};let n=class extends e{render(){const{angle:t,tooltipOptions:o}=this.info,{visibleElements:s}=o,e=this._messagesTooltip.sketch;return p(r,{className:a.base,helpMessage:this._getHelpMessage()},s.rotation&&p(i,{title:e.rotation,value:this._formatRelativeOrientation(t)}))}};n=t([o("esri.views.interactive.tooltip.content.TooltipContentExtentRotate")],n);export{n as TooltipContentExtentRotate};