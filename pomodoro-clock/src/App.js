import React from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faPlay,
  faPause,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

const BtnTextPlay = ({ handlePlay }) => (
  // <i className="fas fa-play" onClick={handlePlay}></i>
  <FontAwesomeIcon icon={faPlay} onClick={handlePlay} />
);
const BtnTextPause = ({ handlePause }) => (
  // <i className="fas fa-pause" onClick={handlePause}></i>
  <FontAwesomeIcon icon={faPause} onClick={handlePause} />
);

let countdown;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time_left: 0.1,
      break_left: 0.1,
      timer_running: false,
      break: false,
      display: "",
      count: 0,
      session_temp: 0,
      break_temp: 0,
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleDecBreakTime = this.handleDecBreakTime.bind(this);
    this.handleIncBreakTime = this.handleIncBreakTime.bind(this);

    this.handleDecSessionTime = this.handleDecSessionTime.bind(this);
    this.handleIncSessionTime = this.handleIncSessionTime.bind(this);
  }

  timer() {
    if (this.state.count === 0) {
      var sessionSec = this.state.time_left * 60;
      var breakSec = this.state.break_left * 60;
    } else {
      sessionSec = this.state.session_temp;
      breakSec = this.state.break_temp;
    }

    console.log("点击play后的sessionSec: " + sessionSec);
    console.log("点击play后的breakSec: " + breakSec);

    // this.setDisplay(sessionSec);

    countdown = setInterval(() => {
      if (sessionSec >= 0) {
        if (this.state.count === 0) {
          console.log("count: " + this.state.count);
          sessionSec--;
          this.setDisplay(sessionSec);
        } else {
          console.log("count: " + this.state.count);
          this.setDisplay(sessionSec);
          sessionSec--;
        }

        this.setState({
          session_temp: sessionSec,
        });

        console.log("sessionSec: " + sessionSec);
      }

      if (sessionSec === -1) {
        if (breakSec >= 0) {
          this.setDisplay(breakSec);
          this.setState({
            break: true,
            break_temp: breakSec,
          });
          breakSec--;

          console.log("breakSec: " + breakSec);
        }
      }

      if (sessionSec === -1 && breakSec === -1) {
        sessionSec = this.state.time_left * 60;
        breakSec = this.state.break_left * 60;
        this.setState({
          count: this.state.count + 1,
        });
      } else if (sessionSec > 0 && breakSec > 0) {
        this.setState({
          break: false,
        });
      }
    }, 1000);
  }

  setDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    this.setState({
      display: `${minutes < 10 ? "0" : ""}${minutes}:${
        remainderSeconds < 10 ? "0" : ""
      }${remainderSeconds}`,
    });
  }

  stopInterval() {
    clearInterval(countdown);
  }

  handlePlay() {
    if (countdown === undefined) {
      this.setState({
        timer_running: true,
      });
      this.timer();
    }
  }

  handlePause() {
    this.stopInterval();
    countdown = undefined;
    this.setState({
      timer_running: false,
    });
  }

  handleReset() {}

  handleDecBreakTime() {
    if (this.state.break_left > 1) {
      this.setState({
        break_left: this.state.break_left - 1,
      });
    }
  }

  handleIncBreakTime() {
    if (this.state.break_left < 60) {
      this.setState({
        break_left: this.state.break_left + 1,
      });
    }
  }

  handleDecSessionTime() {
    this.setDisplay((this.state.time_left - 1) * 60);
    if (this.state.time_left > 1) {
      this.setState({
        time_left: this.state.time_left - 1,
      });
    }
  }

  handleIncSessionTime() {
    this.setDisplay((this.state.time_left + 1) * 60);
    if (this.state.time_left < 60) {
      this.setState({
        time_left: this.state.time_left + 1,
      });
    }
  }

  componentDidMount() {
    this.setDisplay(this.state.time_left * 60);
  }

  render() {
    return (
      <div className="container">
        <div className="break-control control">
          <div id="break-label" className="control-title">
            Break Length
          </div>
          <div className="control-content">
            <button
              id="break-decrement"
              onClick={this.handleDecBreakTime}
              disabled={this.state.timer_running || this.state.break_left === 1}
            >
              {/* <i className="fas fa-angle-down"></i> */}
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <div id="break-length" value={this.state.break_left}>
              {this.state.break_left}
            </div>
            <button
              id="break-increment"
              onClick={this.handleIncBreakTime}
              disabled={
                this.state.timer_running || this.state.break_left === 60
              }
            >
              {/* <i className="fas fa-angle-up"></i> */}
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
          </div>
        </div>

        <div className="session-control control">
          <div id="session-label" className="control-title">
            Session Length
          </div>
          <div className="control-content">
            <button
              id="session-decrement"
              onClick={this.handleDecSessionTime}
              disabled={this.state.timer_running || this.state.time_left === 1}
            >
              {/* <i className="fas fa-angle-down"></i> */}
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <div id="session-length" value={this.state.time_left}>
              {this.state.time_left}
            </div>
            <button
              id="session-increment"
              onClick={this.handleIncSessionTime}
              disabled={this.state.timer_running || this.state.time_left === 60}
            >
              {/* <i className="fas fa-angle-up"></i> */}
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
          </div>
        </div>

        <div className={this.state.break ? "orange timer-card" : "timer-card"}>
          <div id="timer-label">{this.state.break ? "Break" : "Session"}</div>
          <div id="time-left">{this.state.display}</div>
        </div>

        <div className="btn-card">
          <button id="start_stop">
            {this.state.timer_running ? (
              <BtnTextPause handlePause={this.handlePause} />
            ) : (
              <BtnTextPlay handlePlay={this.handlePlay} />
            )}
          </button>
          <button id="reset">
            <FontAwesomeIcon icon={faSyncAlt} onClick={this.handleReset} />
            {/* <i className="fas fa-sync-alt" onClick={this.handleReset}></i> */}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
