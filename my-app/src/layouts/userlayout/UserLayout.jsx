import { Outlet } from "react-router-dom";
import UserNavbar from "../../dashboard/user/component/UserNavbar";

export default function UserLayout(){
    return(
       <div className="flex flex-col border border-black w-full h-screen">
        <UserNavbar/>
        <Outlet/>
       </div>
    )
}