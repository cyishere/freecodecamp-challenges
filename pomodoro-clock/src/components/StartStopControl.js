import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const BtnTextPlay = () => (
  // <i className="fas fa-play" onClick={handlePlay}></i>
  <FontAwesomeIcon icon={faPlay} />
);
const BtnTextPause = () => (
  // <i className="fas fa-pause" onClick={handlePause}></i>
  <FontAwesomeIcon icon={faPause} />
);

const StartStopControl = ({ handleStartStop, isStarted, handleReset }) => {
  return (
    <div className="btn-card">
      <button id="start_stop" onClick={handleStartStop}>
        {isStarted ? <BtnTextPause /> : <BtnTextPlay />}
      </button>
      <button id="reset" onClick={handleReset}>
        <FontAwesomeIcon icon={faSyncAlt} />
        {/* <i className="fas fa-sync-alt" onClick={this.handleReset}></i> */}
      </button>
    </div>
  );
};

export default StartStopControl;
