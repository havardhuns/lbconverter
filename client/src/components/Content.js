import React, { Component } from "react";
import Button from "./Button.js";
import FileDrop from "react-file-drop";
import "../static/fileDrop.css";
import MaterialIcon from "material-icons-react";
import xmlIcon from "../static/xml-icon.png";
import critickerIcon from "../static/criticker-icon.png";
import lbIcon from "../static/letterboxd-icon.png";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, hoverClose: false, key: 0 };
  }

  handleFileChange = file => {
    this.setState({ file: file });
  };

  handleDrop = (file: FileList, event) => {
    event.preventDefault();
    this.setState({ file: file[0] });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
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
        <div style={style.fileDrop}>
          <input
            id="contained-button-file"
            type="file"
            onChange={file => this.handleFileChange(file.target.files[0])}
            style={{ display: "none" }}
            disabled={this.state.file}
            key={this.state.key}
          />
          <label htmlFor="contained-button-file">
            <FileDrop
              onDrop={this.handleDrop}
              className={!this.state.file ? "file-drop-no-click" : "file-drop"}
            >
              <div style={style.center}>
                {!this.state.file ? (
                  <div style={style.fileDropContent}>
                    <MaterialIcon icon="note_add" color="white" size="large" />
                    Drop file here or click to upload
                  </div>
                ) : (
                  <div style={style.fileDropContent}>
                    <div
                      style={Object.assign({}, style.cancel, {
                        opacity: this.state.hoverClose ? "1" : "0.7"
                      })}
                      onMouseEnter={() => this.setState({ hoverClose: true })}
                      onMouseLeave={() => this.setState({ hoverClose: false })}
                      onClick={() =>
                        setTimeout(() => {
                          this.setState({
                            file: null,
                            hoverClose: false,
                            key: this.state.key + 1
                          });
                        }, 10)
                      }
                    >
                      <MaterialIcon icon="close" color={"white"} size={24} />
                    </div>
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={xmlIcon}
                        alt="icon"
                        width={this.state.hoverClose ? "75px" : "100px"}
                        style={{
                          opacity: this.state.hoverClose ? "0.5" : "1",
                          transition: "0.5s",
                          display: "block",
                          margin: "auto"
                        }}
                      />
                    </div>
                    <div
                      style={{
                        opacity: this.state.hoverClose ? "0.5" : "1",
                        transition: "0.5s"
                      }}
                    >
                      {this.state.file.name}
                    </div>
                  </div>
                )}
              </div>
            </FileDrop>
          </label>
        </div>
        <div style={style.buttons}>
          <Button text="HELP" />
          <Button
            text="CONVERT"
            disabled={!this.state.file}
            onClick={() => console.log(this.state.file)}
          />
        </div>
      </div>
    );
  }
}

const style = {
  fileDrop: {
    margin: "auto",
    width: "75vh",
    height: "40vh",
    border: "3px dashed white",
    color: "#ffffffcc",
    borderRadius: "5px"
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  fileDropContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttons: {
    margin: "50px",
    display: "flex",
    justifyContent: "space-around"
  },
  cancel: {
    cursor: "pointer",
    display: "inline-block",
    position: "absolute",
    left: "100%",
    top: "-20%",
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    textAlign: "center",
    lineHeight: "36px",
    border: "2px solid white"
  }
};

export default Content;
