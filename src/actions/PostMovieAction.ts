import axios from "axios";
import { Dispatch } from "redux";
import { Movie } from "./moviesListActionTypes";
import {
  PostMovieDispatchTypes,
  POST_MOVIE_FAIL,
  POST_MOVIE_LOADING,
  POST_MOVIE_SUCCESS,
} from "./PostMovieActionTypes";
export type PostBodyMovie = {
  title: string;
  description: string;
  category: string;
  rating: number;
  movie_img?: File;
  youtube_url?: string;
};
export const PostMovieAction =
  (
    title: string,
    category: string,
    rating: number,
    description: string,
    token?: string,
    movie_img?: File,
    youtube_url?: string
  ) =>
  async (dispatch: Dispatch<PostMovieDispatchTypes>) => {
    try {
      dispatch({
        type: POST_MOVIE_LOADING,
      });
      if (token === null || token === "" || token === undefined) {
        dispatch({
          type: POST_MOVIE_FAIL,
          errMsg: "Token Authorization Fail",
        });
      }
      let form_data = new FormData();
      form_data.append("title", title);
      form_data.append("category", category);
      form_data.append("rating", rating.toString());
      form_data.append("description", description);

      if (movie_img) form_data.append("movie_img", movie_img, movie_img?.name);
      if (youtube_url) form_data.append("youtube_url", youtube_url);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      const res = await axios.post(
        "https://moviesbackendapp.herokuapp.com/movies/",
        form_data
      );

      dispatch({
        type: POST_MOVIE_SUCCESS,
        payload: res.data,
      });
      window.location.replace("/my-movies");
    } catch (e) {
      dispatch({
        type: POST_MOVIE_FAIL,
        errMsg: e.response.data.non_field_errors
          ? e.response.data.non_field_errors[0]
          : null,
        title_err: e.response.data.title ? e.response.data.title[0] : null,
        description_err: e.response.data.description
          ? e.response.data.description[0]
          : null,
        category_err: e.response.data.category
          ? e.response.data.category[0]
          : null,
        rating_err: e.response.data.rating ? e.response.data.rating[0] : null,
        movie_img_err: e.response.data.movie_img
          ? e.response.data.movie_img[0]
          : null,
        youtube_url_err: e.response.data.youtube_url
          ? e.response.data.youtube_url[0]
          : null,
      });
    }
  };
