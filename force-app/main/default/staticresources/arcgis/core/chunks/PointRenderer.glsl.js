/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{NUMBER_MAX_FLOAT32 as e}from"../core/mathUtils.js";import{m as i,f as o}from"./mat4.js";import{c as r}from"./mat4f64.js";import{s as t}from"./vec2.js";import{a}from"./vec2f64.js";import{s}from"./vec3.js";import{c as n}from"./vec3f64.js";import{create as c,POSITIVE_INFINITY as l}from"../geometry/support/aaBoundingBox.js";import{addNearFar as d,addCalculateLinearDepth as p}from"../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl.js";import{ShaderOutput as m}from"../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput.js";import{SlicePlaneParameters as g,SliceDraw as f}from"../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl.js";import{OutputHighlight as u}from"../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl.js";import{RgbaFloatEncoding as S}from"../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl.js";import{Float2DrawUniform as h}from"../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform.js";import{Float2PassUniform as v}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{Float3DrawUniform as x}from"../views/3d/webgl-engine/core/shaderModules/Float3DrawUniform.js";import{NoParameters as w,glsl as z}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{Matrix4DrawUniform as b}from"../views/3d/webgl-engine/core/shaderModules/Matrix4DrawUniform.js";import{Matrix4PassUniform as M}from"../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform.js";import{ShaderBuilder as j}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{VertexAttribute as P}from"../views/3d/webgl-engine/lib/VertexAttribute.js";class y extends w{constructor(){super(...arguments),this.clipBox=c(l),this.useFixedSizes=!1,this.useRealWorldSymbolSizes=!1,this.scaleFactor=1,this.minSizePx=0,this.size=0,this.sizePx=0}get fixedSize(){return this.drawScreenSpace?this.sizePx:this.size}get screenMinSize(){return this.useFixedSizes?0:this.minSizePx}get drawScreenSpace(){return this.useFixedSizes&&!this.useRealWorldSymbolSizes}}class O extends g{constructor(e,i,o){super(e),this.origin=e,this.isLeaf=i,this.splatSize=o}}function _(r){const a=new j,n=r.output===m.Color,c=r.output===m.Depth,l=r.output===m.Highlight,{vertex:g,fragment:w}=a;return a.extensions.add("GL_OES_standard_derivatives"),a.include(f,r),a.attributes.add(P.POSITION,"vec3"),a.attributes.add(P.COLOR,"vec3"),g.uniforms.add([new b("modelView",((e,r)=>i(R,r.camera.viewMatrix,o(R,e.origin)))),new M("proj",((e,i)=>i.camera.projectionMatrix)),new h("screenMinMaxSize",((e,i,o)=>t(L,o.useFixedSizes?0:o.minSizePx*i.camera.pixelRatio,F(e.isLeaf)*i.camera.pixelRatio)))]),g.uniforms.add(r.useFixedSizes?new v("pointScale",((e,i)=>t(L,e.fixedSize*i.camera.pixelRatio,i.camera.fullHeight))):new h("pointScale",((e,i,o)=>t(L,e.splatSize*o.scaleFactor*i.camera.pixelRatio,i.camera.fullHeight/i.camera.pixelRatio)))),r.clippingEnabled?g.uniforms.add([new x("clipMin",((e,i,o)=>s(B,o.clipBox[0]-e.origin[0],o.clipBox[1]-e.origin[1],o.clipBox[2]-e.origin[2]))),new x("clipMax",((e,i,o)=>s(B,o.clipBox[3]-e.origin[0],o.clipBox[4]-e.origin[1],o.clipBox[5]-e.origin[2])))]):(g.constants.add("clipMin","vec3",[-e,-e,-e]),g.constants.add("clipMax","vec3",[e,e,e])),c?(d(a),p(a),a.varyings.add("depth","float")):r.output!==m.Highlight&&a.varyings.add("vColor","vec3"),g.code.add(z`
    void main(void) {
      // Move clipped points outside of clipspace
      if (position.x < clipMin.x || position.y < clipMin.y || position.z < clipMin.z ||
        position.x > clipMax.x || position.y > clipMax.y || position.z > clipMax.z) {
        gl_Position = vec4(0.0,0.0,0.0,2.0);
        gl_PointSize = 0.0;
        return;
      }

      if (rejectBySlice(position)) {
        gl_Position = vec4(0.0,0.0,0.0,2.0);
        gl_PointSize = 0.0;
        return;
      }

      // Position in camera space
      vec4 camera = modelView * vec4(position, 1.0);

      float pointSize = pointScale.x;
      vec4 position = proj * camera;
     ${r.drawScreenSize?z`
      float clampedScreenSize = pointSize;`:z`
      float pointRadius = 0.5 * pointSize;
      vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);
      vec4 positionOffset = proj * cameraOffset;
      float radius = abs(positionOffset.y - position.y);
      float viewHeight = pointScale.y;
      // screen diameter = (2 * r / w) * (h / 2)
      float screenPointSize = (radius / position.w) * viewHeight;
      float clampedScreenSize = clamp(screenPointSize, screenMinMaxSize.x, screenMinMaxSize.y);
      // Shift towards camera, to move rendered point out of terrain i.e. to
      // the camera-facing end of the virtual point when considering it as a
      // 3D sphere.
      camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;
      position = proj * camera;`}

     gl_PointSize = clampedScreenSize;
     gl_Position = position;

     ${c?z`depth = calculateLinearDepth(nearFar, camera.z);`:""}
     ${n?z`vColor = color;`:""}
    }
  `),w.include(S,r),l&&a.include(u,r),w.code.add(z`
    void main(void) {
      vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);
      float r2 = dot(vOffset, vOffset);

      if (r2 > 0.25) {
        discard;
      }
      ${c?z`gl_FragColor = float2rgba(depth);`:""}
      ${l?z`outputHighlight();`:""}
      ${n?z`gl_FragColor = vec4(vColor, 1.0);`:""}
    }
  `),a}function F(e){return e?256:64}const R=r(),B=n(),L=a(),C=Object.freeze(Object.defineProperty({__proto__:null,PointRendererDrawParameters:O,PointRendererPassParameters:y,build:_,getMaxPointSizeScreenspace:F},Symbol.toStringTag,{value:"Module"}));export{y as P,O as a,C as b,_ as c,F as g};