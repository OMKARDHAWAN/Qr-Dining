import React, { useContext } from "react";
import { StaffContext } from "../../../app/providers/StaffContextApi/StaffProvider";
import { FiMail, FiMapPin, FiEdit, FiTrash2 } from "react-icons/fi";



const StaffCard = ({ staff, onEdit }) => {

  const { deleteStaff } = useContext(StaffContext);

  return (

    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">

      {/* Image & Status */}

      <div className="flex justify-between items-start">

        <div className="relative">
  <img
    src={
        staff.imageUrl?.startsWith("http")
            ? staff.imageUrl
            : `https://localhost:7155${staff.imageUrl}`
    }
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

      {/* Staff Details */}

      <h2 className="text-xl font-bold mt-4">
        {staff.name}
      </h2>

      <p className="text-gray-500">
        {staff.role}
      </p>

      <div className="bg-gray-100 rounded-lg p-3 mt-4 flex items-center gap-2 text-gray-600 text-sm">

        <FiMapPin />

        {staff.department}

      </div>

      <div className="mt-3 text-sm text-gray-500">

        <p>
          <strong>Email :</strong> {staff.email}
        </p>

        <p>
          <strong>Phone :</strong> {staff.phone}
        </p>

      </div>

      {/* Buttons */}

<div className="flex gap-2 mt-5">

    <button
       onClick={() => onEdit(staff)}
        className="flex-1 bg-blue-500 text-white rounded-lg py-2 flex justify-center items-center gap-2"
    >
        <FiEdit />
        Edit
    </button>

    <button
        onClick={() => deleteStaff(staff.staffId)}
        className="flex-1 bg-red-500 text-white rounded-lg py-2 flex justify-center items-center gap-2"
    >
        <FiTrash2 />
        Delete
    </button>

</div>

    </div>

  );
};

export default StaffCard;