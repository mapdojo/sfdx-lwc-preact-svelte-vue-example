/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{getAssetUrl as i}from"../../../assets.js";function e(i){const e=i.toLowerCase();return"image/bmp"===e||"image/emf"===e||"image/exif"===e||"image/gif"===e||"image/x-icon"===e||"image/jpeg"===e||"image/png"===e||"image/tiff"===e||"image/x-wmf"===e}function p(e){const p=i("esri/themes/base/images/files/");return e?"text/plain"===e?`${p}text-32.svg`:"application/pdf"===e?`${p}pdf-32.svg`:"text/csv"===e?`${p}csv-32.svg`:"application/gpx+xml"===e?`${p}gpx-32.svg`:"application/x-dwf"===e?`${p}cad-32.svg`:"application/postscript"===e||"application/json"===e||"text/xml"===e||"model/vrml"===e?`${p}code-32.svg`:"application/x-zip-compressed"===e||"application/x-7z-compressed"===e||"application/x-gzip"===e||"application/x-tar"===e||"application/x-gtar"===e||"application/x-bzip2"===e||"application/gzip"===e||"application/x-compress"===e||"application/x-apple-diskimage"===e||"application/x-rar-compressed"===e||"application/zip"===e?`${p}zip-32.svg`:e.includes("image/")?`${p}image-32.svg`:e.includes("audio/")?`${p}sound-32.svg`:e.includes("video/")?`${p}video-32.svg`:e.includes("msexcel")||e.includes("ms-excel")||e.includes("spreadsheetml")?`${p}excel-32.svg`:e.includes("msword")||e.includes("ms-word")||e.includes("wordprocessingml")?`${p}word-32.svg`:e.includes("powerpoint")||e.includes("presentationml")?`${p}report-32.svg`:`${p}generic-32.svg`:`${p}generic-32.svg`}export{p as getIconPath,e as isSupportedImage};