import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false };
  }

  close = () => {
    this.props.close();
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          color: "black"
        }}
      >
        <Modal
          open={this.props.movie}
          onBackdropClick={this.close}
          onEscapeKeyDown={this.close}
        >
          <div style={style.modal}>
            <img
              src={
                "https://image.tmdb.org/t/p/original/" +
                this.props.movie.backdrop_path
              }
              style={style.backDrop}
              alt="backdrop"
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "75%",
                backgroundColor: "rgba(0,0,0,0.5)",
                fontFamily: "roboto",
                display: "flex"
              }}
            >
              <div style={{ width: "33%" }}>
                <img
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    this.props.movie.poster_path
                  }
                  alt="poster"
                  width="100%"
                />
              </div>
              <div>
                <h1>{this.props.movie.title}</h1>
                <h3>
                  {this.props.movie.release_date.substring(0, 4)} Directed by
                  Random Navn
                </h3>
                <h3 style={{ color: "white" }}>{this.props.movie.tagline}</h3>
                <h3>{this.props.movie.overview}</h3>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const style = {
  modal: {
    position: "absolute",
    width: "90%",
    height: "auto",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    backgroundColor: "rgb(50,50,50)"
  },
  backDrop: {
    width: "100%",
    opacity: "0.5",
    filter: "blur(8px)"
  }
};

export default MovieDetails;
