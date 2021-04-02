import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
