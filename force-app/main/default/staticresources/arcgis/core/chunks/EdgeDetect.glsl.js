/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{glsl as e}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{ShaderBuilder as t}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as o}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{VertexAttribute as a}from"../views/3d/webgl-engine/lib/VertexAttribute.js";import{addResolutionUniform as r}from"../views/3d/webgl-engine/shaders/SMAAPassParameters.js";const l={threshold:.05,localConstrastAdaption:2};function s(){const s=new t,{attributes:d,varyings:x,vertex:i,fragment:c}=s;return d.add(a.POSITION,"vec2"),r(i),x.add("uv","vec2"),x.add("offsets[3]","vec4"),i.code.add(e`void main() {
uv = position * 0.5 + vec2(0.5);
gl_Position = vec4(position, 0, 1);
offsets[0] = uv.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 );
offsets[1] = uv.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 );
offsets[2] = uv.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 );
}`),c.uniforms.add(new o("colorTexture",(e=>e.colorTexture))),c.code.add(e`
    float absMax3(vec3 v) {
      vec3 t = abs(v);
      return max(max(t.r, t.g), t.b);
    }

    void main() {
      // Calculate color deltas:
      vec4 delta;
      vec3 C = texture2D(colorTexture, uv).rgb;

      vec3 Cleft = texture2D(colorTexture, offsets[0].xy).rgb;
      delta.x = absMax3(C - Cleft);

      vec3 Ctop = texture2D(colorTexture, offsets[0].zw).rgb;
      delta.y = absMax3(C - Ctop);

      vec2 edges = step(vec2(${e.float(l.threshold)}), delta.xy);

      // discard if there is no edge:
      if (dot(edges, vec2(1.0)) == 0.0) {
        discard;
      }

      // Calculate right and bottom deltas:
      vec3 Cright = texture2D(colorTexture, offsets[1].xy).rgb;
      delta.z = absMax3(C - Cright);

      vec3 Cbottom  = texture2D(colorTexture, offsets[1].zw).rgb;
      delta.w = absMax3(C - Cbottom);

      // Calculate the maximum delta in the direct neighborhood:
      float maxDelta = max(max(max(delta.x, delta.y), delta.z), delta.w);

      // Calculate left-left and top-top deltas:
      vec3 Cleftleft  = texture2D(colorTexture, offsets[2].xy).rgb;
      delta.z = absMax3(C - Cleftleft);

      vec3 Ctoptop = texture2D(colorTexture, offsets[2].zw).rgb;
      delta.w = absMax3(C - Ctoptop);

      // Calculate the final maximum delta:
      maxDelta = max(max(maxDelta, delta.z), delta.w);

      // Local contrast adaptation in action:
      edges.xy *= step(maxDelta, float(${e.float(l.localConstrastAdaption)}) * delta.xy);

      gl_FragColor = vec4(edges, 0.0, 0.0);
    }
  `),s}const d=Object.freeze(Object.defineProperty({__proto__:null,build:s},Symbol.toStringTag,{value:"Module"}));export{d as E,s as b};