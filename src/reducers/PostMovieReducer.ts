import {
  PostMovieDispatchTypes,
  Movie,
  POST_MOVIE_LOADING,
  POST_MOVIE_FAIL,
  POST_MOVIE_SUCCESS,
} from "../actions/PostMovieActionTypes";

interface DefaultStateI {
  loading: boolean;
  movie?: Movie;
  errMsg?: string;
  title_err?: string;
  description_err?: string;
  category_err?: string;
  rating_err?: string;
  movie_img_err?: string;
  youtube_url_err?: string;
}
const defaultState: DefaultStateI = {
  loading: false,
};
const postMovieReducer = (
  state: DefaultStateI = defaultState,
  action: PostMovieDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case POST_MOVIE_LOADING:
      return {
        loading: true,
      };
    case POST_MOVIE_FAIL:
      return {
        loading: false,
        errMsg: action.errMsg,
        title_err: action.title_err,
        description_err: action.description_err,
        category_err: action.category_err,
        rating_err: action.rating_err,
        movie_img_err: action.movie_img_err,
        youtube_url_err: action.youtube_url_err,
      };
    case POST_MOVIE_SUCCESS:
      return {
        loading: false,
        movie: action.payload,
      };
    default:
      return state;
  }
};

export default postMovieReducer;
