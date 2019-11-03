import React, { Component } from "react";
import Movie from "./Movie.js";
import { Grid } from "@material-ui/core";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false };
  }

  clickedMovie = movie => {
    this.props.onClick(movie);
  };

  render() {
    return (
      <div style={{ width: "80%" }}>
        <Grid container spacing={1}>
          {this.props.movies.map((movie, i) => {
            return (
              <Grid item xs={1} spacing={1}>
                <Movie movie={movie} onClick={() => this.clickedMovie(movie)} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default MovieList;
