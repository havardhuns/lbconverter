import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

const SearchField = withStyles(theme => ({
  input: {
    borderRadius: 4,
    backgroundColor: "white",
    fontSize: 16,
    width: "auto"
  }
}))(OutlinedInput);

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
      <div style={{ margin: "10px" }}>
        <InputLabel htmlFor="component-outlined">
          Search for movie...
        </InputLabel>
        <SearchField id="search" fullWidth />
      </div>
    );
  }
}

export default MovieList;
