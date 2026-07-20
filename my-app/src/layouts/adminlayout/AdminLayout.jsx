import { Outlet } from "react-router-dom";
import AdminSidebar from "../../dashboard/admin/component/AdminSidebar";
<<<<<<< HEAD
import { AuthProvider } from "../../app/providers/AuthContextApi/AuthProvider";
=======
>>>>>>> f64f1f43615bb665d952d49676119bba51aa1896
import AdminNavbar from "../../dashboard/admin/component/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex w-full h-screen">

      {/* Sidebar */}

      <div className="w-72 border-r">
        <AdminSidebar />
      </div>

      {/* Main Content */}

      <div className="flex flex-col flex-1 bg-gray-100">

        <AdminNavbar />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
}