import {
  AUTHDispatchTypes,
  AUTH_LOADING,
  AUTH_LOGOUT,
  AUTH_FAIL,
  AUTH_SUCCESS,
} from "../actions/AuthActionTypes";

interface DefaultStateI {
  loading: boolean;
  token?: string;
  errMsg?: string;
  username_err?: string;
  password_err?: string;
  password2_err?: string;
  user?: string;
}
const defaultState: DefaultStateI = {
  loading: false,
};

const authReducer = (
  state: DefaultStateI = defaultState,
  action: AUTHDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        loading: true,
      };
    case AUTH_FAIL:
      return {
        loading: false,
        errMsg: action.error,
        username_err: action.username_err,
        password_err: action.password_err,
        password2_err: action.password2_err,
      };
    case AUTH_LOGOUT:
      return {
        loading: false,
      };
    case AUTH_SUCCESS:
      return {
        loading: false,
        token: action.token,
        user: action.username,
      };
    default:
      return state;
  }
};

export default authReducer;
