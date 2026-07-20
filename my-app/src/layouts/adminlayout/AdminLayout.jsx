import { Outlet } from "react-router-dom";
import AdminSidebar from "../../dashboard/admin/component/AdminSidebar";
<<<<<<< HEAD
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
=======
import { AuthProvider } from "../../app/providers/AuthContextApi/AuthProvider";

export default function AdminLayout(){
    return(
    <>

    <div className="flex border border-black w-full h-screen">
           <div className="flex w-1/5 border border-red-500">
            <AdminSidebar/>
           </div>
           <div className="flex flex-col w-screen border border-green-600">
            <AdminNavbar/>
            <Outlet/>
           </div>
        </div>
    
    </>
    )
}
>>>>>>> 2d98ad506bc51bee405e753aafa784bb6917e984
