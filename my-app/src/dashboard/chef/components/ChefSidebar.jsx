import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthContextApi/AuthProvider";

const menuItems = [
  {
    title: "Orders",
    icon: "receipt_long",
    path: "/chef/orders",
  },
  {
    title: "Menu",
    icon: "restaurant_menu",
    path: "/chef/menu",
  },
  {
    title: "Inventory",
    icon: "inventory_2",
    path: "/chef/inventory",
  },
  {
    title: "Staff",
    icon: "groups",
    path: "/chef/staff",
  },
  {
    title: "Profile",
    icon: "account_circle",
    path: "/chef/profile",
  },
];

function ChefSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 hidden md:flex flex-col border-r border-zinc-200 bg-zinc-50 p-6 z-50">

      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900">
          Spice Kitchen
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Chef's Control Panel
        </p>
      </div>

      {/* Main Menu */}
      <nav className="flex flex-col space-y-2 flex-grow">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-orange-50 text-orange-700 rounded-xl px-4 py-3 shadow-sm font-semibold"
                : "flex items-center gap-3 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-xl px-4 py-3 transition"
            }
          >
            <span className="material-symbols-outlined">
              {item.icon}
            </span>
            <span className="font-medium">
              {item.title}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Menu: Only Logout, Help option removed */}
      <div className="pt-6 border-t border-zinc-200 space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-zinc-500 hover:text-red-700 hover:bg-red-50 rounded-xl px-4 py-3 transition w-full text-left cursor-pointer font-medium"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

export default ChefSidebar;