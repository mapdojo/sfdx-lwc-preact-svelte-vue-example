/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{disposeMaybe as t}from"../../../../core/maybe.js";import{g as e,m as r,h as s,d as i,r as o}from"../../../../chunks/mat3.js";import{c as a}from"../../../../chunks/mat3f32.js";import{f as n}from"../../../../chunks/vec2f32.js";import{f}from"../../../../chunks/vec3f32.js";import{normalizeMapX as l}from"../../../../geometry/support/normalizeUtils.js";import{DisplayObject as u}from"../../engine/DisplayObject.js";import{createProgramDescriptor as _}from"../../engine/webgl/Utils.js";import{BufferObject as c}from"../../../webgl/BufferObject.js";import{BlendFactor as h,PrimitiveType as m,DataType as d,Usage as p}from"../../../webgl/enums.js";import{VertexArrayObject as g}from"../../../webgl/VertexArrayObject.js";const v=Math.PI/180,x=4;class b extends u{constructor(t){super(),this._program=null,this._vao=null,this._vertexBuffer=null,this._indexBuffer=null,this._dvsMat3=a(),this._localOrigin={x:0,y:0},this._getBounds=t}destroy(){this._vao&&(this._vao.dispose(!0),this._vao=null,this._vertexBuffer=null,this._indexBuffer=null),this._program=t(this._program)}doRender(t){const{context:e}=t,r=this._getBounds();if(r.length<1)return;this._createShaderProgram(e),this._updateMatricesAndLocalOrigin(t),this._updateBufferData(e,r),e.setBlendingEnabled(!0),e.setDepthTestEnabled(!1),e.setStencilWriteMask(0),e.setStencilTestEnabled(!1),e.setBlendFunction(h.ONE,h.ONE_MINUS_SRC_ALPHA),e.setColorMask(!0,!0,!0,!0);const s=this._program;e.bindVAO(this._vao),e.useProgram(s),s.setUniformMatrix3fv("u_dvsMat3",this._dvsMat3),e.gl.lineWidth(1),e.drawElements(m.LINES,8*r.length,d.UNSIGNED_INT,0),e.bindVAO()}_createTransforms(){return{dvs:a()}}_createShaderProgram(t){if(this._program)return;const e="precision highp float;\n        uniform mat3 u_dvsMat3;\n\n        attribute vec2 a_position;\n\n        void main() {\n          mediump vec3 pos = u_dvsMat3 * vec3(a_position, 1.0);\n          gl_Position = vec4(pos.xy, 0.0, 1.0);\n        }",r="precision mediump float;\n      void main() {\n        gl_FragColor = vec4(0.75, 0.0, 0.0, 0.75);\n      }";this._program=t.programCache.acquire(e,r,y().attributes)}_updateMatricesAndLocalOrigin(t){const{state:a}=t,{displayMat3:u,size:_,resolution:c,pixelRatio:h,rotation:m,viewpoint:d}=a,p=v*m,{x:g,y:x}=d.targetGeometry,b=l(g,a.spatialReference);this._localOrigin.x=b,this._localOrigin.y=x;const y=h*_[0],B=h*_[1],M=c*y,j=c*B,A=e(this._dvsMat3);r(A,A,u),s(A,A,n(y/2,B/2)),i(A,A,f(_[0]/M,-B/j,1)),o(A,A,-p)}_updateBufferData(t,e){const{x:r,y:s}=this._localOrigin,i=2*x*e.length,o=new Float32Array(i),a=new Uint32Array(8*e.length);let n=0,f=0;for(const l of e)l&&(o[2*n+0]=l[0]-r,o[2*n+1]=l[1]-s,o[2*n+2]=l[0]-r,o[2*n+3]=l[3]-s,o[2*n+4]=l[2]-r,o[2*n+5]=l[3]-s,o[2*n+6]=l[2]-r,o[2*n+7]=l[1]-s,a[f+0]=n+0,a[f+1]=n+3,a[f+2]=n+3,a[f+3]=n+2,a[f+4]=n+2,a[f+5]=n+1,a[f+6]=n+1,a[f+7]=n+0,n+=4,f+=8);if(this._vertexBuffer?this._vertexBuffer.setData(o.buffer):this._vertexBuffer=c.createVertex(t,p.DYNAMIC_DRAW,o.buffer),this._indexBuffer?this._indexBuffer.setData(a):this._indexBuffer=c.createIndex(t,p.DYNAMIC_DRAW,a),!this._vao){const e=y();this._vao=new g(t,e.attributes,e.bufferLayouts,{geometry:this._vertexBuffer},this._indexBuffer)}}}const y=()=>_("bounds",{geometry:[{location:0,name:"a_position",count:2,type:d.FLOAT}]});export{b as default};