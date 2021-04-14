import React, { useEffect, useState } from "react";
import Button from "../uploader/Button.js";
import FileDrop from "react-file-drop";
import "../../static/fileDrop.css";
import MaterialIcon from "material-icons-react";
import xmlIcon from "../../static/xml-icon.png";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteLbData,
  upload,
  getLbMovies,
} from "../../store/actions/LbDataAction";
import { useHistory } from "react-router-dom";

const FileUploader = (props) => {
  const [file, setFile] = useState(null);
  const [hoverClose, setHoverClose] = useState(false);
  const [key, setKey] = useState(0);

  const lbMovies = useSelector((state) => state.lbMovies.lbMovies);

  let history = useHistory();

  const dispatch = useDispatch();

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleDrop = (file, event) => {
    event.preventDefault();
    setFile(file[0]);
  };

  const uploadFile = () => {
    dispatch(upload(file));
    setTimeout(() => {
      history.push("/");
    }, 500);
  };

  useEffect(() => {
    dispatch(getLbMovies());
  }, []);

  return (
    <div style={style.center}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={style.fileDrop}>
          <input
            id="contained-button-file"
            type="file"
            onChange={(file) => handleFileChange(file.target.files[0])}
            style={{ display: "none" }}
            disabled={file || lbMovies.length > 0}
            key={key}
          />
          <label htmlFor="contained-button-file">
            <FileDrop
              onDrop={handleDrop}
              className={
                file || lbMovies.length > 0 ? "file-drop" : "file-drop-no-click"
              }
            >
              <div style={style.center}>
                {!(file || lbMovies.length > 0) ? (
                  <div style={style.fileDropContent}>
                    <MaterialIcon icon="note_add" color="white" size="large" />
                    Drop your 'watched.csv' file from letterboxd here or click
                    to upload
                  </div>
                ) : (
                  <div style={style.fileDropContent}>
                    <div
                      style={Object.assign({}, style.cancel, {
                        opacity: hoverClose ? "1" : "0.7",
                      })}
                      onMouseEnter={() => setHoverClose(true)}
                      onMouseLeave={() => setHoverClose(false)}
                      onClick={() => {
                        dispatch(deleteLbData());
                        setTimeout(() => {
                          setFile(null);
                          setHoverClose(false);
                          setKey(key + 1);
                        }, 1);
                      }}
                    >
                      <MaterialIcon icon="close" color={"white"} size={24} />
                    </div>
                    <div style={style.fileIcon}>
                      <img
                        src={xmlIcon}
                        alt="icon"
                        width={hoverClose ? "80px" : "100px"}
                        style={{
                          opacity: hoverClose ? "0.5" : "1",
                          transition: "0.5s",
                          display: "block",
                          margin: "auto",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        opacity: hoverClose ? "0.5" : "1",
                        transition: "0.5s",
                      }}
                    >
                      {file ? file.name : "watched.csv"}
                    </div>
                  </div>
                )}
              </div>
            </FileDrop>
          </label>
        </div>
        <div style={style.buttons}>
          <Button text="HELP" />
          <div style={{ width: "150px", height: "20px" }} />
          <Button text="UPLOAD" disabled={!file} onClick={() => uploadFile()} />
        </div>
      </div>
    </div>
  );
};

const style = {
  fileDrop: {
    margin: "auto",
    width: "75vh",
    height: "40vh",
    border: "3px dashed white",
    color: "#ffffffcc",
    borderRadius: "5px",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  fileDropContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    margin: "50px",
    display: "flex",
    justifyContent: "center",
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
    lineHeight: "38px",
    border: "2px solid white",
  },
  fileIcon: {
    height: "100px",
    width: "100px",
    display: "flex",
    alignItems: "center",
  },
};

export default FileUploader;
