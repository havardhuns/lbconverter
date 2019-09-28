import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false, movie: null };
  }

  render() {
    console.log(this.state.movie);
    return (
      <div
        style={{
          backgroundColor: "white",
          color: "black"
        }}
      >
        <Modal open="true">
          <div style={style.modal}>
            <img
              src={
                "https://image.tmdb.org/t/p/original/" +
                this.props.movie.backdrop_path
              }
              style={style.backDrop}
              alt="backdrop"
            />
            {this.props.movie.title}
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
    height: "90%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    backgroundColor: "rgb(50,50,50)"
  },
  backDrop: {
    width: "100%",
    position: "absolute",
    left: "50%",
    top: "0%",
    transform: "translate(-50%, -20%)",
    borderRadius: "100%",
    boxShadow: "10 10 100px black inset"
  }
};

export default MovieDetails;
