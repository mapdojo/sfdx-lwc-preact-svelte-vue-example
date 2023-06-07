// `h` doesn't seemed to be used, but it is key for the Babel transform.
import { h, Component } from "preact";
import * as leaflet from "leaflet";

import List from "./list";

export default class App extends Component {
    render(props) {
        // initialize the map on the "map" div with a given center and zoom
        var map = L.map("map", {
            center: [51.505, -0.09],
            zoom: 13
        });
        return (
            <div id="app">
                Data from outer property: {props.title}
                <br />
                <br />
                <List />
            </div>
        );
    }
}
