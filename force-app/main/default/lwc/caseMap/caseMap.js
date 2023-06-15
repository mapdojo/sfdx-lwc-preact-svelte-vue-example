import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
// import { loadScript } from "c/resourceLoader";
import MAPLIBRE from "@salesforce/resourceUrl/maplibre";

export default class CaseMap extends LightningElement {
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
            // eslint-disable-next-line no-undef
            // this.map = L.map(mapDiv).setView([51.505, -0.09], 13);
            console.debug("LALA");
            // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            //     maxZoom: 19,
            //     attribution:
            //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            // }).addTo(this.map);
            // console.debug("LALALA");
        } catch (error) {
            console.error(error.message);
        }
    }
}
