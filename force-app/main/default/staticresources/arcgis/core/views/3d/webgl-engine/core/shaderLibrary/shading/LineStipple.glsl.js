/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as e}from"../../../../../../core/maybe.js";import{RgbaFloatEncoding as t}from"../util/RgbaFloatEncoding.glsl.js";import{addCameraPosition as i}from"../util/View.glsl.js";import{textureSize as o}from"../util/WebGL2Utils.js";import{Float4PassUniform as r}from"../../shaderModules/Float4PassUniform.js";import{FloatPassUniform as a}from"../../shaderModules/FloatPassUniform.js";import{glsl as l}from"../../shaderModules/interfaces.js";import{createTexture2DPassSizeUniforms as p}from"../../shaderModules/Texture2DPassUniform.js";import{TextureSizeUniformType as s}from"../../shaderModules/TextureSizeUniformType.js";import{STIPPLE_TEXTURE_PADDING as n,computeLongestPattern as d,computeTextureSize as c}from"../../../materials/StippleTextureRepository.js";import{ensureColor4 as f}from"../../../shaders/ensureColor4.js";function u(e,t){e.constants.add("stippleAlphaColorDiscard","float",.001),e.constants.add("stippleAlphaHighlightDiscard","float",.5),t.stippleEnabled?m(e,t):S(e)}function m(e,d){const c=!(d.draped&&d.stipplePreferContinuous),{vertex:u,fragment:m}=e;m.include(t),d.draped||(i(u,d),u.uniforms.add(new a("worldToScreenPerDistanceRatio",((e,t)=>1/t.camera.perScreenPixelRatio))),u.code.add(l`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),d.stippleRequiresClamp&&e.varyings.add("vStippleDistanceLimits","vec2"),d.stippleRequiresStretchMeasure&&e.varyings.add("vStipplePatternStretch","float"),u.code.add(l`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${x};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),u.code.add(l`vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {`),u.code.add(l`
    if (segmentLengthPseudoScreen >= ${c?"patternLength":"1e4"}) {
  `),u.uniforms.add(new a("pixelRatio",((e,t)=>t.camera.pixelRatio))),u.code.add(l`
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        ${d.stippleRequiresStretchMeasure?l`
              float stretch = repetitions / flooredRepetitions;

              // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
              // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
              vStipplePatternStretch = max(0.75, stretch);`:""}

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),m.constants.add("stippleTexturePadding","float",n);const S=d.hasWebGL2Context?s.None:s.Size;m.uniforms.add(p("stipplePatternTexture",(e=>e.stippleTexture),S)),m.uniforms.add([new a("stipplePatternSDFNormalizer",(e=>h(e.stipplePattern))),new a("stipplePatternPixelSizeInv",(e=>1/g(e)))]),m.code.add(l`
    float padStippleTexture(float u) {
      float paddedTextureSize = ${o(d,"stipplePatternTexture")}.x;
      float unpaddedTextureSize = paddedTextureSize - stippleTexturePadding;

      return (u * unpaddedTextureSize + stippleTexturePadding * 0.5) / paddedTextureSize;
    }
  `),m.code.add(l`
    float getStippleSDF(out bool isClamped) {
      ${d.stippleRequiresClamp?l`
          float stippleDistanceClamped = clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y);
          vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
          isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;`:l`
          float stippleDistanceClamped = vStippleDistance;
          isClamped = false;`}

      float u = stippleDistanceClamped * gl_FragCoord.w * stipplePatternPixelSizeInv;
      ${d.stippleScaleWithLineWidth?l`u *= vLineSizeInv;`:""}
      u = padStippleTexture(fract(u));

      float encodedSDF = rgba2float(texture2D(stipplePatternTexture, vec2(u, 0.5)));
      float sdf = (encodedSDF * 2.0 - 1.0) * stipplePatternSDFNormalizer;

      ${d.stippleRequiresStretchMeasure?l`return (sdf - 0.5) * vStipplePatternStretch + 0.5;`:l`return sdf;`}
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha() {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);

      float antiAliasedResult = ${d.stippleScaleWithLineWidth?l`clamp(stippleSDF * vLineWidth + 0.5, 0.0, 1.0);`:l`clamp(stippleSDF + 0.5, 0.0, 1.0);`}

      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }
  `),d.stippleOffColorEnabled?(m.uniforms.add(new r("stippleOffColor",(e=>f(e.stippleOffColor)))),m.code.add(l`#define discardByStippleAlpha(stippleAlpha, threshold) {}
#define blendStipple(color, stippleAlpha) mix(color, stippleOffColor, stippleAlpha)`)):m.code.add(l`#define discardByStippleAlpha(stippleAlpha, threshold) if (stippleAlpha < threshold) { discard; }
#define blendStipple(color, stippleAlpha) vec4(color.rgb, color.a * stippleAlpha)`)}function S(e){e.fragment.code.add(l`float getStippleAlpha() { return 1.0; }
#define discardByStippleAlpha(_stippleAlpha_, _threshold_) {}
#define blendStipple(color, _stippleAlpha_) color`)}function h(t){return e(t)?(Math.floor(.5*(d(t)-1))+.5)/t.pixelRatio:1}function g(t){const i=t.stipplePattern;return e(i)?c(t.stipplePattern)/i.pixelRatio:1}const x=l.float(.4);export{u as LineStipple,g as computePixelSize};