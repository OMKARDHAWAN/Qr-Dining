import { Outlet } from "react-router-dom";
import AdminSidebar from "../../dashboard/admin/component/AdminSidebar";
import AdminNavbar from "../../dashboard/admin/component/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex flex-col flex-1">

        <AdminNavbar />

        <main className="p-8 flex-1 overflow-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;