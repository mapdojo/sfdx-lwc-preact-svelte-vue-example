/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{H as e,s as t,w as o,g as a,n as i,e as r,h as n}from"./vec3.js";import{c as s,f as d}from"./vec3f64.js";import{PrecipitationType as c}from"../views/3d/environment/PrecipitationTechniqueConfiguration.js";import{Float3PassUniform as m}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{FloatPassUniform as v}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{glsl as l}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{Matrix4PassUniform as f}from"../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform.js";import{ShaderBuilder as p}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{VertexAttribute as u}from"../views/3d/webgl-engine/lib/VertexAttribute.js";function h(e){const t=new p;return t.attributes.add(u.POSITION,"vec3"),t.attributes.add(u.INSTANCEFEATUREATTRIBUTE,"float"),t.vertex.uniforms.add(new m("cameraPosition",((e,t)=>t.camera.eye))),t.vertex.uniforms.add(new m("offset",((e,t)=>g(e,t)))),t.vertex.uniforms.add(new v("width",(e=>e.width))),t.vertex.uniforms.add(new f("proj",((e,t)=>t.camera.projectionMatrix))),t.vertex.uniforms.add(new f("view",((e,t)=>t.camera.viewMatrix))),t.vertex.uniforms.add(new v("time",(e=>e.time))),t.varyings.add("vUv","vec2"),t.vertex.code.add(l`
    vec3 hash31(float p){
      vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.1030, 0.0973));
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.xxy + p3.yzz) * p3.zyx);
    }

    float hash11(float p){
      p = fract(p * 0.1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
    }

    //https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
    vec3 rotateVectorByQuaternion(vec3 v, vec4 q){
      return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
    }

    void main(void) {

      vUv = position.xz;

      vec3 rand = hash31(instanceFeatureAttribute);

      // Set random position for all particles
      // The hash function space is not high resolution so offset particles by an additional random value
      // This creates grids of 1000 particles which are shifted by random hundreths of the tile width
      // overlaying multiple identical but offset grids
      vec3 randomPosition = 2.0 * (rand + (0.01 + 0.01 * rand) * floor(0.001 * instanceFeatureAttribute)) - 1.0;

      // Random orientation of rain drops
      float angle = 3.1415 * hash11(instanceFeatureAttribute);

      vec3 up = vec3(0, 0, 1);

      // Gravity and wind direction
      vec3 direction = normalize(cameraPosition);

      vec3 tangent = normalize(cross(direction, up));

      // Gravity
      vec3 animatedPos = randomPosition + direction * -time;

      // Rain particles fall straight down and are randomly oriented
      // Snow particles have random sinusoid trajectories and are rotated to face the camera
      ${e.type===c.Rain?l`
            // Random rotation for particle
            vec3 rotationAxis = up;
            vec4 quat = vec4(rotationAxis * sin(angle), cos(angle));
            vec3 transformedPos = rotateVectorByQuaternion(vec3(0.2, 0.2, 4.0) * (position - vec3(0.5, 0.0, 0.5)), quat);

            // Rotate particle to planetary position
            rotationAxis = tangent;
            angle = 0.5 * -acos(dot(direction, up));
            quat = vec4(rotationAxis * sin(angle), cos(angle));
            transformedPos = rotateVectorByQuaternion(transformedPos, quat);

            vec4 pos = mat4(mat3(view)) * vec4(transformedPos + (mod(width * animatedPos - offset, width) - 0.5 * width), 1.0);
            gl_Position = proj * pos;
      `:l`
            vec3 rotationAxis = direction;
            vec4 quat = vec4(rotationAxis * sin(angle), cos(angle));

            tangent = rotateVectorByQuaternion(tangent, quat);
            // Random sinusoid from friction
            animatedPos += tangent * 0.25 * sin(dot(animatedPos, direction));
            vec4 pos = mat4(mat3(view)) * vec4((mod(width * animatedPos - offset, width) - 0.5 * width), 1.0);
            gl_Position = proj * (0.5 * vec4(position.xzy, 0.0) + pos);
      `}
    }
  `),t.fragment.uniforms.add([new v("opacity",(e=>e.opacity)),new m("particleColor",((t,o)=>w(o,e)))]),t.fragment.code.add(l`
    void main() {

      // Cut off corners of the triangle
      if(vUv.x < 0.0 || vUv.y < 0.0){
        discard;
      }

      float d = length(vUv - vec2(0.5));

      ${e.type===c.Rain?l`d = 0.35 * smoothstep(0.5, 0.0, d);`:l`d = smoothstep(0.5, 0.1, d);`}
      gl_FragColor = opacity * vec4(particleColor * d, d);
    }
  `),t}function g(i,r){const n=r.camera.eye,s=.5*i.width,d=1/i.width,c=e(y,t(y,(n[0]+s)*d,(n[1]+s)*d,(n[2]+s)*d));return o(c,n,a(c,c,i.width))}function w(e,t){const o=t.type===c.Rain?P:b,s=a(y,o,j),d=e.camera.eye;i(x,d);const m=Math.max(0,r(x,e.lighting.mainLight.direction));return n(s,s,o,m)}const y=s(),x=s(),b=d(1,1,1),P=d(.85,.85,.85),j=.7,A=Object.freeze(Object.defineProperty({__proto__:null,build:h},Symbol.toStringTag,{value:"Module"}));export{A as P,h as b};