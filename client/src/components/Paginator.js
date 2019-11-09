import React, { Component } from "react";
import Movie from "./Movie.js";
import { Grid } from "@material-ui/core";
import ReactPaginate from "react-paginate";

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false };
  }

  render() {
    console.log(this.props.pages);
    return (
      <div>
        123
        {this.props.pages}
      </div>
    );
  }
}
//onPageChange
export default Paginator;
