import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../../dashboard/admin/pages/AdminHomePage";
import AdminLayout from "../../layouts/adminlayout/AdminLayout";

export default function AdminRoutes(){
    return (
        <>
        <Routes>
            <Route element={<AdminLayout/>}>
            <Route path="/" element={<AdminHomePage/>}/>
            </Route>
        </Routes>
        </>
    )
}