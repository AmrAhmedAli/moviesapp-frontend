import {
  MoviesListDispatchTypes,
  Movie,
  MOVIES_LOADING,
  MOVIES_FAIL,
  MOVIES_SUCCESS,
} from "../actions/moviesListActionTypes";

interface DefaultStateI {
  loading: boolean;
  movies?: [Movie];
  errMsg?: string;
}
const defaultState: DefaultStateI = {
  loading: false,
  errMsg: "",
};
const moviesListReducer = (
  state: DefaultStateI = defaultState,
  action: MoviesListDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case MOVIES_LOADING:
      return {
        loading: true,
      };
    case MOVIES_FAIL:
      return {
        loading: false,
        errMsg: action.errMsg
          ? action.errMsg
          : "Sorry cannot load movies right now",
      };
    case MOVIES_SUCCESS:
      return {
        loading: false,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default moviesListReducer;
