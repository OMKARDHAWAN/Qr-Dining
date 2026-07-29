import React, { useState } from "react";
import {
  FiClipboard,
  FiBox,
  FiUsers,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthContextApi/AuthProvider";
import LogoutConfirm from "./LogutConfirm";

// Declared outside to optimize performance and prevent re-creation on every render
const getLinkClass = ({ isActive }) => 
  "flex items-center gap-4 w-full rounded-xl px-5 py-4 transition-all duration-200 " + 
  (isActive ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-600 hover:bg-gray-100");

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Controls custom popup

  // Execution when clicking the final popup Logout button
  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between h-screen relative">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-4 p-8">
          <div className="bg-orange-500 rounded-xl w-14 h-14 flex items-center justify-center">
            <LuUtensilsCrossed className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="text-red-700 text-3xl font-bold font-sans">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 font-sans">
              Indian Café Edition
            </p>
          </div>
        </div>

        {/* Menu Links */}
        <div className="px-5 space-y-2">
          {/* Order Status */}
          <NavLink
            to="/admin"
            end
            className={getLinkClass}
          >
            <FiClipboard size={22} />
            <span className="font-sans">Order Status</span>
          </NavLink>

          {/* Menu Management */}
          <NavLink
            to="/admin/menu-management"
            className={getLinkClass}
          >
            <LuUtensilsCrossed size={22} />
            <span className="font-sans">Menu Management</span>
          </NavLink>

          {/* Stock & Inventory */}
          <NavLink
            to="/admin/stock-inventory"
            className={getLinkClass}
          >
            <FiBox size={22} />
            <span className="font-sans">Stock & Inventory</span>
          </NavLink>

          {/* Staff Directory */}
          <NavLink
            to="/admin/staff-directory"
            className={getLinkClass}
          >
            <FiUsers size={22} />
            <span className="font-sans">Staff Directory</span>
          </NavLink>

          {/* Profile Button */}
          <button className="flex items-center gap-4 w-full rounded-xl px-5 py-4 text-gray-600 hover:bg-gray-100 cursor-pointer transition-all duration-200">
            <FiUser size={22} />
            <span className="font-sans">Profile</span>
          </button>
        </div>
      </div>

      {/* Bottom Logout */}
      <div className="p-6">
        <hr className="border-gray-200" />
        <div className="mt-6">
          <button 
            onClick={() => setShowLogoutConfirm(true)} // Opens the custom confirmation popup
            className="flex items-center gap-4 text-red-600 hover:text-red-800 cursor-pointer transition-colors font-sans w-full text-left"
          >
            <FiLogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Custom Logout Confirmation Popup Overlay */}
      {showLogoutConfirm && (
        <LogoutConfirm handleConfirmLogout={handleConfirmLogout} setShowLogoutConfirm={setShowLogoutConfirm}/>
      )}
    </aside>
  );
};

export default AdminSidebar;
