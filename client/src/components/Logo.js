import React, { Component } from "react";
import critickerIcon from "../static/criticker-icon.png";
import lbIcon from "../static/letterboxd-icon.png";

class Logo extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Russo One",
          fontSize: "40px",
          marginBottom: "20px"
        }}
      >
        <img
          src={critickerIcon}
          alt="critickerIcon"
          width={"50px"}
          height={"50px"}
        />
        <div style={{ padding: "0 10px" }}>CONVERTER</div>
        <img
          src={lbIcon}
          alt="letterboxdIcon"
          width={"100px"}
          height={"37px"}
        />
      </div>
    );
  }
}

export default Logo;
