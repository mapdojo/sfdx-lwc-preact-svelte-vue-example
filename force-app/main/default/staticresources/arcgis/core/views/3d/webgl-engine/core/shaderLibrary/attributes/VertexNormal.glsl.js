/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{neverReached as r}from"../../../../../../core/compilerUtils.js";import{c as o}from"../../../../../../chunks/mat3f64.js";import{c as a}from"../../../../../../chunks/vec4f64.js";import{NormalAttributeType as e,NormalAttribute as l}from"./NormalAttribute.glsl.js";import{VertexPosition as m,VertexPositionPassParameters as s,VertexPositionDrawParameters as t}from"./VertexPosition.glsl.js";import{glsl as d}from"../../shaderModules/interfaces.js";import{Matrix3DrawUniform as i}from"../../shaderModules/Matrix3DrawUniform.js";import{Matrix3PassUniform as n}from"../../shaderModules/Matrix3PassUniform.js";function c(o,a){switch(a.normalType){case e.Attribute:case e.CompressedAttribute:o.include(l,a),o.varyings.add("vNormalWorld","vec3"),o.varyings.add("vNormalView","vec3"),o.vertex.uniforms.add([new i("transformNormalGlobalFromModel",(r=>r.transformNormalGlobalFromModel)),new n("transformNormalViewFromGlobal",(r=>r.transformNormalViewFromGlobal))]),o.vertex.code.add(d`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case e.Ground:o.include(m,a),o.varyings.add("vNormalWorld","vec3"),o.vertex.code.add(d`
        void forwardNormal() {
          vNormalWorld = ${a.spherical?d`normalize(vPositionWorldCameraRelative);`:d`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case e.ScreenDerivative:o.vertex.code.add(d`void forwardNormal() {}`);break;default:r(a.normalType);case e.COUNT:}}class f extends s{constructor(){super(...arguments),this.transformNormalViewFromGlobal=o()}}class v extends t{constructor(){super(...arguments),this.transformNormalGlobalFromModel=o(),this.toMapSpace=a()}}export{c as VertexNormal,v as VertexNormalDrawParameters,f as VertexNormalPassParameters};