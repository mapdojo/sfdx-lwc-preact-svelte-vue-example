/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"./lut.js";import e from"./shadedrelief.js";import r from"./stretch.js";const s=new Map;function o(t){return s.get(t)}s.set("lut",t),s.set("hillshade",e),s.set("stretch",r);export{o as getColorizer};