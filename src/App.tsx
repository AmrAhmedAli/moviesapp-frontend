/** Main Imports */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
/** Design Imports */
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { Dropdown } from "react-bootstrap";
/** App components and actions Imports */
import MoviesList from "./containers/MovieListContainer/MoviesList";
import MyMoviesList from "./containers/MyMoviesContainer/MyMovies";
import Login from "./containers/LoginContainer/Login";
import Signup from "./containers/SignupContainer/Signup";
import { AuthCheckState, AuthLogout } from "./actions/AuthActions";
/** Icons Imports */
import { Add } from "@material-ui/icons";
import { Menu } from "@material-ui/icons";
/** Stylesheet Import */
import "./App.css";

/** Functional App */
function App() {
  const [className, setClassName] = useState("AppBar");
  const dispatch = useDispatch();

  /** On page load fetch data to see active user logged in */
  React.useEffect(() => {
    FetchData();
  }, []);
  const FetchData = () => {
    dispatch(AuthCheckState()); //calls action AuthCheckState
  };

  /** Turns the header to dark if scroll */
  const handleScroll = () => {
    if (window.pageYOffset > 20) {
      setClassName("AppBar-dark");
    } else {
      setClassName("AppBar");
    }
  };
  /** Scroll listener  */
  window.addEventListener("scroll", handleScroll);

  /** Calls the action AuthSignout  */
  const handleSignout = () => {
    dispatch(AuthLogout());
  };

  /** Goes to post movie section if "add movie" button is clicked  */
  const executeScroll = () => {
    window.location.replace("/#add-new-movie");
  };

  return (
    <div className="App">
      <AppBar position="fixed" className={className}>
        <Toolbar className="toolbar-container">
          <div className="desktop-view">
            <div className="left-toolbar-container">
              <img
                className="logo"
                alt=""
                src={process.env.PUBLIC_URL + "/logo.png"}
              />
              <nav className="intial-nav">
                <NavLink to={"/"}>Home</NavLink>

                {localStorage.getItem("token") && (
                  <NavLink to={"/my-movies"}>My Movies</NavLink>
                )}
              </nav>
            </div>
            <div className="right-toolbar-container">
              <nav>
                {localStorage.getItem("token") && (
                  <div className="right-flex">
                    <IconButton
                      aria-label=""
                      size="small"
                      className="add-movie"
                      onClick={executeScroll}
                    >
                      <Add fontSize="inherit" />
                      <span className="addnew-tooltiptext">Add movie</span>
                    </IconButton>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="drop-down"
                        id="dropdown-basic"
                      >
                        Welcome, {localStorage.getItem("username")}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item className="dropdown-item">
                          Account
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item">
                          Help
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="dropdown-item"
                          onClick={handleSignout}
                        >
                          Signout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
                {!localStorage.getItem("token") && (
                  <NavLink to={"/login"}>Login</NavLink>
                )}
              </nav>
            </div>
          </div>
          <div className="mobile-view">
            <div className="left-toolbar-container">
              <img
                className="logo"
                alt=""
                src={process.env.PUBLIC_URL + "/logo.png"}
              />
            </div>
            <div className="right-toolbar-container">
              <Dropdown>
                <Dropdown.Toggle className="mobile-drop-down">
                  <IconButton
                    aria-label=""
                    className="burger-menu"
                    size="small"
                  >
                    <Menu fontSize="inherit" />
                  </IconButton>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {localStorage.getItem("token") && (
                    <Dropdown.Item className="dropdown-item">
                      Welcome, {localStorage.getItem("username")}
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item className="dropdown-item" href="/">
                    Home
                  </Dropdown.Item>
                  {localStorage.getItem("token") && (
                    <Dropdown.Item className="dropdown-item" href="/my-movies">
                      My Movies
                    </Dropdown.Item>
                  )}
                  {localStorage.getItem("token") && (
                    <Dropdown.Item
                      className="dropdown-item"
                      href="/#add-new-movie"
                    >
                      Add movie
                    </Dropdown.Item>
                  )}
                  {!localStorage.getItem("token") && (
                    <Dropdown.Item className="dropdown-item" href="/login">
                      Login
                    </Dropdown.Item>
                  )}
                  {localStorage.getItem("token") && (
                    <Dropdown.Item className="dropdown-item">
                      Account
                    </Dropdown.Item>
                  )}
                  {localStorage.getItem("token") && (
                    <Dropdown.Item className="dropdown-item">
                      Help
                    </Dropdown.Item>
                  )}
                  {localStorage.getItem("token") && (
                    <Dropdown.Item
                      className="dropdown-item"
                      onClick={handleSignout}
                    >
                      Signout
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path={"/"} exact component={MoviesList} />
        {localStorage.getItem("token") && (
          <Route path={"/my-movies"} exact component={MyMoviesList} />
        )}

        {!localStorage.getItem("token") && (
          <Route path={"/login"} exact component={Login} />
        )}
        {!localStorage.getItem("token") && (
          <Route path={"/signup"} exact component={Signup} />
        )}

        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
