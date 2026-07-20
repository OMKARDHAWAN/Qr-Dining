import {
  FiClipboard,
  FiBox,
  FiUsers,
  FiUser,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

import { LuUtensilsCrossed } from "react-icons/lu";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between">
      <div>
        {/* Logo */}

        <div className="flex items-center gap-4 p-8">
          <div className="bg-orange-500 rounded-xl w-14 h-14 flex items-center justify-center">
            <LuUtensilsCrossed className="text-white text-3xl" />
          </div>

          <div>
            <h1 className="text-red-700 text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-500">
              Indian Café Edition
            </p>
          </div>
        </div>

        {/* Menu */}

        <div className="px-5 space-y-2">

          {/* Order Status */}

          <Link
            to="/admin"
            className="flex items-center gap-4 w-full rounded-xl bg-orange-50 text-orange-600 px-5 py-4 hover:bg-orange-100"
          >
            <FiClipboard size={22} />
            <span>Order Status</span>
          </Link>

          {/* Menu Management */}

          <Link
            to="/admin/menu-management"
            className="flex items-center gap-4 w-full rounded-xl px-5 py-4 hover:bg-gray-100"
          >
            <LuUtensilsCrossed size={22} />
            <span>Menu Management</span>
          </Link>

          {/* Stock & Inventory */}

          <Link
            to="/admin/stock-inventory"
            className="flex items-center gap-4 w-full rounded-xl px-5 py-4 hover:bg-gray-100"
          >
            <FiBox size={22} />
            <span>Stock & Inventory</span>
          </Link>

          {/* Staff Directory */}

          <Link
            to="/admin/staff-directory"
            className="flex items-center gap-4 w-full rounded-xl px-5 py-4 hover:bg-gray-100"
          >
            <FiUsers size={22} />
            <span>Staff Directory</span>
          </Link>

          {/* Profile */}

          <button className="flex items-center gap-4 w-full rounded-xl px-5 py-4 hover:bg-gray-100 cursor-pointer">
            <FiUser size={22} />
            <span>Profile</span>
          </button>

        </div>
      </div>

      {/* Bottom */}

      <div className="p-6">
        <hr />

        <div className="mt-6 space-y-4">

          <button className="flex items-center gap-4 hover:text-orange-500">
            <FiHelpCircle size={22} />
            Support
          </button>

          <button className="flex items-center gap-4 text-red-600">
            <FiLogOut size={22} />
            Logout
          </button>

        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;