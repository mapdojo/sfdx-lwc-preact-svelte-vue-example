/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{ReadLinearDepth as e}from"../output/ReadLinearDepth.glsl.js";import{multipassGeometryTest as r}from"../shading/MultipassGeometryTest.glsl.js";import{RgbaFloatEncoding as t}from"../util/RgbaFloatEncoding.glsl.js";import{texelFetch as o}from"../util/WebGL2Utils.js";import{Float2PassUniform as a}from"../../shaderModules/Float2PassUniform.js";import{glsl as i}from"../../shaderModules/interfaces.js";import{createTexture2DPassSizeUniforms as s}from"../../shaderModules/Texture2DPassUniform.js";import{TextureSizeUniformType as n}from"../../shaderModules/TextureSizeUniformType.js";function p(p,l){const{vertex:d,fragment:c}=p;l.hasMultipassGeometry&&d.include(r),l.hasMultipassTerrain&&p.varyings.add("depth","float"),d.code.add(i`
  void main(void) {
    vec4 posProjCenter;
    if (dot(position, position) > 0.0) {
      // Render single point to center of the pixel to avoid subpixel
      // filtering to affect the marker color
      ProjectHUDAux projectAux;
      vec4 posProj = projectPositionHUD(projectAux);
      posProjCenter = alignToPixelCenter(posProj, viewport.zw);

      ${l.hasMultipassGeometry?i`
        // Don't draw vertices behind geometry
        if(geometryDepthTest(.5 + .5 * posProjCenter.xy / posProjCenter.w, projectAux.posView.z)){
          posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
        }`:""}

      ${l.hasMultipassTerrain?"depth = projectAux.posView.z;":""}
      vec3 vpos = projectAux.posModel;
      if (rejectBySlice(vpos)) {
        // Project out of clip space
        posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
      }

    } else {
      // Project out of clip space
      posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
    }

    gl_Position = posProjCenter;
    gl_PointSize = 1.0;
  }
  `),l.hasMultipassTerrain&&c.include(e),l.hasMultipassTerrain&&c.uniforms.add([...s("terrainDepthTexture",((e,r)=>r.multipassTerrain.linearDepthTexture),l.hasWebGL2Context?n.None:n.InvSize),new a("nearFar",((e,r)=>r.camera.nearFar))]),c.include(t),c.code.add(i`
  void main() {
    gl_FragColor = vec4(1, 1, 1, 1);
    ${l.hasMultipassTerrain?i`
          vec2 uv = gl_FragCoord.xy;

          // Read the rgba data from the texture linear depth
          vec4 terrainDepthData = ${o(l,"terrainDepthTexture","uv")};

          float terrainDepth = linearDepthFromFloat(rgba2float(terrainDepthData), nearFar);

          // If HUD vertex is behind terrain and the terrain depth is not the initialize value (e.g. we are not looking at the sky)
          // Mark the HUD vertex as occluded by transparent terrain
          if(depth < terrainDepth && terrainDepthData != vec4(0,0,0,1)){
            gl_FragColor.g = 0.5;
          }`:""}
  }
  `)}export{p as HUDOcclusionPass};