import { TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin } from "../actions/AuthActions";
import { RootStore } from "../Store";

const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.authUser);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const checkUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === ""
    ) {
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
      setPasswordErrorText("password field is required");
      setPasswordError(true);
    } else {
      if (event.target.value.length < 8) {
        setPasswordErrorText("password field mut be at least 8 characters");
        setPasswordError(true);
      } else {
        setPasswordError(false);
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
      password.length >= 8
    ) {
      dispatch(AuthLogin(username, password));
    } else {
      if (username == null || username === undefined || username === "") {
        setUsernameErrorText("username field is required");
        setUsernameError(true);
      }
      if (password == null || password === undefined || password === "") {
        setPasswordErrorText("password field is required");
        setPasswordError(true);
      } else {
        if (password.length < 8) {
          setPasswordErrorText("password field mut be at least 8 characters");
          setPasswordError(true);
        }
      }
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <Card.Body>
            <Card.Title className="login-card-title">Sign In</Card.Title>
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
            </div>
            <Button
              className="login-Btn"
              type="submit"
              color="primary"
              onClick={handleSubmit}
            >
              {authState.loading && <Spinner animation="border" />}
              {!authState.loading && <span>Sign in</span>}
            </Button>
            <Card.Text className="login-help">Need Help?</Card.Text>
            <Card.Text>
              New to Netflix? <Card.Link href="/signup">Sign up now.</Card.Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
