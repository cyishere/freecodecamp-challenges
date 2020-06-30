import React from "react";
import "./App.scss";

const Display = ({ display, miniDisplay }) => (
  <div id="displayBox">
    <div id="miniDisplay">{miniDisplay}</div>
    <div id="display">{display}</div>
  </div>
);

class ClearNResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="clearNResult">
        <div className="pad" key-code="67">
          <kbd id="clear" onClick={this.props.clearAll}>
            AC
          </kbd>
        </div>
        <div className="pad" key-code="187">
          <kbd id="equals">=</kbd>
        </div>
      </div>
    );
  }
}

class NumButton extends React.Component {
  constructor(props) {
    super(props);

    this.clickNum = this.clickNum.bind(this);
  }

  clickNum() {
    const singleClickContent = this.props.number.content;
    const btn = document.getElementById(this.props.number.id);
    btn.classList.add("on");
    this.props.handleDisplayCache(singleClickContent);
  }

  render() {
    const { number } = this.props;
    return (
      <div className="pad" key-code={number.keyNum}>
        <kbd id={number.id} onClick={this.clickNum}>
          {number.content}
        </kbd>
      </div>
    );
  }
}

const NumArea = ({
  handleDisplay,
  handleDisplayCache,
  pending,
  clearAll,
  resetPending,
  miniDisplay,
}) => {
  return (
    <div id="numArea">
      {numbers.map((number) => (
        <NumButton
          number={number}
          key={number.id}
          handleDisplay={handleDisplay}
          handleDisplayCache={handleDisplayCache}
          clearAll={clearAll}
          pending={pending}
          resetPending={resetPending}
          miniDisplay={miniDisplay}
        />
      ))}
    </div>
  );
};

class OpButton extends React.Component {
  constructor(props) {
    super(props);
    this.clickOp = this.clickOp.bind(this);
  }

  clickOp() {
    if (this.props.expression === "") return;
    var op = "";
    switch (this.props.o.content) {
      case "+":
        op = " +";
        break;
      case "-":
        op = " -";
        break;
      case "×":
        op = " *";
        break;
      case "÷":
        op = " /";
        break;
      default:
        op = "";
        break;
    }
    // console.log(op);
    this.props.handleMiniDisplay(op);
  }

  render() {
    const { o } = this.props;
    return (
      <div className="pad" key={o.id} key-code={o.keyNum}>
        <kbd id={o.id} onClick={this.clickOp}>
          {o.content}
        </kbd>
      </div>
    );
  }
}

const Operator = ({
  displayCache,
  handleDisplayCache,
  handleDisplay,
  handleMiniDisplay,
  pending,
  expression,
}) => {
  return (
    <div id="operator">
      {operators.map((o, index) => (
        <OpButton
          o={o}
          key={index}
          displayCache={displayCache}
          handleDisplay={handleDisplay}
          handleDisplayCache={handleDisplayCache}
          handleMiniDisplay={handleMiniDisplay}
          pending={pending}
          expression={expression}
        />
      ))}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCache: "",
      expression: "",
      display: 0,
      pending: false,
    };

    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.updateDisplayCache = this.updateDisplayCache.bind(this);
    this.updateMiniDisplay = this.updateMiniDisplay.bind(this);
    this.resetPending = this.resetPending.bind(this);
  }

  updateDisplay(text) {
    this.setState({
      display: text,
    });
  }

  clearAll() {
    this.setState({
      displayCache: "",
      miniDisplay: "",
      display: 0,
      expression: "",
      pending: false,
    });
  }

  clearMainDisplay() {
    this.setState({
      display: "",
      displayCache: "",
    });
  }

  syncMiniDisplay(text) {
    this.setState({
      expression: text,
    });
  }

  updateDisplayCache(text) {
    if (text === "." && this.state.displayCache.includes(".")) return;
    const cacheNow = (this.state.displayCache += text);
    if (this.state.pending) {
      var expressionCache = this.state.expression + " " + text;
    } else {
      var expressionCache = cacheNow;
    }
    if (cacheNow.length > 10) {
      // cacheNow = "";
      this.updateDisplay("Digital Limit");
    } else {
      this.setState({
        displayCache: cacheNow,
      });
      this.updateDisplay(this.state.displayCache);
      this.syncMiniDisplay(expressionCache);
    }
  }

  updateMiniDisplay(operator) {
    const ops = ["+", "-", "*", "/"];
    if (ops.includes(this.state.expression.slice(-1))) {
      this.setState({
        expression: this.state.expression.slice(0, -2) + operator,
      });
    } else {
      this.setState({
        expression: this.state.display.toString() + operator,
      });
    }
    this.clearMainDisplay();
  }

  resetPending() {
    this.setState({
      pending: false,
    });
  }

  clearClickEffect() {
    const pads = document.querySelectorAll(".pad kbd");
    pads.forEach((pad) => pad.classList.remove("on"));
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.clearClickEffect);
  }

  render() {
    return (
      <div className="container">
        <div id="calculator">
          <Display
            display={this.state.display}
            miniDisplay={this.state.expression}
          />
          <NumArea
            handleDisplay={this.updateDisplay}
            handleDisplayCache={this.updateDisplayCache}
            clearAll={this.clearAll}
            pending={this.state.pending}
            resetPending={this.resetPending}
            miniDisplay={this.state.expression}
          />
          <Operator
            displayCache={this.state.displayCache}
            handleDisplay={this.updateDisplay}
            handleDisplayCache={this.updateDisplayCache}
            handleMiniDisplay={this.updateMiniDisplay}
            pending={this.state.pending}
            expression={this.state.expression}
          />
          <ClearNResult clearAll={this.clearAll} />
        </div>
      </div>
    );
  }
}

const numbers = [
  {
    id: "decimal",
    content: ".",
    keyNum: 190,
    order: -1,
  },
  {
    id: "zero",
    content: "0",
    keyNum: 48,
    order: 0,
  },
  {
    id: "one",
    content: "1",
    keyNum: 49,
    order: 1,
  },
  {
    id: "two",
    content: "2",
    keyNum: 50,
    order: 2,
  },
  {
    id: "three",
    content: "3",
    keyNum: 51,
    order: 3,
  },
  {
    id: "four",
    content: "4",
    keyNum: 52,
    order: 4,
  },
  {
    id: "five",
    content: "5",
    keyNum: 53,
    order: 5,
  },
  {
    id: "six",
    content: "6",
    keyNum: 54,
    order: 6,
  },
  {
    id: "seven",
    content: "7",
    keyNum: 55,
    order: 7,
  },
  {
    id: "eight",
    content: "8",
    keyNum: 56,
    order: 8,
  },
  {
    id: "nine",
    content: "9",
    keyNum: 57,
    order: 9,
  },
];

const operators = [
  {
    id: "add",
    content: "+",
    keyNum: 187,
    order: 1,
  },
  {
    id: "subtract",
    content: "-",
    keyNum: 189,
    order: 2,
  },
  {
    id: "multiply",
    content: "×",
    keyNum: 56,
    order: 3,
  },
  {
    id: "divide",
    content: "÷",
    keyNum: 191,
    order: 4,
  },
];

export default App;
