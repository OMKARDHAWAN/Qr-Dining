function CategoryBar() {
  const categories = [
    "All",
    "Starters",
    "Breakfast",
    "Lunch",
    
  ];

  return (
    <div
      className="
        fixed
        top-20
        left-0
        right-0
        bg-white
        shadow-sm
        z-40"
    >
      <div className="max-w-[1600px] mx-auto flex gap-4 overflow-x-auto px-6 py-4">

        {categories.map((cat, index) => (
          <button
            key={index}
            className={
              index === 0
                ? "px-8 py-3 rounded-full bg-[#2c1713] text-white font-semibold whitespace-nowrap"
                : "px-8 py-3 rounded-full bg-red-50 text-gray-700 font-semibold whitespace-nowrap hover:bg-red-100"
            }
          >
            {cat}
          </button>
        ))}

      </div>
    </div>
  );
}

export default CategoryBar;