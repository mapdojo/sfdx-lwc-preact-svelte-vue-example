/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(t=0,o=0){this.from=t,this.to=o}get numElements(){return this.to-this.from}}function o(t){const o=new Map;t.forAll((t=>o.set(t.from,t)));let e=!0;for(;e;)e=!1,t.forEach((r=>{const s=o.get(r.to);s&&(r.to=s.to,o.delete(s.from),t.removeUnordered(s),e=!0)}))}export{t as BufferRange,o as mergeAdjacentRanges};