/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ShaderOutput as e}from"./ShaderOutput.js";import{VertexPosition as r}from"./attributes/VertexPosition.glsl.js";import{Float2PassUniform as a}from"../shaderModules/Float2PassUniform.js";import{glsl as o}from"../shaderModules/interfaces.js";function t(e){e.varyings.add("linearDepth","float")}function i(e){e.vertex.uniforms.add(new a("nearFar",((e,r)=>r.camera.nearFar)))}function n(e){e.vertex.code.add(o`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function d(a,d){const{vertex:s}=a;switch(d.output){case e.Color:if(d.receiveShadows)return t(a),void s.code.add(o`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case e.Depth:case e.Shadow:case e.ShadowHighlight:case e.ShadowExcludeHighlight:return a.include(r,d),t(a),i(a),n(a),void s.code.add(o`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}s.code.add(o`void forwardLinearDepth() {}`)}export{d as ForwardLinearDepth,n as addCalculateLinearDepth,t as addLinearDepth,i as addNearFar};