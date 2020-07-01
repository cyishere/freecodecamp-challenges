import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import "./App.scss";

import BreakLength from "./components/BreakLength";
import SessionLength from "./components/SessionLength";
import TimerCard from "./components/TimerCard";
import StartStopControl from "./components/StartStopControl";

momentDurationFormatSetup(moment);

let countdown = null;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSessionType: "Session", // "Session" or "Break"
      breakLength: 60 * 5,
      sessionLength: 60 * 25,
      timeLeft: undefined,
      isStarted: false,
    };

    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.decBreakLength = this.decBreakLength.bind(this);
    this.incBreakLength = this.incBreakLength.bind(this);
    this.decSessionLength = this.decSessionLength.bind(this);
    this.incSessionLength = this.incSessionLength.bind(this);
  }

  decBreakLength() {
    const newBreakLength = this.state.breakLength - 60;
    if (newBreakLength < 60) {
      this.setState({
        breakLength: 60,
      });
    } else {
      this.setState({
        breakLength: newBreakLength,
      });
    }
  }

  incBreakLength() {
    const newBreakLength = this.state.breakLength + 60;

    if (newBreakLength >= 3600) {
      this.setState({
        breakLength: 3600,
      });
    } else {
      this.setState({
        breakLength: newBreakLength,
      });
    }
  }

  decSessionLength() {
    const newSessionLength = this.state.sessionLength - 60;
    if (newSessionLength < 60) {
      this.setState({
        sessionLength: 60,
        timeLeft: 60,
      });
    } else {
      this.setState({
        sessionLength: newSessionLength,
        timeLeft: newSessionLength,
      });
    }
  }

  incSessionLength() {
    const newSessionLength = this.state.sessionLength + 60;
    if (newSessionLength >= 3600) {
      this.setState({
        sessionLength: 3600,
        timeLeft: 3600,
      });
    } else {
      this.setState({
        sessionLength: newSessionLength,
        timeLeft: newSessionLength,
      });
    }
  }

  handleStartStop() {
    if (this.state.isStarted) {
      // stop the countdown
      clearInterval(countdown);
      countdown = null;
      this.setState({
        isStarted: false,
      });
    } else {
      countdown = setInterval(() => {
        const newTimeLeft = this.state.timeLeft - 1;
        if (newTimeLeft >= 0) {
          this.setState({
            timeLeft: newTimeLeft,
            isStarted: true,
          });
        } else {
          // time left is less than zero
          this.audioBeep.play();
          // if session:
          if (this.state.currentSessionType === "Session") {
            // switch to break
            this.setState({
              currentSessionType: "Break",
              timeLeft: this.state.breakLength,
              isStarted: true,
            });
          }
          // if break:
          else if (this.state.currentSessionType === "Break") {
            this.setState({
              currentSessionType: "Session",
              timeLeft: this.state.sessionLength,
              isStarted: true,
            });
          }
        }
      }, 1000);
    }
  }

  handleReset() {
    // stop the countdown
    clearInterval(countdown);
    // set the countdown to null
    countdown = null;

    this.setState({
      currentSessionType: "Session",
      sessionLength: 60 * 25,
      breakLength: 60 * 5,
      timeLeft: 60 * 25,
      isStarted: false,
    });

    // reset audio
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  componentDidMount() {
    this.setState({
      timeLeft: this.state.sessionLength,
    });
  }

  render() {
    return (
      <div className="container">
        <BreakLength
          decBreakLength={this.decBreakLength}
          breakLength={this.state.breakLength}
          incBreakLength={this.incBreakLength}
        />

        <SessionLength
          decSessionLength={this.decSessionLength}
          sessionLength={this.state.sessionLength}
          incSessionLength={this.incSessionLength}
        />

        <TimerCard
          currentSessionType={this.state.currentSessionType}
          timeLeft={this.state.timeLeft}
        />

        <StartStopControl
          handleStartStop={this.handleStartStop}
          isStarted={this.state.isStarted}
          handleReset={this.handleReset}
        />

        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

export default App;
