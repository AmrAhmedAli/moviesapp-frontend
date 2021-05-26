import React from "react";
import { Button, Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Movie } from "../../actions/moviesListActionTypes";

import "./MoreInfoModal.css";

type PropsI = {
  show: boolean;
  onHide: () => void;
  movieProps: Movie;
};
const MoreInfoModal = (props: PropsI) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <ReactPlayer
          url={props.movieProps.youtube_url}
          config={{ youtube: { playerVars: { disablekb: 1 } } }}
          className="react-player"
          playing={true}
          loop={true}
          muted={false}
          controls={false}
          width="100%"
          height="100%"
        />
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body-title">
          <b>{props.movieProps.title}</b>
        </div>
        <div className="modal-body-info">
          <b>{props.movieProps.category}</b>
          <b className="info-rating">{props.movieProps.rating}/10</b>
        </div>
        <div className="modal-body-description">
          <b>{props.movieProps.description}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="drop-down" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MoreInfoModal;
