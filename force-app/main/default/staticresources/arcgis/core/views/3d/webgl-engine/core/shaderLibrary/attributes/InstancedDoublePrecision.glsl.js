/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../../../chunks/tslib.es6.js";import{s as r}from"../../../../../../chunks/vec3.js";import{c as i}from"../../../../../../chunks/vec3f64.js";import{ShaderOutput as o}from"../ShaderOutput.js";import{DoublePrecision as n}from"../util/DoublePrecision.glsl.js";import{addViewNormal as a}from"../util/View.glsl.js";import{Float3DrawUniform as t}from"../../shaderModules/Float3DrawUniform.js";import{glsl as s}from"../../shaderModules/interfaces.js";import{ShaderTechniqueConfiguration as c,parameter as d}from"../../shaderTechnique/ShaderTechniqueConfiguration.js";import{VertexAttribute as l}from"../../../lib/VertexAttribute.js";import{encodeDoubleHi as m,encodeDoubleLo as u}from"../../../../../webgl/doublePrecisionUtils.js";class v extends c{constructor(){super(...arguments),this.instancedDoublePrecision=!1}}function p(e,i){i.instanced&&i.instancedDoublePrecision&&(e.attributes.add(l.MODELORIGINHI,"vec3"),e.attributes.add(l.MODELORIGINLO,"vec3"),e.attributes.add(l.MODEL,"mat3"),e.attributes.add(l.MODELNORMAL,"mat3"));const c=e.vertex;i.instancedDoublePrecision&&(c.include(n,i),c.uniforms.add(new t("viewOriginHi",((e,i)=>m(r(b,i.camera.viewInverseTransposeMatrix[3],i.camera.viewInverseTransposeMatrix[7],i.camera.viewInverseTransposeMatrix[11]),b)))),c.uniforms.add(new t("viewOriginLo",((e,i)=>u(r(b,i.camera.viewInverseTransposeMatrix[3],i.camera.viewInverseTransposeMatrix[7],i.camera.viewInverseTransposeMatrix[11]),b))))),c.code.add(s`
    vec3 calculateVPos() {
      ${i.instancedDoublePrecision?"return model * localPosition().xyz;":"return localPosition().xyz;"}
    }
    `),c.code.add(s`
    vec3 subtractOrigin(vec3 _pos) {
      ${i.instancedDoublePrecision?s`
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -modelOriginHi, -modelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),c.code.add(s`
    vec3 dpNormal(vec4 _normal) {
      ${i.instancedDoublePrecision?"return normalize(modelNormal * _normal.xyz);":"return normalize(_normal.xyz);"}
    }
    `),i.output===o.Normal&&(a(c),c.code.add(s`
    vec3 dpNormalView(vec4 _normal) {
      ${i.instancedDoublePrecision?"return normalize((viewNormal * vec4(modelNormal * _normal.xyz, 1.0)).xyz);":"return normalize((viewNormal * _normal).xyz);"}
    }
    `)),i.hasVertexTangents&&c.code.add(s`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${i.instancedDoublePrecision?"return vec4(modelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}

    }
    `)}e([d()],v.prototype,"instancedDoublePrecision",void 0);const b=i();export{v as InstancedDoubleConfiguration,p as InstancedDoublePrecision};