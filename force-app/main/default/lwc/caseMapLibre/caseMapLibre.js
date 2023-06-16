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
                console.error("Error in renderedCallback", error);
            });
    }

    initializeMap() {
        try {
            const mapDiv = this.template.querySelector("div.map");
            console.debug("LA");
            this.map = new maplibregl.Map({
                container: mapDiv, // container id
                style: {
                    version: 8,
                    sources: {
                        "raster-tiles": {
                            type: "raster",
                            tiles: [
                                "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                            ],
                            tileSize: 256,
                            attribution:
                                'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
                        }
                    },
                    layers: [
                        {
                            id: "simple-tiles",
                            type: "raster",
                            source: "raster-tiles",
                            minzoom: 0,
                            maxzoom: 22
                        }
                    ]
                },
                center: [144.8779, -37.7916], // starting position [lng, lat]
                zoom: 12 // starting zoom
            });
            console.debug("LALA");
        } catch (error) {
            console.error("Error in initializeMap", error);
        }
    }
}
