import React from "react";
import { FiBell, FiSettings, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthContextApi/AuthProvider";

export default function AdminNavbar({ searchQuery, setSearchQuery }){
  const { user } = useAuth();
  const navigate = useNavigate();

  const name = user?.username || user?.Username || "Admin";
  const role = user?.role || user?.Role || "Administrator";

  return (
    <>
    <div className="bg-white h-24 px-10 flex justify-between items-center border-b shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-black tracking-tight text-gray-800 cursor-pointer select-none" onClick={() => navigate("/admin")}>
          QR<span className="text-red-700">Dine</span>
        </h1>
        <div className="h-6 w-[1px] bg-gray-200"></div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">
          Admin Portal
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 border rounded-full px-5 py-3 outline-none"
        />

        <FiBell
          className="text-2xl cursor-pointer hover:text-orange-500"
        />

        <FiSettings
          className="text-2xl cursor-pointer hover:text-orange-500"
        />

        {/* Clickable Profile details with only icon */}
        <div 
          onClick={() => navigate("/admin/profile")}
          className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity pl-4 border-l border-gray-200"
        >
          <div className="text-right">
            <h3 className="font-semibold text-gray-800">
              {name}
            </h3>
            <p className="text-sm text-gray-500">
              {role}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full border border-gray-250 bg-gray-50 flex items-center justify-center text-gray-600 cursor-pointer">
            <FiUser size={20} />
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
