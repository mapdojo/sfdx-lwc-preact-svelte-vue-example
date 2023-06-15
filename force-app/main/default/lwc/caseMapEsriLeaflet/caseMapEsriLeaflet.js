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
            loadScript(this, LEAFLET + "/esri-leaflet.js"),
            loadScript(this, LEAFLET + "/esri-leaflet-vector.js"),
            loadStyle(this, LEAFLET + "/leaflet.css")
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
            this.map = L.map(mapDiv).setView([51.505, -0.09], 13);

            const token =
                "jwWhzQEZfSXMwld2QC09iqkZb59FLfK-Ydpc0Tw9glE2-tzhQRVm1IrBwFxviYh9WEJGLT5FzjzNFB14bs3YDMT9j_KKiMllP5Vgzgb9WAoGnRnwAZ43mgvud_JFye_gu90FAQwMLa-ZeOzQc7UtAQ..";
            L.esri.Vector.vectorBasemapLayer("OSM:StandardRelief", {
                token: token
            }).addTo(this.map);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            L.marker([51.5, -0.09])
                .addTo(this.map)
                .bindPopup("A pretty CSS popup.<br> Easily customizable.")
                .openPopup();
            console.debug("LALA");
        } catch (error) {
            console.error(error.message);
        }
    }
}
