/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(){this._data=new Map,this._miss=0,this._hit=0,this.initialized=!0}init(){return Promise.resolve()}async get(t,i){if(this._data.has(t))return this._hit++,this._data.get(t)??void 0;this._miss++}destroy(){}put(t,i){return this._data.set(t,i),Promise.resolve()}remove(t){return this._data.delete(t),Promise.resolve()}getHitRate(){return this._hit/(this._hit+this._miss)}}export{t as IDBMockCache};