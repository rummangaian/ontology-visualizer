import { useEffect, useRef, useState } from "react";
import {
  OntologyViewer,
  BaseRendererOptions,
} from "@mobius/ontology-visualizer";
import data from "../data/goodRelation.json";
import "@mobius/ontology-visualizer/dist/index.css";
import "./App.css";
import FilterButton from "./components/FilterButton/FilterButton";

export default function App() {
  const graphRef = useRef(null);
  const viewerRef = useRef(null);
  const [degree, setDegree] = useState({ maxDegree: 0, currentDegree: 0 });
  const [classDistance, setClassDistance] = useState(10);
  const [labelLength, setLabelLength] = useState(30);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [play, setPlay] = useState(true);

  // Maintain a single instance of options object
  const [options] = useState(
    new BaseRendererOptions({
      width: 1000,
      height: 1000,
    })
  );

  useEffect(() => {
    if (!viewerRef.current && graphRef.current) {
      const viewer = new OntologyViewer("graph", options);

      viewer.initializeGraph();

      // Register callback before import
      viewer.on("nodedegree.init", (event) => {
        const eventData = event.data;
        setDegree({
          maxDegree: eventData.maxDegree,
          currentDegree: eventData.currentDegree,
        });
      });

      viewer.import(data);

      viewerRef.current = viewer;

      options.setClassDistance(10);

      viewer.updateStyle();
    }
  }, [options]);

  const applyNodeDegree = (value) => {
    const viewer = viewerRef.current;
    setDegree((prev) => ({ ...prev, currentDegree: value }));

    if (viewer) {
      options.setDefaultDegree(value);
      viewer.filter("DATATYPE", true);
    }
  };

  const applyFilter = (selectedFilters) => {
    const viewer = viewerRef.current;

    if (viewer) {
      // Define all the possible filters that the viewer can handle
      const allFilters = [
        "DISJOINT",
        "DATATYPE",
        "EXTERNAL",
        "OBJECT",
        "SUBCLASS",
        "SET_OPERATOR",
        "COMPACT_NOTATION",
        "EMPTY_LITERAL",
        "NODE_DEGREE",
        "STATISTICS",
      ];

      // Iterate over all filters and dynamically set their values
      allFilters.forEach((filter) => {
        const isActive = selectedFilters.includes(filter); // Check if the filter is in selectedFilters
        viewer.filter(filter, isActive); // Apply the filter state (true/false)
      });
    } else {
      console.error("Viewer is not initialized.");
    }
  };

  const handlePauseGraph = () => {
    const viewer = viewerRef.current;
    if (viewer) {
      if (play) {
        viewer.pause();
        setPlay(false);
      } else {
        viewer.resume();
        setPlay(true);
      }
    }
  };

  const applyClassDistance = (val) => {
    setClassDistance(val); // Update state
    const viewer = viewerRef.current;
    if (viewer) {
      options.setClassDistance(val);
      viewer.updateStyle();
    }
  };

  const applyLabelLength = (val) => {
    setLabelLength(val);
    const viewer = viewerRef.current;
    if (viewer) {
      options.setDynamicWidth(true);
      options.setMaxLabelWidth(parseInt(val));
      viewer.animateDynamicLabelWidth();
    }
  };

  useEffect(() => {
    if (selectedFilters) {
      applyFilter(selectedFilters);

      const viewer = viewerRef.current;
      viewer.resume();
      setPlay(true);
    }
  }, [selectedFilters]);

  return (
    <div className="onto-container">
      <div className="onto-title">Mobius Ontology Viewer</div>
      <div className="btns"></div>
      <div id="graph" ref={graphRef}></div>
      <div className="onto-setting-bar">
        <FilterButton
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          degree={degree}
          applyNodeDegree={applyNodeDegree}
        />
        <div>
          <span>Class Distance</span>
          <input
            type="range"
            min={10}
            max={1000}
            step={10}
            onChange={(e) => applyClassDistance(parseInt(e.target.value))}
            value={classDistance}
          />
        </div>
        <div>
          <span>Labels</span>
          <input
            type="range"
            min={10}
            max={100}
            step={10}
            onChange={(e) => applyLabelLength(parseInt(e.target.value))}
            value={labelLength}
          />
        </div>

        <button className="onto-setting-right-part" onClick={handlePauseGraph}>
          {play ? <>Pause</> : <>Play</>}
        </button>
      </div>
    </div>
  );
}
