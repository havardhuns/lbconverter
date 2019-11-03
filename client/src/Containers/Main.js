import React, { Component } from "react";
import Content from "../components/uploader/Content.js";
import MovieList from "../components/MovieList.js";
import MovieDetails from "../components/MovieDetails.js";
import { connect } from "react-redux";
import { getMovies } from "../actions/MovieListAction";
import {
  getMovieDetails,
  clearMovieDetails
} from "../actions/MovieDetailsAction";
import Torrentplayer from "../components/Torrentplayer";
import SearchField from "../components/SearchField";
import CircularProgress from "@material-ui/core/CircularProgress";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { lb: false, movie: null, movieList: null };
  }

  componentDidMount() {
    console.log("mount");
    this.props.getMovies();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movieList !== this.props.movieList) {
      console.log("endret");
    }
  }

  openMovie = movie => {
    this.props.getMovieDetails(movie);
  };

  render() {
    console.log(this.props.movieDetails);
    return !this.props.torrent ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <SearchField />
        {this.props.movieList.length > 0 ? (
          <MovieList movies={this.props.movieList} onClick={this.openMovie} />
        ) : (
          <CircularProgress color="white" />
        )}
        {this.props.movieDetails.id && (
          <MovieDetails
            movie={this.props.movieDetails}
            close={() => this.props.clearMovieDetails()}
          />
        )}

        {/*<Content />*/}
      </div>
    ) : (
      <Torrentplayer torrent={this.props.torrent} />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(getMovies()),
    getMovieDetails: id => dispatch(getMovieDetails(id)),
    clearMovieDetails: () => dispatch(clearMovieDetails())
  };
};

const mapStateToProps = state => ({
  movieList: state.movieList.movieList,
  movieDetails: state.movie.movieDetails,
  torrent: state.torrentList.torrent
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
