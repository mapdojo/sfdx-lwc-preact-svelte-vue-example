/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(t){this._allocations=new Map,t?Error.stackTraceLimit=1/0:(this.add=()=>{},this.remove=()=>{})}add(t){this._allocations.set(t,(new Error).stack)}remove(t){this._allocations.delete(t)}get information(){let t="";if(this._allocations.size>0){t+=`${this._allocations.size} live object allocations:\n`;const s=new Map;this._allocations.forEach((t=>{s.set(t,(s.get(t)??0)+1)})),s.forEach(((s,o)=>{const i=o.split("\n");i.shift(),i.shift(),t+=`${s}: ${i.shift()}\n`,i.forEach((s=>t+=`   ${s}\n`))}))}return t}}export{t as AllocationTracer};