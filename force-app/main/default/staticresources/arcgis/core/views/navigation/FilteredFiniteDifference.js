/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(t){this._gain=t,this.lastValue=void 0,this.filteredDelta=void 0}update(t){if(this.hasLastValue()){const e=this.computeDelta(t);this._updateDelta(e)}this.lastValue=t}reset(){this.lastValue=void 0,this.filteredDelta=void 0}hasLastValue(){return void 0!==this.lastValue}hasFilteredDelta(){return void 0!==this.filteredDelta}computeDelta(t){return void 0===this.lastValue?NaN:t-this.lastValue}_updateDelta(t){void 0!==this.filteredDelta?this.filteredDelta=(1-this._gain)*this.filteredDelta+this._gain*t:this.filteredDelta=t}}export{t as FilteredFiniteDifference};