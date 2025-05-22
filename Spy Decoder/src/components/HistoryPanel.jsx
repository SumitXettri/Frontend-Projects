import ClueCard from "./ClueCard";

const HistoryPanel = ({ guesses }) => {
  if (guesses.length === 0)
    return (
      <p className="italic text-gray-400">No guesses yet. Start decoding!</p>
    );

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
      {guesses.map((res, idx) => (
        <div key={idx} className="flex-shrink-0 w-64">
          <ClueCard result={res} />
        </div>
      ))}
    </div>
  );
};

export default HistoryPanel;
