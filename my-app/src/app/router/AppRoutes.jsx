import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import ChefRoutes from "./ChefRoutes";
import TablePage from "../../features/qr/pages/TablePage";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/"  element={<TablePage/>}/>
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/chef/*" element={<ChefRoutes/>} />
      </Routes>
    </>
  );
}
