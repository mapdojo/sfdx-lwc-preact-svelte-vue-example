/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{texelFetch as r}from"../util/WebGL2Utils.js";import{Float2PassUniform as o}from"../../shaderModules/Float2PassUniform.js";import{glsl as e}from"../../shaderModules/interfaces.js";import{createTexture2DPassSizeUniforms as n}from"../../shaderModules/Texture2DPassUniform.js";import{TextureSizeUniformType as t}from"../../shaderModules/TextureSizeUniformType.js";function s(s,i){s.fragment.uniforms.add(n("u_transformGrid",(r=>r.u_transformGrid),i.hasWebGL2Context?t.None:t.InvSize)),s.fragment.uniforms.add(new o("u_transformSpacing",(r=>r.common.u_transformSpacing))),s.fragment.uniforms.add(new o("u_targetImageSize",(r=>r.common.u_targetImageSize))),s.fragment.code.add(e`
    vec2 projectPixelLocation(vec2 coords) {
      // Pixel index in row/column, corresponds to upperleft corner, e.g. [100, 20]
      vec2 index_image = floor(coords * u_targetImageSize);

      // Pixel's corresponding cell index in transform grid
      // Each transform cell corresponds to 4 pixels: 6 coefficients from lowerleft triangle followed by 6 coefficients from upperright triangle
      vec2 oneTransformPixel = vec2(4.0, 1.0);
      vec2 index_transform = floor(index_image / u_transformSpacing) * oneTransformPixel;

      // Correspoding position in transform grid cell, cell center coordinates
      vec2 pos = fract((index_image + 0.5) / u_transformSpacing);

      // Pixel's corresponding transform cell location, cell center coordinates
      vec2 transform_location = index_transform + 0.5;

      vec2 srcLocation;

      // Use lower triangle or upper triangle
      if (pos.s <= pos.t) {
        vec3 ll_abc = ${r(i,"u_transformGrid","transform_location")}.rgb;
        vec3 ll_def = ${r(i,"u_transformGrid","vec2(transform_location.s + 1.0, transform_location.t)")}.rgb;
        srcLocation.s = dot(ll_abc, vec3(pos, 1.0));
        srcLocation.t = dot(ll_def, vec3(pos, 1.0));
      } else {
        vec3 ur_abc = ${r(i,"u_transformGrid","vec2(transform_location.s + 2.0, transform_location.t)")}.rgb;
        vec3 ur_def = ${r(i,"u_transformGrid","vec2(transform_location.s + 3.0, transform_location.t)")}.rgb;
        srcLocation.s = dot(ur_abc, vec3(pos, 1.0));
        srcLocation.t = dot(ur_def, vec3(pos, 1.0));
      }

      return srcLocation;
    }
  `)}export{s as Projection};