/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{texelFetch as o}from"../util/WebGL2Utils.js";import{FloatPassUniform as e}from"../../shaderModules/FloatPassUniform.js";import{glsl as r}from"../../shaderModules/interfaces.js";import{Texture2DPassUniform as a}from"../../shaderModules/Texture2DPassUniform.js";function l(l,t){l.fragment.uniforms.add([new a("u_colormap",(o=>o.u_colormap)),new e("u_colormapOffset",(o=>o.colormap.u_colormapOffset)),new e("u_colormapMaxIndex",(o=>o.colormap.u_colormapMaxIndex)),new e("u_opacity",(o=>o.common.u_opacity))]),l.fragment.code.add(r`
    vec4 colormap(vec4 currentPixel, bool isFloat) {
      float colorIndex = isFloat ? currentPixel.r - u_colormapOffset : currentPixel.r * 255.0 - u_colormapOffset;
      vec4 result;
      // handle no data and out of range pixels
      if (currentPixel.a == 0.0 || colorIndex > u_colormapMaxIndex) {
        result = vec4(0.0, 0.0, 0.0, 0.0);
      } else {
        // colormap lookup
        vec2 texelCoordinates = vec2((colorIndex + 0.5), 0.5);
        result = ${o(t,"u_colormap","texelCoordinates","(1.0 / vec2(u_colormapMaxIndex + 1.0, 1.0))")};
      }
      return result;
    }
  `)}export{l as Colormap};