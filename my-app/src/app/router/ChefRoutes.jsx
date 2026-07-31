import { Routes, Route, Navigate } from "react-router-dom";
import ChefLayout from "../../layouts/cheflayout/ChefLayout";
import OrdersPage from "../../dashboard/chef/pages/Orders";
import MenuPage from "../../dashboard/chef/pages/Menu";
import ProfilePage from "../../dashboard/chef/pages/Profile";

// Placeholder components to prevent compile crash until pulled from devlop branch
const InventoryPage = () => (
  <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-150 m-6">
    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Inventory Management</h1>
    <p className="text-gray-500 mt-1">This module will be updated automatically after pulling from the devlop branch.</p>
  </div>
);

const StaffPage = () => (
  <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-150 m-6">
    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Staff Directory</h1>
    <p className="text-gray-500 mt-1">This module will be updated automatically after pulling from the devlop branch.</p>
  </div>
);

export default function ChefRoutes() {
  return (
    <Routes>
      <Route element={<ChefLayout />}>
        <Route index element={<Navigate to="/chef/orders" replace />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
