import React, { Component } from "react";

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
          width: "90vh",
          height: "90vh",
          backgroundColor: "white",
          color: "black"
        }}
      >
        {this.props.movie.title}
      </div>
    );
  }
}

export default MovieDetails;
