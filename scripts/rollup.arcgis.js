import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
    inlineDynamicImports: true,
    input: "src/arcgis/main.js",
    treeshake: true,
    output: {
        name: "ArcGis",
        format: "umd",
        file: "force-app/main/default/staticresources/arcgis/arcgis.js"
    },
    external: [/@salesforce/, /lightning\//],
    plugins: [babel(), resolve(), commonjs()]
};
