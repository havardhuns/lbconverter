export const setGenres = (genres) => ({
  type: "GET_GENRES",
  genres: genres,
});

export const setProductionCompanies = (productionCompanies) => ({
  type: "GET_PRODUCTION_COMPANIES",
  productionCompanies: productionCompanies,
});

export function getGenres() {
  return (dispatch) => {
    fetch("/api/genres")
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((genres) => {
        dispatch(setGenres(genres));
      });
  };
}

export function getProductionCompanies() {
  return (dispatch) => {
    fetch("/api/company")
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((companies) => {
        dispatch(setProductionCompanies(companies));
      });
  };
}

export const updateQuery = (query) => ({
  type: "UPDATE_QUERY",
  payload: query,
});

export const removeFromQuery = (key) => ({
  type: "REMOVE_FROM_QUERY",
  key: key,
});
