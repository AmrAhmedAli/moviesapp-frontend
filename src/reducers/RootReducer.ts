import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import moviesListReducer from "./MoviesListReducer";
import postMovieReducer from "./PostMovieReducer";
const RootReducer = combineReducers({
  moviesList: moviesListReducer,
  authUser: authReducer,
  postMovie: postMovieReducer,
});

export default RootReducer;
