import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const SessionLength = ({
  decSessionLength,
  sessionLength,
  incSessionLength,
}) => {
  return (
    <div className="session-control control">
      <div id="session-label" className="control-title">
        Session Length
      </div>
      <div className="control-content">
        <button id="session-decrement" onClick={decSessionLength}>
          {/* <i className="fas fa-angle-down"></i> */}
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <div id="session-length">
          {moment.duration(sessionLength, "s").asMinutes()}
        </div>
        <button id="session-increment" onClick={incSessionLength}>
          {/* <i className="fas fa-angle-up"></i> */}
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      </div>
    </div>
  );
};

export default SessionLength;
