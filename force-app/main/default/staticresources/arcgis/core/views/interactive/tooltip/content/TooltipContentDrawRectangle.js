/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../../../../chunks/tslib.es6.js";import{isSome as e}from"../../../../core/maybe.js";import"../../../../core/Logger.js";import"../../../../core/accessorSupport/ensureType.js";import"../../../../core/arrayUtils.js";import"../../../../core/Error.js";import"../../../../core/has.js";import{subclass as s}from"../../../../core/accessorSupport/decorators/subclass.js";import{CONTENT as o}from"../css.js";import{TooltipContent as r}from"./TooltipContent.js";import{TooltipContentWithHelpMessage as i}from"../support/TooltipContentWithHelpMessage.js";import{TooltipField as p}from"../support/TooltipField.js";import{ValueByValue as a}from"../support/ValueByValue.js";import"../../../../widgets/support/widgetUtils.js";import{tsx as m}from"../../../../widgets/support/jsxFactory.js";const l={base:`${o} ${`${o}--draw-rectangle`}`};let c=class extends r{render(){const{area:t,xSize:s,ySize:o,tooltipOptions:r}=this.info,{visibleElements:c}=r,n=this._messagesTooltip.sketch;return m(i,{className:l.base,helpMessage:this._getHelpMessage()},c.size&&e(s)&&e(o)&&m(p,{title:n.size,value:m(a,{left:this._formatLength(s),right:this._formatLength(o)})}),c.area&&m(p,{title:n.area,value:this._formatArea(t)}))}};c=t([s("esri.views.interactive.tooltip.content.TooltipContentDrawRectangle")],c);export{c as TooltipContentDrawRectangle};