import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { xml } from "@codemirror/lang-xml";

const CodeEditor = ({handleEditorSaveCode}) => {
  const editorRef = useRef(null);
  const editorViewRef = useRef(null); // Keep track of the editor instance
  const [xmlContent, setXmlContent] = useState("");

  useEffect(() => {
    if (!editorRef.current || editorViewRef.current) return; // Prevent duplicate initialization

    const state = EditorState.create({
      doc: xmlContent,
      extensions: [
        basicSetup,
        xml(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setXmlContent(update.state.doc.toString());
          }
        }),
      ],
    });

    // Initialize the editor
    editorViewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      // Cleanup to prevent memory leaks
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  }, []);


  return (
    <div className="editor-container" style={{ padding: "10px" }}>
        <div>
      <h3>XML Code Editor</h3>
<button onClick={()=>handleEditorSaveCode(xmlContent)}>Save</button>
        </div>
      <div ref={editorRef} style={{ border: "1px solid #ccc", height: "400px", overflow: "auto" }}></div>
    </div>
  );
};

export default CodeEditor;
