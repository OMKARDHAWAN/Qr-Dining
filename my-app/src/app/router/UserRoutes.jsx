import {  Route, Routes } from "react-router-dom";
import UserHomePage from "../../dashboard/user/pages/UserHomePage";
import UserLayout from "../../layouts/userlayout/UserLayout";

export default function UserRoutes(){
    return(
 <>
 <Routes>
 <Route element={<UserLayout/>}>
 <Route index element={<UserHomePage/>}/>
 </Route>
 </Routes>
 </>        
    )
}
