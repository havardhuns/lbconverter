const rarbgApi = require("rarbg-api");

export const setTorrents = torrentList => ({
  type: "GET_TORRENTS",
  payload: torrentList
});

export function getTorrents(imdbId) {
  return dispatch => {
    rarbgApi
      .search(imdbId, { sort: "seeders" }, "imdb")
      .then(response => {
        console.log(response);
        dispatch(setTorrents(response));
        // Output:
        // [
        //   {
        //     "filename": "Star.Wars.Episode.VII.The.Force.Awakens.2015.1080p.BluRay.H264.AAC-RARBG",
        //     "category": "Movies/x264/1080",
        //     "download": "magnet:?xt=urn:btih:..."
        //   },
        //   {
        //     "filename": "Star.Wars.Episode.VII.The.Force.Awakens.2015.1080p.BluRay.x264-Replica",
        //     "category": "Movies/x264/1080",
        //     "download": "magnet:?xt=urn:btih:..."
        //   }
        // ]
      })
      .catch(console.error);
  };
}

export function setTorrent(torrent) {
  return dispatch => {
    dispatch({
      type: "SET_TORRENT",
      payload: torrent
    });
  };
}
