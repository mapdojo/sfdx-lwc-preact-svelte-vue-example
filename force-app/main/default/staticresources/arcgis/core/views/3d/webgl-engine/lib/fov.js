/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
function t(t,a,n){return 2*Math.atan(Math.sqrt(a*a+n*n)*Math.tan(.5*t)/a)}function a(t,a,n){return 2*Math.atan(Math.sqrt(a*a+n*n)*Math.tan(.5*t)/n)}function n(t,a,n){return 2*Math.atan(a*Math.tan(.5*t)/Math.sqrt(a*a+n*n))}function r(t,a,n){return 2*Math.atan(n*Math.tan(.5*t)/Math.sqrt(a*a+n*n))}export{n as fovd2fovx,r as fovd2fovy,t as fovx2fovd,a as fovy2fovd};