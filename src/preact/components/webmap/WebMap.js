// `h` doesn't seemed to be used, but it is key for the Babel transform.
import { h, Component } from "preact";
import { useEffect, useRef } from "preact/hooks";

export default function WebMap() {
    const elementRef = useRef();

    useEffect((_) => {
        console.debug("WebMap");
        let cleanup;
        // lazy load the module that loads the JSAPI
        // and initialize it
        import("../../data/app").then(
            (app) => (cleanup = app.initialize(elementRef.current))
        );
        return () => cleanup && cleanup();
    }, []);

    // assign elementRef to the ref of our component
    return (
        <div className="viewDiv" style="height: 200px" ref={elementRef}></div>
    );
}
