/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class e{constructor(e){this._maxCount=e,this._nextIndex=0,this._recycledIndices=[]}get activeCount(){return this._nextIndex-this._recycledIndices.length}get availableCount(){return this._recycledIndices.length+this._maxCount-this._nextIndex}acquire(){return this._recycledIndices.length>0?this._recycledIndices.pop():this.availableCount?this._nextIndex++:void 0}release(e){this._recycledIndices.push(e)}}export{e as SimpleIndexManager};