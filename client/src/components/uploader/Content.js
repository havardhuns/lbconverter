import React, { Component } from "react";
import Button from "../Button.js";
import Logo from "../Logo.js";
import ConvertDialog from "../ConvertDialog.js";
import FileDrop from "react-file-drop";
import "../../static/fileDrop.css";
import MaterialIcon from "material-icons-react";
import xmlIcon from "../../static/xml-icon.png";
const axios = require("axios");

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, hoverClose: false, key: 0, movieData: null };
  }

  handleFileChange = file => {
    this.setState({ file: file });
  };

  handleDrop = (file: FileList, event) => {
    event.preventDefault();
    this.setState({ file: file[0] });
  };

  convert = () => {
    const formData = new FormData();
    formData.append("file", this.state.file);
    axios
      .post("http://127.0.0.1:5000/upload", formData)
      .then(res => {
        console.log(res.data);
        this.setState({ movieData: res.data });
      })
      .catch(err => console.warn(err));
  };

  download = () => {
    console.log(this.state.movieData.filename);
    axios
      .get("http://127.0.0.1:5000/download/" + this.state.movieData.filename)
      .then(res => console.log(res))
      .catch(err => console.warn(err));
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Logo />
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
                        }, 1)
                      }
                    >
                      <MaterialIcon icon="close" color={"white"} size={24} />
                    </div>
                    <div style={style.fileIcon}>
                      <img
                        src={xmlIcon}
                        alt="icon"
                        width={this.state.hoverClose ? "80px" : "100px"}
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
          <Button text="HELP" onClick={this.download} />
          <Button
            text="CONVERT"
            disabled={!this.state.file}
            onClick={this.convert}
          />
        </div>
        <ConvertDialog
          open={this.state.movieData}
          exit={() =>
            this.setState({
              file: null,
              movieData: 1
            })
          }
        />
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
  },
  fileIcon: {
    height: "100px",
    width: "100px",
    display: "flex",
    alignItems: "center"
  }
};

export default Content;
