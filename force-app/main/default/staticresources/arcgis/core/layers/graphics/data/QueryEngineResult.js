/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isNone as e,isSome as t}from"../../../core/maybe.js";import{polygonCentroid as i,extentCentroid as s}from"../../../geometry/support/centroid.js";import{getPolygonExtent as a,getGeometryExtent as r}from"../../../geometry/support/extentUtils.js";import{toQuantizationTransform as n}from"../../../geometry/support/quantizationUtils.js";import{isValid as o,equals as l}from"../../../geometry/support/spatialReferenceUtils.js";import u from"./AttributesBuilder.js";import{project as c}from"./projectionSupport.js";import{makeEdgeCandidate as d,makeVertexCandidate as m}from"./SnappingCandidate.js";import{cleanFromGeometryEngine as h,getGeometry as f,transformCentroid as g}from"./utils.js";import{isStringField as p}from"../../support/fieldUtils.js";import{isNullCountSupported as y,calculateStringStatistics as x,calculateStatistics as I,processSummaryStatisticsResult as T,calculateUniqueValuesCount as V,createUVResult as F,calculateClassBreaks as S,resolveCBResult as _,calculateHistogram as z,getAttributeComparator as v,calculatePercentile as b}from"../../../statistics/utils.js";import{loadArcade as R}from"../../../support/arcadeOnDemand.js";class A{constructor(e,t,i){this.items=e,this.query=t,this.geometryType=i.geometryType,this.hasM=i.hasM,this.hasZ=i.hasZ,this.fieldsIndex=i.fieldsIndex,this.objectIdField=i.objectIdField,this.spatialReference=i.spatialReference,this.featureAdapter=i.featureAdapter}get size(){return this.items.length}createQueryResponseForCount(){const e=new u(this.query,this.featureAdapter,this.fieldsIndex);if(!this.query.outStatistics)return e.countDistinctValues(this.items);const{groupByFieldsForStatistics:t,having:i,outStatistics:s}=this.query,a=t?.length;if(!!!a)return 1;const r=new Map,n=new Map,o=new Set;for(const l of s){const{statisticType:s}=l,a="exceedslimit"!==s?l.onStatisticField:void 0;if(!n.has(a)){const i=[];for(const s of t){const t=this._getAttributeValues(e,s,r);i.push(t)}n.set(a,this._calculateUniqueValues(i,e.returnDistinctValues))}const u=n.get(a);for(const t in u){const{data:s,items:a}=u[t],r=s.join(",");i&&!e.validateItems(a,i)||o.add(r)}}return o.size}async createQueryResponse(){let e;if(this.query.outStatistics){e=this.query.outStatistics.some((e=>"exceedslimit"===e.statisticType))?this._createExceedsLimitQueryResponse(this.query):await this._createStatisticsQueryResponse(this.query)}else e=this._createFeatureQueryResponse(this.query);if(this.query.returnQueryGeometry){const t=this.query.geometry;o(this.query.outSR)&&!l(t.spatialReference,this.query.outSR)?e.queryGeometry=h({spatialReference:this.query.outSR,...c(t,t.spatialReference,this.query.outSR)}):e.queryGeometry=h({spatialReference:this.query.outSR,...t})}return e}createSnappingResponse(t,i){const s=this.featureAdapter,a=N(this.hasZ,this.hasM),{point:r,mode:n}=t,o="number"==typeof t.distance?t.distance:t.distance.x,l="number"==typeof t.distance?t.distance:t.distance.y,u={candidates:[]},c="esriGeometryPolygon"===this.geometryType,h=this._getPointCreator(n,this.spatialReference,i),f=new q(null,0),g=new q(null,0),p={x:0,y:0,z:0};for(const y of this.items){const i=s.getGeometry(y);if(e(i))continue;const{coords:n,lengths:x}=i;if(f.coords=n,g.coords=n,t.types&D.EDGE){let e=0;for(let t=0;t<x.length;t++){const i=x[t];for(let t=0;t<i;t++,e+=a){const n=f;if(n.coordsIndex=e,t!==i-1){const t=g;t.coordsIndex=e+a;const i=p;E(p,r,n,t);const c=(r.x-i.x)/o,m=(r.y-i.y)/l,f=c*c+m*m;f<=1&&u.candidates.push(d(s.getObjectId(y),h(i),Math.sqrt(f),h(n),h(t)))}}}}if(t.types&D.VERTEX){const e=c?n.length-a:n.length;for(let t=0;t<e;t+=a){const e=f;e.coordsIndex=t;const i=(r.x-e.x)/o,a=(r.y-e.y)/l,n=i*i+a*a;n<=1&&u.candidates.push(m(s.getObjectId(y),h(e),Math.sqrt(n)))}}}return u.candidates.sort(((e,t)=>e.distance-t.distance)),u}_getPointCreator(e,i,s){const a=t(s)&&!l(i,s)?e=>c(e,i,s):e=>e,{hasZ:r}=this,n=0;return"3d"===e?r?({x:e,y:t,z:i})=>a({x:e,y:t,z:i}):({x:e,y:t})=>a({x:e,y:t,z:n}):({x:e,y:t})=>a({x:e,y:t})}async createSummaryStatisticsResponse(e){const{field:t,valueExpression:i,normalizationField:s,normalizationType:a,normalizationTotal:r,minValue:n,maxValue:o,scale:l}=e,u=this.fieldsIndex.isDateField(t),c=await this._getDataValues({field:t,valueExpression:i,normalizationField:s,normalizationType:a,normalizationTotal:r,scale:l}),d=y({normalizationType:a,normalizationField:s,minValue:n,maxValue:o}),m=this.fieldsIndex.get(t),h={value:.5,fieldType:m?.type},f=p(m)?x({values:c,supportsNullCount:d,percentileParams:h}):I({values:c,minValue:n,maxValue:o,useSampleStdDev:!a,supportsNullCount:d,percentileParams:h});return T(f,u)}async createUniqueValuesResponse(e){const{field:t,valueExpression:i,domains:s,returnAllCodedValues:a,scale:r}=e,n=await this._getDataValues({field:t,field2:e.field2,field3:e.field3,fieldDelimiter:e.fieldDelimiter,valueExpression:i,scale:r}),o=V(n);return F(o,s,a,e.fieldDelimiter)}async createClassBreaksResponse(e){const{field:t,valueExpression:i,normalizationField:s,normalizationType:a,normalizationTotal:r,classificationMethod:n,standardDeviationInterval:o,minValue:l,maxValue:u,numClasses:c,scale:d}=e,m=await this._getDataValues({field:t,valueExpression:i,normalizationField:s,normalizationType:a,normalizationTotal:r,scale:d}),h=S(m,{field:t,normalizationField:s,normalizationType:a,normalizationTotal:r,classificationMethod:n,standardDeviationInterval:o,minValue:l,maxValue:u,numClasses:c});return _(h,n)}async createHistogramResponse(e){const{field:t,valueExpression:i,normalizationField:s,normalizationType:a,normalizationTotal:r,classificationMethod:n,standardDeviationInterval:o,minValue:l,maxValue:u,numBins:c,scale:d}=e,m=await this._getDataValues({field:t,valueExpression:i,normalizationField:s,normalizationType:a,normalizationTotal:r,scale:d});return z(m,{field:t,normalizationField:s,normalizationType:a,normalizationTotal:r,classificationMethod:n,standardDeviationInterval:o,minValue:l,maxValue:u,numBins:c})}_sortFeatures(e,t,i){if(e.length>1&&t&&t.length)for(const s of t.reverse()){const t=s.split(" "),a=t[0],r=this.fieldsIndex.get(a),n=!!t[1]&&"desc"===t[1].toLowerCase(),o=v(r?.type,n);e.sort(((e,t)=>{const s=i(e,a,r),n=i(t,a,r);return o(s,n)}))}}_createFeatureQueryResponse(e){const t=this.items,{geometryType:i,hasM:s,hasZ:a,objectIdField:r,spatialReference:o}=this,{outFields:l,outSR:u,quantizationParameters:c,resultRecordCount:d,resultOffset:m,returnZ:f,returnM:g}=e,p=null!=d&&t.length>(m||0)+d,y=l&&(l.includes("*")?[...this.fieldsIndex.fields]:l.map((e=>this.fieldsIndex.get(e))));return{exceededTransferLimit:p,features:this._createFeatures(e,t),fields:y,geometryType:i,hasM:s&&g,hasZ:a&&f,objectIdFieldName:r,spatialReference:h(u||o),transform:c&&n(c)||null}}_createFeatures(e,t){const i=new u(e,this.featureAdapter,this.fieldsIndex),{hasM:s,hasZ:a}=this,{orderByFields:r,quantizationParameters:o,returnGeometry:l,returnCentroid:c,maxAllowableOffset:d,resultOffset:m,resultRecordCount:h,returnZ:p=!1,returnM:y=!1}=e,x=a&&p,I=s&&y;let T=[],V=0;const F=[...t];if(this._sortFeatures(F,r,((e,t,s)=>i.getFieldValue(e,t,s))),l||c){const e=n(o)??void 0;if(l&&!c)for(const t of F)T[V++]={attributes:i.getAttributes(t),geometry:f(this.geometryType,this.hasZ,this.hasM,this.featureAdapter.getGeometry(t),d,e,x,I)};else if(!l&&c)for(const t of F)T[V++]={attributes:i.getAttributes(t),centroid:g(this,this.featureAdapter.getCentroid(t,this),e)};else for(const t of F)T[V++]={attributes:i.getAttributes(t),centroid:g(this,this.featureAdapter.getCentroid(t,this),e),geometry:f(this.geometryType,this.hasZ,this.hasM,this.featureAdapter.getGeometry(t),d,e,x,I)}}else for(const n of F){const e=i.getAttributes(n);e&&(T[V++]={attributes:e})}const S=m||0;if(null!=h){const e=S+h;T=T.slice(S,Math.min(T.length,e))}return T}_createExceedsLimitQueryResponse(e){let i=!1,s=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,r=Number.POSITIVE_INFINITY;for(const t of e.outStatistics??[])if("exceedslimit"===t.statisticType){s=null!=t.maxPointCount?t.maxPointCount:Number.POSITIVE_INFINITY,a=null!=t.maxRecordCount?t.maxRecordCount:Number.POSITIVE_INFINITY,r=null!=t.maxVertexCount?t.maxVertexCount:Number.POSITIVE_INFINITY;break}if("esriGeometryPoint"===this.geometryType)i=this.items.length>s;else if(this.items.length>a)i=!0;else{const e=N(this.hasZ,this.hasM),s=this.featureAdapter;i=this.items.reduce(((e,i)=>{const a=s.getGeometry(i);return e+(t(a)&&a.coords.length||0)}),0)/e>r}return{fields:[{name:"exceedslimit",type:"esriFieldTypeInteger",alias:"exceedslimit",sqlType:"sqlTypeInteger",domain:null,defaultValue:null}],features:[{attributes:{exceedslimit:Number(i)}}]}}async _createStatisticsQueryResponse(e){const t={attributes:{}},i=[],s=new Map,a=new Map,r=new Map,n=new Map,o=new u(e,this.featureAdapter,this.fieldsIndex),l=e.outStatistics,{groupByFieldsForStatistics:c,having:d,orderByFields:m}=e,h=c&&c.length,f=!!h,g=f?c[0]:null,p=f&&!this.fieldsIndex.get(g);for(const u of l??[]){const{outStatisticFieldName:e,statisticType:l}=u,m=u,y="exceedslimit"!==l?u.onStatisticField:void 0,x="percentile_disc"===l||"percentile_cont"===l,I="EnvelopeAggregate"===l||"CentroidAggregate"===l||"ConvexHullAggregate"===l,T=f&&1===h&&(y===g||p)&&"count"===l;if(f){if(!r.has(y)){const e=[];for(const t of c){const i=this._getAttributeValues(o,t,s);e.push(i)}r.set(y,this._calculateUniqueValues(e,!I&&o.returnDistinctValues))}const t=r.get(y);for(const i in t){const{count:a,data:r,items:l,itemPositions:u}=t[i],h=r.join(",");if(!d||o.validateItems(l,d)){const t=n.get(h)||{attributes:{}};if(I){t.aggregateGeometries||(t.aggregateGeometries={});const{aggregateGeometries:e,outStatisticFieldName:i}=await this._getAggregateGeometry(m,l);t.aggregateGeometries[i]=e}else{let i=null;if(T)i=a;else{const e=this._getAttributeValues(o,y,s),t=u.map((t=>e[t]));i=x&&"statisticParameters"in m?this._getPercentileValue(m,t):this._getStatisticValue(m,t,null,o.returnDistinctValues)}t.attributes[e]=i}let i=0;c.forEach(((e,s)=>t.attributes[this.fieldsIndex.get(e)?e:"EXPR_"+ ++i]=r[s])),n.set(h,t)}}}else if(I){t.aggregateGeometries||(t.aggregateGeometries={});const{aggregateGeometries:e,outStatisticFieldName:i}=await this._getAggregateGeometry(m,this.items);t.aggregateGeometries[i]=e}else{const i=this._getAttributeValues(o,y,s);t.attributes[e]=x&&"statisticParameters"in m?this._getPercentileValue(m,i):this._getStatisticValue(m,i,a,o.returnDistinctValues)}i.push({name:e,alias:e,type:"esriFieldTypeDouble"})}const y=f?Array.from(n.values()):[t];return this._sortFeatures(y,m,((e,t)=>e.attributes[t])),{fields:i,features:y}}async _getAggregateGeometry(e,t){const n=await import("../../../geometry/geometryEngineJSON.js"),{statisticType:o,outStatisticFieldName:l}=e,{featureAdapter:u,spatialReference:c,geometryType:d,hasZ:m,hasM:h}=this,g=t.map((e=>f(d,m,h,u.getGeometry(e)))),p=n.convexHull(c,g,!0)[0],y={aggregateGeometries:null,outStatisticFieldName:null};if("EnvelopeAggregate"===o){const e=p?a(p):r(n.union(c,g));y.aggregateGeometries={...e,spatialReference:c},y.outStatisticFieldName=l||"extent"}else if("CentroidAggregate"===o){const e=p?i(p):s(r(n.union(c,g)));y.aggregateGeometries={x:e[0],y:e[1],spatialReference:c},y.outStatisticFieldName=l||"centroid"}else"ConvexHullAggregate"===o&&(y.aggregateGeometries=p,y.outStatisticFieldName=l||"convexHull");return y}_getStatisticValue(e,t,i,s){const{onStatisticField:a,statisticType:r}=e;let n=null;n=i?.has(a)?i.get(a):p(this.fieldsIndex.get(a))?x({values:t,returnDistinct:s}):I({values:s?[...new Set(t)]:t,minValue:null,maxValue:null,useSampleStdDev:!0}),i&&i.set(a,n);return n["var"===r?"variance":r]}_getPercentileValue(e,t){const{onStatisticField:i,statisticParameters:s,statisticType:a}=e,{value:r,orderBy:n}=s,o=this.fieldsIndex.get(i);return b(t,{value:r,orderBy:n,fieldType:o?.type,isDiscrete:"percentile_disc"===a})}_getAttributeValues(e,t,i){if(i.has(t))return i.get(t);const s=this.fieldsIndex.get(t),a=this.items.map((i=>e.getFieldValue(i,t,s)));return i.set(t,a),a}_getAttributeDataValues(e,t){return this.items.map((i=>e.getDataValue(i,{field:t.field,field2:t.field2,field3:t.field3,fieldDelimiter:t.fieldDelimiter,normalizationField:t.normalizationField,normalizationType:t.normalizationType,normalizationTotal:t.normalizationTotal})))}async _getAttributeExpressionValues(e,t,i){const{arcadeUtils:s}=await R(),a=s.createFunction(t),r=i&&s.getViewInfo(i);return e.getExpressionValues(this.items,a,r,s)}_calculateUniqueValues(e,t){const i={},s=this.items,a=s.length;for(let r=0;r<a;r++){const a=s[r],n=[];for(const t of e)n.push(t[r]);const o=n.join(",");null==i[o]?i[o]={count:1,data:n,items:[a],itemPositions:[r]}:(t||i[o].count++,i[o].items.push(a),i[o].itemPositions.push(r))}return i}async _getDataValues(e){const t=new u(this.query,this.featureAdapter,this.fieldsIndex),{valueExpression:i,field:s,normalizationField:a,normalizationType:r,normalizationTotal:n,scale:o}=e,l=i?{viewingMode:"map",scale:o,spatialReference:this.query.outSR||this.spatialReference}:null;return i?this._getAttributeExpressionValues(t,i,l):this._getAttributeDataValues(t,{field:s,field2:e.field2,field3:e.field3,fieldDelimiter:e.fieldDelimiter,normalizationField:a,normalizationType:r,normalizationTotal:n})}}function E(e,t,i,s){const a=s.x-i.x,r=s.y-i.y,n=a*a+r*r,o=(t.x-i.x)*a+(t.y-i.y)*r,l=Math.min(1,Math.max(0,o/n));e.x=i.x+a*l,e.y=i.y+r*l}function N(e,t){return e?t?4:3:t?3:2}var D;!function(e){e[e.NONE=0]="NONE",e[e.EDGE=1]="EDGE",e[e.VERTEX=2]="VERTEX"}(D||(D={}));class q{constructor(e,t){this.coords=e,this.coordsIndex=t}get x(){return this.coords[this.coordsIndex]}get y(){return this.coords[this.coordsIndex+1]}get z(){return this.coords[this.coordsIndex+2]}}export{A as QueryEngineResult,D as SnappingTypes};