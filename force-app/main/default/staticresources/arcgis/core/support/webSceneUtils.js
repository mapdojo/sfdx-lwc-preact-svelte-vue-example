/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"../core/Error.js";const r="webscene:failed-to-copy-embedded-resources",o="webscene:schema-validation";function n(){return new e(r,"Copying of embedded resources is currently not supported")}function s(r){return new e(o,"Failed to save webscene due to schema validation errors. See 'details.errors' for more detailed information",{errors:r})}export{n as createCopyError,s as createSchemaValidationError,o as schemaValidationErrorName};