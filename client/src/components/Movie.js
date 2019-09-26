import React, { Component } from "react";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false };
  }

  render() {
    return (
      <div
        style={{
          height: "80px",
          width: "60px",
          backgroundColor: "white",
          color: "black"
        }}
      >
        {this.props.title}}
      </div>
    );
  }
}

export default Movie;
