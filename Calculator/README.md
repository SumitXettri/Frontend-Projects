# React Calculator

A simple React-based calculator that supports basic arithmetic operations (`+`, `-`, `x`, `/`) and displays the current formula and result dynamically.

## Features
- Perform basic arithmetic calculations.
- Display the formula and result dynamically.
- Reset the calculator using the "AC" button.
- Handle decimal inputs.
- Prevent invalid input sequences (e.g., multiple decimals).

## Project Structure

### Main Component: `Calculator`
The `Calculator` component is a stateful React class component. It handles:
- **State management**: Tracks `currentValue`, `formula`, and evaluation status.
- **User input handling**: Updates the state based on button clicks (numbers, operators, decimal, or `=`).

### State Variables
1. `currentValue`: The number or result currently displayed.
2. `formula`: The full mathematical expression being calculated.
3. `evaluated`: Tracks whether the result has been evaluated.

### Methods
- `clear`: Resets the calculator state.
- `handleNumbers`: Adds numbers to the current value and formula.
- `handleOperators`: Adds operators to the formula, ensuring valid syntax.
- `handleDecimal`: Adds a decimal point to the current number.
- `handleEvaluate`: Evaluates the mathematical expression and displays the result.
---

## Technologies Used
- React
- JSX
- CSS Grid for layout
- Tailwind
