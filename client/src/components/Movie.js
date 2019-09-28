import React, { Component } from "react";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false };
  }

  render() {
    console.log(this.props.movie.poster_path);
    return (
      <div
        style={{
          width: "90px",
          height: "135px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "5px"
        }}
      >
        <img
          src={
            "https://image.tmdb.org/t/p/original/" +
            this.props.movie.poster_path
          }
          alt="lol"
          width="100%"
          style={{ borderRadius: "5px" }}
        />
      </div>
    );
  }
}

export default Movie;
