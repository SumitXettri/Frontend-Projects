import { useEffect, useState } from "react";
import WordInput from "./components/WordInput";
import HistoryPanel from "./components/HistoryPanel";
import { calculateProbabilities } from "./utils/ProbabilityEngine";

import namesList from "./data/namesList";
import placesList from "./data/placesList";
import countriesList from "./data/countriesList";
import foodList from "./data/foodList";
import animalsList from "./data/animalsList";

import CategoryButtons from "./components/CategoryButtons";

const categories = [
  { key: "names", label: "Names" },
  { key: "places", label: "Places" },
  { key: "countries", label: "Countries" },
  { key: "food", label: "Food" },
  { key: "animals", label: "Animals" },
];

const wordLists = {
  names: namesList,
  places: placesList,
  countries: countriesList,
  food: foodList,
  animals: animalsList,
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [secretWord, setSecretWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const maxAttempts = 3;

  useEffect(() => {
    if (selectedCategory) {
      const list = wordLists[selectedCategory];
      const randomWord = list[Math.floor(Math.random() * list.length)];
      setSecretWord(randomWord.toUpperCase());
      setGuesses([]);
      setGameOver(false);
      setMessage("");
    }
  }, [selectedCategory]);

  const handleGuessSubmit = (guess) => {
    if (gameOver || !secretWord) return;

    const result = calculateProbabilities(guess.toUpperCase(), secretWord);
    setGuesses((prev) => [...prev, result]);

    if (result.similarity === 100) {
      setGameOver(true);
      setMessage(`🎉 You cracked the code! The word was: ${secretWord}`);
    } else if (guesses.length + 1 >= maxAttempts) {
      setGameOver(true);
      setMessage(`❌ Out of attempts! The word was: ${secretWord}`);
    }
  };

  const resetGame = () => {
    setSelectedCategory(null);
    setSecretWord("");
    setGuesses([]);
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">🕵️ Spy Decoder</h1>

      <CategoryButtons categories={categories} onSelect={setSelectedCategory} />

      {selectedCategory && (
        <>
          <WordInput
            onSubmit={handleGuessSubmit}
            disabled={gameOver}
            category={
              categories.find((c) => c.key === selectedCategory)?.label || ""
            }
          />

          {(message || gameOver) && (
            <div className="mt-4 mb-4 flex items-center justify-center gap-4 max-w-md mx-auto">
              {message && (
                <div className="p-3 rounded bg-red-700 text-white font-semibold text-center min-w-[250px]">
                  {message}
                </div>
              )}

              {gameOver && (
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold text-white whitespace-nowrap"
                >
                  🔄 Play Again
                </button>
              )}
            </div>
          )}

          <HistoryPanel guesses={guesses} />
        </>
      )}
    </div>
  );
};

export default App;
