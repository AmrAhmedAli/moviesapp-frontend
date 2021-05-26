export const MOVIES_LOADING = "MOVIES_LOADING";
export const MOVIES_FAIL = "MOVIES_FAIL";
export const MOVIES_SUCCESS = "MOVIES_SUCCESS";

export type Movie = {
  title: string;
  description: string;
  category: string;
  rating: number;
  movie_img: string;
  youtube_url: string;
};
export interface MoviesLoading {
  type: typeof MOVIES_LOADING;
}
export interface MoviesFail {
  type: typeof MOVIES_FAIL;
  errMsg?: string;
}
export interface MoviesSuccess {
  type: typeof MOVIES_SUCCESS;
  payload: [Movie];
}

export type MoviesListDispatchTypes =
  | MoviesLoading
  | MoviesFail
  | MoviesSuccess;
