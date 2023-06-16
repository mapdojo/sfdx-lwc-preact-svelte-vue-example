import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
// import { loadScript } from "c/resourceLoader";
import LEAFLET from "@salesforce/resourceUrl/leaflet";

export default class CaseMapEsriLeaflet extends LightningElement {
    map = null;

    renderedCallback() {
        if (this.mapInitialized) {
            return;
        }
        this.mapInitialized = true;

        Promise.all([
            loadScript(this, LEAFLET + "/leaflet.js"),
            loadScript(this, LEAFLET + "/esri-leaflet-debug.js"),
            loadScript(this, LEAFLET + "/esri-leaflet-vector-debug.js"),
            loadStyle(this, LEAFLET + "/leaflet.css")
        ])
            .then(() => {
                this.initializeMap();
            })
            .catch((error) => {
                console.error("Error in renderedCallback", error);
            });
    }

    initializeMap() {
        try {
            const mapDiv = this.template.querySelector("div.map");
            console.debug("LA");

            this.map = L.map(mapDiv).setView([45.5165, -122.6764], 12);
            const tiles = L.esri.basemapLayer("Streets").addTo(this.map);

            console.debug("LALA");
        } catch (error) {
            console.error("Error in initializeMap", error);
        }
    }
}
