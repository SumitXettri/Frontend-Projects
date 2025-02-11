import { useState } from "react";
import "./styles/App.css";
import Calculator from "./Calculator.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold underline heading">
        React Calculator
      </h1>
      <Calculator />
    </div>
  );
}

export default App;
