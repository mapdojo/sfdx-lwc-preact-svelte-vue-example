/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class s{constructor(s){this.origin=s,this.buffers=new Array}dispose(){this.buffers.forEach((s=>s.vao.dispose())),this.buffers.length=0}findBuffer(s){return this.buffers.find((r=>r.instances.has(s)))}}export{s as PerOriginData};