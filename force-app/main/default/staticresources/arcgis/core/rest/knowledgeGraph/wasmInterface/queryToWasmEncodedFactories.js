/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import"../../../geometry.js";import e from"../../../core/Error.js";import t from"../../../geometry/Multipoint.js";import n from"../../../geometry/Point.js";import o from"../../../geometry/Polygon.js";import r from"../../../geometry/Polyline.js";import i from"../../../geometry/Geometry.js";function a(e,t){const n=new t.ArrayValue;return n.deleteLater(),e.forEach((e=>{n.add_value(m(e,t))})),n}function l(e,t){const n=new t.ObjectValue;n.deleteLater();for(const[o,r]of Object.entries(e))n.set_key_value(o,m(r,t));return n}function s(i,a){if(i instanceof t)return f(i,a);if(i instanceof n)return g(i,a);if(i instanceof r||i instanceof o)return c(i,a);throw new e("knowledge-graph:unsupported-geometry","Only Point, Multipoint, Polyline, and Polygon geometry are supported by ArcGIS Knowledge",{geometry:i})}function u(e,t){t.input_quantization_parameters={xy_resolution:e.xyResolution,x_false_origin:e.xFalseOrigin,y_false_origin:e.yFalseOrigin,z_resolution:e.zResolution,z_false_origin:e.zFalseOrigin,m_resolution:e.mResolution,m_false_origin:e.mFalseOrigin}}function y(t,n,o){if(!t.extent)throw new e("knowledge-graph:illegal-output-quantization","The Output quantization provided to the encoder had an illegal value as part of its extent",t.extent);if(!t.quantizeMode)throw new e("knowledge-graph:illegal-output-quantization","The Output quantization contained an illegal mode setting",t.quantizeMode);if(!t.tolerance)throw new e("knowledge-graph:illegal-output-quantization","The Output quantization contained an illegal tolerance setting",t.quantizeMode);n.output_quantization_parameters={extent:{xmax:t.extent.xmax,ymax:t.extent.ymax,xmin:t.extent.xmin,ymin:t.extent.ymin},quantize_mode:o.esriQuantizeMode[t.quantizeMode],tolerance:t.tolerance}}function m(e,t){if(null==e)return"";if("object"!=typeof e)return e;if(e instanceof Date)return e;if(e instanceof i)return s(e,t);if(Array.isArray(e)){const n=new t.ArrayValue;return n.deleteLater(),e.forEach((e=>{n.add_value(m(e,t))})),n}return l(e,t)}function c(e,t){const n=new t.GeometryValue;n.deleteLater(),n.has_z=e.hasZ,n.has_m=e.hasM;const i=[],a=[];let l=[];e instanceof r?(n.geometry_type=t.esriGeometryType.esriGeometryPolyline,l=e.paths):e instanceof o&&(n.geometry_type=t.esriGeometryType.esriGeometryPolygon,l=e.rings);let s=0,u=0;return l.forEach((e=>{let t=0;e.forEach((e=>{t++,e.forEach((e=>{i[u]=e,u++}))})),a[s]=t,s++})),n.coords=new Float64Array(i),n.lengths=new Uint32Array(a),n}function f(e,t){const n=new t.GeometryValue;n.deleteLater(),n.geometry_type=n.geometry_type=t.esriGeometryType.esriGeometryMultipoint,n.has_z=e.hasZ,n.has_m=e.hasM;const o=[],r=[];r[0]=e.points.length;let i=0;return e.points.forEach((e=>{e.forEach((e=>{o[i]=e,i++}))})),n.coords=new Float64Array(o),n.lengths=new Uint32Array(r),n}function g(e,t){const n=new t.GeometryValue;n.deleteLater(),n.geometry_type=t.esriGeometryType.esriGeometryPoint,n.has_z=e.hasZ,n.has_m=e.hasM;const o=[],r=[];r[0]=1,o[0]=e.x,o[1]=e.y;let i=2;return e.hasZ&&(o[i]=e.z,i++),e.hasM&&(o[i]=e.m,i++),n.coords=new Float64Array(o),n.lengths=new Uint32Array(r),n}export{a as bindParamArrayToWasm,l as bindParamObjectToWasm,s as geometryToWasm,u as setInputQuantizationParametersOnEncoder,y as setOutputQuantizationParametersOnEncoder};