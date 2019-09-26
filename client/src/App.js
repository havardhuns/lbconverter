import React from "react";
import "./App.css";
import Main from "./Containers/Main.js";

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
      <Main />
    </div>
  );
}

export default App;
