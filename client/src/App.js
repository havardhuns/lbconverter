import React from "react";
import "./App.css";
import Content from "./components/Content.js";
function App() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Content />
    </div>
  );
}

export default App;
