<<<<<<< HEAD
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
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import ChefRoutes from "./ChefRoutes";
import TablePage from "../../features/qr/pages/TablePage";
import Login from "../../shared/components/Login";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/"  element={<TablePage/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/chef/*" element={<ChefRoutes/>} />
      </Routes>
    </>
  );
}
>>>>>>> 2d98ad506bc51bee405e753aafa784bb6917e984
