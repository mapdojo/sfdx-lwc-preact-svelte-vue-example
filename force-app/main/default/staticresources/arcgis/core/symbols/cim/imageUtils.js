/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function t(t){const e=t.getFrame(0);if(e instanceof HTMLImageElement||e instanceof HTMLCanvasElement)return e;const n=document.createElement("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");return e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0),n}export{t as getFirstFrame};