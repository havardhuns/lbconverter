import React, { Component } from "react";

const Button = (props) => {
  return (
    <div
      style={props.disabled ? style.disabledButton : style.button}
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
};

const style = {
  button: {
    backgroundColor: "#00A88C",
    width: "175px",
    height: "45px",
    borderRadius: "45px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "45px",
    fontSize: "15px",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.5)",
    userSelect: "none",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "grey",
    color: "rgba(255,255,255,0.5)",
    width: "175px",
    height: "45px",
    borderRadius: "45px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "45px",
    fontSize: "15px",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.5)",
    userSelect: "none",
  },
};

export default Button;
