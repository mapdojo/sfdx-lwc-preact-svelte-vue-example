/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Z as e}from"./vec3f64.js";import{RasterColorizerType as a,RasterColorizerStretchType as o}from"../views/2d/engine/imagery/enums.js";import{Colormap as l}from"../views/3d/webgl-engine/core/shaderLibrary/raster/Colormap.glsl.js";import{CommonPassParameters as r,Common as i}from"../views/3d/webgl-engine/core/shaderLibrary/raster/Common.glsl.js";import{TileBackground as t}from"../views/3d/webgl-engine/core/shaderLibrary/terrain/TileBackground.glsl.js";import{TileComposite as u}from"../views/3d/webgl-engine/core/shaderLibrary/terrain/TileComposite.glsl.js";import{ColorConversion as n}from"../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl.js";import{BooleanPassUniform as s}from"../views/3d/webgl-engine/core/shaderModules/BooleanPassUniform.js";import{Float2PassUniform as c}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{FloatPassUniform as m}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{FloatsPassUniform as d}from"../views/3d/webgl-engine/core/shaderModules/FloatsPassUniform.js";import{IntegerPassUniform as f}from"../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform.js";import{glsl as g}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as p}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as x}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";class v extends r{constructor(a,o,l,r,i,t){super(a,r,i),this.colormap=o,this.symbolizer=l,this.u_colormap=t,this.backgroundColor=e,this.fboTexture=null,this.baseOpacity=1}}class _ extends v{}class y extends v{}function h(e){const o=new p;return o.include(u),o.include(i,e),o.include(l,e),o.include(t,e),o.fragment.code.add(g`vec4 applyBackgroundBlend(vec4 layerColor) {
vec4 bgColor = getBackground(vuv);
return blendLayers(bgColor, layerColor, u_opacity);
}`),e.colorizerType===a.Stretch?C(o,e):e.colorizerType===a.Lut?b(o):e.colorizerType===a.Hillshade&&w(o,e),o}function b(e){e.fragment.code.add(g`void main() {
vec2 pixelLocation = getPixelLocation(uv);
if (isOutside(pixelLocation)) {
gl_FragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
return;
}
vec4 currentPixel = getPixel(pixelLocation);
gl_FragColor = applyBackgroundBlend(colormap(currentPixel, true));
}`)}function C(e,a){e.fragment.uniforms.add([new f("u_bandCount",(e=>e.symbolizer.u_bandCount)),new d("u_minCutOff",(e=>e.symbolizer.u_minCutOff),3),new d("u_maxCutOff",(e=>e.symbolizer.u_maxCutOff),3),new d("u_factor",(e=>e.symbolizer.u_factor),3),new m("u_minOutput",(e=>e.symbolizer.u_minOutput)),new m("u_maxOutput",(e=>e.symbolizer.u_maxOutput)),new s("u_useGamma",(e=>e.symbolizer.u_useGamma)),new d("u_gamma",(e=>e.symbolizer.u_gamma),3),new d("u_gammaCorrection",(e=>e.symbolizer.u_gammaCorrection),3),new m("u_opacity",(e=>e.common.u_opacity))]),e.fragment.code.add(g`float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {
if (val >= maxCutOff) {
return maxOutput;
} else if (val <= minCutOff) {
return minOutput;
}
float stretchedVal;
if (useGamma) {
float tempf = 1.0;
float outRange = maxOutput - minOutput;
float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);
if (gamma > 1.0) {
tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);
}
stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;
} else {
stretchedVal = minOutput + (val - minCutOff) * factor;
}
return stretchedVal;
}`);const l=a.applyColormap?g`gl_FragColor = applyBackgroundBlend(colormap(vec4(grayVal, grayVal, grayVal, currentPixel.a), !u_useGamma));`:g`gl_FragColor = applyBackgroundBlend(vec4(grayVal, grayVal, grayVal, currentPixel.a));`;e.fragment.code.add(g`
      void main() {
        vec2 pixelLocation = getPixelLocation(uv);
        if (isOutside(pixelLocation)) {
          gl_FragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
          return;
        }

        vec4 currentPixel = getPixel(pixelLocation);
        ${a.stretchType===o.Noop?g`
        gl_FragColor = applyBackgroundBlend(currentPixel);`:g`
        if (currentPixel.a == 0.0) {
          gl_FragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
          return;
        }
        if (u_bandCount == 1) {
          float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
          ${l}
        } else {
          float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
          float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);
          float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);
          gl_FragColor = applyBackgroundBlend(vec4(redVal, greenVal, blueVal, currentPixel.a));
        }`}
      }`)}function w(e,a){const o=e.fragment;o.uniforms.add([new x("u_image",(e=>e.u_image)),new f("u_hillshadeType",(e=>e.symbolizer.u_hillshadeType)),new d("u_sinZcosAs",(e=>e.symbolizer.u_sinZcosAs),6),new d("u_sinZsinAs",(e=>e.symbolizer.u_sinZsinAs),6),new d("u_cosZs",(e=>e.symbolizer.u_cosZs),6),new d("u_weights",(e=>e.symbolizer.u_weights),6),new c("u_factor",(e=>e.symbolizer.u_factor)),new m("u_minValue",(e=>e.symbolizer.u_minValue)),new m("u_maxValue",(e=>e.symbolizer.u_maxValue)),new c("u_srcImageSize",(e=>e.common.u_srcImageSize))]),o.include(n),o.code.add(g`vec4 overlay(float val, float minValue, float maxValue, float hillshade, float alpha) {
val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);
vec4 color = colormap(vec4(val, val, val, 1.0), false);
vec3 hsv = rgb2hsv(color.rgb);
hsv.z = hillshade;
return vec4(hsv2rgb(hsv), 1.0) * alpha * color.a;
}`),o.code.add(g`float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){
if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {
return 0.0;
}  else {
return e;
}
}`);const l=a.applyColormap?g`gl_FragColor = applyBackgroundBlend(overlay(ve.r, u_minValue, u_maxValue, hillshade, alpha));`:g`hillshade *= alpha;
gl_FragColor = applyBackgroundBlend(vec4(hillshade, hillshade, hillshade, alpha));`;o.code.add(g`
    void main() {
      vec2 pixelLocation = getPixelLocation(uv);
      if (isOutside(pixelLocation)) {
        gl_FragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      vec4 currentPixel = getPixel(pixelLocation);
      if (currentPixel.a == 0.0) {
        gl_FragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      //mirror edge pixels
      vec2 axy = vec2(-1.0, -1.0);
      vec2 bxy = vec2(0.0, -1.0);
      vec2 cxy = vec2(1.0, -1.0);
      vec2 dxy = vec2(-1.0, 0.0);
      vec2 fxy = vec2(1.0, 0.0);
      vec2 gxy = vec2(-1.0, 1.0);
      vec2 hxy = vec2(0.0, 1.0);
      vec2 ixy = vec2(1.0, 1.0);
      vec2 onePixel = 1.0 / u_srcImageSize;
      if (pixelLocation.s < onePixel.s) {
        axy[0] = 1.0;
        dxy[0] = 1.0;
        gxy[0] = 1.0;
      }
      if (pixelLocation.t < onePixel.t) {
        axy[1] = 1.0;
        bxy[1] = 1.0;
        cxy[1] = 1.0;
      }
      if (pixelLocation.s > 1.0 - onePixel.s) {
        cxy[0] = -1.0;
        fxy[0] = -1.0;
        ixy[0] = -1.0;
      }
      if (pixelLocation.t > 1.0 - onePixel.t) {
        gxy[1] = -1.0;
        hxy[1] = -1.0;
        ixy[1] = -1.0;
      }

      // calculate hillshade
      vec4 va = texture2D(u_image, pixelLocation + onePixel * axy);
      vec4 vb = texture2D(u_image, pixelLocation + onePixel * bxy);
      vec4 vc = texture2D(u_image, pixelLocation + onePixel * cxy);
      vec4 vd = texture2D(u_image, pixelLocation + onePixel * dxy);
      vec4 ve = texture2D(u_image, pixelLocation);
      vec4 vf = texture2D(u_image, pixelLocation + onePixel * fxy);
      vec4 vg = texture2D(u_image, pixelLocation + onePixel * gxy);
      vec4 vh = texture2D(u_image, pixelLocation + onePixel * hxy);
      vec4 vi = texture2D(u_image, pixelLocation + onePixel * ixy);

      // calculate the rate of z change along the x, y, and diagonal direction
      float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;
      float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;
      float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);
      float hillshade = 0.0;

      // traditional single light source
      if (u_hillshadeType == 0){
        float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;
        float z = (u_cosZs[0] + cosDelta) / dzd;
        if (z < 0.0)  z = 0.0;
        hillshade = z;
      } else {
        // multi-directional with 6 light sources
        for (int k = 0; k < 6; k++) {
        float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;
        float z = (u_cosZs[k] + cosDelta) / dzd;
        if (z < 0.0) z = 0.0;
        hillshade = hillshade + z * u_weights[k];
        if (k == 5) break;
        }
      }

      // set color
      float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);
      alpha *= u_opacity;
      ${l}
    }
  `)}const z=Object.freeze(Object.defineProperty({__proto__:null,ColorizerHillshadeUniforms:y,ColorizerStretchUniforms:_,ColorizerUniforms:v,build:h},Symbol.toStringTag,{value:"Module"}));export{v as C,z as R,_ as a,y as b,h as c};