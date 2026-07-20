import React from "react";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const MenuCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Food Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-44 object-cover"
      />

      {/* Card Body */}
      <div className="p-4">

        {/* Category Badge */}
        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
          {item.category}
        </span>

        {/* Food Name */}
        <h2 className="text-xl font-bold mt-3">
          {item.name}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2">
          {item.description}
        </p>

        {/* Price */}
        <div className="mt-4 text-2xl font-bold text-green-600">
          ₹{item.price}
        </div>

        {/* Availability */}
        <div className="flex justify-between items-center mt-5">

          <div className="flex items-center gap-2">
            {item.available ? (
              <>
                <FaToggleOn
                  size={28}
                  className="text-green-500"
                />
                <span className="text-green-600 font-medium">
                  Available
                </span>
              </>
            ) : (
              <>
                <FaToggleOff
                  size={28}
                  className="text-gray-400"
                />
                <span className="text-gray-500 font-medium">
                  Unavailable
                </span>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit size={18} />
            </button>

            <button className="text-red-500 hover:text-red-700">
              <FaTrash size={18} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MenuCard;