import React, { useRef, useEffect } from "react";
import './App.css';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";


import "./App.css";

function App(){

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {

      const webmap = new WebMap({
        portalItem: {
          //id: "aa1d3f80270146208328cf66d022e09c"
          id: "cc00da89351d4dc28cc56000af631b0f"
        }
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap
      });

      const bookmarks = new Bookmarks({
        view,
        editingEnabled: true
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: true
      });

      view.ui.add(bkExpand, "top-right");

      webmap.when(() => {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length)
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;

}

export default App;
