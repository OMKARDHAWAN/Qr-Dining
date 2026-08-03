import { Route, Routes } from "react-router-dom";
import ChefLayout from "../../layouts/cheflayout/ChefLayout";
import ChefHomePage from "../../dashboard/chef/pages/ChefHomePage";
import Orders from "../../dashboard/chef/pages/Orders";
import Menu from "../../dashboard/chef/pages/Menu";
import Inventory from "../../dashboard/chef/pages/Inventory";
import Staff from "../../dashboard/chef/pages/Staff";
import Offers from "../../dashboard/chef/pages/Offers";
import Profile from "../../dashboard/chef/pages/Profile";

export default function ChefRoutes() {
  return (
    <Routes>
      <Route element={<ChefLayout />}>
        <Route path="/" element={<ChefHomePage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}