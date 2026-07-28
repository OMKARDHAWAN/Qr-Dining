import { Routes, Route } from "react-router-dom";

import ChefLayout from "../../layouts/cheflayout/ChefLayout";
import ChefHomePage from "../../dashboard/chef/pages/ChefHomePage";
import OrdersPage from "../../dashboard/chef/pages/Orders";
import MenuPage from "../../dashboard/chef/pages/Menu";
import InventoryPage from "../../dashboard/chef/pages/Inventory";
import OffersPage from "../../dashboard/chef/pages/Offers";
import StaffPage from "../../dashboard/chef/pages/Staff";
import ProfilePage from "../../dashboard/chef/pages/Profile";

export default function ChefRoutes() {
  return (
    <Routes>
      <Route element={<ChefLayout />}>
        <Route index element={<ChefHomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}