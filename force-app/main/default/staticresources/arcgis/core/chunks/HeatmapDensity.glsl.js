/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{addProjViewLocalOrigin as e}from"../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl.js";import{FloatPassUniform as i}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as o}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as r}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{VertexAttribute as t}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function a(a){const s=new r,{vertex:d,fragment:u}=s;e(d,a);const{isAttributeDriven:n,usesHalfFloat:l}=a;return s.attributes.add(t.POSITION,"vec3"),s.attributes.add(t.UV0,"vec2"),n&&(s.attributes.add(t.FEATUREATTRIBUTE,"float"),s.varyings.add("attributeValue","float")),l&&s.constants.add("compressionFactor","float",.25),s.varyings.add("unitCirclePos","vec2"),d.uniforms.add(new i("radius",(({resolutionForScale:e,searchRadius:i},{camera:o,screenToWorldRatio:r})=>2*i*(0===e?1:e/r)*o.pixelRatio/o.fullViewport[2]))),d.code.add(o`
    void main() {
      unitCirclePos = uv0;

      vec4 posProj = proj * (view * vec4(${t.POSITION}, 1.0));
      vec4 quadOffset = vec4(unitCirclePos * radius, 0.0, 0.0);

      ${n?o`attributeValue = ${t.FEATUREATTRIBUTE};`:""}
      gl_Position = posProj + quadOffset;
    }
  `),u.code.add(o`
    void main() {
      float radiusRatioSquared = dot(unitCirclePos, unitCirclePos);
      if (radiusRatioSquared > 1.0) {
        discard;
      }

      float oneMinusRadiusRatioSquared = 1.0 - radiusRatioSquared;
      float density = oneMinusRadiusRatioSquared * oneMinusRadiusRatioSquared ${n?o` * attributeValue`:""} ${l?o` * compressionFactor`:""};
      gl_FragColor = vec4(density);
    }
  `),s}const s=Object.freeze(Object.defineProperty({__proto__:null,build:a},Symbol.toStringTag,{value:"Module"}));export{s as H,a as b};