import { useState } from "react";
import "./styles/App.css";
import Piano from "./components/Piano";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold underline heading">
        Piano App
      </h1>
      <Piano />
    </div>
  );
}

export default App;
