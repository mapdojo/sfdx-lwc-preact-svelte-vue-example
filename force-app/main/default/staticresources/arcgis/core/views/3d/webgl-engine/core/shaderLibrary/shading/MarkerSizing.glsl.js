/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as e}from"../../../../../../core/maybe.js";import{MARKER_SIZE_PER_LINE_WIDTH as r}from"../../../../support/engineContent/marker.js";import{FloatPassUniform as o}from"../../shaderModules/FloatPassUniform.js";import{glsl as a}from"../../shaderModules/interfaces.js";import{LineMarkerSpace as t}from"../../../shaders/LineMarkerTechniqueConfiguration.js";function i(i,n){const d=i.vertex;i.constants.add("markerSizePerLineWidth","float",r),d.uniforms.add(new o("pixelRatio",((e,r)=>r.camera.pixelRatio))),e(d.uniforms.get("markerScale"))&&d.constants.add("markerScale","float",1),d.code.add(a`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),n.space===t.World&&(d.constants.add("maxSegmentLengthFraction","float",.45),d.uniforms.add(new o("perRenderPixelRatio",((e,r)=>r.camera.perRenderPixelRatio))),d.code.add(a`float getWorldMarkerSize(vec4 pos) {
float distanceToCamera = length(pos.xyz);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
return getScreenMarkerSize() * screenToWorldRatio;
}
bool areWorldMarkersHidden(vec4 pos, vec4 other) {
vec3 midPoint = mix(pos.xyz, other.xyz, 0.5);
float distanceToCamera = length(midPoint);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
float worldMarkerSize = getScreenMarkerSize() * screenToWorldRatio;
float segmentLen = length(pos.xyz - other.xyz);
return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
}`))}export{i as MarkerSizing};