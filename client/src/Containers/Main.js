import React, { Component } from "react";
import Content from "../components/uploader/Content.js";
import MovieList from "../components/MovieList.js";
import MovieDetails from "../components/MovieDetails.js";
import { connect } from "react-redux";
import { getMovies } from "../actions/MovieListAction";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false, movie: null, movieList: null };
  }

  componentDidMount() {
    console.log("mount");
    this.props.getMovies();
    console.log(this.props.movieList);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movieList !== this.props.movieList) {
      console.log("endret");
      console.log(this.props.movieList);
    }
  }

  openMovie = movie => {
    this.setState({ movie: movie });
  };

  render() {
    console.log(this.props.movieList.length);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {this.props.movieList.length > 0 ? (
          <MovieList movies={this.props.movieList} onClick={this.openMovie} />
        ) : (
          <div> loading... </div>
        )}
        {this.state.movie && (
          <MovieDetails
            movie={this.state.movie}
            close={() => this.setState({ movie: null })}
          />
        )}

        {/*<Content />*/}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(getMovies())
  };
};

const mapStateToProps = state => ({
  movieList: state.movieList.movieList
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
