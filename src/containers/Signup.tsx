import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AuthSignUp } from "../actions/AuthActions";
import { RootStore } from "../Store";

const Signup = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.authUser);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordError2, setPasswordError2] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [passwordErrorText2, setPasswordErrorText2] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [password2, setPassword2] = useState<string | null>(null);
  const checkUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === ""
    ) {
      authState.username_err = undefined;
      setUsernameErrorText("username field is required");
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const checkPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === ""
    ) {
      authState.password_err = undefined;
      setPasswordErrorText("password field is required");
      setPasswordError(true);
    } else {
      if (event.target.value.length < 8) {
        authState.password_err = undefined;
        setPasswordErrorText("password field mut be at least 8 characters");
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
    if (
      event.target.value === password2 &&
      passwordErrorText2 === "passwords doesn't match"
    ) {
      setPasswordError2(false);
    } else {
      if (event.target.value !== password2 && !passwordError2) {
        authState.password2_err = undefined;
        setPasswordErrorText2("passwords doesn't match");
        setPasswordError2(true);
      }
    }
  };

  const checkPassword2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === ""
    ) {
      authState.password2_err = undefined;
      setPasswordErrorText2("password field is required");
      setPasswordError2(true);
    } else {
      if (event.target.value !== password) {
        authState.password2_err = undefined;
        setPasswordErrorText2("passwords doesn't match");
        setPasswordError2(true);
      } else {
        setPasswordError2(false);
      }
    }
  };
  const handleSubmit = () => {
    if (
      username != null &&
      username !== undefined &&
      username !== "" &&
      password != null &&
      password !== undefined &&
      password !== "" &&
      password.length >= 8 &&
      password2 !== "" &&
      password2 === password
    ) {
      dispatch(AuthSignUp(username, password, password2));
    } else {
      if (username == null || username === undefined || username === "") {
        authState.username_err = undefined;
        setUsernameErrorText("username field is required");
        setUsernameError(true);
      }
      if (password == null || password === undefined || password === "") {
        authState.password_err = undefined;
        setPasswordErrorText("password field is required");
        setPasswordError(true);
      } else {
        if (password.length < 8) {
          authState.password_err = undefined;
          setPasswordErrorText("password field mut be at least 8 characters");
          setPasswordError(true);
        }
      }
      if (password2 == null || password2 === undefined || password2 === "") {
        authState.password2_err = undefined;
        setPasswordErrorText2("password field is required");
        setPasswordError2(true);
      } else {
        if (password2 !== password) {
          authState.password2_err = undefined;
          setPasswordErrorText2("passwords doesn't match");
          setPasswordError2(true);
        }
      }
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <Card.Body>
            <Card.Title className="login-card-title">Sign Up</Card.Title>
            {authState.errMsg && (
              <span className="text-danger err-login">{authState.errMsg}</span>
            )}

            <div className="Inp-group">
              <TextField
                label="Username"
                fullWidth
                required
                className="login-textField"
                variant="filled"
                InputProps={{
                  className: "login-input",
                }}
                InputLabelProps={{
                  className: "login-input",
                }}
                onChange={checkUsername}
                error={usernameError}
              ></TextField>
              {usernameError && (
                <span className="text-danger">{usernameErrorText}</span>
              )}
              {authState.username_err && (
                <span className="text-danger">{authState.username_err}</span>
              )}
            </div>
            <div className="Inp-group">
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                className="login-textField"
                variant="filled"
                InputProps={{
                  className: "login-input",
                }}
                InputLabelProps={{
                  className: "login-input",
                }}
                onChange={checkPassword}
                error={passwordError}
              ></TextField>
              {passwordError && (
                <span className="text-danger">{passwordErrorText}</span>
              )}
              {authState.password_err && (
                <span className="text-danger">{authState.password_err}</span>
              )}
            </div>
            <div className="Inp-group">
              <TextField
                label="Re-enter your password"
                type="password"
                fullWidth
                required
                className="login-textField"
                variant="filled"
                InputProps={{
                  className: "login-input",
                }}
                InputLabelProps={{
                  className: "login-input",
                }}
                onChange={checkPassword2}
                error={passwordError2}
              ></TextField>
              {passwordError2 && (
                <span className="text-danger">{passwordErrorText2}</span>
              )}
              {authState.password2_err && (
                <span className="text-danger">{authState.password2_err}</span>
              )}
            </div>
            <Button
              className="login-Btn"
              type="submit"
              color="primary"
              onClick={handleSubmit}
            >
              {authState.loading && <Spinner animation="border" />}
              {!authState.loading && <span>Create Account</span>}
            </Button>
            <Card.Text className="login-help">Need Help?</Card.Text>
            <Card.Text>
              Already have an account?{" "}
              <Card.Link href="/login">Login.</Card.Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
