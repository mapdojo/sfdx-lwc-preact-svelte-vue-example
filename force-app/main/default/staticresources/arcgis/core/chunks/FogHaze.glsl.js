/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{p as e}from"./mat4.js";import{c as r}from"./mat4f64.js";import{c as a}from"./vec3f64.js";import{TextureCoordinateAttribute as o,TextureCoordinateAttributeType as t}from"../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl.js";import{ReadLinearDepth as i}from"../views/3d/webgl-engine/core/shaderLibrary/output/ReadLinearDepth.glsl.js";import{Gamma as n}from"../views/3d/webgl-engine/core/shaderLibrary/shading/Gamma.glsl.js";import{Float2PassUniform as s}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{Float3PassUniform as d}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{FloatPassUniform as m}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{NoParameters as c,glsl as l}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{Matrix4PassUniform as f}from"../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform.js";import{ShaderBuilder as g}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as p}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{VertexAttribute as h}from"../views/3d/webgl-engine/lib/VertexAttribute.js";class u extends c{constructor(){super(...arguments),this.fogColor=a(),this.hazeColor=a(),this.fogStrength=4e-6,this.hazeStrength=4e-6,this.atmosphereC=1,this.fogAmount=0,this.hazeAmount=0}}function v(r){const a=new g;a.attributes.add(h.POSITION,"vec2"),a.include(o,{textureCoordinateType:t.Default}),a.varyings.add("worldRay","vec3"),a.varyings.add("eyeDir","vec3");const{vertex:c,fragment:u}=a;return c.uniforms.add([new f("inverseProjectionMatrix",((e,r)=>r.camera.inverseProjectionMatrix)),new f("inverseViewMatrix",((r,a)=>e(w,a.camera.viewMatrix)))]),c.code.add(l`void main(void) {
vec3 posViewNear = (inverseProjectionMatrix * vec4(position, -1, 1)).xyz;
eyeDir = posViewNear;
worldRay = (inverseViewMatrix * vec4(posViewNear, 0)).xyz;
forwardTextureCoordinates();
gl_Position = vec4(position, 1, 1);
}`),u.uniforms.add(new m("atmosphereC",(e=>e.atmosphereC))),u.uniforms.add(new d("cameraPosition",((e,r)=>r.camera.eye))),u.uniforms.add(new s("nearFar",((e,r)=>r.camera.nearFar))),u.uniforms.add(new p("depthTex",(e=>e.depthTexture))),u.uniforms.add(new m("fogStrength",(e=>r.haze?e.hazeStrength:e.fogStrength))),u.uniforms.add(new m("fogAmount",(e=>r.haze?e.hazeAmount:e.fogAmount))),u.uniforms.add(new d("fogColor",(e=>r.haze?e.hazeColor:e.fogColor))),a.include(n),u.include(i),u.code.add(l`vec2 sphereIntersect(vec3 start, vec3 dir) {
float a = dot(dir, dir);
float b = 2.0 * dot(dir, start);
float d = (b * b) - 4.0 * a * atmosphereC;
if (d < 0.0) {
return vec2(1e5, -1e5);
}
return vec2((-b - sqrt(d)) / (2.0 * a), (-b + sqrt(d)) / (2.0 * a));
}`),u.code.add(l`vec4 applyFog(float dist, vec3 rayDir){
if(dist == -1.0){
vec2 rayAtmosphereIntersect = sphereIntersect(cameraPosition, rayDir);
dist = 0.055 * rayAtmosphereIntersect.y;
}
float fogAmount = fogAmount * (1.0 - exp(-dist * fogStrength));
return vec4(fogAmount * fogColor, fogAmount);
}`),u.code.add(l`
    vec3 tonemapACES(vec3 x) {
      return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
    }

    void main() {
      vec3 rayDir = normalize(worldRay);
      float terrainDepth = -1.0;

      float depthSample = texture2D(depthTex, vuv0).r;
      float zNorm = 2.0 * depthSample - 1.0;
      float linDepth = 2.0 * nearFar[0] * nearFar[1] / (nearFar[1] + nearFar[0] - zNorm * (nearFar[1] - nearFar[0]));
      if(depthSample < 1.0 && depthSample > 0.0){
        vec3 cameraSpaceRay = normalize(eyeDir);
        cameraSpaceRay /= cameraSpaceRay.z;
        cameraSpaceRay *= linDepth;
        terrainDepth = max(0.0, length(cameraSpaceRay));
      }

      ${r.haze?l`
          if(terrainDepth == -1.0){
            gl_FragColor = vec4(0);
            return;
          }`:""}

      vec4 fog = applyFog(terrainDepth, rayDir);

      gl_FragColor = delinearizeGamma(vec4(tonemapACES(fog.rgb), fog.a));
    }
  `),a}const w=r(),y=Object.freeze(Object.defineProperty({__proto__:null,FogHazePassParameters:u,build:v},Symbol.toStringTag,{value:"Module"}));export{u as F,y as H,v as b};