/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(){this._operations=[],this._closed=!1}close(){this._closed=!0}apply(){for(const t of this._operations)t.apply()}undo(){for(let t=this._operations.length-1;t>=0;t--)this._operations[t].undo()}accumulate(t){if(this._closed)return!1;const o=this._operations.length?this._operations[this._operations.length-1]:null;return o&&o.accumulate(t)||(this._operations.push(t),t.apply()),!0}}export{t as UndoGroup};