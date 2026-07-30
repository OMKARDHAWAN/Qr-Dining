import { Route, Routes } from "react-router-dom";
import AdminLayout from "../../layouts/adminlayout/AdminLayout";

import AdminHomePage from "../../dashboard/admin/pages/AdminHomePage";
import MenuManagementPage from "../../dashboard/admin/pages/MenuManagementPage";
import StockInventoryPage from "../../dashboard/admin/pages/StockInventoryPage";
import StaffDirectoryPage from "../../dashboard/admin/pages/StaffDirectoryPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminHomePage />} />

        <Route
          path="/menu-management"
          element={<MenuManagementPage />}
        />

        <Route
          path="/stock-inventory"
          element={<StockInventoryPage />}
        />

        <Route
          path="/staff-directory"
          element={<StaffDirectoryPage />}
        />
      </Route>
    </Routes>
  );
}