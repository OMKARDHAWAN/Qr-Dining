import React, { useState } from "react";
import MenuData from "./MenuData";
import MenuCard from "./MenuCard";
import CategoryTabs from "./CategoryTabs";

const MenuManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMenu =
    selectedCategory === "All"
      ? MenuData
      : MenuData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="p-6">

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          + Add Item
        </button>
      </div>

      {/* Category Buttons */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default MenuManagement;