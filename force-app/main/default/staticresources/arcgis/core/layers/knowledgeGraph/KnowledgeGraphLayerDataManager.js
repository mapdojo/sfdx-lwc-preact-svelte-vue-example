/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import t from"../../core/Accessor.js";import o from"../../core/Error.js";import n from"../../core/Logger.js";import{unwrap as i,isSome as r}from"../../core/maybe.js";import{parseWhereClause as s}from"../../core/sql.js";import{property as a}from"../../core/accessorSupport/decorators/property.js";import"../../core/accessorSupport/ensureType.js";import"../../core/arrayUtils.js";import{subclass as p}from"../../core/accessorSupport/decorators/subclass.js";import{encodeGeohash as m}from"../../geohash/geohashUtils.js";import d from"../../geometry/Polygon.js";import{initializeProjection as l,project as h}from"../../geometry/projection.js";import{WGS84 as c}from"../../geometry/support/spatialReferenceUtils.js";import y from"./SessionMemoryStorage.js";import{executeQueryStreaming as u}from"../../rest/knowledgeGraphService.js";import f from"../../rest/knowledgeGraph/GraphQueryStreaming.js";import g from"../../rest/support/Query.js";const b="ESRI__ID",w="ESRI__ORIGIN_ID",T="ESRI__DESTINATION_ID",D="ESRI__LAYOUT_GEOMETRY",I=12,M=n.getLogger("esri.rest.knowledgeGraph.knowledgeGraphLayer.KnowledgeGraphLayerDataManager");let E=class extends t{constructor(e){super(e),this.inclusionModeDefinition={generateAllSublayers:!0,namedTypeDefinitions:new Map},this.entityTypeNames=new Set,this.relationshipTypeNames=new Set,this.geographicLookup=new Map,this.sublayerCaches=new Map,this._processingCacheUpdatesLookup=new Map,this._memberIdTypeLookup=new Map;const t=new Map;e.knowledgeGraph.dataModel.entityTypes?.forEach((o=>{o.name&&(t.set(o.name,"entity"),this._processingCacheUpdatesLookup.set(o.name,[]),e.inclusionModeDefinition&&!e.inclusionModeDefinition?.generateAllSublayers||this.entityTypeNames.add(o.name),o.properties?.forEach((e=>{e.geometryType&&"esriGeometryNull"!==e.geometryType&&this.geographicLookup.set(o.name,{name:e.name?e.name:"",geometryType:e.geometryType})})))})),e.knowledgeGraph.dataModel.relationshipTypes?.forEach((o=>{o.name&&(t.set(o.name,"relationship"),this._processingCacheUpdatesLookup.set(o.name,[]),e.inclusionModeDefinition&&!e.inclusionModeDefinition?.generateAllSublayers||this.relationshipTypeNames.add(o.name),o.properties?.forEach((e=>{e.geometryType&&"esriGeometryNull"!==e.geometryType&&this.geographicLookup.set(o.name,{name:e.name?e.name:"",geometryType:e.geometryType})})))})),e.inclusionModeDefinition?.namedTypeDefinitions.forEach(((o,n)=>{if("entity"===t.get(n))this.entityTypeNames.add(n);else{if("relationship"!==t.get(n))return M.warn(`A named type, ${n}, was in the inclusion list that wasn't in the data model and will be removed`),void e.inclusionModeDefinition?.namedTypeDefinitions.delete(n);this.relationshipTypeNames.add(n)}const i=new Map;o.members?.forEach((e=>{this._memberIdTypeLookup.set(e.id,n);const t=this.getById(e.id);t&&i.set(e.id,t)})),this.sublayerCaches.set(n,i)}))}async addToLayerInclusionSet(e,t=!1){e.forEach(((e,t)=>{if(!this.inclusionModeDefinition)throw new o("knowledge-graph:layer-data-manager","You cannot add to a layer's exclusion list if it was not created with an exclusion list originally");if(this.inclusionModeDefinition.namedTypeDefinitions.has(e)){if(this.inclusionModeDefinition.namedTypeDefinitions.has(e)){const n=this.inclusionModeDefinition.namedTypeDefinitions.get(e);if(n.useAllData)throw new o("knowledge-graph:layer-data-manager","You cannot add members to an exclusion list for a sublayer where the sublayer is set to always retrieve its entire data set");n.members||(n.members=new Map),n.members.set(t,{id:t}),this._memberIdTypeLookup.set(t,e)}}else{const o=new Map;o.set(t,{id:t}),this.inclusionModeDefinition.namedTypeDefinitions.set(e,{useAllData:!1,members:o}),this._memberIdTypeLookup.set(t,e)}})),t&&await this.refreshCacheContent(Array.from(e.keys()))}getById(e){return y.getInstance().readFromStoreById(e)}async getData(e,t,o){if(t.objectType.name&&this.inclusionModeDefinition?.namedTypeDefinitions&&this.inclusionModeDefinition.namedTypeDefinitions.size>0&&!this.inclusionModeDefinition.namedTypeDefinitions.has(t.objectType.name))return[];let n;if(n=e||new g({where:"1=1",outFields:["*"]}),"link-chart"===t.parentCompositeLayer.type){const e=t.parentCompositeLayer,o=this._processingCacheUpdatesLookup.get(t.objectType.name?t.objectType.name:""),r=i(n.outFields),s=i(n.geometry);let a="",p="";s&&s.extent&&(a=m(s.extent.ymin,s.extent.xmin,I),p=m(s.extent.ymax,s.extent.xmax,I)),r&&1===r.length&&r[0]===b&&"1=1"===i(n.where)||await Promise.all(o||[]);const d=this.sublayerCaches.has(t.objectType.name?t.objectType.name:"")?Array.from(this.sublayerCaches.get(t.objectType.name)?.values()):[],l=[];return d.forEach((o=>{if(o.geometry=e.linkChartDiagramLookup.get(o.attributes[t.objectIdField]),o.attributes[D]=o.geometry,a&&p){const n=e.linkChartGeohashLookup.get(o.attributes[t.objectIdField]);n?n>=a&&n<=p&&l.push(o):l.push(o)}else l.push(o)})),l}return this.retrieveDataFromService(n,t,o)}async refreshCacheContent(e,t,n){const i=y.getInstance(),r=[],s=new Map,a=new Map;this.knowledgeGraph.dataModel.entityTypes?.forEach((e=>{e.name&&a.set(e.name,e)})),this.knowledgeGraph.dataModel.relationshipTypes?.forEach((e=>{e.name&&a.set(e.name,e)})),e||this.inclusionModeDefinition?e?e.forEach((e=>{if(this._memberIdTypeLookup.has(e)){const t=this._memberIdTypeLookup.get(e);s.has(t)?s.get(t)?.push(e):s.set(t,[e])}})):this.inclusionModeDefinition?.namedTypeDefinitions?.forEach(((e,t)=>{e.useAllData?s.set(t,null):e.members&&e.members.forEach((e=>{s.has(t)&&null!==s.get(t)?s.get(t)?.push(e.id):s.set(t,[e.id])}))})):(this.knowledgeGraph.dataModel.entityTypes?.forEach((e=>{e.name&&s.set(e.name,null)})),this.knowledgeGraph.dataModel.entityTypes?.forEach((e=>{e.name&&s.set(e.name,null)})));for(const[p,m]of s){const e=new Promise((e=>{const r=async()=>{const e=new Set,r=[];let s,d="",l=!1;if(t||a.get(p)?.properties?.forEach((t=>{t.name&&e.add(t.name)})),n&&this.geographicLookup.has(p)){const t=this.geographicLookup.get(p)?.name;t&&e.add(t)}if(this.entityTypeNames.has(p))d=`MATCH (n:${p}) ${m?"WHERE id(n) IN $ids ":""}return ID(n)`,e.forEach((e=>{d+=`, n.${e}`,r.push(e)}));else{if(!this.relationshipTypeNames.has(p))throw new o("knowledge-graph:layer-data-manager",`The graph type of ${p} could not be determined.  Was this type set in the KG data model?`);l=!0,d=`MATCH ()-[n:${p}]->() ${m?"WHERE id(n) IN $ids ":""}return ID(n), id(startNode(n)), id(endNode(n))`}s=new f(m?{openCypherQuery:d,bindParameters:{ids:m}}:{openCypherQuery:d});const h=(await u(this.knowledgeGraph,s)).resultRowsStream.getReader();for(;;){const{done:e,value:t}=await h.read();if(e)break;const o=[];for(let i=0;i<t.length;i++){const e=t[i];let n=0,s=0;const a={properties:{}};for(a.id=e[n],n++,s++,l&&(a.originId=e[n],n++,s++,a.destinationId=e[n],n++,s++);n<e.length;n++)a.properties[r[n-s]]=e[n];o.push(a)}const n=i.writeToStore(o,b,this.geographicLookup.get(p)?.name);this.sublayerCaches.has(p)||this.sublayerCaches.set(p,new Map);const s=this.sublayerCaches.get(p);n.forEach((e=>{s?.set(e.attributes[b],e)}))}};r().then((()=>{e(null)}))}));r.push(e),this._processingCacheUpdatesLookup.get(p)?.push(e)}await Promise.all(r)}removeFromLayer(e){const t=new Set;e.forEach((e=>{this._memberIdTypeLookup.get(e)&&t.add(this._memberIdTypeLookup.get(e)),this._memberIdTypeLookup.delete(e),this.inclusionModeDefinition?.namedTypeDefinitions.forEach((t=>{t.members?.has(e)&&t.members.delete(e)}))})),t.forEach((t=>{this.sublayerCaches.get(t)?.forEach(((o,n)=>{e.includes(n)&&this.sublayerCaches.get(t)?.delete(n)}))}))}async retrieveDataFromService(e,t,o){const n=y.getInstance(),a=new Set,p=[];let m,g="",w=[],T=t.parentCompositeLayer.sublayerIdsCache.get(t.objectType.name);const D="relationship"===t.graphType;if(!this.inclusionModeDefinition?.namedTypeDefinitions?.get(t.objectType.name)?.useAllData)if(r(e.objectIds)&&T&&T.length>0){const t=i(e.objectIds);e.objectIds=T.filter((e=>t.includes(e)))}else if(r(e.objectIds))T=i(e.objectIds);else{if(this.inclusionModeDefinition?.namedTypeDefinitions.has(t.objectType.name)&&(!this.inclusionModeDefinition.namedTypeDefinitions.get(t.objectType.name)?.members||this.inclusionModeDefinition.namedTypeDefinitions.get(t.objectType.name)?.members?.size<1))return e.objectIds=[],[];e.objectIds=T}if(r(e.outFields)){const o=i(e.outFields);o.includes("*")?t.fields.forEach((e=>{a.add(e.name)})):o.forEach((e=>{e!==b&&e!==t.geometryFieldName&&a.add(e)}))}if(r(e.geometry)){const o=i(e.geometry);let n;if(o?.extent?.spatialReference&&!o.spatialReference?.isWGS84?(await l(o.extent.spatialReference,c),n=h(o.extent,c)):n=o.extent,r(e.where)&&"1=1"!==i(e.where)){const o=await s(i(e.where).toUpperCase(),t.fieldsIndex);t.fields.forEach((e=>{o.fieldNames.includes(e.name)&&a.add(e.name)}))}g=D?`Match ()-[n:${t.objectType.name}]-() WHERE esri.graph.ST_Intersects($param_filter_geom, n.${t.geometryFieldName}) return ID(n), id(startNode(r)), id(endNode(r))`:`Match (n:${t.objectType.name}) WHERE esri.graph.ST_Intersects($param_filter_geom, n.${t.geometryFieldName}) return ID(n)`,i(e).returnGeometry&&t.geometryFieldName&&a.add(t.geometryFieldName),a.forEach((e=>{g+=`, n.${e}`,p.push(e)})),m=new f({openCypherQuery:g,bindParameters:{param_filter_geom:new d({rings:[[[n.xmin,n.ymin],[n.xmin,n.ymax],[n.xmax,n.ymax],[n.xmax,n.ymin],[n.xmin,n.ymin]]]})}})}else{let o="";if(r(e.where)&&"1=1"!==i(e.where)){const n=await s(i(e.where),t.fieldsIndex);t.fields.forEach((e=>{n.fieldNames.includes(e.name)&&a.add(e.name)}));const r=["column-reference","string","number","binary-expression"],p=["=","<","<=","<>",">",">=","AND","OR","LIKE"];let m=!1;const d=e=>{if("column-reference"===e.type)return`n.${e.column}`;if("string"===e.type)return`'${e.value}'`;if("number"===e.type)return`${e.value}`;if("binary-expression"===e.type&&r.includes(e.left.type)&&r.includes(e.right.type)&&p.includes(e.operator))return`${d(e.left)} ${e.operator} ${d(e.right)}`;if("binary-expression"===e.type&&"LIKE"===e.operator){let t="";if("function"===e.left.type&&"column-reference"===e.left.args.value[0].type)t+=`lower(n.${e.left.args.value[0].column})`;else{if("column-reference"!==e.left.type)return m=!0,"";t+=`lower(n.${e.left.column})`}if(t+=" CONTAINS (","string"!==e.right.type)return m=!0,"";{let o=e.right.value;"%"===o.charAt(0)&&(o=o.slice(1)),"%"===o.charAt(o.length-1)&&(o=o.slice(0,-1)),t+=`'${o.toLowerCase()}')`}return t}return m=!0,""};o=d(n.parseTree),m&&(o="")}let n="";n=D?`Match ()-[n:${t.objectType.name}]-()`:`Match (n:${t.objectType.name})`;let d=!1;T&&(d=!0,n+=" WHERE ID(n) IN $ids"),o&&(n+=d?" AND":" WHERE",n+=` ${o}`),n+=" return ID(n)",D&&(n+=", id(startNode(n)), id(endNode(n))"),i(e).returnGeometry&&t.geometryFieldName&&a.add(t.geometryFieldName),a.forEach((e=>{n+=`, n.${e}`,p.push(e)})),m=new f(T?{openCypherQuery:n,bindParameters:{ids:T}}:{openCypherQuery:n})}const I=(await u(t.parentCompositeLayer.dataManager.knowledgeGraph,m,o)).resultRowsStream.getReader();for(;;){const{done:e,value:o}=await I.read();if(e)break;const i=[];for(let t=0;t<o.length;t++){const e=o[t];let n=0,r=0;const s={properties:{}};for(s.id=e[n],n++,r++,D&&(s.originId=e[n],n++,r++,s.destinationId=e[n],n++,r++);n<e.length;n++)s.properties[p[n-r]]=e[n];i.push(s)}w=w.concat(n.writeToStore(i,b,t.parentCompositeLayer.dataManager.geographicLookup.get(t.objectType.name)?.name))}return w}};e([a()],E.prototype,"knowledgeGraph",void 0),e([a()],E.prototype,"inclusionModeDefinition",void 0),e([a()],E.prototype,"entityTypeNames",void 0),e([a()],E.prototype,"relationshipTypeNames",void 0),e([a()],E.prototype,"geographicLookup",void 0),e([a()],E.prototype,"sublayerCaches",void 0),E=e([p("esri.rest.knowledgeGraph.knowledgeGraphLayer.KnowledgeGraphLayerDataManager")],E);export{I as GEOHASH_ENCODING_PRECISION,E as KnowledgeGraphLayerDataManager,T as MOCK_DESTINATION_ID_FIELD_NAME,D as MOCK_LAYOUT_GEOMETRY_FIELD_NAME,b as MOCK_OID_FIELD_NAME,w as MOCK_ORIGIN_ID_FIELD_NAME};