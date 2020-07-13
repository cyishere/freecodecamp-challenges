/*
 * @Author: chenyang
 * @Date: 2020-07-13 10:47:32
 * @Last Modified by: chenyang
 * @Last Modified time: 2020-07-13 18:31:23
 */
// FIXME: after press equals, when press number again, the numbers shouldn't join togerther.
import React from "react";
import "./App.scss";

// const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
// const ops = ["+", "-", "*", "/"];
const numbers = [
  { id: "nine", content: 9 },
  { id: "eight", content: 8 },
  { id: "seven", content: 7 },
  { id: "six", content: 6 },
  { id: "five", content: 5 },
  { id: "four", content: 4 },
  { id: "three", content: 3 },
  { id: "two", content: 2 },
  { id: "one", content: 1 },
  { id: "zero", content: 0 },
];
const operators = [
  { id: "add", content: "+" },
  { id: "subtract", content: "-" },
  { id: "multiply", content: "*" },
  { id: "divide", content: "/" },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPressed: undefined,
      express: "0",
      operation: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    const { lastPressed, express } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC":
        this.setState({
          express: "0",
        });
        break;

      case "=":
        const evaluated = eval(express);
        this.setState({
          express: evaluated,
        });
        break;

      case ".":
        const splitted = express.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes(".")) {
          this.setState({
            express: express + ".",
          });
        }
        break;

      default:
        let con = undefined;
        const nums = numbers.map((item) => item.content);
        const ops = operators.map((item) => item.content);

        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== "-") {
            const lastNumberIdx = express
              .split("")
              .reverse()
              .findIndex((char) => char !== " " && nums.includes(+char));
            con =
              express.slice(0, express.length - lastNumberIdx) +
              ` ${innerText} `;
          } else {
            con = `${express} ${innerText} `;
          }
        } else {
          con = express === "0" ? innerText : express + innerText;
        }

        this.setState({
          express: con,
        });
    }

    this.setState({
      lastPressed: innerText,
    });
  };

  render() {
    const { express } = this.state;
    return (
      <div className="container">
        <div id="calculator">
          <div id="displayBox">
            {/* <div id="miniDisplay">{express}</div> */}
            <div id="display">{express}</div>
          </div>

          <div id="numArea">
            {numbers.map((item) => (
              <button
                className="pad"
                id={item.id}
                key={item.id}
                onClick={this.handleClick}
              >
                {item.content}
              </button>
            ))}
            <button className="pad" id="decimal" onClick={this.handleClick}>
              .
            </button>
          </div>

          <div id="operator">
            {operators.map((op) => (
              <button
                className="pad"
                id={op.id}
                key={op.id}
                onClick={this.handleClick}
              >
                {op.content}
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
