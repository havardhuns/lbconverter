import React, { Component } from "react";
import Content from "./components/Content.js";
import MovieList from "./components/MovieList.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false };
  }

  render() {
    return (<div>
        <MovieList/>
        {this.state.lb && <Content/>}</div>)
  }
}

export default Main;
