/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const t=1.25;class e{get length(){return this._pos}constructor(t,e){this._pos=0;const r=e?this._roundToNearest(e,t.BYTES_PER_ELEMENT):40;this._array=new ArrayBuffer(r),this._buffer=new t(this._array),this._ctor=t,this._i16View=new Int16Array(this._array)}_roundToNearest(t,e){const r=Math.round(t);return r+(e-r%e)}_ensureSize(e){if(this._pos+e>=this._buffer.length){const r=this._roundToNearest((this._array.byteLength+e*this._buffer.BYTES_PER_ELEMENT)*t,this._buffer.BYTES_PER_ELEMENT),s=new ArrayBuffer(r),i=new this._ctor(s);i.set(this._buffer,0),this._array=s,this._buffer=i,this._i16View=new Int16Array(this._array)}}ensureSize(t){this._ensureSize(t)}writeF32(t){this._ensureSize(1);const e=this._pos;return new Float32Array(this._array,4*this._pos,1)[0]=t,this._pos++,e}push(t){this._ensureSize(1);const e=this._pos;return this._buffer[this._pos++]=t,e}writeFixed(t){this._buffer[this._pos++]=t}setValue(t,e){this._buffer[t]=e}i1616Add(t,e,r){this._i16View[2*t]+=e,this._i16View[2*t+1]+=r}getValue(t){return this._buffer[t]}incr(t){if(this._buffer.length<t)throw new Error("Increment index overflows the target buffer");this._buffer[t]++}decr(t){this._buffer[t]--}writeRegion(t){this._ensureSize(t.length);const e=this._pos;return this._buffer.set(t,this._pos),this._pos+=t.length,e}writeManyFrom(t,e,r){this._ensureSize(r-e);for(let s=e;s!==r;s++)this.writeFixed(t._buffer[s])}buffer(){const t=this._array.slice(0,4*this._pos);return this.destroy(),t}toArray(){const t=this._array,e=[];for(let r=0;r<t.byteLength/4;r++)e.push(t[r]);return e}seek(t){this._pos=t}destroy(){this._array=null,this._buffer=null}}export{e as default};