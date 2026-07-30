import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../../dashboard/admin/pages/AdminHomePage";
import AdminLayout from "../../layouts/adminlayout/AdminLayout";
import Profile from "../../dashboard/user/pages/Profile";
import MenuManagement from "../../dashboard/admin/component/MenuManagement";

export default function AdminRoutes(){
    return (
        <Routes>
            <Route element={<AdminLayout/>}>
                <Route path="/" element={<AdminHomePage/>}/>
                <Route path="menu-management" element={<MenuManagement/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Route>
        </Routes>
    )
}