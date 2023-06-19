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
            ArcGis.esriConfig.apiKey = "";
            const mapDiv = this.template.querySelector("div.map");
            console.debug("LA");
            const webmap = new ArcGis.WebMap({
                portalItem: {
                    id: "67bf77a05cd14087856ff68f585b054e"
                }
            });
            const view = new ArcGis.MapView({
                map: webmap,
                container: mapDiv
            });
            view.when(function () {
                // MapView is now ready for display and can be used. Here we will
                // use goTo to view a particular location at a given zoom level and center
                view.goTo({
                    center: [144.8779, -37.795], // Longitude, latitude
                    zoom: 13 // Zoom level
                });
            }).catch(function (err) {
                // A rejected view indicates a fatal error making it unable to display.
                // Use the errback function to handle when the view doesn't load properly
                console.error("MapView rejected:", err);
            });
            console.debug("LALA");
        } catch (error) {
            console.error("Error in initializeMap", error);
        }
    }
}
