/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class e{constructor(e,i,t,s){this.visibleLineVisualElement=e,this.occludedLineVisualElement=i,this.undefinedLineVisualElement=t,this.targetVisualElement=s}destroy(){this.visibleLineVisualElement.destroy(),this.occludedLineVisualElement.destroy(),this.undefinedLineVisualElement.destroy(),this.targetVisualElement.destroy()}}export{e as LineOfSightVisualElement};