import {
  CLEAR_TORRENTS,
  GET_TORRENTS_BEGIN,
  GET_TORRENTS_SUCCESS,
} from "../actionTypes";

export const getTorrentsBegin = () => ({
  type: GET_TORRENTS_BEGIN,
});

export const getTorrentsSuccess = (torrents) => ({
  type: GET_TORRENTS_SUCCESS,
  payload: torrents,
});

export const clearTorrents = () => ({
  type: CLEAR_TORRENTS,
});

export function getTorrents(imdbId) {
  return (dispatch) => {
    getTorrentsBegin();
    fetch("/api/torrent/" + imdbId)
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((torrents) => {
        dispatch(getTorrentsSuccess(torrents));
      });
  };
}
