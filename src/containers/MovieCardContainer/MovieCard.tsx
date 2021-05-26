import { IconButton } from "@material-ui/core";
import React from "react";
import { Movie } from "../../actions/moviesListActionTypes";

import ArrowDown from "@material-ui/icons/ChevronRight";
import MoreInfoModal from "../MoreInfoModalContainer/MoreInfoModal";

import "./MovieCard.css";
type MovieProps = {
  movieProps: Movie;
};

const MovieCard = (props: MovieProps) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="media">
      <img
        className="poster"
        src={props.movieProps.movie_img}
        alt={props.movieProps.title}
        onClick={() => setModalShow(true)}
      />
      <div className="title-container" onClick={() => setModalShow(true)}>
        <b className="title">{props.movieProps.title}</b>
        <IconButton
          aria-label=""
          size="small"
          className="more-info"
          onClick={() => setModalShow(true)}
        >
          <ArrowDown fontSize="inherit" className="rotate-icon" />
          <span className="tooltiptext">More Info</span>
        </IconButton>
      </div>
      <MoreInfoModal
        show={modalShow}
        movieProps={props.movieProps}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default MovieCard;
