/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{a as e}from"./vec2f64.js";import{c as o}from"./vec3f64.js";import{SimpleAtmosphereGeometry as i}from"../views/3d/environment/SimpleAtmosphereTechniqueConfiguration.js";import{Transform as r}from"../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl.js";import{addMainLightDirection as t}from"../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl.js";import{Float2PassUniform as n}from"../views/3d/webgl-engine/core/shaderModules/Float2PassUniform.js";import{Float3PassUniform as s}from"../views/3d/webgl-engine/core/shaderModules/Float3PassUniform.js";import{FloatPassUniform as a}from"../views/3d/webgl-engine/core/shaderModules/FloatPassUniform.js";import{NoParameters as l,glsl as d}from"../views/3d/webgl-engine/core/shaderModules/interfaces.js";import{Matrix4PassUniform as c}from"../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform.js";import{ShaderBuilder as m}from"../views/3d/webgl-engine/core/shaderModules/ShaderBuilder.js";import{Texture2DPassUniform as f}from"../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform.js";import{VertexAttribute as g}from"../views/3d/webgl-engine/lib/VertexAttribute.js";class p extends l{constructor(){super(...arguments),this.texV=e(),this.altitudeFade=0,this.innerScale=0,this.undergroundFadeAlpha=0,this.silhouette=new u}}class u{constructor(){this.center=o(),this.v1=o(),this.v2=o()}}function v(e){const o=new m,{vertex:l,fragment:p}=o;if(t(l),e.geometry===i.Underground)o.attributes.add(g.POSITION,"vec2"),o.varyings.add("color","vec4"),l.uniforms.add([new s("cameraPosition",((e,o)=>o.camera.eye)),new a("undergroundFadeAlpha",(e=>e.undergroundFadeAlpha))]),l.code.add(d`void main(void) {
float ndotl = dot(normalize(cameraPosition), mainLightDirection);
float lighting = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));
color = vec4(vec3(lighting), undergroundFadeAlpha);
gl_Position = vec4(position.xy, 1.0, 1.0);
}`),p.code.add(d`void main() {
gl_FragColor = color;
}`);else{o.include(r,e),o.attributes.add(g.POSITION,"vec3"),o.varyings.add("vtc","vec2"),o.varyings.add("falloff","float");const t=e.geometry===i.Cylinder;l.uniforms.add([new c("proj",((e,o)=>o.camera.projectionMatrix)),new c("view",((e,o)=>o.camera.viewMatrix))]),t||(o.varyings.add("innerFactor","float"),l.uniforms.add(new s("silCircleCenter",(e=>e.silhouette.center))),l.uniforms.add(new s("silCircleV1",(e=>e.silhouette.v1))),l.uniforms.add(new s("silCircleV2",(e=>e.silhouette.v2))),l.uniforms.add(new n("texV",(e=>e.texV))),l.uniforms.add(new a("innerScale",(e=>e.innerScale))));const m=6.2831853,u=1/128;l.code.add(d`
		void main(void) {
      ${t?d`
      vec3 pos = position;
      float ndotl = mainLightDirection.z;
      vtc = vec2(0.0, position.z + 0.05);`:d`
      innerFactor = clamp(-position.z, 0.0, 1.0);
      float scale = position.y * (1.0 + innerFactor * innerScale);
      float phi = position.x * ${d.float(m*u)} + 1.0;
      vec3 pos =  (silCircleCenter + sin(phi) * silCircleV1 + cos(phi) * silCircleV2) * scale;
      float ndotl = dot(normalize(position.y > 0.0 ? pos: silCircleCenter), mainLightDirection);
      vtc.x = position.x  * ${d.float(u)};
      vtc.y = texV.x * (1.0 - position.z) + texV.y * position.z;
      `}
      falloff = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));

		  gl_Position = transformPosition(proj, view, pos);
		  gl_Position.z = gl_Position.w; // project atmosphere onto the far plane
    }
	  `),p.uniforms.add(new f("tex",(e=>e.texture))),t||p.uniforms.add(new a("altitudeFade",(e=>e.altitudeFade))),p.code.add(d`
		void main() {
			vec4 atmosphereColor = texture2D(tex, vtc) * falloff;
      ${t?d`gl_FragColor = atmosphereColor;`:d`
			vec4 innerColor = vec4(atmosphereColor.rgb, 1.0 - altitudeFade);
			gl_FragColor = mix(atmosphereColor, innerColor, smoothstep(0.0, 1.0, innerFactor));
      `}
    }`)}return o}const h=Object.freeze(Object.defineProperty({__proto__:null,SilhouetteCircle:u,SimpleAtmospherePassParameters:p,build:v},Symbol.toStringTag,{value:"Module"}));export{p as S,h as a,u as b,v as c};