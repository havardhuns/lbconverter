import React, { Component } from "react";
import Img from "react-image";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false };
  }

  render() {
    return (
      <div
        style={{
          width: "90px",
          height: "135px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "5px"
        }}
        onClick={this.props.onClick}
      >
        <img
          src={
            "https://image.tmdb.org/t/p/original/" +
            this.props.movie.poster_path
          }
          width="100%"
          style={{ borderRadius: "5px" }}
          alt={this.props.movie.title}
        />
      </div>
    );
  }
}

export default Movie;
