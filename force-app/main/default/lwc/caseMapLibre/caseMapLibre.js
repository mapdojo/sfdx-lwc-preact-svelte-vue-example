import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
// import { loadScript } from "c/resourceLoader";
import MAPLIBRE from "@salesforce/resourceUrl/maplibre";

export default class CaseMapLibre extends LightningElement {
    map = null;

    renderedCallback() {
        if (this.mapInitialized) {
            return;
        }
        this.mapInitialized = true;

        Promise.all([
            loadScript(this, MAPLIBRE + "/maplibre-gl-csp.js"),
            loadStyle(this, MAPLIBRE + "/maplibre-gl.css")
        ])
            .then(() => {
                this.initializeMap();
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error loading MapLibre",
                        message: error.message,
                        variant: "error"
                    })
                );
            });
    }

    initializeMap() {
        try {
            const mapDiv = this.template.querySelector("div.map");
            console.debug("LA");
            this.map = new maplibregl.Map({
                container: mapDiv, // container id
                style: MAPLIBRE + "/style.json", // style URL
                center: [0, 0], // starting position [lng, lat]
                zoom: 1 // starting zoom
            });
            console.debug("LALA");
        } catch (error) {
            console.error(error.message);
        }
    }
}
