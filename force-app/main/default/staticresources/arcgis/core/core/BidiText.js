/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import r from"./BidiEngine.js";const n=new r;function i(r){if(null==r)return["",!1];if(!n.hasBidiChar(r))return[r,!1];let i;return i="rtl"===n.checkContextual(r)?"IDNNN":"ICNNN",[n.bidiTransform(r,i,"VLYSN"),!0]}export{i as bidiText};