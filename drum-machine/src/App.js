import React from "react";
import "./App.scss";

const pads = [
  {
    keyName: "Q",
    keyNum: 81,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    soundName: "Heater 1",
  },
  {
    keyName: "W",
    keyNum: 87,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    soundName: "Header 2",
  },
  {
    keyName: "E",
    keyNum: 69,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    soundName: "Heater 3",
  },
  {
    keyName: "A",
    keyNum: 65,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    soundName: "Heater 4",
  },
  {
    keyName: "S",
    keyNum: 83,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    soundName: "Header 6",
  },
  {
    keyName: "D",
    keyNum: 68,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    soundName: "DSC OH",
  },
  {
    keyName: "Z",
    keyNum: 90,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    soundName: "Kick & Hat",
  },
  {
    keyName: "X",
    keyNum: 88,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    soundName: "RP4 Kick",
  },
  {
    keyName: "C",
    keyNum: 67,
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    soundName: "Cev H2",
  },
];

class Pad extends React.Component {
  constructor(props) {
    super(props);

    this.keyPressed = this.keyPressed.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  keyPressed(e) {
    if (e.keyCode === this.props.padInfo.keyNum) {
      this.playSound();
    }
  }

  playSound() {
    const audio = document.getElementById(this.props.padInfo.keyName);
    audio.currentTime = 0;
    audio.play();
    const key = document.querySelector(
      `.drum-pad[data-key="${this.props.padInfo.keyNum}"]`
    );
    key.classList.add("on");
    this.props.handleDisplay(this.props.padInfo.soundName);
  }

  removeClassOn() {
    const keys = document.querySelectorAll(".drum-pad");
    keys.forEach((key) => key.classList.remove("on"));
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPressed);
    document.addEventListener("transitionend", this.removeClassOn);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.playSound);
  }

  render() {
    const padInfo = this.props.padInfo;
    return (
      <div
        id={padInfo.soundName.replace(/\s/g, "-")}
        className="drum-pad"
        data-key={padInfo.keyNum}
        onClick={this.playSound}
      >
        <kbd>{padInfo.keyName}</kbd>
        <audio
          id={padInfo.keyName}
          className="clip"
          data-key={padInfo.keyNum}
          src={padInfo.sound}
        ></audio>
      </div>
    );
  }
}

const DrumPads = ({ drumPads, handleDisplay }) => {
  return (
    <div id="drumPad">
      {drumPads.map((pad, index) => (
        <Pad padInfo={pad} key={index} handleDisplay={handleDisplay} />
      ))}
    </div>
  );
};

const Display = ({ display }) => {
  return <div id="display">{display}</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drumPads: pads,
      display: "Hello Voyager!",
    };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(name) {
    this.setState({
      display: name,
    });
  }

  render() {
    return (
      <div className="container" id="drum-machine">
        <DrumPads
          drumPads={this.state.drumPads}
          handleDisplay={this.updateDisplay}
        />
        <Display display={this.state.display} />
      </div>
    );
  }
}

export default App;
