import axios from "axios";
import { Dispatch } from "redux";
import {
  MoviesListDispatchTypes,
  MOVIES_FAIL,
  MOVIES_LOADING,
  MOVIES_SUCCESS,
} from "./moviesListActionTypes";
export const GetMoviesList =
  () => async (dispatch: Dispatch<MoviesListDispatchTypes>) => {
    try {
      dispatch({
        type: MOVIES_LOADING,
      });
      const res = await axios.get("http://moviesbackendapp.herokuapp.com");

      dispatch({
        type: MOVIES_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: MOVIES_FAIL,
      });
    }
  };

export const GetMyMoviesList =
  (token?: string) => async (dispatch: Dispatch<MoviesListDispatchTypes>) => {
    try {
      dispatch({
        type: MOVIES_LOADING,
      });
      if (token === null || token === "" || token === undefined) {
        dispatch({
          type: MOVIES_FAIL,
          errMsg: "Token Authorization Fail",
        });
      }
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      const res = await axios.get(
        "http://moviesbackendapp.herokuapp.com/movies/"
      );

      dispatch({
        type: MOVIES_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: MOVIES_FAIL,
        errMsg: "Sorry, Cannot get Your List!",
      });
    }
  };
