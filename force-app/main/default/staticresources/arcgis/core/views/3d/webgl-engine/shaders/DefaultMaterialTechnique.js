/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{c as e}from"../../../../chunks/mat3f64.js";import{f as t,c as i}from"../../../../chunks/vec3f64.js";import{f as s}from"../../../../chunks/vec4f64.js";import{ViewingMode as r}from"../../../ViewingMode.js";import{ShaderOutput as o}from"../core/shaderLibrary/ShaderOutput.js";import{NormalAttributeType as a}from"../core/shaderLibrary/attributes/NormalAttribute.glsl.js";import{TextureCoordinateAttributeType as l}from"../core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl.js";import{VertexNormalPassParameters as n,VertexNormalDrawParameters as h}from"../core/shaderLibrary/attributes/VertexNormal.glsl.js";import{defaultMaskAlphaCutoff as c}from"../core/shaderLibrary/util/AlphaCutoff.js";import{ReloadableShaderModule as u}from"../core/shaderTechnique/ReloadableShaderModule.js";import{ShaderTechnique as p}from"../core/shaderTechnique/ShaderTechnique.js";import{CullFaceOptions as m,DepthTestFunction as d,AlphaDiscardMode as f}from"../lib/basicInterfaces.js";import{Default3D as b}from"../lib/DefaultVertexAttributeLocations.js";import{RenderOccludedFlag as v}from"../lib/Material.js";import{blendingDefault as g,oitBlending as S,oitDepthTest as y,getOITPolygonOffset as x}from"../lib/OrderIndependentTransparency.js";import{Program as T}from"../lib/Program.js";import{stencilWriteMaskOn as j,stencilToolMaskBaseParams as P,stencilBaseAllZerosParams as O}from"../lib/StencilUtils.js";import{TransparencyPassType as C}from"../lib/TransparencyPassType.js";import{D as L}from"../../../../chunks/DefaultMaterial.glsl.js";import{ContextType as M}from"../../../webgl/context-util.js";import{CompareFunction as z}from"../../../webgl/enums.js";import{makePipelineState as A,cullingParams as w,defaultDepthWriteParams as D,defaultColorWriteParams as F}from"../../../webgl/renderState.js";class k extends n{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=t(0,1,.5),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=m.Back,this.emissiveFactor=t(0,0,0),this.instancedDoublePrecision=!1,this.normalType=a.Attribute,this.receiveSSAO=!0,this.receiveShadows=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=t(.2,.2,.2),this.diffuse=t(.8,.8,.8),this.externalColor=s(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=i(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSizeEnabled=!1,this.vvSizeMinSize=[1,1,1],this.vvSizeMaxSize=[100,100,100],this.vvSizeOffset=[0,0,0],this.vvSizeFactor=[1,1,1],this.vvSizeValue=[1,1,1],this.vvColorEnabled=!1,this.vvColorValues=[0,0,0,0,0,0,0,0],this.vvColorColors=[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],this.vvSymbolAnchor=[0,0,0],this.vvSymbolRotationMatrix=e(),this.vvOpacityEnabled=!1,this.vvOpacityValues=[],this.vvOpacityOpacities=[],this.transparent=!1,this.writeDepth=!0,this.customDepthTest=d.Less,this.textureAlphaMode=f.Blend,this.textureAlphaCutoff=c,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=v.Occlude}}class E extends h{constructor(){super(...arguments),this.origin=i(),this.slicePlaneLocalOrigin=this.origin}}class _ extends p{initializeConfiguration(e,t){t.hasWebGL2Context=e.rctx.type===M.WEBGL2,t.spherical=e.viewingMode===r.Global,t.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result,t.textureCoordinateType=t.hasColorTexture||t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture||t.hasNormalTexture?l.Default:l.None,t.objectAndLayerIdColorInstanced=t.instanced}initializeProgram(e){return this._initializeProgram(e,_.shader)}_initializeProgram(e,t){return new T(e.rctx,t.get().build(this.configuration),b)}_convertDepthTestFunction(e){return e===d.Lequal?z.LEQUAL:z.LESS}_makePipeline(e,t){const i=this.configuration,s=e===C.NONE,r=e===C.FrontFace;return A({blending:i.output!==o.Color&&i.output!==o.Alpha||!i.transparent?null:s?g:S(e),culling:N(i)?w(i.cullFace):null,depthTest:{func:y(e,this._convertDepthTestFunction(i.customDepthTest))},depthWrite:(s||r)&&i.writeDepth?D:null,colorWrite:F,stencilWrite:i.hasOccludees?j:null,stencilTest:i.hasOccludees?t?P:O:null,polygonOffset:s||r?null:x(i.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}function N(e){return e.cullFace!==m.None||!e.hasSlicePlane&&(!e.transparent&&!e.doubleSidedMode)}_.shader=new u(L,(()=>import("./DefaultMaterial.glsl.js")));export{E as DefaultMaterialDrawParameters,k as DefaultMaterialPassParameters,_ as DefaultMaterialTechnique};