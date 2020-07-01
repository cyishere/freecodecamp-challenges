import React from "react";
import moment from "moment";

const TimerCard = ({ currentSessionType, timeLeft }) => {
  return (
    <div
      className={
        currentSessionType === "Break" ? "timer-card orange" : "timer-card"
      }
    >
      <div id="timer-label">{currentSessionType}</div>
      <div id="time-left">
        {moment.duration(timeLeft, "s").format("mm:ss", { trim: false })}
      </div>
    </div>
  );
};

export default TimerCard;
