/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"./ImmutableArray.js";import s from"../geometry/Point.js";class i extends t{constructor(t,s,i,e,h,a){super(t),this._lazyPt=[],this._hasZ=!1,this._hasM=!1,this._spRef=s,this._hasZ=i,this._hasM=e,this._cacheId=h,this._partId=a}get(t){if(void 0===this._lazyPt[t]){const i=this._elements[t];if(void 0===i)return;const e=this._hasZ,h=this._hasM;let a=null;a=e&&!h?new s(i[0],i[1],i[2],void 0,this._spRef):h&&!e?new s(i[0],i[1],void 0,i[2],this._spRef):e&&h?new s(i[0],i[1],i[2],i[3],this._spRef):new s(i[0],i[1],this._spRef),a.cache._arcadeCacheId=this._cacheId.toString()+"-"+this._partId.toString()+"-"+t.toString(),this._lazyPt[t]=a}return this._lazyPt[t]}equalityTest(t){return t===this||null!==t&&(t instanceof i!=!1&&t.getUniqueHash()===this.getUniqueHash())}getUniqueHash(){return this._cacheId.toString()+"-"+this._partId.toString()}}export{i as default};