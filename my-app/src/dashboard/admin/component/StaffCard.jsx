import React from "react";
import { FiMail, FiMapPin } from "react-icons/fi";

const StaffCard = ({ staff }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">

      {/* Image & Status */}
      <div className="flex justify-between items-start">

        <div className="relative">
          <img
            src={staff.image}
            alt={staff.name}
            className="w-20 h-20 rounded-xl object-cover"
          />

          <span
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              staff.status === "On Duty"
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          ></span>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            staff.status === "On Duty"
              ? "bg-orange-100 text-orange-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {staff.status}
        </span>

      </div>

      {/* Details */}

      <h2 className="text-xl font-bold mt-4">
        {staff.name}
      </h2>

      <p className="text-gray-500">
        {staff.role}
      </p>

      <div className="bg-gray-100 rounded-lg p-3 mt-4 flex items-center gap-2 text-gray-600 text-sm">
        <FiMapPin />
        {staff.location}
      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-5">

        <button className="flex-1 bg-gray-200 hover:bg-gray-300 rounded-lg py-2 font-semibold">
          Details
        </button>

        <button className="bg-orange-100 text-orange-600 p-2 rounded-lg hover:bg-orange-200">
          <FiMail size={18} />
        </button>

      </div>

    </div>
  );
};

export default StaffCard;