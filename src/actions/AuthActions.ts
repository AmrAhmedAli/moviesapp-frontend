import axios from "axios";
import { Dispatch } from "redux";
import {
  AUTH_FAIL,
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTHDispatchTypes,
} from "./AuthActionTypes";

export const AuthLogin =
  (username: string, password: string) =>
  async (dispatch: Dispatch<AUTHDispatchTypes>) => {
    try {
      dispatch({
        type: AUTH_LOADING,
      });
      const body = {
        username: username,
        password: password,
      };
      const res = await axios.post(
        "http://moviesbackendapp.herokuapp.com/rest-auth/login/",
        body
      );
      const token = res.data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("expirationDate", expirationDate.toString());
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("expirationDate");
        dispatch({
          type: AUTH_LOGOUT,
        });
      }, 3600 * 1000);

      window.location.replace("/");
      dispatch({
        type: AUTH_SUCCESS,
        token: token,
        username: username,
      });
    } catch (e) {
      dispatch({
        type: AUTH_FAIL,
        error: e.response.data.non_field_errors[0],
      });
    }
  };

export const AuthSignUp =
  (username: string, password1: string, password2: string) =>
  async (dispatch: Dispatch<AUTHDispatchTypes>) => {
    try {
      dispatch({
        type: AUTH_LOADING,
      });
      const body = {
        username: username,
        password1: password1,
        password2: password2,
      };
      const res = await axios.post(
        "http://moviesbackendapp.herokuapp.com/rest-auth/registration/",
        body
      );
      const token = res.data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("expirationDate", expirationDate.toString());
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("expirationDate");
        dispatch({
          type: AUTH_LOGOUT,
        });
      }, 3600 * 1000);

      window.location.replace("/");
      dispatch({
        type: AUTH_SUCCESS,
        token: token,
        username: username,
      });
    } catch (e) {
      dispatch({
        type: AUTH_FAIL,
        error: e.response.data.non_field_errors
          ? e.response.data.non_field_errors[0]
          : null,
        username_err: e.response.data.username
          ? e.response.data.username[0]
          : null,
        password_err: e.response.data.password1
          ? e.response.data.password1[0]
          : null,
        password2_err: e.response.data.password2
          ? e.response.data.password2[0]
          : null,
      });
    }
  };

export const AuthCheckState =
  () => async (dispatch: Dispatch<AUTHDispatchTypes>) => {
    try {
      dispatch({
        type: AUTH_LOADING,
      });
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      if (
        token === undefined ||
        token == null ||
        username === undefined ||
        username == null
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("expirationDate");

        dispatch({
          type: AUTH_LOGOUT,
        });
      } else {
        const dateStr = localStorage.getItem("expirationDate");

        if (dateStr != null && dateStr !== undefined) {
          const expirationDate = new Date(dateStr);
          if (expirationDate <= new Date()) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("expirationDate");
            dispatch({
              type: AUTH_LOGOUT,
            });
          } else {
            setTimeout(() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("expirationDate");

              dispatch({
                type: AUTH_LOGOUT,
              });
            }, expirationDate.getTime() - new Date().getTime());
            dispatch({
              type: AUTH_SUCCESS,
              token: token,
              username: username,
            });
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("expirationDate");

          dispatch({
            type: AUTH_LOGOUT,
          });
        }
      }
    } catch (e) {
      dispatch({
        type: AUTH_FAIL,
        error: e.response.data.non_field_errors[0],
      });
    }
  };
export const AuthLogout =
  () => async (dispatch: Dispatch<AUTHDispatchTypes>) => {
    try {
      dispatch({
        type: AUTH_LOADING,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("expirationDate");
      window.location.replace("/");
      dispatch({
        type: AUTH_LOGOUT,
      });
    } catch (e) {
      dispatch({
        type: AUTH_FAIL,
        error: e.response.data.non_field_errors[0],
      });
    }
  };
