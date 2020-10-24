import React, { Component } from "react";
import Content from "../components/uploader/Content.js";
import MovieList from "../components/MovieList.js";
import MovieDetails from "../components/MovieDetails.js";
import Paginator from "../components/Paginator.js";
import FilterSearch from "../components/FilterSearch"
import { setTorrents } from "../actions/rarbgAction";

import {
  getGenres,
  getProductionCompanies
} from "../actions/FilterAction"
import { connect } from "react-redux";
import {
  getMovies,
  search,
  getSearchSuggestions,
  clearSearchSuggestions,
  setMovies
} from "../actions/MovieListAction";
import {
  getMovieDetails,
  clearMovieDetails
} from "../actions/MovieDetailsAction";
import {getLbMovies, deleteLbData} from "../actions/LbDataAction"
import SearchField from "../components/SearchField";
import CircularProgress from "@material-ui/core/CircularProgress";
import LbFilter from "../components/LbFilter";


var ScrollEvents = require("scroll-events");

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: null, movieList: null, viewUploader: false, hideWatchedMoviesFromLbData: false, filter: {}}
  }

  componentDidMount() {
    console.log("mount");
    this.getFrontPageMovies()
    this.props.getLbMovies()
    this.props.getGenres()
    this.props.getProductionCompanies()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movieList !== this.props.movieList) {
      console.log("endret");
    }
  }


  setFilter = filter => {
    this.props.setMovies({results : null})
    var key = Object.keys(filter)[0]
    var newFilter = Object.assign({}, filter, this.state.filter)
    if (key in this.state.filter) {
      newFilter[key] = filter[key]
    }
    this.setState({filter: newFilter})
    this.props.getMovies(1, this.state.hideWatchedMoviesFromLbData, newFilter)
  }

  getFrontPageMovies = () => this.props.getMovies(1, this.state.hideWatchedMoviesFromLbData, {"votes": {"$gt": 25000}});
  

  paneDidMount = node => {
    if (node) {
      node.addEventListener("scroll", () => console.log("scroll!"));
    }
  };

  openMovie = movie => {
    this.props.getMovieDetails(movie);
  };

  toggleUploaderView = value => {
    this.setState({viewUploader: value})
  }

  onChecked = value => {
    this.setState({hideWatchedMoviesFromLbData: value})
    this.props.setMovies({results : null})
    this.state.filter == {} ? this.getFrontPageMovies() : this.props.getMovies(1, value, this.state.filter)
  }

  render() {
    console.log(this.props.productionCompanies);
    return !this.state.viewUploader ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: '15px'
        }}
        ref={this.paneDidMount}
      >
        <SearchField
          search={this.props.search}
          getSearchSuggestions={this.props.getSearchSuggestions}
          searchSuggestions={this.props.searchSuggestions}
          clearSearchSuggestions={this.props.clearSearchSuggestions}
          openMovie={this.openMovie}
          getMovies = {this.getFrontPageMovies}
        />
        <div style={{display: "flex", marginTop: 20}}>
          <FilterSearch options={this.props.genres} change={this.setFilter} name="genres" identifier="id" />
          <FilterSearch options={this.props.productionCompanies} change={this.setFilter} name="production_companies" identifier="id"/>
          <FilterSearch options={this.props.certifications} change={this.setFilter} name="certifications" identifier="US"/>
        </div>
        <div style={{
          position: "absolute",
          right: "10%"
        }}>
          <LbFilter file={this.props.lbMovies.length > 0} fun={this.toggleUploaderView} onChecked={this.onChecked} checked={this.state.hideWatchedMoviesFromLbData}/>
        </div>
        {this.props.movieList ? (
          <MovieList movies={this.props.movieList} onClick={this.openMovie} />
        ) : (
          <div style={{marginTop: 200}}>
            <CircularProgress />
          </div>
        )}
        {this.props.numberOfPages > 0 && (
          <Paginator pages={this.props.numberOfPages} />
        )}
        {this.props.movieDetails._id && (
          <MovieDetails
            movie={this.props.movieDetails}
            close={() => {
              this.props.clearMovieDetails()
              this.props.setTorrents({payload: []})
            }}
          />
        )}

        {/*<Content />*/}
      </div>
    ) : (
      <Content viewUploader={this.toggleUploaderView} existing={this.props.lbMovies.length > 0} deleteLbData={this.props.deleteLbData} getLbMovies={this.props.getLbMovies}/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: (page, hideWatched, filter) => dispatch(getMovies(page, hideWatched, filter)),
    setMovies: movieList => dispatch(setMovies(movieList)),
    getSearchSuggestions: searchString =>
      dispatch(getSearchSuggestions(searchString)),
    clearSearchSuggestions: () => dispatch(clearSearchSuggestions()),
    search: searchString => dispatch(search(searchString)),
    getMovieDetails: id => dispatch(getMovieDetails(id)),
    clearMovieDetails: () => dispatch(clearMovieDetails()),
    getLbMovies: () => dispatch(getLbMovies()),
    deleteLbData: () => dispatch(deleteLbData()),
    getGenres: () => dispatch(getGenres()),
    getProductionCompanies: () => dispatch(getProductionCompanies()),
    setTorrents: torrents => dispatch(setTorrents(torrents))

  };
};

const mapStateToProps = state => ({
  movieList: state.movieList.movieList,
  searchSuggestions: state.movieList.searchSuggestions,
  numberOfPages: state.movieList.numberOfPages,
  movieDetails: state.movie.movieDetails,
  torrent: state.torrentList.torrent,
  lbMovies: state.lbMovies.lbMovies,
  genres: state.filters.genres,
  productionCompanies: state.filters.productionCompanies,
  certifications: state.filters.certifications
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
