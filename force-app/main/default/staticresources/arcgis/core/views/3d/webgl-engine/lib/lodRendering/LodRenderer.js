/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../../../../chunks/tslib.es6.js";import t from"../../../../../core/Accessor.js";import{isSome as r,isNone as a,destroyMaybe as s}from"../../../../../core/maybe.js";import{isAborted as n,throwIfAborted as i}from"../../../../../core/promiseUtils.js";import{property as o}from"../../../../../core/accessorSupport/decorators/property.js";import"../../../../../core/accessorSupport/ensureType.js";import"../../../../../core/arrayUtils.js";import{subclass as c}from"../../../../../core/accessorSupport/decorators/subclass.js";import{c as l}from"../../../../../chunks/mat4f64.js";import{b as h,e as d,m as u}from"../../../../../chunks/vec3.js";import{c as m}from"../../../../../chunks/vec3f64.js";import{c as p,f as _}from"../../../../../chunks/vec4f64.js";import f from"../../../support/debugFlags.js";import{glLayout as g}from"../../../support/buffer/glUtil.js";import{newLayout as I}from"../../../support/buffer/InterleavedLayout.js";import{ShaderOutput as y}from"../../core/shaderLibrary/ShaderOutput.js";import{Camera as C}from"../Camera.js";import{Default3D as v}from"../DefaultVertexAttributeLocations.js";import{IntersectorType as E}from"../IntersectorInterfaces.js";import R from"../Octree.js";import{RenderSlot as D}from"../RenderSlot.js";import{assert as b}from"../Util.js";import{VertexAttribute as A}from"../VertexAttribute.js";import{InstanceData as T,StateFlags as L}from"./InstanceData.js";import{InstanceOctree as O}from"./InstanceOctree.js";import{LevelSelector as S}from"./LevelSelector.js";import{LodLevel as j}from"./LodLevel.js";import{RenderInstanceData as x}from"./RenderInstanceData.js";import{colorMixModes as U}from"../../materials/internal/MaterialUtil.js";import{encodeDoubleVec3 as N}from"../../materials/renderers/utils.js";import{DefaultMaterialDrawParameters as M}from"../../shaders/DefaultMaterialTechnique.js";import{TaskPriority as F,noBudget as V}from"../../../../support/Scheduler.js";import{bindVertexBufferLayout as w,unbindVertexBufferLayout as B}from"../../../../webgl/Util.js";const H=e=>{const t=e.baseBoundingSphere.radius,r=e.levels.map((e=>e.minScreenSpaceRadius));return new S(t,r)};let q=class extends t{constructor(e,t){super(e),this.type=E.LOD,this.isGround=!1,this._levels=[],this._defaultRenderInstanceData=[],this._highlightRenderInstanceData=[],this._instanceIndex=0,this._cycleStartIndex=0,this._slicePlane=!1,this._camera=new C,this._updateCyclesWithStaticCamera=-1,this._needFullCycle=!1,this.slots=[D.OPAQUE_MATERIAL,D.TRANSPARENT_MATERIAL],this.canRender=!0,this._instanceData=new T({shaderTransformation:e.shaderTransformation},e.optionalFields),this._frameTask=t.registerTask(F.LOD_RENDERER,this)}initialize(){this._instanceBufferLayout=k(this.optionalFields),this._glInstanceBufferLayout=g(this._instanceBufferLayout,1),this._instanceData.events.on("instances-changed",(()=>this._requestUpdateCycle())),this._instanceData.events.on("instance-transform-changed",(({index:e})=>{this._requestUpdateCycle(),this.metadata.notifyGraphicGeometryChanged(e)})),this._instanceData.events.on("instance-visibility-changed",(({index:e})=>{this._requestUpdateCycle(!0),this.metadata.notifyGraphicVisibilityChanged(e)})),this._instanceData.events.on("instance-highlight-changed",(()=>this._requestUpdateCycle(!0)))}destroy(){this._frameTask.remove()}get _enableLevelSelection(){return this.symbol.levels.length>1}get levels(){return this._levels}get baseBoundingBox(){return this._levels[this._levels.length-1].boundingBox}get baseBoundingSphere(){return this._levels[this._levels.length-1].boundingSphere}get baseMaterial(){return this._levels[this._levels.length-1].components[0].material}get slicePlaneEnabled(){return this._slicePlane}set slicePlaneEnabled(e){this._slicePlane=e}get layerUid(){return this.metadata.layerUid}get instanceData(){return this._instanceData}get memoryUsage(){const e={cpu:0,gpu:0};return this._defaultRenderInstanceData.forEach((t=>{const r=t.memoryUsage;e.cpu+=r.cpu,e.gpu+=r.gpu})),this._highlightRenderInstanceData.forEach((t=>{const r=t.memoryUsage;e.cpu+=r.cpu,e.gpu+=r.gpu})),e}get renderStats(){const e=this._instanceData.size,t=[];return this._levels.forEach(((e,r)=>{const a=this._defaultRenderInstanceData[r],s=this._highlightRenderInstanceData[r],n=a.size+s.size,i=e.triangleCount;t.push({renderedInstances:n,renderedTriangles:n*i,trianglesPerInstance:i})})),{totalInstances:e,renderedInstances:t.reduce(((e,t)=>e+t.renderedInstances),0),renderedTriangles:t.reduce(((e,t)=>e+t.renderedTriangles),0),levels:t}}async initializeRenderContext(e,t){this._context=e;const a=e.renderContext.rctx,s=await Promise.allSettled(this.symbol.levels.map((r=>(this._defaultRenderInstanceData.push(new x(a,this._instanceBufferLayout)),this._highlightRenderInstanceData.push(new x(a,this._instanceBufferLayout)),j.create(e,r,t))))),o=s.map((e=>"fulfilled"===e.status?e.value:null)).filter(r);if(n(t)||o.length!==s.length){o.forEach((e=>e.destroy())),i(t);for(const e of s)if("rejected"===e.status)throw e.reason}this._levels=o,this._levelSelector=H(this)}uninitializeRenderContext(){this._invalidateOctree(),this._levels.forEach((e=>e.destroy())),this._defaultRenderInstanceData.forEach((e=>e.destroy())),this._highlightRenderInstanceData.forEach((e=>e.destroy()))}get needsTransparentPass(){return this._levels.some((e=>e.components.some((e=>e.material.requiresSlot(D.TRANSPARENT_MATERIAL,y.Color)))))}get needsHighlight(){return this._highlightRenderInstanceData.some((e=>e.size>0))}prepareRender(e){if(!f.LOD_INSTANCE_RENDERER_DISABLE_UPDATES){if(this._enableLevelSelection){const t=e.bindParameters.contentCamera.equals(this._camera);this._camera.copyFrom(e.bindParameters.contentCamera),t||this._requestUpdateCycle()}this._needFullCycle&&(this.runTask(V),this._needFullCycle=!1)}}render(e){if(!this.baseMaterial.isVisible()||!this.baseMaterial.isVisibleForOutput(e.output))return;e.rctx.bindVAO();e.output!==y.Highlight&&e.output!==y.ShadowHighlight&&this._renderComponents(e,this._defaultRenderInstanceData);e.output!==y.ShadowExcludeHighlight&&this._renderComponents(e,this._highlightRenderInstanceData)}intersect(e,t,r,s){if(!this.baseMaterial.isVisible()||a(this._octree))return;const n=m();h(n,s,r);const i=a=>{this._instanceData.getCombinedModelTransform(a,K),e.transform.set(K),u(Y,r,e.transform.inverse),u(J,s,e.transform.inverse);const n=this._instanceData.getState(a),i=this._instanceData.getLodLevel(a),o=this._levels.length;b(0!=(n&L.ACTIVE),"invalid instance state"),b(i>=0&&i<o,"invaid lod level"),this._levels[i].intersect(e,t,Y,J,a,this.metadata,o)};this.baseMaterial.parameters.verticalOffset?this._octree.forEach(i):this._octree.forEachAlongRay(r,n,i)}queryDepthRange(e){return this._queryDepthRangeOctree(e)}notifyShaderTransformationChanged(){this._invalidateOctree(),this._requestUpdateCycle()}get _octree(){if(a(this._octreeCached)){const e=this._instanceData,t=e.view?.state;if(!t)return null;this._octreeCached=new O(e,this.baseBoundingSphere);for(let r=0;r<e.capacity;++r)t.get(r)&L.ACTIVE&&this._octreeCached.addInstance(r)}return this._octreeCached}_invalidateOctree(){this._octreeCached=s(this._octreeCached)}_queryDepthRangeOctree(e){if(a(this._octree))return{near:1/0,far:-1/0};const t=e.viewForward,r=this._octree.findClosest(t,R.DepthOrder.FRONT_TO_BACK,e.frustum),s=this._octree.findClosest(t,R.DepthOrder.BACK_TO_FRONT,e.frustum);if(null==r||null==s)return{near:1/0,far:-1/0};const n=e.eye,i=this._instanceData.view;i.boundingSphere.getVec(r,W),h(W,W,n);const o=d(W,t)-W[3];i.boundingSphere.getVec(s,W),h(W,W,n);const c=d(W,t)+W[3];return{near:Math.max(e.near,o),far:Math.min(e.far,c)}}_requestUpdateCycle(e=!1){this._updateCyclesWithStaticCamera=-1,this._cycleStartIndex=this._instanceIndex,e&&(this._needFullCycle=!0,this._context.requestRender())}_startUpdateCycle(){this._updateCyclesWithStaticCamera++,this._defaultRenderInstanceData.forEach((e=>e.startUpdateCycle())),this._highlightRenderInstanceData.forEach((e=>e.startUpdateCycle()))}get running(){return this._instanceData.size>0&&this._updateCyclesWithStaticCamera<1}runTask(e){const{_enableLevelSelection:t,_camera:a,_levelSelector:s}=this;this._defaultRenderInstanceData.forEach((e=>e.beginUpdate())),this._highlightRenderInstanceData.forEach((e=>e.beginUpdate()));const n=this._instanceData,i=n.view;let o=n.size;const c=n.capacity;let l=this._instanceIndex;for(let h=0;h<o&&!e.done;++h){l===this._cycleStartIndex&&this._startUpdateCycle();const h=i.state.get(l);let d=0;if(!(h&L.ALLOCATED)){l=l+1===c?0:l+1,o++;continue}const u=i.lodLevel.get(l);if(h&L.DEFAULT_ACTIVE&&this._defaultRenderInstanceData[u].freeTail(),h&L.HIGHLIGHT_ACTIVE&&this._highlightRenderInstanceData[u].freeTail(),h&L.REMOVE)n.freeInstance(l);else if(h&L.VISIBLE){let e=0;t&&(i.modelOrigin.getVec(l,z),e=s.selectLevel(z,n.getCombinedMedianScaleFactor(l),a)),d=h&~(L.ACTIVE|L.TRANSFORM_CHANGED),e>=0&&(h&L.HIGHLIGHT?(P(this._highlightRenderInstanceData[e],i,l),d|=L.HIGHLIGHT_ACTIVE):(P(this._defaultRenderInstanceData[e],i,l),d|=L.DEFAULT_ACTIVE)),i.state.set(l,d),i.lodLevel.set(l,e)}else d=h&~(L.ACTIVE|L.TRANSFORM_CHANGED),i.state.set(l,d);if(r(this._octreeCached)){const e=!!(h&L.ACTIVE),t=!!(d&L.ACTIVE);!e&&t?this._octreeCached.addInstance(l):e&&!t?this._octreeCached.removeInstance(l):e&&t&&h&L.TRANSFORM_CHANGED&&(this._octreeCached.removeInstance(l),this._octreeCached.addInstance(l))}l=l+1===c?0:l+1,e.madeProgress()}this._instanceIndex=l,this._defaultRenderInstanceData.forEach((e=>e.endUpdate())),this._highlightRenderInstanceData.forEach((e=>e.endUpdate())),this._context.requestRender()}_renderComponents(e,t){this.levels.forEach(((r,a)=>{const s=r.components.map((r=>this._beginComponent(e,t[a],r)));r.components.forEach(((r,n)=>this._renderComponent(e,s[n],t[a],r,a)))}))}_beginComponent(e,t,a){const{bindParameters:s,rctx:n,output:i}=e;if(0===t.size||!a.material.requiresSlot(s.slot,e.output))return null;const o=a.glMaterials.load(n,s.slot,i);return r(o)?o.beginSlot(s):null}_renderComponent(e,t,r,s,n){if(a(t))return;const{bindParameters:i,rctx:o}=e,c=o.bindTechnique(t,s.material.parameters,i);o.bindVAO(s.vao),t.ensureAttributeLocations(s.vao),c.bindDraw(Z,i,s.material.parameters),f.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL&&e.output===y.Color&&(c.setUniform4fv("externalColor",Q[Math.min(n,Q.length-1)]),c.setUniform1i("colorMixMode",U.replace));const l=o.capabilities.instancing,h=r.capacity,d=r.headIndex,u=r.tailIndex,m=r.firstIndex,p=this._glInstanceBufferLayout,_=(e,a)=>{w(o,v,r.buffer,p,e),l.drawArraysInstanced(t.primitiveType,0,s.vertexCount,a-e),B(o,v,r.buffer,p)};s.material.parameters.transparent&&null!=m?d>u?(b(m>=u&&m<=d,"invalid firstIndex"),_(m,d),_(u,m)):d<u&&(m<=d?(b(m>=0&&m<=d,"invalid firstIndex"),_(m,d),_(u,h),_(0,m)):(b(m>=u&&m<=h,"invalid firstIndex"),_(m,h),_(0,d),_(u,m))):d>u?_(u,d):d<u&&(_(0,d),_(u,h)),o.bindVAO(null)}};function P(e,t,r){const a=e.allocateHead();G(t,r,e.view,a)}function G(e,t,r,a){N(e.modelOrigin,t,r.modelOriginHi,r.modelOriginLo,a),r.model.copyFrom(a,e.model,t),r.modelNormal.copyFrom(a,e.modelNormal,t),e.color&&r.color&&r.color.copyFrom(a,e.color,t),e.objectAndLayerIdColor&&r.objectAndLayerIdColor&&r.objectAndLayerIdColor.copyFrom(a,e.objectAndLayerIdColor,t),e.featureAttribute&&r.featureAttribute&&r.featureAttribute.copyFrom(a,e.featureAttribute,t)}function k(e){let t=I().vec3f(A.MODELORIGINHI).vec3f(A.MODELORIGINLO).mat3f(A.MODEL).mat3f(A.MODELNORMAL);return r(e)&&e.includes("color")&&(t=t.vec4f(A.INSTANCECOLOR)),r(e)&&e.includes("featureAttribute")&&(t=t.vec4f(A.INSTANCEFEATUREATTRIBUTE)),r(e)&&e.includes("objectAndLayerIdColor")&&(t=t.vec4u8(A.OBJECTANDLAYERIDCOLOR_INSTANCED)),t}e([o({constructOnly:!0})],q.prototype,"symbol",void 0),e([o({constructOnly:!0})],q.prototype,"optionalFields",void 0),e([o({constructOnly:!0})],q.prototype,"metadata",void 0),e([o({constructOnly:!0})],q.prototype,"shaderTransformation",void 0),e([o()],q.prototype,"_instanceData",void 0),e([o()],q.prototype,"_cycleStartIndex",void 0),e([o({readOnly:!0})],q.prototype,"_enableLevelSelection",null),e([o()],q.prototype,"_updateCyclesWithStaticCamera",void 0),e([o({readOnly:!0})],q.prototype,"running",null),q=e([c("esri.views.3d.webgl-engine.lib.lodRendering.LodRenderer")],q);const z=m(),W=p(),K=l(),Y=m(),J=m(),Q=[_(1,0,1,1),_(0,0,1,1),_(0,1,0,1),_(1,1,0,1),_(1,0,0,1)],Z=new M;export{q as LodRenderer};