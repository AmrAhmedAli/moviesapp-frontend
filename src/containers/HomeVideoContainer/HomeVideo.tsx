import { Button, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import PlayIcon from "@material-ui/icons/PlayArrow";
import MuteIcon from "@material-ui/icons/VolumeUp";
import UnMuteIcon from "@material-ui/icons/VolumeOff";
export const HomeVideoContainer = () => {
  const [muted, setMuted] = useState(true);
  const handleToggleMute = () => setMuted((current) => !current);

  return (
    <div>
      <div className="player-wrapper">
        <ReactPlayer
          url={process.env.PUBLIC_URL + "/homeVid3.mp4"}
          config={{ youtube: { playerVars: { disablekb: 1 } } }}
          className="react-player"
          playing={true}
          loop={true}
          muted={muted}
          width="100%"
          height="100%"
          controls={false}
        />
        <div className="actions-video">
          <Button
            className="actions-Btn"
            startIcon={<PlayIcon className="playIcon" />}
          >
            Watch now
          </Button>
          <IconButton
            className="mute-Btn"
            aria-label="mute"
            onClick={handleToggleMute}
          >
            {!muted && <MuteIcon className="playIcon" />}
            {muted && <UnMuteIcon className="playIcon" />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};
