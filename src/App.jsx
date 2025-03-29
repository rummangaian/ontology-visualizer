import { useEffect, useRef, useState } from "react";
import {
  OntologyViewer,
  BaseRendererOptions,
} from "@mobius/ontology-visualizer";
import data from "../data/goodRelation.json";
import "@mobius/ontology-visualizer/dist/index.css";
import "./App.css";
import FilterButton from "./components/FilterButton/FilterButton";
import { convertOntologyFileData, getSessionId } from "./utils";
import CodeEditor from "./components/FilterButton/CodeEditor/CodeEditor";

export default function App() {
  const graphRef = useRef(null);
  const viewerRef = useRef(null);
  const [degree, setDegree] = useState({ maxDegree: 0, currentDegree: 0 });
  const [classDistance, setClassDistance] = useState(10);
  const [labelLength, setLabelLength] = useState(30);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [play, setPlay] = useState(true);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openCodeEditor, setOpenCodeEditor] = useState(false);

  // Initialize Ontology Viewer
  useEffect(() => {
    if (!viewerRef.current && graphRef.current) {
      const viewer = new OntologyViewer("graph", new BaseRendererOptions({ width: 1000, height: 1000 }));
      viewer.initializeGraph();

      viewer.on("nodedegree.init", (event) => {
        setDegree({
          maxDegree: event.data.maxDegree,
          currentDegree: event.data.currentDegree,
        });
      });

      viewer.import(data);
      viewer.updateStyle();
      viewerRef.current = viewer;
    }
  }, []);

  // Handle File Upload
  const handleFileChange = (event) => {
    setFile(event.target.files?.[0] || null);
  };

  // Import File to Ontology Viewer
  const handleFileImport = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const sessionId = await getSessionId();
      if (sessionId) {
        const convertedData = await convertOntologyFileData(sessionId, file);
        if (convertedData) {
          viewerRef.current?.import(convertedData);
          viewerRef.current?.updateStyle();
        }
      }
    } catch (error) {
      console.error("Error importing file:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Writing Code & Saving TTL
  const handleEditorSaveCode = async (code) => {
    const fileBlob = new Blob([code], { type: "text/turtle" });

    setLoading(true);
    try {
      const sessionId = await getSessionId();
      if (sessionId) {
        const convertedData = await convertOntologyFileData(sessionId, fileBlob);
        if (convertedData) {
          viewerRef.current?.import(convertedData);
          viewerRef.current?.updateStyle();
        }
      }
    } catch (error) {
      console.error("Error saving TTL file:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Ontology Viewer Play/Pause
  const handlePauseGraph = () => {
    if (viewerRef.current) {
      play ? viewerRef.current.pause() : viewerRef.current.resume();
      setPlay(!play);
    }
  };

  // Apply Filters
  useEffect(() => {
    if (selectedFilters.length > 0) {
      selectedFilters.forEach((filter) => viewerRef.current?.filter(filter, true));
      viewerRef.current?.resume();
      setPlay(true);
    }
  }, [selectedFilters]);

  return (
    <div className="onto-container">
      <div className="onto-title">Mobius Ontology Viewer</div>

      {/* Graph Viewer */}
      <div id="graph" ref={graphRef}></div>

      {/* Controls */}
      <div className="onto-setting-bar">
        <FilterButton
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          degree={degree}
          applyNodeDegree={(value) => {
            setDegree((prev) => ({ ...prev, currentDegree: value }));
            viewerRef.current?.filter("DATATYPE", true);
          }}
        />
        <div>
          <span>Class Distance</span>
          <input type="range" min={10} max={1000} step={10} onChange={(e) => setClassDistance(parseInt(e.target.value))} value={classDistance} />
        </div>
        <div>
          <span>Label Length</span>
          <input type="range" min={10} max={100} step={10} onChange={(e) => setLabelLength(parseInt(e.target.value))} value={labelLength} />
        </div>
        <button className="onto-setting-right-part" onClick={handlePauseGraph}>{play ? "Pause" : "Play"}</button>
      </div>

      {/* File Upload */}
      <div className="import-form-container">
        <form onSubmit={handleFileImport} className="import-form">
          <input type="file" accept=".ttl" onChange={handleFileChange} />
          <button type="submit" disabled={!file || loading}>
            {loading ? "Importing..." : "Import"}
          </button>
        </form>
        <span className="open-editor-btn" onClick={() => setOpenCodeEditor(!openCodeEditor)}>
          Open Text Editor
        </span>
      </div>

      {/* Code Editor */}
      {openCodeEditor && <CodeEditor handleEditorSaveCode={handleEditorSaveCode} />}
	  {loading && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Loading, please wait...</p>
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
}
