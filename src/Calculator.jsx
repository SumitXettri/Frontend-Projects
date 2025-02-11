import React from "react";
import ReactDOM from "react-dom";
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      formula: "",
      evaluated: false,
    };

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.clear = this.clear.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    const button = e.target;
    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 100); // Remove the "pressed" class after 100ms
  }

  clear() {
    this.setState({
      currentValue: "0",
      formula: "",
      evaluated: false,
    });
  }

  handleNumbers(e) {
    const value = e.target.value;
    const { currentValue, formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        currentValue: value,
        formula: value !== "0" ? value : "",
        evaluated: false,
      });
    } else {
      const updatedValue = currentValue === "0" ? value : currentValue + value;
      this.setState({
        currentValue: updatedValue,
        formula: formula + value,
      });
    }
  }

  handleOperators(e) {
    const operator = e.target.value;
    const { formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        formula: this.state.currentValue + operator,
        currentValue: operator,
        evaluated: false,
      });
    } else if (/[x/+-]$/.test(formula)) {
      this.setState({
        formula: formula.slice(0, -1) + operator,
        currentValue: operator,
      });
    } else {
      this.setState({
        formula: formula + operator,
        currentValue: operator,
      });
    }
  }

  handleDecimal() {
    const { currentValue, formula, evaluated } = this.state;
    if (evaluated) {
      this.setState({
        currentValue: "0.",
        formula: "0.",
        evaluated: false,
      });
    } else if (!currentValue.includes(".")) {
      this.setState({
        currentValue: currentValue + ".",
        formula: formula + ".",
      });
    }
  }

  handleEvaluate() {
    const { formula } = this.state;

    if (!formula) return;

    const sanitizedFormula = formula.replace(/x/g, "*");

    try {
      let result = eval(sanitizedFormula);
      result = parseFloat(result).toString();

      this.setState({
        currentValue: result,
        formula: result,
        evaluated: true,
      });
    } catch (error) {
      this.setState({
        currentValue: "Error",
      });
    }
  }

  render() {
    return (
      <div className="calculator">
        <div className="display">
          <div className="formula">{this.state.formula}</div>
          <div className="current-value" id="display">
            {this.state.currentValue}
          </div>
        </div>
        <div className="buttons">
          <button
            id="clear"
            className="clear"
            onClick={this.clear}
            onMouseDown={this.handleButtonClick}
          >
            AC
          </button>
          <button
            value="/"
            id="divide"
            className="operator"
            onClick={this.handleOperators}
            onMouseDown={this.handleButtonClick}
          >
            /
          </button>
          <button
            value="x"
            id="multiply"
            className="operator"
            onClick={this.handleOperators}
            onMouseDown={this.handleButtonClick}
          >
            x
          </button>
          <button
            value="-"
            id="subtract"
            className="operator"
            onClick={this.handleOperators}
            onMouseDown={this.handleButtonClick}
          >
            -
          </button>
          <button
            id="seven"
            value="7"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            7
          </button>
          <button
            value="8"
            id="eight"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            8
          </button>
          <button
            value="9"
            id="nine"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            9
          </button>
          <button
            id="add"
            value="+"
            className="operator"
            onClick={this.handleOperators}
            onMouseDown={this.handleButtonClick}
          >
            +
          </button>
          <button
            value="4"
            id="four"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            4
          </button>
          <button
            value="5"
            id="five"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            5
          </button>
          <button
            value="6"
            id="six"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            6
          </button>
          <button
            value="="
            id="equals"
            className="equals"
            onClick={this.handleEvaluate}
            onMouseDown={this.handleButtonClick}
          >
            =
          </button>
          <button
            value="1"
            id="one"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            1
          </button>
          <button
            value="2"
            id="two"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            2
          </button>
          <button
            value="3"
            id="three"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            3
          </button>
          <button
            value="0"
            id="zero"
            className="jumbo"
            onClick={this.handleNumbers}
            onMouseDown={this.handleButtonClick}
          >
            0
          </button>
          <button
            value="."
            id="decimal"
            onClick={this.handleDecimal}
            onMouseDown={this.handleButtonClick}
          >
            .
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
