import { Outlet } from "react-router-dom";
import AdminNavbar from "../../dashboard/admin/component/AdminNavbar";
import AdminSidebar from "../../dashboard/admin/component/AdminSidebar";

export default function AdminLayout(){
    return(
        <div className="flex border border-black w-full h-screen">
           <div className="flex w-1/5 border border-red-500">
            <AdminSidebar/>
           </div>
           <div className="flex flex-col w-screen border border-green-600">
            <AdminNavbar/>
            <Outlet/>
           </div>
        </div>
    )
}