import React from "react";
import "./App.scss";

const Display = () => <div id="display">2046</div>;

const ClearNResult = () => {
  return (
    <div id="clearNResult">
      <div className="pad" key-code="67">
        <kbd id="clear">AC</kbd>
      </div>
      <div className="pad" key-code="187">
        <kbd id="equals">=</kbd>
      </div>
    </div>
  );
};

const NumArea = () => {
  return (
    <div id="numArea">
      {numbers.map((number) => (
        <div className="pad" key={number.id} key-code={number.keyNum}>
          <kbd id={number.id}>{number.content}</kbd>
        </div>
      ))}
    </div>
  );
};

const Operator = () => {
  return (
    <div id="operator">
      {operators.map((o) => (
        <div className="pad" key={o.id} key-code={o.keyNum}>
          <kbd id={o.id}>{o.content}</kbd>
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="container">
      <div id="caculator">
        <Display />

        <NumArea />
        <Operator />
        <ClearNResult />
      </div>
    </div>
  );
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
