/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(){this.name=this.constructor.name||"UnnamedBrush",this.brushEffect=null}prepareState(t,r){}draw(t,r,s){}drawMany(t,r,s){for(const a of r)a.visible&&this.draw(t,a,s)}}export{t as default};