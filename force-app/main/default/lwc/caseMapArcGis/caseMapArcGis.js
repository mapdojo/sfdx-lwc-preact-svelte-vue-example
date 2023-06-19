import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
// import { loadScript } from "c/resourceLoader";
import ARCGIS from "@salesforce/resourceUrl/arcgis";

export default class CaseMapArcGis extends LightningElement {
    map = null;

    async renderedCallback() {
        try {
            if (this.mapInitialized) {
                return;
            }
            this.mapInitialized = true;

            console.debug("ARCGIS", ARCGIS);

            await loadScript(this, ARCGIS + "/arcgis.js");
            await loadStyle(
                this,
                "https://js.arcgis.com/4.27/esri/themes/light/main.css"
            );
            this.initializeMap();
        } catch (error) {
            console.error("Error in renderedCallback", error);
        }
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
                map: webmap,
                container: mapDiv
            });
            console.debug("LALA");
        } catch (error) {
            console.error("Error in initializeMap", error);
        }
    }
}
