import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyMoviesList } from "../../actions/moviesListActions";
import { RootStore } from "../../Store";
import _ from "lodash";
import MovieCard from "../MovieCardContainer/MovieCard";

const MyMoviesList = () => {
  const dispatch = useDispatch();
  const movieState = useSelector((state: RootStore) => state.moviesList);
  React.useEffect(() => {
    FetchData();
  }, []);
  const FetchData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(GetMyMoviesList(token));
    } else {
      window.location.replace("/");
    }
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
    return <p className="my-movies-sub">No Data to Show!</p>;
  };
  return (
    <div className="my-movies-page">
      <div>
        <p className="my-movies-title">My List</p>
      </div>
      <div className="movies-container">{getListMovies()}</div>
    </div>
  );
};

export default MyMoviesList;
