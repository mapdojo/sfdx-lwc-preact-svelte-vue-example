/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{MAX_PATCH_TESSELATION as s}from"./TerrainConst.js";class t{constructor(){this.sinLonLUT=new Array(s+1),this.cosLonLUT=new Array(s+1),this.sinLatLUT=new Array(s+1),this.cosLatLUT=new Array(s+1)}update(s,t,n){const o=t[0],i=t[2];for(let r=0;r<=s;r++){const t=r/s,L=o*(1-t)+i*t;this.sinLonLUT[r]=Math.sin(L),this.cosLonLUT[r]=Math.cos(L);const a=n(t);this.sinLatLUT[r]=Math.sin(a),this.cosLatLUT[r]=Math.cos(a)}}}export{t as PatchGeometryLUT};