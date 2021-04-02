import {
  GET_TORRENTS_BEGIN,
  GET_TORRENTS_SUCCESS,
  CLEAR_TORRENTS,
} from "../actionTypes";

const initialState = {
  torrentList: [],
  torrent: null,
  loading: true,
};

export default function torrentListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TORRENTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_TORRENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        torrentList: action.payload,
      };
    case CLEAR_TORRENTS:
      return {
        ...state,
        loading: true,
        torrentList: [],
      };
    default:
      return state;
  }
}
