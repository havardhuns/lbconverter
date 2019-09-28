import { Modal } from "@material-ui/core";
import React, { Component } from "react";

class ConvertDialog extends Component {
  render() {
    return (
      <Modal open={this.props.open} onEscapeKeyDown={this.props.exit}>
        <div
          style={{
            width: "50%",
            height: "50%",
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none"
          }}
        >
          123
        </div>
      </Modal>
    );
  }
}

export default ConvertDialog;
