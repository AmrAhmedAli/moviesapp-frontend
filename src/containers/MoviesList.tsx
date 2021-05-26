import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMoviesList } from "../actions/moviesListActions";
import { RootStore } from "../Store";
import _ from "lodash";
import MovieCard from "./MovieCard";
import { HomeVideoContainer } from "./HomeVideo";
import PostMovie from "./PostMovie";

const MoviesList = () => {
  const dispatch = useDispatch();
  const movieState = useSelector((state: RootStore) => state.moviesList);
  React.useEffect(() => {
    FetchData();
  }, []);
  const FetchData = () => {
    dispatch(GetMoviesList());
  };
  const getListMovies = () => {
    if (!_.isEmpty(movieState.movies)) {
      return movieState.movies?.map((movie) => {
        return <MovieCard movieProps={movie} />;
      });
    }
    if (movieState.loading) {
      return <p className="my-movies-sub">Loading....</p>;
    }
    if (!_.isEmpty(movieState.errMsg)) {
      return <p className="my-movies-sub">{movieState.errMsg}</p>;
    }
    return <p className="my-movies-sub">Unable to get data</p>;
  };
  return (
    <div>
      <HomeVideoContainer />{" "}
      <div className="movies-container">{getListMovies()}</div>
      {localStorage.getItem("token") && <PostMovie />}
    </div>
  );
};

export default MoviesList;
