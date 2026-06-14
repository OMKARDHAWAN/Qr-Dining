import { BrowserRouter, Route, Routes } from "react-router-dom";
import TablePage from "../../features/qr/pages/TablePage";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import ChefRoutes from "./ChefRoutes";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/chef/*" element={<ChefRoutes />} />
      </Routes>
    </>
  );
}
