/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{neverReached as o}from"../../../../../../../core/compilerUtils.js";import{packFloatRGBA as e}from"../../../../../../../core/floatRGBA.js";import has from"../../../../../../../core/has.js";import{DecodeSymbolColor as r}from"./DecodeSymbolColor.glsl.js";import{ShaderOutput as t}from"../../../../core/shaderLibrary/ShaderOutput.js";import{RgbaFloatEncoding as n}from"../../../../core/shaderLibrary/util/RgbaFloatEncoding.glsl.js";import{textureSize as a,texelFetch as d}from"../../../../core/shaderLibrary/util/WebGL2Utils.js";import{Float4DrawUniform as l}from"../../../../core/shaderModules/Float4DrawUniform.js";import{IntegerDrawUniform as i}from"../../../../core/shaderModules/IntegerDrawUniform.js";import{glsl as c}from"../../../../core/shaderModules/interfaces.js";import{createTexture2DDrawSizeUniforms as s}from"../../../../core/shaderModules/Texture2DDrawUniform.js";import{TextureSizeUniformType as x}from"../../../../core/shaderModules/TextureSizeUniformType.js";import{VertexAttribute as m}from"../../../../lib/VertexAttribute.js";var C;!function(o){o[o.Uniform=0]="Uniform",o[o.Varying=1]="Varying",o[o.COUNT=2]="COUNT"}(C||(C={}));const f=429496.7296;function u(o,r){e(o/f*.5+.5,r)}function p(e,r){switch(r.componentData){case C.Varying:return v(e,r);case C.Uniform:return M(e);case C.COUNT:return;default:o(r.componentData)}}function v(o,e){const{vertex:l,fragment:i}=o;l.include(n),l.uniforms.add(s("componentColorTex",(o=>o.componentParameters.texture.texture),e.hasWebGL2Context?x.None:x.Size)),o.attributes.add(m.COMPONENTINDEX,"float"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4");const C=e.output===t.ObjectAndLayerIdColor;C&&o.varyings.add("vObjectAndLayerIdColor","vec4"),o.include(r),l.constants.add("elevationScale","float",2*f),l.constants.add("stride","float",has("enable-feature:objectAndLayerId-rendering")?3:2),l.code.add(c`
  vec2 getComponentTextureCoordinates(float componentIndex, float typeOffset) {
    vec2 textureSize = ${a(e,"componentColorTex")};

    float index = componentIndex * stride + typeOffset;
    float coordX = mod(index, textureSize.x);
    float coordY = floor(index / textureSize.x);

    return vec2(coordX, coordY) + 0.5;
  }
  `),l.code.add(c`
  vec4 _readComponentColor() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 0.0);

    return ${d(e,"componentColorTex","textureCoordinates","1.0 / componentColorTexSize")};
   }

   float readElevationOffset() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 1.0);

    vec4 encodedElevation = ${d(e,"componentColorTex","textureCoordinates","1.0 / componentColorTexSize")};
    return (rgba2float(encodedElevation) - 0.5) * elevationScale;
  }

  ${C?c`
          void forwardObjectAndLayerIdColor() {
            vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 2.0);

            vObjectAndLayerIdColor = ${d(e,"componentColorTex","textureCoordinates","1.0 / componentColorTexSize")};
          }`:c`void forwardObjectAndLayerIdColor() {}`}

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor = _readComponentColor() * 255.0;

    float shadowFlag = mod(componentColor.b * 255.0, 2.0);
    componentColor.b -= shadowFlag;
    castShadows = shadowFlag >= 1.0;

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),i.code.add(c`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${C?c`gl_FragColor = vObjectAndLayerIdColor;`:""}
  }
`)}function M(o){const{vertex:e,fragment:r}=o;e.uniforms.add(new l("externalColor",(o=>o.componentParameters.externalColor))),r.uniforms.add(new i("externalColorMixMode",(o=>o.componentParameters.externalColorMixMode))),o.varyings.add("vExternalColor","vec4"),e.code.add(c`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {
}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`),r.code.add(c`void readExternalColor(out vec4 color, out int colorMixMode) {
color = vExternalColor;
colorMixMode = externalColorMixMode;
}
void outputObjectAndLayerIdColor() {
gl_FragColor = vec4(1.0,0.0,0.0,0.0);
}`)}export{p as ComponentData,C as ComponentDataType,f as MAX_ELEVATION_OFFSET,u as encodeElevationOffset};