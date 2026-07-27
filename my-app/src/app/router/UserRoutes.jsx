import {  Route, Routes } from "react-router-dom";
import TablePage from "../../features/qr/pages/TablePage";
import UserHomePage from "../../dashboard/user/pages/UserHomePage";
import UserLayout from "../../layouts/userlayout/UserLayout";
import UserMenu from "../../dashboard/user/component/UserMenu";

export default function UserRoutes(){
    return(
 <>
 <Routes>
 <Route element={<UserLayout/>}>
 <Route path="/" element={<TablePage/>}/>
 <Route path="/user" element={<UserHomePage/>}/>
 <Route path="/" element={<UserHomePage/>}/>
 <Route path="/menu" element={<UserMenu/>}/>
 </Route>
 </Routes>
 </>        
    )
}