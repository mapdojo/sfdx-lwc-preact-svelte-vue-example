/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class e{constructor(e,i){this._lockedSchemaPixelSize=e,this._isGCS=i}getLevelRowColumn(e){return this._isGCS?[e[0],e[1]>>1,e[2]>>1]:256===this._lockedSchemaPixelSize&&e[0]>0?[e[0]-1,e[1]>>1,e[2]>>1]:e}adjustLevel(e){return this._isGCS?e:256===this._lockedSchemaPixelSize?e>0?e-1:0:e}getShift(e,i){let t=0,s=0;return(256===this._lockedSchemaPixelSize||this._isGCS)&&(e[2]%2&&(t=i),e[1]%2&&(s=i)),[t,s]}getScale(e){if(this._isGCS){if(512===this._lockedSchemaPixelSize)return 4}else if(256===this._lockedSchemaPixelSize&&0===e)return 1;return 2}}export{e as SchemaHelper};