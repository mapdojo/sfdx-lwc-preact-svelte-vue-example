/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{MAX_ELEVATION_OFFSET as o}from"../../../collections/Component/Material/shader/ComponentData.glsl.js";import{DoublePrecision as e}from"../../../core/shaderLibrary/util/DoublePrecision.glsl.js";import{RgbaFloatEncoding as r}from"../../../core/shaderLibrary/util/RgbaFloatEncoding.glsl.js";import{textureSize as t,texelFetch as a}from"../../../core/shaderLibrary/util/WebGL2Utils.js";import{Float3DrawUniform as n}from"../../../core/shaderModules/Float3DrawUniform.js";import{Float3PassUniform as l}from"../../../core/shaderModules/Float3PassUniform.js";import{FloatPassUniform as d}from"../../../core/shaderModules/FloatPassUniform.js";import{glsl as s}from"../../../core/shaderModules/interfaces.js";import{Matrix3DrawUniform as m}from"../../../core/shaderModules/Matrix3DrawUniform.js";import{Matrix3PassUniform as i}from"../../../core/shaderModules/Matrix3PassUniform.js";import{Matrix4PassUniform as c}from"../../../core/shaderModules/Matrix4PassUniform.js";import{createTexture2DDrawSizeUniforms as f}from"../../../core/shaderModules/Texture2DDrawUniform.js";import{TextureSizeUniformType as u}from"../../../core/shaderModules/TextureSizeUniformType.js";import{VertexAttribute as v}from"../../../lib/VertexAttribute.js";function p(p,x){const F=p.vertex;F.include(r),F.uniforms.add(new d("distanceFalloffFactor",(o=>o.distanceFalloffFactor))),F.code.add(s`float distanceBasedPerspectiveFactor(float distance) {
return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
}`),F.uniforms.add(f("componentDataTex",(o=>o.componentDataTexture),x.hasWebGL2Context?u.None:u.InvSize)),p.attributes.add(v.COMPONENTINDEX,"float"),F.constants.add("componentColorFieldOffset","float",0),F.constants.add("componentOtherFieldOffset","float",1),F.constants.add("componentVerticalOffsetFieldOffset","float",2),F.constants.add("componentFieldCount","float",3),F.constants.add("lineWidthFractionFactor","float",8),F.constants.add("extensionLengthOffset","float",128),F.constants.add("verticalOffsetScale","float",2*o),F.code.add(s`
    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {
      float fieldIndex = componentFieldCount * componentIndex + fieldOffset;

      vec2 textureSizeInverse = ${t(x,"componentDataTex",!0)};

      float colIndex = mod(fieldIndex, 1.0 / textureSizeInverse.x);
      float rowIndex = floor(fieldIndex * textureSizeInverse.x);

      return vec2(colIndex, rowIndex) + 0.5;
    }

    struct ComponentData {
      vec4 color;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec2 colorIndex = _componentTextureCoords(componentIndex, componentColorFieldOffset);
      vec2 otherIndex = _componentTextureCoords(componentIndex, componentOtherFieldOffset);
      vec2 verticalOffsetIndex = _componentTextureCoords(componentIndex, componentVerticalOffsetFieldOffset);

      vec4 colorValue = ${a(x,"componentDataTex","colorIndex")};
      vec4 otherValue = ${a(x,"componentDataTex","otherIndex")};
      float verticalOffset = (rgba2float(${a(x,"componentDataTex","verticalOffsetIndex")}) - 0.5) * verticalOffsetScale;

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity
        otherValue.x * (255.0 / lineWidthFractionFactor),
        otherValue.y * 255.0 - extensionLengthOffset,
        -(otherValue.z * 255.0) + 0.5, // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
        verticalOffset
      );
    }
  `),x.legacy?F.code.add(s`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(F.uniforms.add(new m("transformNormalGlobalFromModel",(o=>o.transformNormalGlobalFromModel))),F.code.add(s`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`)),x.silhouette?(p.attributes.add(v.NORMALA,"vec3"),p.attributes.add(v.NORMALB,"vec3"),F.code.add(s`vec3 worldNormal() {
return _modelToWorldNormal(normalize(normalA + normalB));
}`)):(p.attributes.add(v.NORMAL,"vec3"),F.code.add(s`vec3 worldNormal() {
return _modelToWorldNormal(normal);
}`)),x.legacy?F.code.add(s`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(F.include(e,x),F.include(e,x),F.uniforms.add([new i("transformViewFromCameraRelativeRS",(o=>o.transformViewFromCameraRelativeRS)),new m("transformWorldFromModelRS",(o=>o.transformWorldFromModelRS)),new n("transformWorldFromModelTL",(o=>o.transformWorldFromModelTL)),new n("transformWorldFromModelTH",(o=>o.transformWorldFromModelTH)),new l("transformWorldFromViewTL",(o=>o.transformWorldFromViewTL)),new l("transformWorldFromViewTH",(o=>o.transformWorldFromViewTH))]),F.code.add(s`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
        vec3 rotatedModelPosition = transformWorldFromModelRS * modelPos;

        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${x.spherical?s`normalize(transformWorldFromModelTL + rotatedModelPosition);`:s`vec3(0.0, 0.0, 1.0);`}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),F.uniforms.add(new c("transformProjFromView",((o,e)=>e.camera.projectionMatrix))),F.code.add(s`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),F.code.add(s`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function x(o){return o.mode===w.SKETCH||o.mode===w.MIXED}function F(o){return o.mode===w.SOLID||o.mode===w.MIXED}var w,M;!function(o){o[o.SOLID=0]="SOLID",o[o.SKETCH=1]="SKETCH",o[o.MIXED=2]="MIXED",o[o.COUNT=3]="COUNT"}(w||(w={})),function(o){o[o.REGULAR=0]="REGULAR",o[o.SILHOUETTE=1]="SILHOUETTE"}(M||(M={}));export{M as EdgeSilhouette,p as EdgeUtil,w as EdgeUtilMode,x as usesSketchLogic,F as usesSolidLogic};