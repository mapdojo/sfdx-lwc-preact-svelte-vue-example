/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class e{constructor(e){this._gain=e}update(e){void 0!==this.filteredValue?this.filteredValue=(1-this._gain)*this.filteredValue+this._gain*e:this.filteredValue=e}reset(){this.filteredValue=void 0}get hasFilteredValue(){return void 0!==this.filteredValue}}export{e as FilteredValue};