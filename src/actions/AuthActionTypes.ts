export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export interface AUTHLoading {
  type: typeof AUTH_LOADING;
}
export interface AUTHFail {
  type: typeof AUTH_FAIL;
  error?: string;
  username_err?: string;
  password_err?: string;
  password2_err?: string;
}
export interface AUTHSuccess {
  type: typeof AUTH_SUCCESS;
  token: string;
  username: string;
}
export interface AUTHLogout {
  type: typeof AUTH_LOGOUT;
}

export type AUTHDispatchTypes =
  | AUTHLoading
  | AUTHFail
  | AUTHSuccess
  | AUTHLogout;
