import React from "react";
import {
  FiAlertTriangle,
  FiPackage,
  FiTruck,
  FiDollarSign,
} from "react-icons/fi";

const cards = [
  {
    title: "Critical Stock",
    value: "12 Items",
    subtitle: "Requires immediate restock",
    color: "text-red-600",
    bg: "bg-red-50",
    icon: <FiAlertTriangle size={24} />,
  },
  {
    title: "Total SKUs",
    value: "148 Units",
    subtitle: "Across 4 categories",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: <FiPackage size={24} />,
  },
  {
    title: "In Transit",
    value: "8 Orders",
    subtitle: "Expected today",
    color: "text-purple-600",
    bg: "bg-purple-50",
    icon: <FiTruck size={24} />,
  },
  {
    title: "Stock Value",
    value: "₹4,28,000",
    subtitle: "Current inventory value",
    color: "text-green-600",
    bg: "bg-green-50",
    icon: <FiDollarSign size={24} />,
  },
];

const StockCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} rounded-xl shadow-sm p-5`}
        >
          <div className={`${card.color} mb-3`}>
            {card.icon}
          </div>

          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StockCard;