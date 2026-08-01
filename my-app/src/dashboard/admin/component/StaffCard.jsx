import React from "react";
import { FiEdit, FiTrash2, FiMail, FiPhone, FiAward } from "react-icons/fi";

const StaffCard = ({ member, onEdit, onDelete }) => {
  const roleColors = {
    Admin: "bg-red-50 text-red-700 border-red-100",
    Chef: "bg-orange-50 text-orange-700 border-orange-100",
    Manager: "bg-blue-50 text-blue-700 border-blue-100",
    User: "bg-gray-50 text-gray-700 border-gray-100"
  };

  const badgeColor = roleColors[member.role] || "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-48">
      <div>
        {/* Header: Name and Role */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 font-sans tracking-tight">
            {member.username}
          </h3>
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeColor} font-sans`}>
            {member.role}
          </span>
        </div>

        {/* Details List */}
        <div className="space-y-2 text-gray-500 text-xs font-sans font-medium">
          <div className="flex items-center gap-2">
            <FiMail className="text-gray-400" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone className="text-gray-400" />
            <span>{member.mobileNumber || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(member)}
          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
          title="Edit Details"
        >
          <FiEdit size={16} />
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
          title="Delete Staff"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default StaffCard;