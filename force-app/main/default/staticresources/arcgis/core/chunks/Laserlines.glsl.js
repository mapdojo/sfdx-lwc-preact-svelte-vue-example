/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{deg2rad as e}from"../core/mathUtils.js";import{s as i}from"./vec2.js";import{a as t}from"./vec2f64.js";import{b as n,n as a,l as o,i as r,m as l,c as s,f as c,a as d}from"./vec3.js";import{c as p}from"./vec3f64.js";import{t as f}from"./vec4.js";import{c as h}from"./vec4f64.js";import{pointAt as g}from"../geometry/support/lineSegment.js";import{create as m,fromPositionAndNormal as u}from"../geometry/support/plane.js";import{c as w}from"./sphere.js";import{Laserline as x}from"../views/3d/webgl-engine/core/shaderLibrary/Laserline.glsl.js";import{ScreenSpacePass as P}from"../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl.js";import{Float2PassUniform as v}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{Float3PassUniform as b}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{Float4PassUniform as D}from"../views/3d/webgl-engine/core/shaderModules/Float4PassUniform.js";import{FloatPassUniform as S}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as M}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as L}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";const C=e(6);function A(e){const i=new L;i.extensions.add("GL_OES_standard_derivatives"),i.include(P),i.include(x,e);const t=i.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(t.uniforms.add(new S("maxPixelDistance",((i,t)=>e.heightManifoldEnabled?2*t.camera.computeScreenPixelSizeAt(i.heightManifoldTarget):2*t.camera.computeScreenPixelSizeAt(i.lineVerticalPlaneSegment.origin)))),t.code.add(M`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){const e=(e,i,t)=>l(e,i.heightManifoldTarget,t.camera.viewMatrix),i=(e,i)=>l(e,[0,0,0],i.camera.viewMatrix);t.uniforms.add([new D("heightManifoldOrigin",((t,r)=>(e(T,t,r),i(_,r),n(_,_,T),a(G,_),G[3]=o(_),G))),new b("globalOrigin",((e,t)=>i(T,t))),new S("cosSphericalAngleThreshold",((e,i)=>1-Math.max(2,r(i.camera.eye,e.heightManifoldTarget)*i.camera.perRenderPixelRatio)/o(e.heightManifoldTarget)))]),t.code.add(M`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else t.code.add(M`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(t.uniforms.add(new S("maxPixelDistance",((e,i)=>2*i.camera.computeScreenPixelSizeAt(e.pointDistanceTarget)))),t.code.add(M`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&(t.uniforms.add(new S("perScreenPixelRatio",((e,i)=>i.camera.perScreenPixelRatio))),t.code.add(M`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`)),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&t.code.add(M`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),t.code.add(M`void main() {
vec3 pos;
vec3 normal;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, depthDiscontinuityAlpha)) {
discard;
}
vec4 color = vec4(0, 0, 0, 0);`),e.heightManifoldEnabled){t.uniforms.add([new v("angleCutoff",(e=>V(e))),new D("heightPlane",((e,i)=>z(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,T),i.camera.viewMatrix)))]);const i=e.spherical?M`normalize(globalOrigin - pos)`:M`heightPlane.xyz`;t.code.add(M`
    {
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, ${i})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);
    }
    `)}return e.pointDistanceEnabled&&(t.uniforms.add([new v("angleCutoff",(e=>V(e))),new D("pointDistanceSphere",((e,i)=>O(e,i)))]),t.code.add(M`{
float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);
}`)),e.lineVerticalPlaneEnabled&&(t.uniforms.add([new v("angleCutoff",(e=>V(e))),new D("lineVerticalPlane",((e,i)=>j(e,i))),new b("lineVerticalStart",((e,i)=>y(e,i))),new b("lineVerticalEnd",((e,i)=>E(e,i)))]),t.code.add(M`{
if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}
}`)),e.intersectsLineEnabled&&(t.uniforms.add([new v("angleCutoff",(e=>V(e))),new b("intersectsLineStart",((e,i)=>l(T,e.lineStartWorld,i.camera.viewMatrix))),new b("intersectsLineEnd",((e,i)=>l(T,e.lineEndWorld,i.camera.viewMatrix))),new b("intersectsLineDirection",((e,i)=>(s(G,e.intersectsLineSegment.vector),G[3]=0,a(T,f(G,G,i.camera.viewMatrix))))),new S("intersectsLineRadius",(e=>e.intersectsLineRadius))]),t.code.add(M`{
if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}
}`)),t.code.add(M`gl_FragColor = laserlineOutput(color * depthDiscontinuityAlpha);
}`),i}function V(t){return i(I,Math.cos(t.angleCutoff),Math.cos(Math.max(0,t.angleCutoff-e(2))))}function O(e,i){return l(W,e.pointDistanceOrigin,i.camera.viewMatrix),W[3]=r(e.pointDistanceOrigin,e.pointDistanceTarget),W}function j(e,i){const t=g(e.lineVerticalPlaneSegment,.5,T),n=e.renderCoordsHelper.worldUpAtPosition(t,R),o=a(_,e.lineVerticalPlaneSegment.vector),r=c(G,n,o);return a(r,r),z(e.lineVerticalPlaneSegment.origin,r,i.camera.viewMatrix)}function y(e,i){const t=s(T,e.lineVerticalPlaneSegment.origin);return e.renderCoordsHelper.setAltitude(t,0),l(t,t,i.camera.viewMatrix)}function E(e,i){const t=d(T,e.lineVerticalPlaneSegment.origin,e.lineVerticalPlaneSegment.vector);return e.renderCoordsHelper.setAltitude(t,0),l(t,t,i.camera.viewMatrix)}function z(e,i,t){return l(U,e,t),s(G,i),G[3]=0,f(G,G,t),u(U,G,F)}const I=t(),T=p(),G=h(),R=p(),_=p(),U=p(),F=m(),W=w(),H=Object.freeze(Object.defineProperty({__proto__:null,build:A,defaultAngleCutoff:C},Symbol.toStringTag,{value:"Module"}));export{H as L,A as b,C as d};