const CategoryButtons = ({ categories, onSelect }) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {categories.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="px-5 py-2 bg-indigo-700 text-indigo-100 rounded-lg hover:bg-indigo-600 hover:shadow-lg transition-shadow duration-300 font-semibold tracking-wide"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
