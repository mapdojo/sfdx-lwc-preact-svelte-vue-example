import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
//import { loadScript } from 'c/resourceLoader';
import MAPLIBRE from "@salesforce/resourceUrl/maplibre";

export default class CaseMap extends LightningElement {
    map = null;

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;

        Promise.all([
            loadScript(this, MAPLIBRE + "/maplibre-gl-csp.js"),
            loadStyle(this, MAPLIBRE + "/maplibre-gl.css")
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
        // this.dispatchEvent(
        //     new ShowToastEvent({
        //         title: 'LALA',
        //         message: 'LALA',
        //         variant: 'error'
        //     })
        // );
        try {
            const mapDiv = this.template.querySelector("div.map");
            console.debug("LA");
            // eslint-disable-next-line no-undef
            this.map = new maplibregl.Map({
                container: mapDiv, // container id
                style:
                    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
                center: [12.550343, 55.665957],
                zoom: 8
            });
            console.debug("LALA");
        } catch (error) {
            console.error(error.message);
        }
    }
}
