/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class e{constructor(e,i){this._worldSpaceRadius=e,this._minScreenSpaceRadii=i}selectLevel(e,i,t){const c=t.computeScreenPixelSizeAt(e),r=this._worldSpaceRadius*i/c;let s=0;for(let a=1;a<this._minScreenSpaceRadii.length;++a)r>=this._minScreenSpaceRadii[a]&&(s=a);return s}}export{e as LevelSelector};