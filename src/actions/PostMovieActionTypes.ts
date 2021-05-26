export const POST_MOVIE_LOADING = "POST_MOVIE_LOADING";
export const POST_MOVIE_FAIL = "POST_MOVIE_FAIL";
export const POST_MOVIE_SUCCESS = "POST_MOVIE_SUCCESS";

export type Movie = {
  title: string;
  description: string;
  category: string;
  rating: number;
  movie_img: string;
  youtube_url: string;
};
export interface PostMovieLoading {
  type: typeof POST_MOVIE_LOADING;
}
export interface PostMovieFail {
  type: typeof POST_MOVIE_FAIL;
  errMsg?: string;
  title_err?: string;
  description_err?: string;
  category_err?: string;
  rating_err?: string;
  movie_img_err?: string;
  youtube_url_err?: string;
}
export interface PostMovieSuccess {
  type: typeof POST_MOVIE_SUCCESS;
  payload: Movie;
}

export type PostMovieDispatchTypes =
  | PostMovieLoading
  | PostMovieFail
  | PostMovieSuccess;
