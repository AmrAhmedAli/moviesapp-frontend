/** Main Imports */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
/** Design Imports */
import { AppBar } from "@material-ui/core";
/** App components and actions Imports */
import MoviesList from "./containers/MovieListContainer/MoviesList";
import MyMoviesList from "./containers/MyMoviesContainer/MyMovies";
import Login from "./containers/LoginContainer/Login";
import Signup from "./containers/SignupContainer/Signup";
import { AuthCheckState } from "./actions/AuthActions";
import ToolbarCont from "./containers/ToolbarContainer/ToolbarCont";
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

  return (
    <div className="App">
      <AppBar position="fixed" className={className}>
        <ToolbarCont />
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
