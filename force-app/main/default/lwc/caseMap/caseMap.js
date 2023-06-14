import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadStyle } from "lightning/platformResourceLoader";
import { loadScript } from "c/resourceLoader";
import LEAFLET from "@salesforce/resourceUrl/leaflet";

export default class CaseMap extends LightningElement {
    map = null;

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;

        Promise.all([
            loadScript(this, LEAFLET + "/leaflet.js"),
            loadStyle(this, LEAFLET + "/leaflet.css")
        ])
            .then(() => {
                this.initializeMapLibre();
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

    initializeMapLibre() {
        try {
            const mapDiv = this.template.querySelector("div.map");
            console.debug("LA");
            // eslint-disable-next-line no-undef
            this.map = L.map(mapDiv).setView([51.505, -0.09], 13);
            console.debug("LALA");
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
            console.debug("LALALA");
        } catch (error) {
            console.error(error.message);
        }
    }
}
