/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../core/Logger.js";import{EditableFlag as t}from"./interfaces.js";function o(t){return[t.on("before-add",(o=>{const i=o.item;if(null==i||t.includes(i))return e.getLogger("esri.views.interactive.interactiveToolUtils").warn("Tool is either already in the list of tools or tool is `null`. Not adding tool."),void o.preventDefault();i.onAdd()})),t.on("after-remove",(e=>{const t=e.item;t.active&&(t.view.activeTool=null),t.destroy()}))]}function i(e){return e.visible&&null!=e.getEditableFlag&&e.getEditableFlag(t.USER)&&e.getEditableFlag(t.MANAGER)}export{i as areToolManipulatorsEditable,o as getToolCollectionHandles};