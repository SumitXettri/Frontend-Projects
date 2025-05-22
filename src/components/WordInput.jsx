import { useState } from "react";

const WordInput = ({ onSubmit, disabled, category }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }
    onSubmit(input.toUpperCase());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6 max-w-md w-full">
      <input
        type="text"
        maxLength={5}
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        disabled={disabled}
        className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-gray-100 uppercase font-mono tracking-widest border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 outline-none transition"
        placeholder={
          category
            ? `Enter 5-letter word of(${category})`
            : "Enter 5-letter guess"
        }
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-indigo-700 hover:bg-indigo-600 disabled:bg-gray-600 px-5 rounded-lg font-semibold tracking-wide transition-colors"
      >
        Guess
      </button>
    </form>
  );
};

export default WordInput;
