/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../../../../../core/maybe.js";import{WGLGeometryType as t}from"../enums.js";import{createProgramDescriptor as o}from"../Utils.js";import a from"./WGLGeometryBrush.js";import{LabelMaterialKey as n}from"../materialKey/MaterialKey.js";import{CompareFunction as r,PrimitiveType as s,DataType as i}from"../../../../webgl/enums.js";const m=e=>o(e.data,{geometry:[{location:0,name:"a_pos",count:2,type:i.SHORT},{location:1,name:"a_id",count:4,type:i.UNSIGNED_BYTE},{location:2,name:"a_color",count:4,type:i.UNSIGNED_BYTE,normalized:!0},{location:3,name:"a_haloColor",count:4,type:i.UNSIGNED_BYTE,normalized:!0},{location:4,name:"a_texAndSize",count:4,type:i.UNSIGNED_BYTE},{location:5,name:"a_refSymbolAndPlacementOffset",count:4,type:i.UNSIGNED_BYTE},{location:6,name:"a_glyphData",count:4,type:i.UNSIGNED_BYTE},{location:7,name:"a_vertexOffset",count:2,type:i.SHORT},{location:8,name:"a_texCoords",count:2,type:i.UNSIGNED_SHORT}]});class l extends a{dispose(){}getGeometryType(){return t.LABEL}supportsSymbology(e){return!0}drawGeometry(t,o,a,l){const{context:u,painter:f,state:d,rendererInfo:c,requestRender:_,allowDelayedRender:p}=t,y=n.load(a.materialKey),E=y.mapAligned?1:0;if(!E&&Math.abs(o.key.level-Math.round(100*t.displayLevel)/100)>=1)return;const{bufferLayouts:N,attributes:U}=m(y),S=f.materialManager.getMaterialProgram(t,y,"materials/label",U,l);if(p&&e(_)&&!S.compiled)return void _();t.context.setStencilFunction(r.EQUAL,0,255),u.useProgram(S),this._setSharedUniforms(S,t,o),f.textureManager.bindTextures(u,S,y);const T=1===E?d.displayViewMat3:d.displayMat3;this._setSizeVVUniforms(y,S,c,o),S.setUniform1f("u_mapRotation",Math.floor(d.rotation/360*254)),S.setUniform1f("u_mapAligned",E),S.setUniformMatrix3fv("u_displayMat3",T),S.setUniform1f("u_opacity",1),S.setUniform2fv("u_screenSize",t.state.size);const g=a.target.getVAO(u,N,U),G=a.indexFrom*Uint32Array.BYTES_PER_ELEMENT;u.bindVAO(g),S.setUniform1f("u_isHaloPass",0),S.setUniform1f("u_isBackgroundPass",1),u.drawElements(s.TRIANGLES,a.indexCount,i.UNSIGNED_INT,G),S.setUniform1f("u_isHaloPass",1),S.setUniform1f("u_isBackgroundPass",0),u.drawElements(s.TRIANGLES,a.indexCount,i.UNSIGNED_INT,G),S.setUniform1f("u_isHaloPass",0),S.setUniform1f("u_isBackgroundPass",0),u.drawElements(s.TRIANGLES,a.indexCount,i.UNSIGNED_INT,G),u.setStencilTestEnabled(!0),u.setBlendingEnabled(!0)}}export{l as default};