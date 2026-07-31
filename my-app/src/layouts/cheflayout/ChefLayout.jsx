import { Outlet } from "react-router-dom";
import ChefNavbar from "../../dashboard/chef/component/ChefNavbar";
import ChefSidebar from "../../dashboard/chef/component/ChefSidebar";

export default function ChefLayout() {
  return (
    <div className="flex border border-black w-screen h-screen">
      <div className="flex w-1/5 border border-red-500">
      <ChefSidebar/>
      </div>
      <div className="flex flex-col w-screen border border-green-600 ">
      <ChefNavbar/>
      <Outlet/>
      </div>
    </div>
  );
}
