import React from "react";
import { NavLink } from "react-router-dom";


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
    title: "Offers",
    icon: "local_offer",
    path: "/chef/offers",
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

const bottomItems = [
  {
    title: "Help",
    icon: "help",
    path: "/chef/help",
  },
  {
    title: "Logout",
    icon: "logout",
    path: "/logout",
  },
];

function ChefSidebar() {
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
                ? "flex items-center gap-3 bg-orange-50 text-orange-700 rounded-xl px-4 py-3 shadow-sm"
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

     // Bottom Menu

      <div className="pt-6 border-t border-zinc-200 space-y-2">

        {bottomItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className="flex items-center gap-3 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-xl px-4 py-3 transition"
          >
            <span className="material-symbols-outlined">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>
          </NavLink>
        ))}

      </div>

    </aside>
  );
}

export default ChefSidebar;