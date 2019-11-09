import React, { Component } from "react";
import Content from "../components/uploader/Content.js";
import MovieList from "../components/MovieList.js";
import MovieDetails from "../components/MovieDetails.js";
import Paginator from "../components/Paginator.js";
import { connect } from "react-redux";
import {
  getMovies,
  search,
  getSearchSuggestions,
  clearSearchSuggestions
} from "../actions/MovieListAction";
import {
  getMovieDetails,
  clearMovieDetails
} from "../actions/MovieDetailsAction";
import Torrentplayer from "../components/Torrentplayer";
import SearchField from "../components/SearchField";
import CircularProgress from "@material-ui/core/CircularProgress";

var ScrollEvents = require("scroll-events");

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

  paneDidMount = node => {
    if (node) {
      node.addEventListener("scroll", () => console.log("scroll!"));
    }
  };

  openMovie = movie => {
    this.props.getMovieDetails(movie);
  };

  render() {
    console.log(this.props.movieList);
    return !this.props.torrent ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
        ref={this.paneDidMount}
      >
        <SearchField
          search={this.props.search}
          getSearchSuggestions={this.props.getSearchSuggestions}
          searchSuggestions={this.props.searchSuggestions}
          clearSearchSuggestions={this.props.clearSearchSuggestions}
          openMovie={this.openMovie}
        />
        {this.props.movieList.length > 0 ? (
          <MovieList movies={this.props.movieList} onClick={this.openMovie} />
        ) : (
          <CircularProgress />
        )}
        {this.props.numberOfPages > 0 && (
          <Paginator pages={this.props.numberOfPages} />
        )}
        {this.props.movieDetails._id && (
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
    getSearchSuggestions: searchString =>
      dispatch(getSearchSuggestions(searchString)),
    clearSearchSuggestions: () => dispatch(clearSearchSuggestions()),
    search: searchString => dispatch(search(searchString)),
    getMovieDetails: id => dispatch(getMovieDetails(id)),
    clearMovieDetails: () => dispatch(clearMovieDetails())
  };
};

const mapStateToProps = state => ({
  movieList: state.movieList.movieList,
  searchSuggestions: state.movieList.searchSuggestions,
  numberOfPages: state.movieList.numberOfPages,
  movieDetails: state.movie.movieDetails,
  torrent: state.torrentList.torrent
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
