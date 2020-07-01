import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const BreakLength = ({ decBreakLength, breakLength, incBreakLength }) => {
  return (
    <div className="break-control control">
      <div id="break-label" className="control-title">
        Break Length
      </div>
      <div className="control-content">
        <button id="break-decrement" onClick={decBreakLength}>
          {/* <i className="fas fa-angle-down"></i> */}
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <div id="break-length">
          {moment.duration(breakLength, "s").asMinutes()}
        </div>
        <button id="break-increment" onClick={incBreakLength}>
          {/* <i className="fas fa-angle-up"></i> */}
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      </div>
    </div>
  );
};

export default BreakLength;
