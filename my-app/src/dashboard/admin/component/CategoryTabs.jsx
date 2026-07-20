import React from "react";

const categories = [
  "All",
  "Street Food",
  "Main Course",
  "Beverages",
  "Desserts",
];

const CategoryTabs = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedCategory === category
              ? "bg-orange-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;