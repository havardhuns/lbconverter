import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/pages/Home";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./components/layout/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMovies } from "./store/actions/MovieListAction";

function App() {
  const movieList = useSelector((state) => state.movieList.movieList);
  const numberOfPages = useSelector((state) => state.movieList.numberOfPages);
  const lastPageLoaded = useSelector((state) => state.movieList.lastPageLoaded);
  const checked = useSelector((state) => state.lbMovies.checked);
  const query = useSelector((state) => state.filters.query);
  const totalResults = useSelector((state) => state.movieList.totalResults);
  const currentRoute = useSelector((state) => state.route.currentRoute);
  const dispatch = useDispatch();

  const loadMoreMovies = () => {
    dispatch(getMovies(lastPageLoaded + 1, checked, query));
  };

  return (
    <div>
      <Router>
        <InfiniteScroll
          dataLength={movieList}
          next={loadMoreMovies}
          hasMore={currentRoute === "/" && lastPageLoaded < numberOfPages}
        >
          <NavBar />
          {totalResults}
          <Routes />
        </InfiniteScroll>
      </Router>
    </div>
  );
}

export default App;
