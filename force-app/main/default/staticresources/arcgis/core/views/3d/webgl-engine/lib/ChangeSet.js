/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../../../../core/PooledArray.js";class s{constructor(){this.adds=new e,this.removes=new e,this.updates=new e({allocator:e=>e||new r,deallocator:e=>(e.renderGeometry=null,e)})}clear(){this.adds.clear(),this.removes.clear(),this.updates.clear()}prune(){this.adds.prune(),this.removes.prune(),this.updates.prune()}get empty(){return 0===this.adds.length&&0===this.removes.length&&0===this.updates.length}}class r{}class t{constructor(){this.adds=new Array,this.removes=new Array,this.updates=new Array}}export{s as ChangeSet,t as MaterialChangeSet,r as RenderGeometryUpdate};