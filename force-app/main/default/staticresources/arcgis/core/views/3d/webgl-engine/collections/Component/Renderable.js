/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(t,s,e){this.material=t,this.geometry=s,this.meta=e}destroy(){this.material.dispose(),this.geometry.dispose()}}export{t as Renderable};