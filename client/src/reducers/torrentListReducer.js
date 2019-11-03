const initialState = {
  torrentList: [],
  torrent: null
};

export default function torrentListReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TORRENTS":
      return {
        ...state,
        torrentList: action.payload
      };

    case "SET_TORRENT":
      console.log(action.payload);
      return {
        ...state,
        torrent: action.payload
      };
    default:
      return state;
  }
}
