const ClueCard = ({ result }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-4 text-black dark:text-white max-w-xl w-full">
      <h2 className="text-lg font-bold mb-2">
        📝 Your Guess: <span className="text-blue-600">{result.guess}</span>
      </h2>

      <div className="space-y-2">
        {result.clues.map((clue, index) => (
          <div key={index}>
            <p className="text-sm mb-1">
              {clue.letter
                ? `Letter '${clue.letter}' probability:`
                : `Position ${clue.position} match probability:`}
            </p>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
              <div
                style={{
                  width: `${clue.prob}%`,
                  height: "16px",
                  borderRadius: "8px",
                  backgroundColor:
                    clue.prob >= 80
                      ? "green"
                      : clue.prob >= 50
                      ? "lightgreen"
                      : "red",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 font-semibold">
        🔎 Similarity:{" "}
        <span className="text-purple-600">{result.similarity}%</span>
      </div>
    </div>
  );
};

export default ClueCard;
