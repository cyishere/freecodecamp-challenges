/*
 * @Author: chenyang
 * @Date: 2020-07-13 10:47:32
 * @Last Modified by: chenyang
 * @Last Modified time: 2020-07-13 16:26:11
 */
import React from "react";
import "./App.scss";

const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const ops = ["+", "-", "*", "/"];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPressed: undefined,
      currentNumber: "0",
      express: undefined,
      operation: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    const { lastPressed, currentNumber, express, operation } = this.state;
    const { innerText } = e.target;

    this.setState({
      lastPressed: innerText,
    });

    if (!Number.isNaN(Number(innerText))) {
      if (currentNumber === "0") {
        this.setState({
          currentNumber: innerText,
        });
      } else if (ops.includes(lastPressed)) {
        this.setState({
          currentNumber: innerText,
        });
      } else {
        this.setState({
          currentNumber: currentNumber + innerText,
        });
      }

      return;
    }

    switch (innerText) {
      case "AC":
        this.setState({
          currentNumber: "0",
          express: undefined,
          operation: undefined,
        });
        break;
      case ".":
        if (!currentNumber.includes(".")) {
          this.setState({
            currentNumber: currentNumber + innerText,
          });
        }
        break;
      default:
        if (!operation) {
          this.setState({
            operation: innerText,
            express: currentNumber,
            currentNumber: "",
          });
        } else if (innerText === "=") {
          const evaluated = eval(`${express} ${operation} ${currentNumber}`);
          this.setState({
            operation: undefined,
            express: evaluated,
            currentNumber: evaluated,
          });
        } else {
          const evaluated = eval(`${express} ${operation} ${currentNumber}`);
          this.setState({
            operation: innerText,
            express: evaluated,
            currentNumber: evaluated,
          });
        }
        break;
    }
  };

  render() {
    const { currentNumber, express, operation } = this.state;
    return (
      <div className="container">
        <p style={{ position: "absolute", top: 0 }}>
          {JSON.stringify(this.state)}
        </p>
        <div id="calculator">
          <div id="displayBox">
            <div id="miniDisplay">
              {express} {operation}
            </div>
            <div id="display">{currentNumber}</div>
          </div>

          <div id="numArea">
            {numbers.map((number) => (
              <button
                className="pad"
                id={`id${number}`}
                key={number}
                onClick={this.handleClick}
              >
                {number}
              </button>
            ))}
            <button className="pad" onClick={this.handleClick}>
              .
            </button>
          </div>

          <div id="operator">
            {ops.map((op, index) => (
              <button className="pad" key={index} onClick={this.handleClick}>
                {op}
              </button>
            ))}
          </div>

          <div id="clearNResult">
            <button className="pad" id="clear" onClick={this.handleClick}>
              AC
            </button>
            <button className="pad" id="equals" onClick={this.handleClick}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
