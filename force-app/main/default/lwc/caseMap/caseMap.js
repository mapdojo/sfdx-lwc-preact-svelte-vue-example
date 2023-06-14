import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
// import { loadScript } from "c/resourceLoader";
import ARCGIS from "@salesforce/resourceUrl/arcgis";

export default class CaseMap extends LightningElement {
    map = null;

    renderedCallback() {
        if (this.mapInitialized) {
            return;
        }
        this.mapInitialized = true;

        Promise.all([
            loadScript(this, ARCGIS + "/arcgis.js"),
            loadStyle(this, ARCGIS + "/core/assets/esri/themes/light/main.css")
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
            const webmap = new ArcGis.WebMap({
                portalItem: {
                    id: "974c6641665a42bf8a57da08e607bb6f"
                }
            });
            const view = new ArcGis.MapView({
                map: webmap
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
